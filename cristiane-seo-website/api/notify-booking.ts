import { adminDb, handler, HttpError, verifyUser } from './_lib/admin.js'
import { esc, sendMail } from './_lib/mail.js'

const fmt = (ms: number) => new Date(ms).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', timeZone: 'America/New_York' }) + ' (ET)'

export default handler(['POST'], async (req) => {
  const user = await verifyUser(req)
  const { appointmentId, action } = (req.body || {}) as { appointmentId?: string; action?: string }
  if (!appointmentId || !['booked', 'updated', 'cancelled'].includes(action || '')) throw new HttpError(400, 'Invalid request.')
  const snap = await adminDb().doc(`appointments/${appointmentId}`).get()
  const a = snap.data()
  if (!a) throw new HttpError(404, 'Appointment not found.')
  if (a.uid !== user.uid && !user.isManager) throw new HttpError(403, 'Not your appointment.')

  const by = user.isManager && a.uid !== user.uid ? ' (by you, as manager)' : ''
  const label = { booked: 'New booking', updated: 'Booking updated', cancelled: 'Booking cancelled' }[action as 'booked']
  const site = process.env.SITE_URL || ''
  await sendMail({
    to: process.env.NOTIFY_EMAIL || 'cristipiane@gmail.com',
    replyTo: a.email,
    subject: `${label}: ${a.clientName} — ${fmt(a.start)}`,
    html: `<div style="font-family:Arial,sans-serif;color:#0f172a">
      <h2 style="color:#166534">${label}${by}</h2>
      <p><b>Client:</b> ${esc(a.clientName)}<br/><b>Email:</b> ${esc(a.email)}<br/><b>Type of business:</b> ${esc(a.businessType || '—')}</p>
      <p><b>When:</b> ${fmt(a.start)}<br/><b>Status:</b> ${esc(a.status)}</p>
      <p><b>Notes:</b> ${esc(a.notes || '—')}</p>
      ${site ? `<p><a href="${site}/admin/bookings" style="color:#166534">Open bookings in the admin dashboard</a></p>` : ''}
    </div>`,
  })
  return { ok: true }
})
