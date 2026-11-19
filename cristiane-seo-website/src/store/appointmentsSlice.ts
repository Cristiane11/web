import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { collection, doc, getDocs, orderBy, query, runTransaction, updateDoc, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { notifyBooking } from '@/lib/api'
import type { Appointment, Slot } from '@/types'

export const fetchAppointments = createAsyncThunk('appointments/fetch', async (uid?: string) => {
  const base = collection(db, 'appointments')
  const q = uid ? query(base, where('uid', '==', uid), orderBy('start', 'desc')) : query(base, orderBy('start', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ ...(d.data() as Appointment), id: d.id }))
})

type BookInput = Pick<Appointment, 'uid' | 'clientName' | 'email' | 'businessType' | 'notes'> & { slot: Slot }

/** Atomically marks the slot as booked and creates the appointment. */
export const bookSlot = createAsyncThunk('appointments/book', async ({ slot, ...info }: BookInput) => {
  const apptRef = doc(collection(db, 'appointments'))
  const appt: Appointment = {
    ...info,
    id: apptRef.id,
    slotId: slot.id,
    start: slot.start,
    end: slot.end,
    status: 'booked',
    createdAt: Date.now(),
  }
  await runTransaction(db, async (tx) => {
    const slotRef = doc(db, 'availability', slot.id)
    const fresh = await tx.get(slotRef)
    if (!fresh.exists() || fresh.data().booked) throw new Error('Sorry, this time slot was just taken. Please pick another.')
    tx.update(slotRef, { booked: true, bookedBy: info.uid })
    const { id: _id, ...data } = appt
    void _id
    tx.set(apptRef, data)
  })
  notifyBooking(appt.id, 'booked')
  return appt
})

/** Moves an appointment to a new open slot, freeing the old one. */
export const rescheduleAppointment = createAsyncThunk(
  'appointments/reschedule',
  async ({ appt, slot }: { appt: Appointment; slot: Slot }) => {
    await runTransaction(db, async (tx) => {
      const newRef = doc(db, 'availability', slot.id)
      const fresh = await tx.get(newRef)
      if (!fresh.exists() || fresh.data().booked) throw new Error('That slot is no longer available.')
      const oldRef = doc(db, 'availability', appt.slotId)
      const old = await tx.get(oldRef)
      if (old.exists()) tx.update(oldRef, { booked: false, bookedBy: null })
      tx.update(newRef, { booked: true, bookedBy: appt.uid })
      tx.update(doc(db, 'appointments', appt.id), { slotId: slot.id, start: slot.start, end: slot.end, status: 'booked' })
    })
    notifyBooking(appt.id, 'updated')
    return { ...appt, slotId: slot.id, start: slot.start, end: slot.end, status: 'booked' as const }
  },
)

export const cancelAppointment = createAsyncThunk('appointments/cancel', async (appt: Appointment) => {
  await runTransaction(db, async (tx) => {
    const slotRef = doc(db, 'availability', appt.slotId)
    const slot = await tx.get(slotRef)
    if (slot.exists()) tx.update(slotRef, { booked: false, bookedBy: null })
    tx.update(doc(db, 'appointments', appt.id), { status: 'cancelled' })
  })
  notifyBooking(appt.id, 'cancelled')
  return { ...appt, status: 'cancelled' as const }
})

export const updateAppointment = createAsyncThunk(
  'appointments/update',
  async (a: Partial<Appointment> & { id: string }) => {
    const { id, ...data } = a
    await updateDoc(doc(db, 'appointments', id), data)
    notifyBooking(id, 'updated')
    return a
  },
)

const slice = createSlice({
  name: 'appointments',
  initialState: { items: [] as Appointment[], loading: false, error: '' },
  reducers: {},
  extraReducers: (b) => {
    const upsert = (s: { items: Appointment[] }, a: Partial<Appointment> & { id: string }) => {
      const i = s.items.findIndex((x) => x.id === a.id)
      if (i >= 0) s.items[i] = { ...s.items[i], ...a }
      else s.items.unshift(a as Appointment)
    }
    b.addCase(fetchAppointments.pending, (s) => { s.loading = true })
      .addCase(fetchAppointments.fulfilled, (s, a) => { s.loading = false; s.items = a.payload })
      .addCase(fetchAppointments.rejected, (s, a) => { s.loading = false; s.error = a.error.message || 'Error' })
      .addCase(bookSlot.fulfilled, (s, a) => upsert(s, a.payload))
      .addCase(rescheduleAppointment.fulfilled, (s, a) => upsert(s, a.payload))
      .addCase(cancelAppointment.fulfilled, (s, a) => upsert(s, a.payload))
      .addCase(updateAppointment.fulfilled, (s, a) => upsert(s, a.payload))
  },
})
export default slice.reducer
