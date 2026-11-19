import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail,
  signInWithEmailAndPassword, signInWithPopup, updateProfile,
} from 'firebase/auth'
import Seo from '@/components/Seo'
import { auth, firebaseReady, googleProvider } from '@/lib/firebase'
import { errMsg } from '@/lib/utils'
import { useAppSelector } from '@/store'

function Shell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="container-page flex justify-center py-16">
      <Seo title={`${title} | Cristiane Abreu`} description={title} noindex />
      <div className="card w-full max-w-md">
        <h1 className="mb-6 text-2xl">{title}</h1>
        {!firebaseReady && <p className="mb-4 rounded bg-yellow-50 p-3 text-sm text-yellow-800">Login is not available until Firebase is configured.</p>}
        {children}
      </div>
    </div>
  )
}

function useRedirectWhenLoggedIn() {
  const { user, isManager } = useAppSelector((s) => s.auth)
  const navigate = useNavigate()
  const from = (useLocation().state as { from?: string } | null)?.from
  useEffect(() => {
    if (user) navigate(from || (isManager ? '/admin' : '/account'), { replace: true })
  }, [user, isManager, from, navigate])
}

function GoogleButton({ onError }: { onError: (m: string) => void }) {
  return (
    <button type="button" className="btn-outline w-full" disabled={!firebaseReady}
      onClick={() => signInWithPopup(auth, googleProvider).catch((e) => onError(errMsg(e)))}>
      Continue with Google
    </button>
  )
}

export function Login() {
  useRedirectWhenLoggedIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true); setErr('')
    try { await signInWithEmailAndPassword(auth, email, password) } catch (e) { setErr(errMsg(e)) } finally { setBusy(false) }
  }
  return (
    <Shell title="Log in">
      <form onSubmit={submit} className="space-y-4">
        <div><label className="label" htmlFor="email">Email</label><input id="email" type="email" required className="input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></div>
        <div><label className="label" htmlFor="pw">Password</label><input id="pw" type="password" required className="input" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" /></div>
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button className="btn-primary w-full" disabled={busy || !firebaseReady}>{busy ? 'Logging in…' : 'Log in'}</button>
        <GoogleButton onError={setErr} />
      </form>
      <div className="mt-6 flex justify-between text-sm">
        <Link to="/forgot-password" className="text-primary">Forgot password?</Link>
        <Link to="/signup" className="text-primary">Create an account</Link>
      </div>
    </Shell>
  )
}

export function Signup() {
  useRedirectWhenLoggedIn()
  const [f, setF] = useState({ name: '', email: '', password: '' })
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  async function submit(e: FormEvent) {
    e.preventDefault()
    if (f.password.length < 8) return setErr('Password must be at least 8 characters.')
    setBusy(true); setErr('')
    try {
      const cred = await createUserWithEmailAndPassword(auth, f.email, f.password)
      await updateProfile(cred.user, { displayName: f.name })
      await sendEmailVerification(cred.user)
    } catch (e) { setErr(errMsg(e)) } finally { setBusy(false) }
  }
  return (
    <Shell title="Create your account">
      <form onSubmit={submit} className="space-y-4">
        <div><label className="label" htmlFor="name">Full name</label><input id="name" required className="input" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
        <div><label className="label" htmlFor="email">Email</label><input id="email" type="email" required className="input" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
        <div><label className="label" htmlFor="pw">Password (min. 8 characters)</label><input id="pw" type="password" required className="input" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} autoComplete="new-password" /></div>
        {err && <p className="text-sm text-red-600">{err}</p>}
        <p className="text-xs text-slate-500">We will send you a verification email. You need a verified email to book appointments.</p>
        <button className="btn-primary w-full" disabled={busy || !firebaseReady}>{busy ? 'Creating…' : 'Sign up'}</button>
        <GoogleButton onError={setErr} />
      </form>
      <p className="mt-6 text-center text-sm">Already have an account? <Link to="/login" className="text-primary">Log in</Link></p>
    </Shell>
  )
}

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  async function submit(e: FormEvent) {
    e.preventDefault()
    setErr(''); setMsg('')
    try {
      await sendPasswordResetEmail(auth, email)
      setMsg('If an account exists for this email, a reset link has been sent.')
    } catch (e) { setErr(errMsg(e)) }
  }
  return (
    <Shell title="Reset your password">
      <form onSubmit={submit} className="space-y-4">
        <div><label className="label" htmlFor="email">Email</label><input id="email" type="email" required className="input" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        {msg && <p className="text-sm text-brand-darkest font-medium">{msg}</p>}
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button className="btn-primary w-full" disabled={!firebaseReady}>Send reset link</button>
      </form>
      <p className="mt-6 text-center text-sm"><Link to="/login" className="text-primary">Back to log in</Link></p>
    </Shell>
  )
}
