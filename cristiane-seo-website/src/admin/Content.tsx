import { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { clearSettingsCache, useSettings } from '@/lib/useSettings'
import { errMsg } from '@/lib/utils'
import type { SiteSettings } from '@/types'

const textFields: [keyof Omit<SiteSettings, 'meta'>, string, number][] = [
  ['heroTitle', 'Home — hero title', 1], ['heroSubtitle', 'Home — hero subtitle', 4],
  ['aboutIntro', 'About — intro', 3], ['aboutBody', 'About — main text', 6],
]

export default function Content() {
  const loaded = useSettings()
  const [s, setS] = useState<SiteSettings | null>(null)
  const [msg, setMsg] = useState('')
  const cur = s ?? loaded

  async function save() {
    try {
      await setDoc(doc(db, 'settings', 'site'), cur)
      clearSettingsCache()
      setMsg('Saved! Changes are live.')
    } catch (e) { setMsg(errMsg(e)) }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Site content & SEO</h1>
      <div className="card space-y-4">
        <h2 className="text-xl">Page text</h2>
        {textFields.map(([k, label, rows]) => (
          <div key={k}><label className="label">{label}</label>
            <textarea className="input" rows={rows} value={cur[k]} onChange={(e) => setS({ ...cur, [k]: e.target.value })} /></div>
        ))}
      </div>
      <div className="card space-y-2">
        <h2 className="text-xl">Instagram</h2>
        <label className="label" htmlFor="ig">Instagram username (without @)</label>
        <input id="ig" className="input" placeholder="your_instagram_handle" value={cur.instagramHandle ?? ''}
          onChange={(e) => setS({ ...cur, instagramHandle: e.target.value.replace(/^@/, '').trim() })} />
        <p className="text-xs text-brand-darkest/80">Used for the “Follow along on Instagram” link and footer icon. Recent posts appear automatically once INSTAGRAM_ACCESS_TOKEN is set in Vercel (see README).</p>
      </div>
      <div className="card space-y-5">
        <h2 className="text-xl">SEO meta per page</h2>
        <p className="text-sm text-slate-500">Titles ideally under 60 characters, descriptions 120–160 characters.</p>
        {Object.entries(cur.meta).map(([page, m]) => (
          <div key={page} className="grid gap-2 border-t pt-4">
            <p className="font-semibold capitalize text-primary">{page}</p>
            <input className="input" value={m.title} onChange={(e) => setS({ ...cur, meta: { ...cur.meta, [page]: { ...m, title: e.target.value } } })} />
            <span className="text-xs text-slate-400">{m.title.length} characters</span>
            <textarea className="input" rows={2} value={m.description} onChange={(e) => setS({ ...cur, meta: { ...cur.meta, [page]: { ...m, description: e.target.value } } })} />
            <span className="text-xs text-slate-400">{m.description.length} characters</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3"><button className="btn-primary" onClick={save}>Save changes</button>{msg && <span className="text-sm">{msg}</span>}</div>
    </div>
  )
}
