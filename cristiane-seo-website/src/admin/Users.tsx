import { useEffect, useMemo, useState } from 'react'
import { businessTypes } from '@/data/content'
import { errMsg, fmtDate } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/store'
import { deleteUser, fetchUsers, updateUser } from '@/store/usersSlice'
import type { UserProfile } from '@/types'

const editable: [keyof UserProfile, string][] = [
  ['firstName', 'First name'], ['lastName', 'Last name'], ['phone', 'Phone'], ['contactEmail', 'Contact email'],
  ['businessName', 'Business name'], ['businessType', 'Type of business'], ['businessLocation', 'Business location'],
]

export default function Users() {
  const dispatch = useAppDispatch()
  const { items, loading } = useAppSelector((s) => s.users)
  const me = useAppSelector((s) => s.auth.user)
  const [q, setQ] = useState('')
  const [edit, setEdit] = useState<UserProfile | null>(null)
  const [err, setErr] = useState('')
  useEffect(() => { dispatch(fetchUsers()) }, [dispatch])

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase()
    return [...items]
      .filter((u) => !term || `${u.firstName} ${u.lastName}`.toLowerCase().includes(term) || `${u.lastName} ${u.firstName}`.toLowerCase().includes(term))
      .sort((a, b) => (a.lastName || '~').localeCompare(b.lastName || '~') || (a.firstName || '').localeCompare(b.firstName || ''))
  }, [items, q])

  const run = async (p: Promise<unknown>) => { setErr(''); try { await p } catch (e) { setErr(errMsg(e)) } }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl">Users</h1>
      <input className="input max-w-md" placeholder="Search by first or last name…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search users" />
      {err && <p className="text-sm text-red-600">{err}</p>}
      <div className="overflow-x-auto rounded-2xl border border-brand-light bg-white">
        <table className="table-base">
          <thead><tr><th>Last name</th><th>First name</th><th>Email</th><th>Phone</th><th>Business</th><th>Type</th><th>Location</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((u) => (
              <tr key={u.uid} className={u.blocked ? 'bg-red-50' : ''}>
                <td className="font-medium">{u.lastName || '—'}</td><td>{u.firstName || '—'}</td>
                <td>{u.email}{u.contactEmail && u.contactEmail !== u.email && <div className="text-xs text-slate-500">{u.contactEmail}</div>}</td>
                <td>{u.phone}</td><td>{u.businessName}</td><td>{u.businessType}</td><td>{u.businessLocation}</td>
                <td>{u.role}</td>
                <td><span className={`badge ${u.blocked ? 'bg-red-100 text-red-700' : 'bg-brand-light text-brand-darkest'}`}>{u.blocked ? 'Blocked' : 'Active'}</span></td>
                <td className="whitespace-nowrap">{u.createdAt ? fmtDate(u.createdAt) : ''}</td>
                <td className="whitespace-nowrap">
                  <button className="btn-ghost btn-sm" onClick={() => setEdit(u)}>View / edit</button>
                  {u.uid !== me?.uid && (
                    <>
                      <button className="btn-outline btn-sm ml-1" onClick={() => run(dispatch(updateUser({ uid: u.uid, blocked: !u.blocked })).unwrap())}>{u.blocked ? 'Unblock' : 'Block'}</button>
                      <button className="btn-danger btn-sm ml-1" onClick={() => window.confirm(`Delete ${u.email}? This removes their login and profile.`) && run(dispatch(deleteUser(u.uid)).unwrap())}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {!loading && rows.length === 0 && <tr><td colSpan={11} className="py-6 text-center text-slate-500">No users found.</td></tr>}
          </tbody>
        </table>
      </div>
      {edit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal>
          <form className="card max-h-[90vh] w-full max-w-lg space-y-3 overflow-y-auto" onSubmit={(e) => { e.preventDefault(); run(dispatch(updateUser(edit)).unwrap().then(() => setEdit(null))) }}>
            <h2 className="text-xl">{edit.email}</h2>
            {editable.map(([k, label]) => (
              <div key={k}><label className="label">{label}</label>
                {k === 'businessType'
                  ? <select className="input" value={String(edit[k] ?? '')} onChange={(e) => setEdit({ ...edit, [k]: e.target.value })}><option value="">—</option>{businessTypes.map((b) => <option key={b}>{b}</option>)}</select>
                  : <input className="input" value={String(edit[k] ?? '')} onChange={(e) => setEdit({ ...edit, [k]: e.target.value })} />}
              </div>
            ))}
            <div><label className="label">Role</label>
              <select className="input" value={edit.role} onChange={(e) => setEdit({ ...edit, role: e.target.value as UserProfile['role'] })}><option value="client">client</option><option value="manager">manager</option></select></div>
            <div className="flex gap-2"><button className="btn-primary">Save</button><button type="button" className="btn-ghost" onClick={() => setEdit(null)}>Close</button></div>
          </form>
        </div>
      )}
    </div>
  )
}
