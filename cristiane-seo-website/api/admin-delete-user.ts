import { adminAuth, adminDb, handler, HttpError, requireManager } from './_lib/admin.js'

export default handler(['POST'], async (req) => {
  const me = await requireManager(req)
  const { uid } = (req.body || {}) as { uid?: string }
  if (!uid) throw new HttpError(400, 'Missing uid.')
  if (uid === me.uid) throw new HttpError(400, 'You cannot delete your own account.')
  await adminAuth().deleteUser(uid).catch((e: { code?: string }) => { if (e.code !== 'auth/user-not-found') throw e })
  await adminDb().doc(`users/${uid}`).delete()
  return { ok: true }
})
