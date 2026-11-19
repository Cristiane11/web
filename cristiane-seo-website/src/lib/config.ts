const env = import.meta.env

export const SITE_URL = (env.VITE_SITE_URL || 'https://profile.professionalwebsite.co').replace(/\/$/, '')
export const BOOKING_URL = env.VITE_BOOKING_URL || 'https://calendly.com/cristiane-abreu/seo-project-meeting'
export const MANAGER_EMAILS = (env.VITE_MANAGER_EMAIL || 'cristipiane@gmail.com')
  .split(',')
  .map((e: string) => e.trim().toLowerCase())
  .filter(Boolean)
export const PHONE = '704-891-4329'
export const SOCIAL = {
  github: 'https://github.com/Cristiane11',
  linkedin: 'https://www.linkedin.com/in/cristianegabreu/',
  facebook: 'https://www.facebook.com/people/Website-Professional/100066757076765/',
  google: 'https://g.co/kgs/UgtGyva',
}

export const isManagerEmail = (email?: string | null) => !!email && MANAGER_EMAILS.includes(email.toLowerCase())
