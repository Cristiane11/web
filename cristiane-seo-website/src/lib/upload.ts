import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage, requireFirebase } from './firebase'

export async function uploadImage(file: File, folder: string) {
  requireFirebase()
  if (!file.type.startsWith('image/')) throw new Error('Please choose an image file.')
  if (file.size > 5 * 1024 * 1024) throw new Error('Image must be smaller than 5 MB.')
  const name = `${Date.now()}-${file.name.replace(/[^\w.-]/g, '_')}`
  const r = ref(storage, `${folder}/${name}`)
  await uploadBytes(r, file, { contentType: file.type, cacheControl: 'public,max-age=31536000' })
  return getDownloadURL(r)
}
