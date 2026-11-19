import { useEffect, useState } from 'react'
import SlotCalendar from '@/components/SlotCalendar'
import { errMsg, fmtDateTime, fromLocalInput, toLocalInput } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/store'
import { createSlot, fetchSlots, removeSlot, updateSlot } from '@/store/availabilitySlice'
import { cancelAppointment, fetchAppointments, updateAppointment } from '@/store/appointmentsSlice'

export default function CalendarManager() {
  const dispatch = useAppDispatch()
  const slots = useAppSelector((s) => s.availability.items)
  const appts = useAppSelector((s) => s.appointments.items)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [duration, setDuration] = useState(30)
  const [form, setForm] = useState({ start: toLocalInput(Date.now() + 86400000), repeat: 1 })
  const [err, setErr] = useState('')

  useEffect(() => { dispatch(fetchSlots({})); dispatch(fetchAppointments()) }, [dispatch])

  const apptBySlot = new Map(appts.filter((a) => a.status === 'booked').map((a) => [a.slotId, a]))
  const events = slots.map((s) => {
    const a = apptBySlot.get(s.id)
    return { id: s.id, start: s.start, end: s.end, title: a ? `Booked: ${a.clientName}` : 'Open', color: a ? '#4b514a' : '#b2d4b6', textColor: a ? '#ffffff' : '#4b514a', editable: !a }
  })
  const sel = slots.find((s) => s.id === selectedId)
  const selAppt = sel ? apptBySlot.get(sel.id) : undefined

  const run = async (p: Promise<unknown>) => { setErr(''); try { await p } catch (e) { setErr(errMsg(e)) } }

  async function addSlots() {
    const start = fromLocalInput(form.start)
    for (let i = 0; i < form.repeat; i++) {
      const s = start + i * duration * 60000
      await run(dispatch(createSlot({ start: s, end: s + duration * 60000 })).unwrap())
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Calendar & availability</h1>
      <div className="card flex flex-wrap items-end gap-4">
        <div><label className="label">Start</label><input type="datetime-local" className="input" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} /></div>
        <div><label className="label">Slot length</label>
          <select className="input" value={duration} onChange={(e) => setDuration(+e.target.value)}>{[15, 30, 45, 60, 90].map((m) => <option key={m} value={m}>{m} min</option>)}</select></div>
        <div><label className="label">Consecutive slots</label><input type="number" min={1} max={16} className="input w-24" value={form.repeat} onChange={(e) => setForm({ ...form, repeat: Math.max(1, +e.target.value) })} /></div>
        <button className="btn-primary" onClick={addSlots}>Add availability</button>
        <p className="w-full text-xs text-slate-500">Tip: you can also drag on the calendar to create a slot, and drag/resize open slots to move them.</p>
      </div>
      {err && <p className="text-sm text-red-600">{err}</p>}
      <div className="card">
        <SlotCalendar events={events} editable
          onSelect={(s, e) => run(dispatch(createSlot({ start: s.getTime(), end: e.getTime() })).unwrap())}
          onEventClick={setSelectedId}
          onMove={(id, s, e) => run(dispatch(updateSlot({ id, start: s.getTime(), end: e.getTime() })).unwrap())} />
      </div>
      {sel && (
        <div className="card space-y-3">
          <h2 className="text-xl">{fmtDateTime(sel.start)} – {new Date(sel.end).toLocaleTimeString('en-US', { timeStyle: 'short' })}</h2>
          {selAppt ? (
            <>
              <p className="text-sm"><b>{selAppt.clientName}</b> · {selAppt.email} · {selAppt.businessType || '—'}</p>
              <p className="text-sm text-slate-600">Notes: {selAppt.notes || '—'}</p>
              <div className="flex gap-2">
                <button className="btn-outline btn-sm" onClick={() => run(dispatch(updateAppointment({ id: selAppt.id, status: 'completed' })).unwrap())}>Mark completed</button>
                <button className="btn-ghost btn-sm" onClick={() => { const n = prompt('Notes', selAppt.notes); if (n !== null) run(dispatch(updateAppointment({ id: selAppt.id, notes: n })).unwrap()) }}>Edit notes</button>
                <button className="btn-danger btn-sm" onClick={() => window.confirm('Cancel this booking? The slot will reopen.') && run(dispatch(cancelAppointment(selAppt)).unwrap().then(() => dispatch(fetchSlots({}))))}>Cancel booking</button>
              </div>
            </>
          ) : (
            <div className="flex gap-2">
              <button className="btn-danger btn-sm" onClick={() => run(dispatch(removeSlot(sel.id)).unwrap().then(() => setSelectedId(null)))}>Delete slot</button>
              <button className="btn-ghost btn-sm" onClick={() => setSelectedId(null)}>Close</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
