import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '@/components/Seo'
import { useSettings } from '@/lib/useSettings'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchPublicPosts } from '@/store/postsSlice'
import { fmtDate } from '@/lib/utils'
import { firebaseReady } from '@/lib/firebase'

export default function Blog() {
  const s = useSettings()
  const dispatch = useAppDispatch()
  const { items, loading } = useAppSelector((st) => st.posts)
  const [tag, setTag] = useState('')
  useEffect(() => { dispatch(fetchPublicPosts()) }, [dispatch])
  const posts = items.filter((p) => p.status === 'published' && p.publishAt <= Date.now())
  const tags = useMemo(() => [...new Set(posts.flatMap((p) => p.tags))], [posts])
  const shown = tag ? posts.filter((p) => p.tags.includes(tag)) : posts

  return (
    <div className="container-page py-14">
      <Seo title={s.meta.blog.title} description={s.meta.blog.description} path="/blog" />
      <h1 className="text-4xl">Local SEO Blog</h1>
      <p className="mt-3 text-slate-600">Tips to help local businesses get found on Google.</p>
      {tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <button onClick={() => setTag('')} className={`badge ${!tag ? 'bg-primary text-white' : 'bg-accent-soft text-primary-dark'}`}>All</button>
          {tags.map((t) => (
            <button key={t} onClick={() => setTag(t)} className={`badge ${tag === t ? 'bg-primary text-white' : 'bg-accent-soft text-primary-dark'}`}>{t}</button>
          ))}
        </div>
      )}
      {loading && <p className="mt-10 text-slate-500">Loading posts…</p>}
      {!loading && shown.length === 0 && (
        <p className="mt-10 text-slate-500">{firebaseReady ? 'New articles are coming soon.' : 'The blog will appear here once Firebase is connected.'}</p>
      )}
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <Link key={p.id} to={`/blog/${p.slug}`} className="card group flex flex-col p-0">
            <img src={p.coverImage || '/images/searchengineoptimization.webp'} alt={p.title} loading="lazy" className="h-48 w-full rounded-t-2xl object-cover" />
            <div className="p-5">
              <p className="text-xs text-slate-500">{fmtDate(p.publishAt)}</p>
              <h2 className="mt-1 text-xl group-hover:text-primary">{p.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-slate-600">{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
