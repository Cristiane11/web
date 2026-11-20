import { useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db, firebaseReady } from './firebase'
import { isManagerEmail } from './config'
import { useAppDispatch } from '@/store'
import { setNotice, setSession } from '@/store/authSlice'
import type { UserProfile } from '@/types'

/** Keeps Redux in sync with Firebase Auth; creates the users/{uid} profile on first login and enforces blocking. */
export function useAuthListener() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!firebaseReady) {
      dispatch(setSession({ user: null, profile: null, isManager: false }))
      return
    }
    return onAuthStateChanged(auth, async (u) => {
      if (!u) return dispatch(setSession({ user: null, profile: null, isManager: false }))
      const ref = doc(db, 'users', u.uid)
      let profile: UserProfile | null = null
      try {
        const snap = await getDoc(ref)
        if (snap.exists()) profile = { ...(snap.data() as UserProfile), uid: u.uid }
        else {
          const [firstName = '', ...rest] = (u.displayName ?? '').split(' ')
          profile = {
            uid: u.uid, email: u.email ?? '', firstName, lastName: rest.join(' '), phone: u.phoneNumber ?? '',
            contactEmail: u.email ?? '', businessName: '', businessType: '', businessLocation: '',
            role: 'client', blocked: false, createdAt: Date.now(),
          }
          const { uid: _uid, ...data } = profile
          void _uid
          await setDoc(ref, data)
        }
      } catch (e) {
        console.warn('Could not load profile', e)
      }
      if (profile?.blocked) {
        await signOut(auth)
        dispatch(setNotice('Your account has been blocked. Please contact Cristiane if you think this is a mistake.'))
        return dispatch(setSession({ user: null, profile: null, isManager: false }))
      }
      const isManager = (isManagerEmail(u.email) && u.emailVerified) || profile?.role === 'manager'
      dispatch(
        setSession({
          user: { uid: u.uid, email: u.email ?? '', emailVerified: u.emailVerified, displayName: u.displayName ?? '' },
          profile,
          isManager,
        }),
      )
    })
  }, [dispatch])
}
