import { Helmet } from 'react-helmet-async'
import { SITE_URL } from '@/lib/config'

interface Props {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: object | object[]
}

export default function Seo({ title, description, path = '', image = '/images/og-image.jpg', type = 'website', noindex, jsonLd }: Props) {
  const url = SITE_URL + path
  const img = image.startsWith('http') ? image : SITE_URL + image
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}

export const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Cristiane Abreu',
  jobTitle: 'Local SEO & Digital Marketing Specialist',
  url: SITE_URL,
  image: SITE_URL + '/images/cristiane-abreu.webp',
  telephone: '+1-704-891-4329',
  knowsLanguage: ['English', 'Portuguese', 'Spanish'],
  sameAs: ['https://www.linkedin.com/in/cristianegabreu/', 'https://github.com/Cristiane11', 'https://www.facebook.com/people/Website-Professional/100066757076765/'],
}

export const businessLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Cristiane Abreu — Local SEO & Digital Marketing',
  url: SITE_URL,
  image: SITE_URL + '/images/og-image.jpg',
  telephone: '+1-704-891-4329',
  areaServed: 'United States',
  serviceType: ['Local SEO', 'Google Business Profile Optimization', 'Digital Marketing', 'Google Ads'],
  founder: { '@type': 'Person', name: 'Cristiane Abreu' },
}
