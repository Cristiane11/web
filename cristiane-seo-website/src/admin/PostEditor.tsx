import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import RichEditor from '@/components/RichEditor'
import ShareButtons from '@/components/ShareButtons'
import { db } from '@/lib/firebase'
import { SITE_URL } from '@/lib/config'
import { uploadImage } from '@/lib/upload'
import { errMsg, fromLocalInput, slugify, toLocalInput } from '@/lib/utils'
import { useAppDispatch } from '@/store'
import { savePost } from '@/store/postsSlice'
import type { Post, PostStatus } from '@/types'

const empty = (): Omit<Post, 'id'> => ({
  title: '', slug: '', excerpt: '', content: '', coverImage: '', tags: [], seoTitle: '', seoDescription: '',
  status: 'draft', publishAt: Date.now(), createdAt: Date.now(), updatedAt: Date.now(),
})

export default function PostEditor() {
  const { id } = useParams()
  const isNew = !id || id === 'new'
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [post, setPost] = useState<Omit<Post, 'id'> | null>(isNew ? empty() : null)
  const [slugTouched, setSlugTouched] = useState(!isNew)
  const [tagText, setTagText] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (isNew) return
    getDoc(doc(db, 'posts', id!)).then((s) => {
      const p = { ...empty(), ...(s.data() as Post) }
      setPost(p); setTagText(p.tags.join(', '))
    }).catch((e) => setMsg(errMsg(e)))
  }, [id, isNew])

  if (!post) return <p className="text-slate-500">{msg || 'Loading…'}</p>
  const set = (patch: Partial<Post>) => setPost({ ...post, ...patch })

  async function save(status: PostStatus) {
    if (!post) return
    if (!post.title.trim()) return setMsg('Please add a title.')
    if (status === 'scheduled' && post.publishAt <= Date.now()) return setMsg('Pick a future date/time to schedule, or publish now.')
    setBusy(true); setMsg('')
    try {
      const data = {
        ...post, status, slug: post.slug || slugify(post.title),
        tags: tagText.split(',').map((t) => t.trim()).filter(Boolean),
        publishAt: status === 'published' && post.status !== 'published' ? Date.now() : post.publishAt,
      }
      const saved = await dispatch(savePost(isNew ? data : { ...data, id })).unwrap()
      setMsg(status === 'published' ? 'Published!' : status === 'scheduled' ? 'Scheduled.' : 'Draft saved.')
      setPost({ ...data })
      if (isNew) navigate(`/admin/posts/${saved.id}`, { replace: true })
    } catch (e) { setMsg(errMsg(e)) } finally { setBusy(false) }
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl">{isNew ? 'New post' : 'Edit post'}</h1>
      <div className="card space-y-4">
        <div><label className="label">Title</label>
          <input className="input text-lg" value={post.title} onChange={(e) => set({ title: e.target.value, ...(slugTouched ? {} : { slug: slugify(e.target.value) }) })} /></div>
        <div><label className="label">URL slug</label>
          <div className="flex items-center gap-1 text-sm text-slate-500">/blog/<input className="input" value={post.slug} onChange={(e) => { setSlugTouched(true); set({ slug: slugify(e.target.value) }) }} /></div></div>
        <div><label className="label">Excerpt (shown in lists)</label>
          <textarea className="input" rows={2} value={post.excerpt} onChange={(e) => set({ excerpt: e.target.value })} /></div>
        <div><label className="label">Cover image</label>
          <div className="flex flex-wrap items-center gap-3">
            {post.coverImage && <img src={post.coverImage} alt="" className="h-20 w-32 rounded object-cover" />}
            <input type="file" accept="image/*" onChange={async (e) => {
              const f = e.target.files?.[0]; if (!f) return
              try { setMsg('Uploading…'); set({ coverImage: await uploadImage(f, 'posts/covers') }); setMsg('') } catch (err) { setMsg(errMsg(err)) }
            }} />
            {post.coverImage && <button className="btn-ghost btn-sm" onClick={() => set({ coverImage: '' })}>Remove</button>}
          </div></div>
        <div><label className="label">Content</label><RichEditor value={post.content} onChange={(content) => set({ content })} /></div>
        <div><label className="label">Tags (comma separated)</label><input className="input" value={tagText} onChange={(e) => setTagText(e.target.value)} placeholder="local seo, google business profile" /></div>
      </div>
      <div className="card space-y-3">
        <h2 className="text-lg">SEO</h2>
        <div><label className="label">SEO title ({post.seoTitle.length}/60)</label><input className="input" value={post.seoTitle} onChange={(e) => set({ seoTitle: e.target.value })} placeholder={post.title} /></div>
        <div><label className="label">Meta description ({post.seoDescription.length}/160)</label><textarea className="input" rows={2} value={post.seoDescription} onChange={(e) => set({ seoDescription: e.target.value })} placeholder={post.excerpt} /></div>
      </div>
      <div className="card flex flex-wrap items-end gap-3">
        <p className="w-full text-sm">Current status: <b>{post.status}</b></p>
        <button className="btn-outline" disabled={busy} onClick={() => save('draft')}>Save draft</button>
        <div><label className="label">Publish at</label><input type="datetime-local" className="input" value={toLocalInput(post.publishAt)} onChange={(e) => set({ publishAt: fromLocalInput(e.target.value) })} /></div>
        <button className="btn-outline" disabled={busy} onClick={() => save('scheduled')}>Schedule</button>
        <button className="btn-primary" disabled={busy} onClick={() => save('published')}>Publish now</button>
        {msg && <span className="text-sm text-slate-600">{msg}</span>}
      </div>
      {post.status !== 'draft' && post.slug && <ShareButtons url={`${SITE_URL}/blog/${post.slug}`} title={post.title} />}
    </div>
  )
}
