import type { VercelRequest, VercelResponse } from '@vercel/node'
import { adminDb } from './_lib/admin.js'

/** Dynamic sitemap of published blog posts, served at /blog-sitemap.xml. */
export default async function sitemap(_req: VercelRequest, res: VercelResponse) {
  const site = (process.env.SITE_URL || 'https://profile.professionalwebsite.co').replace(/\/$/, '')
  let urls = ''
  try {
    const snap = await adminDb().collection('posts').where('status', '==', 'published').get()
    urls = snap.docs.map((d) => {
      const p = d.data()
      return `<url><loc>${site}/blog/${encodeURIComponent(p.slug)}</loc><lastmod>${new Date(p.updatedAt || p.publishAt).toISOString()}</lastmod></url>`
    }).join('')
  } catch (e) {
    console.error('sitemap', e)
  }
  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`)
}
