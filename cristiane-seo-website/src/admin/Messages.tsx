import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { errMsg, fmtDateTime } from '@/lib/utils'
import type { Message } from '@/types'

export default function Messages() {
  const [items, setItems] = useState<Message[]>([])
  const [err, setErr] = useState('')
  useEffect(() => {
    getDocs(query(collection(db, 'messages'), orderBy('createdAt', 'desc')))
      .then((s) => setItems(s.docs.map((d) => ({ ...(d.data() as Message), id: d.id }))))
      .catch((e) => setErr(errMsg(e)))
  }, [])

  const toggle = async (m: Message) => {
    await updateDoc(doc(db, 'messages', m.id), { read: !m.read })
    setItems((xs) => xs.map((x) => (x.id === m.id ? { ...x, read: !x.read } : x)))
  }
  const remove = async (m: Message) => {
    if (!window.confirm('Delete this message?')) return
    await deleteDoc(doc(db, 'messages', m.id))
    setItems((xs) => xs.filter((x) => x.id !== m.id))
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl">Messages</h1>
      {err && <p className="text-sm text-red-600">{err}</p>}
      {items.length === 0 && <p className="text-slate-500">No messages yet.</p>}
      {items.map((m) => (
        <article key={m.id} className={`card ${m.read ? '' : 'border-primary'}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold">{m.name} <a href={`mailto:${m.email}`} className="ml-1 text-sm font-normal text-primary">{m.email}</a>
              {m.uid && <span className="badge ml-2 bg-accent-soft text-primary-dark">client</span>}</p>
            <span className="text-xs text-slate-500">{fmtDateTime(m.createdAt)}</span>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-slate-700">{m.message}</p>
          <div className="mt-4 flex gap-2">
            <a className="btn-primary btn-sm" href={`mailto:${m.email}?subject=Re: your message`}>Reply by email</a>
            <button className="btn-outline btn-sm" onClick={() => toggle(m)}>Mark as {m.read ? 'unread' : 'read'}</button>
            <button className="btn-danger btn-sm" onClick={() => remove(m)}>Delete</button>
          </div>
        </article>
      ))}
    </div>
  )
}
