import type { SiteSettings } from '@/types'

/** Static fallback content (from Cristiane's previous website, re-focused on Local SEO & Digital Marketing).
 *  The manager can override hero/about text and page meta from Admin → Site content & SEO. */
export const defaultSettings: SiteSettings = {
  heroTitle: "Hi, I'm Cristiane Abreu",
  heroSubtitle:
    'I help local businesses get found on Google. With nearly a decade of experience in Local SEO and digital marketing, I combine technical SEO, Google Business Profile optimization and conversion-focused websites to turn searches into real customers.',
  aboutIntro:
    'Local SEO & Digital Marketing specialist with over 10 years of experience in real estate and legal SEO marketing. I build strategies that boost organic visibility, map-pack rankings and conversions in highly competitive local markets.',
  aboutBody:
    'I leverage technical SEO, on-page optimization, citation (NAP) accuracy and multilingual keyword research (English, Portuguese and Spanish) to grow traffic that converts. Fluent in three languages, I communicate clearly with global teams and stakeholders, bridging the gap between technical teams and executive leadership — translating technical needs for decision-makers and simplifying strategy for the team. In 2024 I completed an Agile Project Management certification to further strengthen cross-functional collaboration and project outcomes.',
  meta: {
    home: {
      title: 'Cristiane Abreu | Local SEO & Digital Marketing',
      description:
        'Local SEO & digital marketing specialist helping local businesses rank on Google Maps, grow organic traffic and generate more leads.',
    },
    about: {
      title: 'About Cristiane Abreu | Local SEO Specialist',
      description:
        '10+ years of Local SEO and digital marketing experience in real estate and legal markets. Trilingual: English, Portuguese and Spanish.',
    },
    projects: {
      title: 'Projects | Local SEO & Website Results',
      description: 'Local SEO and lead-generation website projects for real estate, agencies, salons and eCommerce.',
    },
    education: {
      title: 'Education & Certifications | Cristiane Abreu',
      description: 'Rutgers coding bootcamp, BS in Computer Information Technologies, Agile Project Management and Google certifications.',
    },
    blog: {
      title: 'Local SEO Blog | Tips for Local Businesses',
      description: 'Practical Local SEO, Google Business Profile and digital marketing tips for small and local businesses.',
    },
    contact: {
      title: 'Contact | Book a Local SEO Consultation',
      description: 'Send a message or book a free Local SEO consultation with Cristiane Abreu.',
    },
  },
}

export const services = [
  { title: 'Local SEO & Google Maps', img: '/images/searchengineoptimization.webp', text: 'Google Business Profile optimization, citations (NAP), reviews strategy and local keyword targeting to win the map pack.' },
  { title: 'SEO for WordPress', img: '/images/seoforwordpress.webp', text: 'Technical audits, speed fixes, metadata, internal linking and schema markup for WordPress websites.' },
  { title: 'Google Ads & PPC', img: '/images/googleads.webp', text: 'Local search campaigns and monthly PPC reporting focused on calls, leads and ROI.' },
  { title: 'Digital Marketing Strategy', img: '/images/digital-marketing.webp', text: 'Keyword research, competitor analysis and content plans in English, Portuguese and Spanish.' },
  { title: 'Website & SEO Analysis', img: '/images/website-analysis.webp', text: 'Audits with SEMrush, GA4, Search Console, Screaming Frog and BrightLocal — with a clear action plan.' },
  { title: 'Reporting & Analytics', img: '/images/analyze.webp', text: 'Google Analytics 4 and Tag Manager setup, conversion tracking and easy-to-read monthly reports.' },
]

export const projects = [
  { title: 'Real Estate WordPress Website', img: '/images/project-real-estate.webp', tags: 'Local SEO, WordPress, Lead Generation', link: 'https://athensrealestate.pro/', description: 'Designed a clean, mobile-friendly WordPress website for a local real estate agent to showcase listings, rank locally and attract clients.' },
  { title: 'SEO Marketing Agency', img: '/images/project-seo-agency.webp', tags: 'Local SEO, Content, WordPress', link: 'https://professionalwebsite.co/', description: 'WordPress website for a freelance digital SEO marketing project, designed to boost lead generation and local visibility.' },
  { title: 'Hair Extension Salons NYC', img: '/images/project-hair-salon.webp', tags: 'Local SEO, Google Business Profile, Redesign', link: 'https://customhairbycatherine.com/', description: 'Redesigned the Hair Extension Salons NYC website to boost lead generation and improve local visibility.' },
  { title: 'Fashion Club', img: '/images/project-fashion-club.webp', tags: 'eCommerce SEO, Brand Visibility', link: 'https://fashionclubnj.com/', description: "Created an eCommerce website for Fashion Club to sell luxury dresses and enhance the brand's online presence." },
]

export const experience = [
  {
    company: 'TEKsystems Inc. | New Providence, NJ',
    roles: [
      { title: 'Project Manager', text: 'Established clear objectives, deliverables, timelines and roadmaps; identified risks and mitigation strategies. Coordinated team activities and stakeholder communication, consulted clients and upsold SEO services, trained junior team members on SEO projects, built SEO and PPC action plans and created monthly marketing reports.' },
      { title: 'SEO Specialist', text: 'Monitored the performance of 390+ websites with SEMrush, GA4, Google Tag Manager, Search Console, Screaming Frog and BrightLocal. Applied internal linking, metadata optimization and citation (NAP) accuracy; ran keyword research and competitor analysis; fixed speed issues and broken links, acquired backlinks and installed Analytics and Search Console for every project to maximize ROI.' },
    ],
  },
  {
    company: 'Affordable Websites LLC | Charlotte, NC (Remote)',
    roles: [
      { title: 'Website & SEO Implementation', text: 'Turned designs into fast, responsive, cross-browser websites with a strong focus on user experience, Core Web Vitals and search visibility, collaborating with cross-functional teams in an Agile environment.' },
      { title: 'WordPress Specialist', text: 'Built and updated WordPress websites, customizing themes and functionality for client needs, improving performance and on-page SEO, managing MySQL data and deploying to multiple hosting environments.' },
    ],
  },
]

export const skills = [
  'Local SEO', 'Google Business Profile', 'Technical SEO', 'On-Page SEO', 'Keyword Research', 'Citations (NAP)',
  'Google Analytics 4', 'Google Tag Manager', 'Search Console', 'SEMrush', 'Screaming Frog', 'BrightLocal',
  'Google Ads / PPC', 'WordPress', 'HTML & CSS', 'JavaScript', 'Agile Project Management', 'Problem-solving',
  'Reliability', 'Accountability',
]

export const education = [
  { school: 'Rutgers University', detail: 'Coding Bootcamp — Newark, NJ' },
  { school: 'South Piedmont Community College', detail: 'BS in Computer Information Technologies — Monroe, NC' },
  { school: 'E.E. Monsenhor Amantino Dos Santos', detail: 'Bachelor of Arts in Elementary Education — Brazil' },
]

export const courses = [
  { course: 'Code Bootcamp', details: 'Software Engineering — HTML, CSS, JavaScript, React, Python', provider: 'Coding Temple' },
  { course: 'Project Management', details: 'Agile Project Management Certified', provider: 'University System of Maryland' },
  { course: 'Google Analytics', details: 'Google Data Analytics', provider: 'Google Career Certificates' },
]

export const businessTypes = [
  'Real Estate', 'Legal / Law Firm', 'Health & Wellness', 'Beauty & Salon', 'Restaurant & Food', 'Home Services',
  'Retail / eCommerce', 'Professional Services', 'Other',
]
