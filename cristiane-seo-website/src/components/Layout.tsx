import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { BOOKING_URL, PHONE, SOCIAL } from '@/lib/config'
import { useAppDispatch, useAppSelector } from '@/store'
import { setNotice } from '@/store/authSlice'
import { useSettings } from '@/lib/useSettings'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/education', label: 'Education' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export function BookButton({ className = 'btn-primary', label = 'Book time with me' }: { className?: string; label?: string }) {
  return (
    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
    </a>
  )
}

const icons: Record<string, string> = {
  LinkedIn: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.2 1.5-2.2 2.9V21H9z',
  GitHub: 'M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z',
  Facebook: 'M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v7h4v-7h3l.5-4h-3.5V9c0-.6.4-1 1-1z',
  Instagram: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM12 2c-2.7 0-3 0-4.1.1C4.3 2.2 2.2 4.3 2.1 7.9 2 9 2 9.3 2 12s0 3 .1 4.1c.1 3.6 2.2 5.7 5.8 5.8 1.1.1 1.4.1 4.1.1s3 0 4.1-.1c3.6-.1 5.7-2.2 5.8-5.8.1-1.1.1-1.4.1-4.1s0-3-.1-4.1c-.1-3.6-2.2-5.7-5.8-5.8C15 2 14.7 2 12 2zm0 1.8c2.7 0 3 0 4 .1 2.6.1 3.9 1.4 4 4 .1 1 .1 1.3.1 4s0 3-.1 4c-.1 2.6-1.4 3.9-4 4-1 .1-1.3.1-4 .1s-3 0-4-.1c-2.6-.1-3.9-1.4-4-4-.1-1-.1-1.3-.1-4s0-3 .1-4c.1-2.6 1.4-3.9 4-4 1-.1 1.3-.1 4-.1z',
  Google: 'M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3zM12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22zM6.4 14a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9zM12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5l3.3 2.6C7.2 7.7 9.4 5.9 12 5.9z',
}
export const instagramUrl = (handle?: string) => `https://www.instagram.com/${handle || SOCIAL.instagram}/`
const baseSocials = [
  { name: 'LinkedIn', href: SOCIAL.linkedin },
  { name: 'GitHub', href: SOCIAL.github },
  { name: 'Facebook', href: SOCIAL.facebook },
  { name: 'Google', href: SOCIAL.google },
]

export function SocialIcons({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const { instagramHandle } = useSettings()
  const socials = [{ name: 'Instagram', href: instagramUrl(instagramHandle) }, ...baseSocials]
  const cls = variant === 'dark'
    ? 'bg-brand-darkest text-white hover:bg-[#3b4039]'
    : 'border border-brand-lightest/70 text-white hover:bg-brand-lightest hover:text-brand-darkest'
  return (
    <ul className="flex items-center gap-2">
      {socials.map((s) => (
        <li key={s.name}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Cristiane Abreu on ${s.name}`}
            className={`flex h-7 w-7 items-center justify-center rounded-full transition ${cls}`}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d={icons[s.name]} /></svg>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { user, isManager, notice } = useAppSelector((s) => s.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `font-display text-[11px] font-semibold uppercase tracking-[0.22em] border-b py-1 transition ${
      isActive ? 'border-brand-darkest text-brand-darkest' : 'border-transparent text-brand-darkest/80 hover:border-brand-darkest hover:text-brand-darkest'}`
  const mobileCls = ({ isActive }: { isActive: boolean }) =>
    `block border-b border-brand-light px-1 py-3.5 font-display text-xs font-semibold uppercase tracking-[0.22em] ${isActive ? 'text-brand-darkest underline underline-offset-4' : 'text-brand-darkest/85 hover:text-brand-darkest'}`
  const logout = () => signOut(auth).then(() => navigate('/'))

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-white focus:p-2">Skip to content</a>

      {/* Slim top bar with navigation (sticky), like the reference */}
      <div className="sticky top-0 z-40 border-b border-brand-light bg-white/95 backdrop-blur">
        <div className="flex h-12 items-stretch justify-between">
          <button className="flex w-12 items-center justify-center bg-brand-darkest text-white lg:hidden" aria-label="Toggle menu"
            aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M2 5h16M2 10h16M2 15h16" />}
            </svg>
          </button>
          <a href={`tel:${PHONE}`} className="hidden items-center pl-6 font-display text-[11px] font-semibold tracking-[0.18em] text-brand-darkest hover:underline lg:flex">
            {PHONE}
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {nav.map((n) => <NavLink key={n.to} to={n.to} end={n.to === '/'} className={linkCls}>{n.label}</NavLink>)}
            {user ? (
              <>
                <NavLink to={isManager ? '/admin' : '/account'} className={linkCls}>{isManager ? 'Admin' : 'My account'}</NavLink>
                <button className="border-b border-transparent py-1 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-darkest/80 hover:border-brand-darkest hover:text-brand-darkest" onClick={logout}>Log out</button>
              </>
            ) : (
              <NavLink to="/login" className={linkCls}>Log in</NavLink>
            )}
          </nav>
          <div className="flex items-stretch">
            <div className="hidden items-center pr-5 xl:flex"><SocialIcons /></div>
            <BookButton className="flex items-center bg-brand-darkest px-4 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#3b4039] sm:px-6 sm:text-[11px]" label="Book a free call" />
          </div>
        </div>
        {open && (
          <nav id="mobile-nav" className="border-t border-brand-light bg-white px-6 pb-6 lg:hidden" aria-label="Mobile">
            {nav.map((n) => <NavLink key={n.to} to={n.to} end={n.to === '/'} className={mobileCls}>{n.label}</NavLink>)}
            {user ? (
              <>
                <NavLink to={isManager ? '/admin' : '/account'} className={mobileCls}>{isManager ? 'Admin' : 'My account'}</NavLink>
                <button className="block w-full border-b border-brand-light px-1 py-3.5 text-left font-display text-xs font-semibold uppercase tracking-[0.22em] text-brand-darkest" onClick={logout}>Log out</button>
              </>
            ) : (
              <NavLink to="/login" className={mobileCls}>Log in</NavLink>
            )}
            <div className="mt-5 flex items-center justify-between">
              <a href={`tel:${PHONE}`} className="link text-sm">{PHONE}</a>
              <SocialIcons />
            </div>
          </nav>
        )}
      </div>

      {/* Centered wordmark */}
      <header className="border-b border-brand-light bg-white py-7 text-center">
        <Link to="/" className="inline-block" aria-label="Cristiane Abreu — home">
          <span className="block font-serif text-3xl font-light uppercase tracking-[0.18em] text-brand-darkest sm:text-4xl">Cristiane Abreu</span>
          <span className="kicker mt-2 block text-[10px]">Local SEO &amp; Digital Marketing</span>
        </Link>
      </header>

      {notice && (
        <div role="alert" className="bg-red-50 px-4 py-3 text-center text-sm text-red-800">
          {notice} <button className="ml-2 font-medium underline" onClick={() => dispatch(setNotice(''))}>Dismiss</button>
        </div>
      )}
      <main id="main" className="flex-1"><Outlet /></main>

      <footer className="bg-brand-darkest text-brand-lightest">
        <div className="container-page grid gap-10 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-serif text-2xl font-light uppercase tracking-[0.15em] text-white">Cristiane Abreu</p>
            <p className="mt-1 font-script text-3xl text-brand-light">Local SEO &amp; Digital Marketing</p>
            <p className="mt-4 max-w-sm text-sm">Helping local businesses get found on Google and turn searches into real customers.</p>
            <div className="mt-6"><BookButton className="btn-on-dark" /></div>
          </div>
          <nav aria-label="Footer">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-white">Explore</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {nav.map((n) => <li key={n.to}><Link to={n.to} className="underline-offset-4 hover:text-white hover:underline">{n.label}</Link></li>)}
              <li><Link to={user ? (isManager ? '/admin' : '/account') : '/login'} className="underline-offset-4 hover:text-white hover:underline">{user ? 'My account' : 'Client login'}</Link></li>
            </ul>
          </nav>
          <div>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-white">Get in touch</p>
            <a href={`tel:${PHONE}`} className="mt-4 block text-sm underline-offset-4 hover:text-white hover:underline">{PHONE}</a>
            <Link to="/contact" className="mt-2 block text-sm underline-offset-4 hover:text-white hover:underline">Send a message</Link>
            <div className="mt-5"><SocialIcons variant="light" /></div>
          </div>
        </div>
        <div className="border-t border-white/15">
          <p className="container-page py-5 text-center font-display text-[10px] uppercase tracking-[0.25em] text-brand-light">
            © {new Date().getFullYear()} Cristiane Abreu · All rights reserved
          </p>
        </div>
      </footer>
    </div>
  )
}
