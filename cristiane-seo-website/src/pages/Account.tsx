import { useEffect, useState, type FormEvent } from 'react'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { reload, sendEmailVerification } from 'firebase/auth'
import Seo from '@/components/Seo'
import SlotCalendar from '@/components/SlotCalendar'
import { auth, db } from '@/lib/firebase'
import { businessTypes } from '@/data/content'
import { errMsg, fmtDateTime } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/store'
import { setProfile, setSession } from '@/store/authSlice'
import { fetchSlots } from '@/store/availabilitySlice'
import { bookSlot, cancelAppointment, fetchAppointments, rescheduleAppointment, updateAppointment } from '@/store/appointmentsSlice'
import type { Appointment, Slot, UserProfile } from '@/types'

type ProfileFields = Pick<UserProfile, 'firstName' | 'lastName' | 'phone' | 'contactEmail' | 'businessName' | 'businessType' | 'businessLocation'>
const fieldLabels: [keyof ProfileFields, string][] = [
  ['firstName', 'First name'], ['lastName', 'Last name'], ['phone', 'Phone'], ['contactEmail', 'Contact email'],
  ['businessName', 'Business name'], ['businessType', 'Type of business'], ['businessLocation', 'Business location (city, state)'],
]

function ProfileForm({ profile }: { profile: UserProfile }) {
  const dispatch = useAppDispatch()
  const [f, setF] = useState<ProfileFields>(() => {
    const { firstName, lastName, phone, contactEmail, businessName, businessType, businessLocation } = profile
    return { firstName, lastName, phone, contactEmail, businessName, businessType, businessLocation }
  })
  const [msg, setMsg] = useState('')
  async function save(e: FormEvent) {
    e.preventDefault()
    try {
      await updateDoc(doc(db, 'users', profile.uid), { ...f })
      dispatch(setProfile({ ...profile, ...f }))
      setMsg('Profile saved.')
    } catch (err) { setMsg(errMsg(err)) }
  }
  return (
    <form onSubmit={save} className="card grid gap-4 sm:grid-cols-2">
      <h2 className="text-xl sm:col-span-2">My profile</h2>
      {fieldLabels.map(([k, label]) => (
        <div key={k}>
          <label className="label" htmlFor={k}>{label}</label>
          {k === 'businessType' ? (
            <select id={k} className="input" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })}>
              <option value="">Select…</option>
              {businessTypes.map((b) => <option key={b}>{b}</option>)}
            </select>
          ) : (
            <input id={k} className="input" type={k === 'contactEmail' ? 'email' : k === 'phone' ? 'tel' : 'text'}
              required={k === 'firstName' || k === 'lastName'} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} />
          )}
        </div>
      ))}
      <div className="flex items-center gap-3 sm:col-span-2">
        <button className="btn-primary">Save profile</button>
        {msg && <span className="text-sm text-slate-600">{msg}</span>}
      </div>
    </form>
  )
}

function MessageForm({ profile }: { profile: UserProfile }) {
  const [text, setText] = useState('')
  const [msg, setMsg] = useState('')
  return (
    <form className="card space-y-3" onSubmit={async (e) => {
      e.preventDefault()
      try {
        await addDoc(collection(db, 'messages'), {
          name: `${profile.firstName} ${profile.lastName}`.trim() || profile.email, email: profile.contactEmail || profile.email,
          message: text, uid: profile.uid, read: false, createdAt: Date.now(),
        })
        setText(''); setMsg('Message sent to Cristiane.')
      } catch (err) { setMsg(errMsg(err)) }
    }}>
      <h2 className="text-xl">Send a message</h2>
      <textarea required rows={4} maxLength={3000} className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="How can I help you?" />
      <div className="flex items-center gap-3"><button className="btn-primary">Send</button>{msg && <span className="text-sm text-slate-600">{msg}</span>}</div>
    </form>
  )
}

export default function Account() {
  const dispatch = useAppDispatch()
  const { user, profile, isManager } = useAppSelector((s) => s.auth)
  const slots = useAppSelector((s) => s.availability.items)
  const appts = useAppSelector((s) => s.appointments.items)
  const [selected, setSelected] = useState<Slot | null>(null)
  const [moving, setMoving] = useState<Appointment | null>(null)
  const [notes, setNotes] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!user) return
    dispatch(fetchSlots({ upcomingOnly: true }))
    dispatch(fetchAppointments(user.uid))
  }, [dispatch, user])

  if (!user || !profile) return <div className="container-page py-20 text-slate-500">Loading your account…</div>

  const open = slots.filter((s) => !s.booked && s.start > Date.now())
  const events = open.map((s) => ({ id: s.id, title: 'Available', start: s.start, end: s.end, color: '#16a34a' }))
  const profileComplete = profile.firstName && profile.lastName

  async function confirm() {
    if (!selected || !user || !profile) return
    setMsg('')
    try {
      if (moving) {
        await dispatch(rescheduleAppointment({ appt: moving, slot: selected })).unwrap()
        setMsg('Appointment rescheduled.')
      } else {
        await dispatch(bookSlot({
          slot: selected, uid: user.uid, clientName: `${profile.firstName} ${profile.lastName}`.trim(),
          email: profile.contactEmail || user.email, businessType: profile.businessType, notes,
        })).unwrap()
        setMsg('Booked! You will see it in “My appointments”.')
      }
      setSelected(null); setMoving(null); setNotes('')
      dispatch(fetchSlots({ upcomingOnly: true }))
    } catch (e) { setMsg(errMsg(e)) }
  }

  async function checkVerified() {
    await reload(auth.currentUser!)
    const u = auth.currentUser!
    dispatch(setSession({ user: { ...user!, emailVerified: u.emailVerified }, profile, isManager }))
  }

  return (
    <div className="container-page space-y-8 py-12">
      <Seo title="My account | Cristiane Abreu" description="Client area" noindex />
      <h1 className="text-3xl">Welcome{profile.firstName ? `, ${profile.firstName}` : ''}!</h1>

      {!user.emailVerified && (
        <div className="rounded-xl bg-yellow-50 p-4 text-sm text-yellow-900">
          Please verify your email to book appointments. Check your inbox.
          <button className="ml-3 underline" onClick={() => auth.currentUser && sendEmailVerification(auth.currentUser).then(() => setMsg('Verification email sent.'))}>Resend email</button>
          <button className="ml-3 underline" onClick={checkVerified}>I verified — refresh</button>
        </div>
      )}
      {msg && <p className="rounded-lg bg-accent-soft p-3 text-sm text-primary-dark">{msg}</p>}

      <ProfileForm profile={profile} />

      <section className="card">
        <h2 className="text-xl">{moving ? `Reschedule: pick a new time (currently ${fmtDateTime(moving.start)})` : 'Book an appointment'}</h2>
        <p className="mb-4 mt-1 text-sm text-slate-600">Click a green “Available” slot to book it.{!profileComplete && ' Please complete your first and last name first.'}</p>
        <SlotCalendar events={events} onEventClick={(id) => setSelected(open.find((s) => s.id === id) ?? null)} />
        {open.length === 0 && <p className="mt-3 text-sm text-slate-500">No open slots right now — please check back soon or send a message.</p>}
        {selected && (
          <div className="mt-4 rounded-xl border border-primary bg-accent-soft p-4">
            <p className="font-semibold">Selected: {fmtDateTime(selected.start)} – {new Date(selected.end).toLocaleTimeString('en-US', { timeStyle: 'short' })}</p>
            {!moving && <textarea className="input mt-3" rows={2} placeholder="What would you like to discuss? (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />}
            <div className="mt-3 flex gap-2">
              <button className="btn-primary" disabled={!user.emailVerified || !profileComplete} onClick={confirm}>{moving ? 'Confirm new time' : 'Confirm booking'}</button>
              <button className="btn-ghost" onClick={() => { setSelected(null); setMoving(null) }}>Cancel</button>
            </div>
          </div>
        )}
      </section>

      <section className="card">
        <h2 className="mb-4 text-xl">My appointments</h2>
        {appts.length === 0 ? <p className="text-sm text-slate-500">No appointments yet.</p> : (
          <ul className="divide-y">
            {appts.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-medium">{fmtDateTime(a.start)}</p>
                  <p className="text-xs text-slate-500">{a.notes || 'No notes'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge ${a.status === 'booked' ? 'bg-green-100 text-green-800' : a.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-slate-100'}`}>{a.status}</span>
                  {a.status === 'booked' && a.start > Date.now() && (
                    <>
                      <button className="btn-ghost btn-sm" onClick={() => {
                        const n = prompt('Update notes for this meeting', a.notes)
                        if (n !== null) dispatch(updateAppointment({ id: a.id, notes: n }))
                      }}>Edit</button>
                      <button className="btn-outline btn-sm" onClick={() => { setMoving(a); setSelected(null); window.scrollTo({ top: 600, behavior: 'smooth' }) }}>Reschedule</button>
                      <button className="btn-danger btn-sm" onClick={() => confirm_(a)}>Cancel</button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <MessageForm profile={profile} />
    </div>
  )

  async function confirm_(a: Appointment) {
    if (!window.confirm('Cancel this appointment?')) return
    try { await dispatch(cancelAppointment(a)).unwrap(); dispatch(fetchSlots({ upcomingOnly: true })) } catch (e) { setMsg(errMsg(e)) }
  }
}
