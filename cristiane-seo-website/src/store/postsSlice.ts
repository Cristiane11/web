import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, where, addDoc } from 'firebase/firestore'
import { db, firebaseReady } from '@/lib/firebase'
import type { Post } from '@/types'

const col = () => collection(db, 'posts')

export const fetchPublicPosts = createAsyncThunk('posts/fetchPublic', async () => {
  if (!firebaseReady) return [] as Post[]
  const snap = await getDocs(query(col(), where('status', '==', 'published'), orderBy('publishAt', 'desc')))
  return snap.docs.map((d) => ({ ...(d.data() as Post), id: d.id }))
})

export const fetchAllPosts = createAsyncThunk('posts/fetchAll', async () => {
  const snap = await getDocs(query(col(), orderBy('updatedAt', 'desc')))
  return snap.docs.map((d) => ({ ...(d.data() as Post), id: d.id }))
})

export const savePost = createAsyncThunk('posts/save', async (post: Omit<Post, 'id'> & { id?: string }) => {
  const { id, ...data } = post
  const payload = { ...data, updatedAt: Date.now() }
  if (id) {
    await setDoc(doc(db, 'posts', id), payload, { merge: true })
    return { ...payload, id } as Post
  }
  const ref = await addDoc(col(), payload)
  return { ...payload, id: ref.id } as Post
})

export const deletePost = createAsyncThunk('posts/delete', async (id: string) => {
  await deleteDoc(doc(db, 'posts', id))
  return id
})

const postsSlice = createSlice({
  name: 'posts',
  initialState: { items: [] as Post[], loading: false, error: '' },
  reducers: {},
  extraReducers: (b) => {
    const pending = (s: { loading: boolean; error: string }) => { s.loading = true; s.error = '' }
    b.addCase(fetchPublicPosts.pending, pending)
      .addCase(fetchAllPosts.pending, pending)
      .addCase(fetchPublicPosts.fulfilled, (s, a) => { s.loading = false; s.items = a.payload })
      .addCase(fetchAllPosts.fulfilled, (s, a) => { s.loading = false; s.items = a.payload })
      .addCase(fetchPublicPosts.rejected, (s, a) => { s.loading = false; s.error = a.error.message || 'Error' })
      .addCase(fetchAllPosts.rejected, (s, a) => { s.loading = false; s.error = a.error.message || 'Error' })
      .addCase(savePost.fulfilled, (s, a) => {
        const i = s.items.findIndex((p) => p.id === a.payload.id)
        if (i >= 0) s.items[i] = a.payload
        else s.items.unshift(a.payload)
      })
      .addCase(deletePost.fulfilled, (s, a) => { s.items = s.items.filter((p) => p.id !== a.payload) })
  },
})
export default postsSlice.reducer
