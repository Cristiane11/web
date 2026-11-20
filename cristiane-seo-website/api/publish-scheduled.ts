import { adminDb, handler, HttpError } from './_lib/admin.js'

/** Vercel Cron (see vercel.json): flips due "scheduled" posts to "published". */
export default handler(['GET', 'POST'], async (req) => {
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) throw new HttpError(401, 'Unauthorized')
  const db = adminDb()
  const due = await db.collection('posts').where('status', '==', 'scheduled').where('publishAt', '<=', Date.now()).get()
  const batch = db.batch()
  due.docs.forEach((d) => batch.update(d.ref, { status: 'published', updatedAt: Date.now() }))
  await batch.commit()
  return { published: due.size }
})
