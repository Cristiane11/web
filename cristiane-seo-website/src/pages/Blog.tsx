import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '@/components/Seo'
import PageHeader from '@/components/PageHeader'
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
    <>
      <Seo title={s.meta.blog.title} description={s.meta.blog.description} path="/blog" />
      <PageHeader kicker="The journal" title="Local SEO Blog">
        <p>Tips to help local businesses get found on Google.</p>
      </PageHeader>
      <div className="container-page py-16">
        {tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by topic">
            {['', ...tags].map((t) => (
              <button key={t || 'all'} onClick={() => setTag(t)} aria-pressed={tag === t}
                className={`chip ${tag === t ? 'border-brand-darkest bg-brand-darkest text-white' : 'border-brand-darkest bg-white text-brand-darkest hover:bg-brand-darkest hover:text-white'}`}>
                {t || 'All'}
              </button>
            ))}
          </div>
        )}
        {loading && <p className="mt-10 text-center text-brand-darkest/80">Loading posts…</p>}
        {!loading && shown.length === 0 && (
          <div className="mx-auto mt-6 max-w-xl bg-brand-lightest/60 p-10 text-center">
            <p className="font-serif text-2xl font-light">{firebaseReady ? 'New articles are coming soon.' : 'The blog will appear here once Firebase is connected.'}</p>
            <Link to="/contact" className="btn-primary mt-6">Ask me a question</Link>
          </div>
        )}
        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={p.coverImage || '/images/searchengineoptimization.webp'} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="relative mx-5 -mt-10 flex-1 bg-white px-5 py-6 text-center shadow-sm">
                <p className="kicker text-[10px]">{p.tags[0] ? `${p.tags[0]} · ` : ''}{fmtDate(p.publishAt)}</p>
                <h2 className="mt-2 font-serif text-2xl font-light leading-tight group-hover:underline">{p.title}</h2>
                <p className="mt-3 line-clamp-3 text-[15px] text-brand-darkest/90">{p.excerpt}</p>
                <span className="mt-4 inline-block font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-darkest underline underline-offset-4">Read more</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
