import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getStorage, type FirebaseStorage } from 'firebase/storage'

const env = import.meta.env
const config = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'fir-firstproject-b14ad',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
}

/** False until the VITE_FIREBASE_* variables are provided; public pages then use static fallback content. */
export const firebaseReady = Boolean(config.apiKey && config.appId)

let app: FirebaseApp | null = null
if (firebaseReady) app = initializeApp(config)

export const auth = (app ? getAuth(app) : null) as Auth
export const db = (app ? getFirestore(app) : null) as Firestore
export const storage = (app ? getStorage(app) : null) as FirebaseStorage
export const googleProvider = new GoogleAuthProvider()

export function requireFirebase() {
  if (!firebaseReady) throw new Error('Firebase is not configured yet. Add the VITE_FIREBASE_* environment variables.')
}
