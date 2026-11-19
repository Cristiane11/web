import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import DOMPurify from 'dompurify'
import Seo from '@/components/Seo'
import ShareButtons from '@/components/ShareButtons'
import { BookButton } from '@/components/Layout'
import { db, firebaseReady } from '@/lib/firebase'
import { SITE_URL } from '@/lib/config'
import { fmtDate } from '@/lib/utils'
import type { Post } from '@/types'

export default function BlogPost() {
  const { slug = '' } = useParams()
  const [post, setPost] = useState<Post | null | undefined>(undefined)

  useEffect(() => {
    if (!firebaseReady) return setPost(null)
    getDocs(query(collection(db, 'posts'), where('slug', '==', slug), where('status', '==', 'published'), limit(1)))
      .then((snap) => setPost(snap.empty ? null : { ...(snap.docs[0].data() as Post), id: snap.docs[0].id }))
      .catch(() => setPost(null))
  }, [slug])

  if (post === undefined) return <div className="container-page py-20 text-slate-500">Loading…</div>
  if (!post || post.publishAt > Date.now())
    return (
      <div className="container-page py-20 text-center">
        <Seo title="Post not found" description="This article could not be found." noindex />
        <h1 className="text-3xl">Post not found</h1>
        <Link to="/blog" className="btn-primary mt-6">Back to blog</Link>
      </div>
    )

  const url = `${SITE_URL}/blog/${post.slug}`
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: post.coverImage || undefined,
    datePublished: new Date(post.publishAt).toISOString(),
    dateModified: new Date(post.updatedAt).toISOString(),
    author: { '@type': 'Person', name: 'Cristiane Abreu', url: SITE_URL },
    mainEntityOfPage: url,
    keywords: post.tags.join(', '),
  }
  return (
    <article className="container-page max-w-3xl py-14">
      <Seo title={post.seoTitle || `${post.title} | Cristiane Abreu`} description={post.seoDescription || post.excerpt}
        path={`/blog/${post.slug}`} image={post.coverImage || undefined} type="article" jsonLd={ld} />
      <Link to="/blog" className="text-sm text-primary">← All posts</Link>
      <h1 className="mt-4 text-4xl">{post.title}</h1>
      <p className="mt-2 text-sm text-slate-500">By Cristiane Abreu · {fmtDate(post.publishAt)}</p>
      {post.coverImage && <img src={post.coverImage} alt={post.title} className="mt-8 w-full rounded-2xl object-cover" />}
      <div className="prose-content mt-8" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
      {post.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">{post.tags.map((t) => <span key={t} className="badge bg-accent-soft text-primary-dark">#{t}</span>)}</div>
      )}
      <div className="mt-8 border-t pt-6"><ShareButtons url={url} title={post.title} /></div>
      <div className="card mt-10 bg-accent-soft text-center">
        <h2 className="text-xl">Want help with your Local SEO?</h2>
        <div className="mt-4"><BookButton className="btn-primary" /></div>
      </div>
    </article>
  )
}
