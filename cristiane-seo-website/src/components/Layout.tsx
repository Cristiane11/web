import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { BOOKING_URL, PHONE, SOCIAL } from '@/lib/config'
import { useAppDispatch, useAppSelector } from '@/store'
import { setNotice } from '@/store/authSlice'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/education', label: 'Education' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export function BookButton({ className = 'btn-accent' }: { className?: string }) {
  return (
    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={className}>
      Book time with me
    </a>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { user, isManager, notice } = useAppSelector((s) => s.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-2 text-sm font-medium ${isActive ? 'bg-white/15 text-white' : 'text-green-50 hover:text-accent'}`

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
      <header className="sticky top-0 z-40 bg-primary-dark shadow">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link to="/" className="text-lg font-extrabold text-white">
            Cristiane <span className="text-accent">Abreu</span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((n) => <NavLink key={n.to} to={n.to} end={n.to === '/'} className={linkCls}>{n.label}</NavLink>)}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            {user ? (
              <>
                <NavLink to={isManager ? '/admin' : '/account'} className={linkCls}>{isManager ? 'Admin' : 'My account'}</NavLink>
                <button className="text-sm text-green-100 hover:text-white" onClick={() => signOut(auth).then(() => navigate('/'))}>Log out</button>
              </>
            ) : (
              <NavLink to="/login" className={linkCls}>Log in</NavLink>
            )}
            <BookButton className="btn-accent btn-sm" />
          </div>
          <button className="text-white lg:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h20M4 14h20M4 21h20" /></svg>
          </button>
        </div>
        {open && (
          <nav className="container-page flex flex-col gap-1 pb-4 lg:hidden" onClick={() => setOpen(false)}>
            {nav.map((n) => <NavLink key={n.to} to={n.to} end={n.to === '/'} className={linkCls}>{n.label}</NavLink>)}
            {user ? (
              <>
                <NavLink to={isManager ? '/admin' : '/account'} className={linkCls}>{isManager ? 'Admin' : 'My account'}</NavLink>
                <button className="px-3 py-2 text-left text-sm text-green-100" onClick={() => signOut(auth)}>Log out</button>
              </>
            ) : (
              <NavLink to="/login" className={linkCls}>Log in</NavLink>
            )}
            <BookButton className="btn-accent mt-2" />
          </nav>
        )}
      </header>
      {notice && (
        <div role="alert" className="bg-red-50 px-4 py-3 text-center text-sm text-red-700">
          {notice} <button className="ml-2 underline" onClick={() => dispatch(setNotice(''))}>Dismiss</button>
        </div>
      )}
      <main id="main" className="flex-1"><Outlet /></main>
      <footer className="bg-primary-dark text-green-50">
        <div className="container-page grid gap-8 py-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white">Cristiane Abreu</p>
            <p className="mt-2 text-sm text-green-100">Local SEO & Digital Marketing for local businesses.</p>
            <a href={`tel:${PHONE}`} className="mt-2 block text-sm hover:text-accent">{PHONE}</a>
          </div>
          <nav className="grid grid-cols-2 gap-2 text-sm" aria-label="Footer">
            {nav.map((n) => <Link key={n.to} to={n.to} className="hover:text-accent">{n.label}</Link>)}
          </nav>
          <div className="flex flex-col gap-2 text-sm">
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn</a>
            <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">GitHub</a>
            <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-accent">Facebook</a>
            <a href={SOCIAL.google} target="_blank" rel="noopener noreferrer" className="hover:text-accent">Google</a>
          </div>
        </div>
        <p className="border-t border-white/10 py-4 text-center text-xs text-green-200">© {new Date().getFullYear()} Cristiane Abreu. All rights reserved.</p>
      </footer>
    </div>
  )
}
