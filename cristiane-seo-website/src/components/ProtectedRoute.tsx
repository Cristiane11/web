import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/store'

export default function ProtectedRoute({ children, managerOnly }: { children: ReactNode; managerOnly?: boolean }) {
  const { user, isManager, initialized } = useAppSelector((s) => s.auth)
  const location = useLocation()
  if (!initialized) return <div className="container-page py-20 text-center text-slate-500">Loading…</div>
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />
  if (managerOnly && !isManager) return <Navigate to="/account" replace />
  return <>{children}</>
}
