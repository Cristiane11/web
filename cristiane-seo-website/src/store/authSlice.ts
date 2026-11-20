import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UserProfile } from '@/types'

export interface AuthUser {
  uid: string
  email: string
  emailVerified: boolean
  displayName: string
}

interface AuthState {
  user: AuthUser | null
  profile: UserProfile | null
  isManager: boolean
  initialized: boolean
  notice: string
}

const initialState: AuthState = { user: null, profile: null, isManager: false, initialized: false, notice: '' }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession(state, a: PayloadAction<{ user: AuthUser | null; profile: UserProfile | null; isManager: boolean }>) {
      Object.assign(state, a.payload, { initialized: true })
    },
    setProfile(state, a: PayloadAction<UserProfile>) {
      state.profile = a.payload
    },
    setNotice(state, a: PayloadAction<string>) {
      state.notice = a.payload
    },
  },
})

export const { setSession, setProfile, setNotice } = authSlice.actions
export default authSlice.reducer
