import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * GET /api/instagram — latest posts from Cristiane's Instagram Professional account (Instagram Graph API).
 * Env: INSTAGRAM_ACCESS_TOKEN (long-lived token, ~60 days; refresh with
 *   GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=TOKEN),
 *   optional INSTAGRAM_USER_ID (defaults to "me").
 * Returns { configured, items[] }. The site falls back to local images when items is empty.
 */
export default async function instagram(_req: VercelRequest, res: VercelResponse) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  res.setHeader('Content-Type', 'application/json')
  if (!token) {
    res.setHeader('Cache-Control', 's-maxage=300')
    return res.status(200).json({ configured: false, items: [] })
  }
  const user = process.env.INSTAGRAM_USER_ID || 'me'
  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'
  try {
    const r = await fetch(`https://graph.instagram.com/${encodeURIComponent(user)}/media?fields=${fields}&limit=12&access_token=${encodeURIComponent(token)}`)
    if (!r.ok) throw new Error(`Instagram API ${r.status}`)
    const data = (await r.json()) as { data?: Array<Record<string, string>> }
    const items = (data.data ?? []).map((m) => ({
      id: m.id,
      caption: (m.caption || '').slice(0, 200),
      image: m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url,
      permalink: m.permalink,
      timestamp: m.timestamp,
    })).filter((m) => m.image).slice(0, 6)
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    return res.status(200).json({ configured: true, items })
  } catch (e) {
    console.error('instagram', e)
    res.setHeader('Cache-Control', 's-maxage=300')
    return res.status(200).json({ configured: true, items: [], error: 'Instagram feed unavailable' })
  }
}
