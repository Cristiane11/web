import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { fmtDateTime } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchAppointments } from '@/store/appointmentsSlice'
import { fetchUsers } from '@/store/usersSlice'
import { fetchAllPosts, savePost } from '@/store/postsSlice'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const appts = useAppSelector((s) => s.appointments.items)
  const users = useAppSelector((s) => s.users.items)
  const posts = useAppSelector((s) => s.posts.items)
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    dispatch(fetchAppointments())
    dispatch(fetchUsers())
    dispatch(fetchAllPosts()).unwrap().then((all) => {
      // Publish any scheduled posts whose time has come (the daily cron does the same server-side).
      all.filter((p) => p.status === 'scheduled' && p.publishAt <= Date.now())
        .forEach((p) => dispatch(savePost({ ...p, status: 'published' })))
    }).catch(() => undefined)
    getDocs(query(collection(db, 'messages'), where('read', '==', false))).then((s) => setUnread(s.size)).catch(() => undefined)
  }, [dispatch])

  const upcoming = appts.filter((a) => a.status === 'booked' && a.start > Date.now()).sort((a, b) => a.start - b.start)
  const stats = [
    ['Upcoming bookings', upcoming.length, '/admin/bookings'], ['Clients', users.length, '/admin/users'],
    ['Unread messages', unread, '/admin/messages'], ['Published posts', posts.filter((p) => p.status === 'published').length, '/admin/posts'],
  ] as const

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, n, to]) => (
          <Link key={label} to={to} className="card hover:border-primary">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-1 text-3xl font-extrabold text-primary">{n}</p>
          </Link>
        ))}
      </div>
      <div className="card">
        <div className="mb-3 flex items-center justify-between"><h2 className="text-xl">Next appointments</h2><Link to="/admin/calendar" className="btn-ghost btn-sm">Open calendar</Link></div>
        {upcoming.length === 0 ? <p className="text-sm text-slate-500">No upcoming appointments.</p> : (
          <ul className="divide-y">{upcoming.slice(0, 6).map((a) => (
            <li key={a.id} className="flex justify-between py-2 text-sm"><span className="font-medium">{a.clientName}</span><span>{fmtDateTime(a.start)}</span></li>
          ))}</ul>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        <Link to="/admin/posts/new" className="btn-primary">Write a new post</Link>
        <Link to="/admin/calendar" className="btn-outline">Add availability</Link>
      </div>
    </div>
  )
}
