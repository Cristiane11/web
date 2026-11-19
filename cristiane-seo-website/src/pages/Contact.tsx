import { useState, type FormEvent } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import Seo, { businessLd } from '@/components/Seo'
import { BookButton } from '@/components/Layout'
import { db, firebaseReady } from '@/lib/firebase'
import { PHONE } from '@/lib/config'
import { errMsg } from '@/lib/utils'
import { useSettings } from '@/lib/useSettings'
import { useAppSelector } from '@/store'

export default function Contact() {
  const s = useSettings()
  const user = useAppSelector((st) => st.auth.user)
  const [form, setForm] = useState({ name: '', email: user?.email ?? '', message: '' })
  const [status, setStatus] = useState<{ ok?: string; err?: string; busy?: boolean }>({})

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!firebaseReady) return setStatus({ err: `The form is not connected yet — please call ${PHONE}.` })
    setStatus({ busy: true })
    try {
      await addDoc(collection(db, 'messages'), { ...form, uid: user?.uid ?? null, read: false, createdAt: Date.now() })
      setForm({ name: '', email: '', message: '' })
      setStatus({ ok: 'Thank you! Your message was sent. I will get back to you soon.' })
    } catch (err) {
      setStatus({ err: errMsg(err) })
    }
  }

  return (
    <div className="container-page py-14">
      <Seo title={s.meta.contact.title} description={s.meta.contact.description} path="/contact" jsonLd={businessLd} />
      <h1 className="text-4xl">Contact me</h1>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <form onSubmit={submit} className="card space-y-4">
          <div><label className="label" htmlFor="name">Name</label>
            <input id="name" required className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><label className="label" htmlFor="email">Email</label>
            <input id="email" type="email" required className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div><label className="label" htmlFor="message">Message</label>
            <textarea id="message" required rows={6} maxLength={3000} className="input" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
          {status.ok && <p className="text-sm text-brand-darkest font-medium">{status.ok}</p>}
          {status.err && <p className="text-sm text-red-600">{status.err}</p>}
          <button className="btn-primary" disabled={status.busy}>{status.busy ? 'Sending…' : 'Send message'}</button>
        </form>
        <div className="space-y-6">
          <div className="card bg-accent-soft">
            <h2 className="text-2xl">Book time with me</h2>
            <p className="mt-2 text-slate-700">Pick a time that works for you for a Local SEO project meeting.</p>
            <div className="mt-4"><BookButton className="btn-primary" /></div>
          </div>
          <div className="card">
            <h2 className="text-xl">Getting in touch</h2>
            <a href={`tel:${PHONE}`} className="mt-2 block text-lg font-semibold text-primary">{PHONE}</a>
            <p className="mt-2 text-sm text-slate-600">Clients with an account can also book directly from <a className="text-primary underline" href="/account">My account</a>.</p>
          </div>
          <img src="/images/crisbg.webp" alt="Cristiane Abreu" loading="lazy" className="mx-auto w-56 rounded-full" />
        </div>
      </div>
    </div>
  )
}
