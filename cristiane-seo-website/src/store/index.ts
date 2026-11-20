import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import auth from './authSlice'
import posts from './postsSlice'
import appointments from './appointmentsSlice'
import users from './usersSlice'
import availability from './availabilitySlice'

export const store = configureStore({ reducer: { auth, posts, appointments, users, availability } })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
