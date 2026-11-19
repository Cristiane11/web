import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db, firebaseReady } from './firebase'
import { defaultSettings } from '@/data/content'
import type { SiteSettings } from '@/types'

let cache: SiteSettings | null = null

/** Site content from Firestore settings/site merged over static defaults. */
export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(cache ?? defaultSettings)
  useEffect(() => {
    if (cache || !firebaseReady) return
    getDoc(doc(db, 'settings', 'site'))
      .then((snap) => {
        const d = (snap.data() ?? {}) as Partial<SiteSettings>
        cache = { ...defaultSettings, ...d, meta: { ...defaultSettings.meta, ...(d.meta ?? {}) } }
        setSettings(cache)
      })
      .catch(() => undefined)
  }, [])
  return settings
}

export const clearSettingsCache = () => { cache = null }
