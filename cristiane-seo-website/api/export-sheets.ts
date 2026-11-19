import { JWT } from 'google-auth-library'
import { adminDb, handler, HttpError, requireManager } from './_lib/admin.js'

const fmt = (ms: number) => new Date(ms).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/New_York' })

/** Writes all bookings to the "Bookings" tab of GOOGLE_SHEET_ID (overwriting it). */
export default handler(['POST'], async (req) => {
  await requireManager(req)
  const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID } = process.env
  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) throw new HttpError(501, 'Google Sheets is not configured')

  const snap = await adminDb().collection('appointments').orderBy('start', 'desc').get()
  const values = [['Client name', 'Booking time (ET)', 'Type of business', 'Email', 'Status', 'Notes'],
    ...snap.docs.map((d) => { const a = d.data(); return [a.clientName, fmt(a.start), a.businessType || '', a.email, a.status, a.notes || ''] })]

  const jwt = new JWT({ email: GOOGLE_SERVICE_ACCOUNT_EMAIL, key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), scopes: ['https://www.googleapis.com/auth/spreadsheets'] })
  const { token } = await jwt.getAccessToken()
  const base = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}`
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

  // Make sure the "Bookings" tab exists (ignore "already exists" errors).
  await fetch(`${base}:batchUpdate`, { method: 'POST', headers, body: JSON.stringify({ requests: [{ addSheet: { properties: { title: 'Bookings' } } }] }) })
  await fetch(`${base}/values/Bookings!A:Z:clear`, { method: 'POST', headers })
  const r = await fetch(`${base}/values/Bookings!A1?valueInputOption=USER_ENTERED`, { method: 'PUT', headers, body: JSON.stringify({ values }) })
  if (!r.ok) throw new HttpError(502, `Sheets API error: ${await r.text()}`)
  return { rows: values.length - 1, url: `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}` }
})
