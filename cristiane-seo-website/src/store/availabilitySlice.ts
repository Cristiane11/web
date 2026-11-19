import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Slot } from '@/types'

export const fetchSlots = createAsyncThunk('availability/fetch', async (opts: { upcomingOnly?: boolean } = {}) => {
  const base = collection(db, 'availability')
  const q = opts.upcomingOnly
    ? query(base, where('start', '>=', Date.now()), orderBy('start'))
    : query(base, orderBy('start'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ ...(d.data() as Slot), id: d.id }))
})

export const createSlot = createAsyncThunk('availability/create', async (s: { start: number; end: number }) => {
  const data = { ...s, booked: false, bookedBy: null }
  const ref = await addDoc(collection(db, 'availability'), data)
  return { ...data, id: ref.id } as Slot
})

export const updateSlot = createAsyncThunk('availability/update', async (s: Partial<Slot> & { id: string }) => {
  const { id, ...data } = s
  await updateDoc(doc(db, 'availability', id), data)
  return s
})

export const removeSlot = createAsyncThunk('availability/remove', async (id: string) => {
  await deleteDoc(doc(db, 'availability', id))
  return id
})

const slice = createSlice({
  name: 'availability',
  initialState: { items: [] as Slot[], loading: false, error: '' },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(fetchSlots.pending, (s) => { s.loading = true })
      .addCase(fetchSlots.fulfilled, (s, a) => { s.loading = false; s.items = a.payload })
      .addCase(fetchSlots.rejected, (s, a) => { s.loading = false; s.error = a.error.message || 'Error' })
      .addCase(createSlot.fulfilled, (s, a) => { s.items.push(a.payload) })
      .addCase(updateSlot.fulfilled, (s, a) => {
        const i = s.items.findIndex((x) => x.id === a.payload.id)
        if (i >= 0) s.items[i] = { ...s.items[i], ...a.payload }
      })
      .addCase(removeSlot.fulfilled, (s, a) => { s.items = s.items.filter((x) => x.id !== a.payload) }),
})
export default slice.reducer
