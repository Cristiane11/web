import { auth } from './firebase'

/** Calls a Vercel serverless function with the current user's Firebase ID token. */
export async function callApi<T = unknown>(path: string, body: unknown): Promise<T> {
  const token = await auth?.currentUser?.getIdToken()
  const res = await fetch(`/api/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error((data as { error?: string }).error || `Request failed (${res.status})`)
  return data as T
}

/** Fire-and-forget booking notification; never blocks the UI. */
export const notifyBooking = (appointmentId: string, action: 'booked' | 'updated' | 'cancelled') =>
  callApi('notify-booking', { appointmentId, action }).catch((e) => console.warn('notify-booking failed', e))
