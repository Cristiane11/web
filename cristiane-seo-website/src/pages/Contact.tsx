import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
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
  const [params] = useSearchParams()
  const [form, setForm] = useState({ name: params.get('name') ?? '', email: params.get('email') || user?.email || '', message: '' })
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
    <>
      <Seo title={s.meta.contact.title} description={s.meta.contact.description} path="/contact" jsonLd={businessLd} />
      <PageHeader kicker="Let's work together" title="Contact me">
        <p>Questions about Local SEO, Google Business Profile or your website? Send a message or book a time.</p>
      </PageHeader>
      <div className="container-page grid gap-12 py-20 md:grid-cols-[1.2fr_1fr]">
        <form onSubmit={submit} className="space-y-5 border border-brand-light p-6 sm:p-10">
          <h2 className="font-serif text-3xl font-light">Send a message</h2>
          <div><label className="label" htmlFor="name">Name</label>
            <input id="name" required className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><label className="label" htmlFor="email">Email</label>
            <input id="email" type="email" required className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div><label className="label" htmlFor="message">Message</label>
            <textarea id="message" required rows={6} maxLength={3000} className="input" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
          {status.ok && <p className="text-sm text-brand-darkest font-medium">{status.ok}</p>}
          {status.err && <p className="text-sm text-red-600">{status.err}</p>}
          <button className="btn-primary w-full sm:w-auto" disabled={status.busy}>{status.busy ? 'Sending…' : 'Send message'}</button>
        </form>
        <div className="space-y-6">
          <div className="bg-brand-lightest p-8 text-center">
            <p className="kicker">Free consultation</p>
            <h2 className="mt-3 font-serif text-3xl font-light">Book time with me</h2>
            <p className="mt-3">Pick a time that works for you for a Local SEO project meeting.</p>
            <div className="mt-6"><BookButton className="btn-primary" /></div>
          </div>
          <div className="border border-brand-light p-8 text-center">
            <p className="kicker">Getting in touch</p>
            <a href={`tel:${PHONE}`} className="link mt-3 inline-block font-serif text-2xl font-light">{PHONE}</a>
            <p className="mt-3 text-[15px]">Clients with an account can also book directly from <a className="link" href="/account">My account</a>.</p>
          </div>
          <div className="frame mx-auto w-56 rotate-2"><img src="/images/crisbg.webp" alt="Cristiane Abreu" loading="lazy" className="aspect-square w-full object-cover" /></div>
        </div>
      </div>
    </>
  )
}
