import { useEffect, useMemo, useState } from 'react'
import { callApi } from '@/lib/api'
import { downloadCsv, errMsg, fmtDateTime } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/store'
import { cancelAppointment, fetchAppointments, updateAppointment } from '@/store/appointmentsSlice'
import type { AppointmentStatus } from '@/types'

export default function Bookings() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((s) => s.appointments.items)
  const [status, setStatus] = useState<'all' | AppointmentStatus>('all')
  const [q, setQ] = useState('')
  const [msg, setMsg] = useState('')
  useEffect(() => { dispatch(fetchAppointments()) }, [dispatch])

  const rows = useMemo(() => items
    .filter((a) => status === 'all' || a.status === status)
    .filter((a) => !q || `${a.clientName} ${a.email}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => b.start - a.start), [items, status, q])

  const csvRows = () => [['Client name', 'Booking time', 'Type of business', 'Email', 'Status', 'Notes'],
    ...rows.map((a) => [a.clientName, fmtDateTime(a.start), a.businessType, a.email, a.status, a.notes])]

  async function exportSheets() {
    setMsg('Exporting…')
    try {
      const r = await callApi<{ rows: number; url: string }>('export-sheets', {})
      setMsg(`Exported ${r.rows} bookings to Google Sheets.`)
      window.open(r.url, '_blank', 'noopener')
    } catch (e) {
      setMsg(`Google Sheets export unavailable (${errMsg(e)}). A CSV was downloaded instead — open it with Google Sheets → File → Import.`)
      downloadCsv(`bookings-${new Date().toISOString().slice(0, 10)}.csv`, csvRows())
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl">Bookings</h1>
      <div className="flex flex-wrap items-center gap-3">
        <input className="input max-w-xs" placeholder="Search client or email…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="input w-40" value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
          <option value="all">All statuses</option><option value="booked">Booked</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
        </select>
        <button className="btn-outline" onClick={() => downloadCsv(`bookings-${new Date().toISOString().slice(0, 10)}.csv`, csvRows())}>Download CSV (open in Google Sheets)</button>
        <button className="btn-primary" onClick={exportSheets}>Export to Google Sheet</button>
      </div>
      {msg && <p className="text-sm text-slate-600">{msg}</p>}
      <div className="overflow-x-auto rounded-2xl border border-brand-light bg-white">
        <table className="table-base">
          <thead><tr><th>Client name</th><th>Booking time</th><th>Type of business</th><th>Email</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((a) => (
              <tr key={a.id}>
                <td className="font-medium">{a.clientName}</td><td className="whitespace-nowrap">{fmtDateTime(a.start)}</td>
                <td>{a.businessType || '—'}</td><td>{a.email}</td>
                <td><span className={`badge ${a.status === 'booked' ? 'bg-brand-light text-brand-darkest' : a.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-slate-100'}`}>{a.status}</span></td>
                <td className="whitespace-nowrap">
                  {a.status === 'booked' && <>
                    <button className="btn-ghost btn-sm" onClick={() => dispatch(updateAppointment({ id: a.id, status: 'completed' }))}>Complete</button>
                    <button className="btn-danger btn-sm ml-1" onClick={() => window.confirm('Cancel this booking?') && dispatch(cancelAppointment(a))}>Cancel</button>
                  </>}
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={6} className="py-6 text-center text-slate-500">No bookings.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
