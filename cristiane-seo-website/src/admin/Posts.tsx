import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ShareButtons from '@/components/ShareButtons'
import { SITE_URL } from '@/lib/config'
import { fmtDateTime } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/store'
import { deletePost, fetchAllPosts } from '@/store/postsSlice'

const badge = { draft: 'bg-slate-100 text-slate-700', scheduled: 'bg-yellow-100 text-yellow-800', published: 'bg-green-100 text-green-800' }

export default function Posts() {
  const dispatch = useAppDispatch()
  const { items, loading, error } = useAppSelector((s) => s.posts)
  useEffect(() => { dispatch(fetchAllPosts()) }, [dispatch])
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-3xl">Blog posts</h1><Link to="/admin/posts/new" className="btn-primary">New post</Link></div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {loading && <p className="text-slate-500">Loading…</p>}
      {items.map((p) => (
        <div key={p.id} className="card flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg">{p.title || '(untitled)'}</h2>
              <p className="text-xs text-slate-500">/blog/{p.slug} · {p.status === 'draft' ? `updated ${fmtDateTime(p.updatedAt)}` : `${p.status === 'scheduled' ? 'publishes' : 'published'} ${fmtDateTime(p.publishAt)}`}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`badge ${badge[p.status]}`}>{p.status}</span>
              <Link to={`/admin/posts/${p.id}`} className="btn-outline btn-sm">Edit</Link>
              {p.status === 'published' && <Link to={`/blog/${p.slug}`} className="btn-ghost btn-sm" target="_blank">View</Link>}
              <button className="btn-danger btn-sm" onClick={() => window.confirm('Delete this post?') && dispatch(deletePost(p.id))}>Delete</button>
            </div>
          </div>
          {p.status !== 'draft' && <ShareButtons url={`${SITE_URL}/blog/${p.slug}`} title={p.title} />}
        </div>
      ))}
      {!loading && items.length === 0 && <p className="text-slate-500">No posts yet — write your first one!</p>}
    </div>
  )
}
