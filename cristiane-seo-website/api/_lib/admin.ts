import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import type { VercelRequest, VercelResponse } from '@vercel/node'

function app() {
  if (getApps().length) return getApps()[0]
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env
  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new HttpError(500, 'Firebase Admin credentials are not configured on the server.')
  }
  return initializeApp({
    credential: cert({ projectId: FIREBASE_PROJECT_ID, clientEmail: FIREBASE_CLIENT_EMAIL, privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') }),
  })
}

export const adminAuth = () => getAuth(app())
export const adminDb = () => getFirestore(app())

export class HttpError extends Error {
  constructor(public status: number, message: string) { super(message) }
}

const managerEmails = () => (process.env.MANAGER_EMAIL || 'cristipiane@gmail.com').split(',').map((e) => e.trim().toLowerCase())

/** Verifies the Firebase ID token from the Authorization header. */
export async function verifyUser(req: VercelRequest) {
  const token = (req.headers.authorization || '').replace(/^Bearer /, '')
  if (!token) throw new HttpError(401, 'Missing auth token.')
  const decoded = await adminAuth().verifyIdToken(token).catch(() => { throw new HttpError(401, 'Invalid auth token.') })
  const profile = (await adminDb().doc(`users/${decoded.uid}`).get()).data()
  if (profile?.blocked) throw new HttpError(403, 'Account blocked.')
  const isManager = (!!decoded.email && decoded.email_verified === true && managerEmails().includes(decoded.email.toLowerCase())) || profile?.role === 'manager'
  return { uid: decoded.uid, email: decoded.email ?? '', isManager }
}

export async function requireManager(req: VercelRequest) {
  const u = await verifyUser(req)
  if (!u.isManager) throw new HttpError(403, 'Manager access required.')
  return u
}

/** Wraps a handler with method check + uniform JSON error responses. */
export const handler = (methods: string[], fn: (req: VercelRequest, res: VercelResponse) => Promise<unknown>) =>
  async (req: VercelRequest, res: VercelResponse) => {
    if (!methods.includes(req.method || '')) return res.status(405).json({ error: 'Method not allowed' })
    try {
      const out = await fn(req, res)
      if (!res.headersSent) res.status(200).json(out ?? { ok: true })
    } catch (e) {
      const status = e instanceof HttpError ? e.status : 500
      console.error(e)
      res.status(status).json({ error: e instanceof Error ? e.message : 'Server error' })
    }
  }
