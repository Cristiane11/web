import { NavLink, Outlet } from 'react-router-dom'
import Seo from '@/components/Seo'

const links = [
  ['/admin', 'Dashboard'], ['/admin/calendar', 'Calendar'], ['/admin/bookings', 'Bookings'], ['/admin/users', 'Users'],
  ['/admin/messages', 'Messages'], ['/admin/posts', 'Blog posts'], ['/admin/content', 'Site content & SEO'],
]

export default function AdminLayout() {
  return (
    <div className="container-page grid gap-6 py-8 lg:grid-cols-[220px_1fr]">
      <Seo title="Admin | Cristiane Abreu" description="Admin dashboard" noindex />
      <aside className="rounded-2xl bg-brand-darkest p-3 lg:sticky lg:top-20 lg:self-start">
        <p className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-brand-lightest">Admin</p>
        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/admin'}
              className={({ isActive }) => `whitespace-nowrap rounded-lg px-3 py-2 text-sm ${isActive ? 'bg-brand-lightest text-brand-darkest font-semibold' : 'text-brand-lightest hover:bg-white/10'}`}>
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <section className="min-w-0"><Outlet /></section>
    </div>
  )
}
