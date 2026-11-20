import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { callApi } from '@/lib/api'
import type { UserProfile } from '@/types'

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const snap = await getDocs(collection(db, 'users'))
  return snap.docs.map((d) => ({ ...(d.data() as UserProfile), uid: d.id }))
})

export const updateUser = createAsyncThunk('users/update', async (u: Partial<UserProfile> & { uid: string }) => {
  const { uid, ...data } = u
  await updateDoc(doc(db, 'users', uid), data)
  return u
})

export const deleteUser = createAsyncThunk('users/delete', async (uid: string) => {
  await callApi('admin-delete-user', { uid })
  return uid
})

const slice = createSlice({
  name: 'users',
  initialState: { items: [] as UserProfile[], loading: false, error: '' },
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(fetchUsers.pending, (s) => { s.loading = true })
      .addCase(fetchUsers.fulfilled, (s, a) => { s.loading = false; s.items = a.payload })
      .addCase(fetchUsers.rejected, (s, a) => { s.loading = false; s.error = a.error.message || 'Error' })
      .addCase(updateUser.fulfilled, (s, a) => {
        const i = s.items.findIndex((x) => x.uid === a.payload.uid)
        if (i >= 0) s.items[i] = { ...s.items[i], ...a.payload }
      })
      .addCase(deleteUser.fulfilled, (s, a) => { s.items = s.items.filter((x) => x.uid !== a.payload) }),
})
export default slice.reducer
