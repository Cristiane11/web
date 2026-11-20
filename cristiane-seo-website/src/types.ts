export type Role = 'manager' | 'client'

export interface UserProfile {
  uid: string
  email: string
  firstName: string
  lastName: string
  phone: string
  contactEmail: string
  businessName: string
  businessType: string
  businessLocation: string
  role: Role
  blocked: boolean
  createdAt: number
}

export interface Slot {
  id: string
  start: number
  end: number
  booked: boolean
  bookedBy: string | null
}

export type AppointmentStatus = 'booked' | 'cancelled' | 'completed'

export interface Appointment {
  id: string
  uid: string
  slotId: string
  start: number
  end: number
  status: AppointmentStatus
  clientName: string
  email: string
  businessType: string
  notes: string
  createdAt: number
}

export type PostStatus = 'draft' | 'scheduled' | 'published'

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  tags: string[]
  seoTitle: string
  seoDescription: string
  status: PostStatus
  publishAt: number
  createdAt: number
  updatedAt: number
}

export interface Message {
  id: string
  name: string
  email: string
  message: string
  uid: string | null
  read: boolean
  createdAt: number
}

export interface PageMeta {
  title: string
  description: string
}

export interface SiteSettings {
  heroTitle: string
  heroSubtitle: string
  aboutIntro: string
  aboutBody: string
  /** Instagram username without @ (optional; falls back to config default) */
  instagramHandle?: string
  meta: Record<string, PageMeta>
}
