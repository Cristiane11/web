import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuthListener } from '@/lib/useAuthListener'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Projects from '@/pages/Projects'
import Education from '@/pages/Education'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'
import { ForgotPassword, Login, Signup } from '@/pages/AuthPages'

// Heavy, private areas are code-split so public pages stay fast.
const Account = lazy(() => import('@/pages/Account'))
const AdminLayout = lazy(() => import('@/admin/AdminLayout'))
const Dashboard = lazy(() => import('@/admin/Dashboard'))
const CalendarManager = lazy(() => import('@/admin/CalendarManager'))
const Users = lazy(() => import('@/admin/Users'))
const Bookings = lazy(() => import('@/admin/Bookings'))
const Messages = lazy(() => import('@/admin/Messages'))
const Posts = lazy(() => import('@/admin/Posts'))
const PostEditor = lazy(() => import('@/admin/PostEditor'))
const Content = lazy(() => import('@/admin/Content'))

export default function App() {
  useAuthListener()
  return (
    <Suspense fallback={<div className="container-page py-20 text-center text-slate-500">Loading…</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="education" element={<Education />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="admin" element={<ProtectedRoute managerOnly><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="calendar" element={<CalendarManager />} />
            <Route path="users" element={<Users />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="messages" element={<Messages />} />
            <Route path="posts" element={<Posts />} />
            <Route path="posts/:id" element={<PostEditor />} />
            <Route path="content" element={<Content />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
