import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Seo, { businessLd, personLd } from '@/components/Seo'
import { BookButton } from '@/components/Layout'
import { projects, services } from '@/data/content'
import { useSettings } from '@/lib/useSettings'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchPublicPosts } from '@/store/postsSlice'
import { fmtDate } from '@/lib/utils'
import { SOCIAL } from '@/lib/config'

const tiles = [
  { label: 'Services', to: '#services', img: '/images/searchengineoptimization.webp', alt: 'Local SEO strategy notes on a desk' },
  { label: 'About', to: '/about', img: '/images/cristianeabreu.webp', alt: 'Portrait of Cristiane Abreu' },
  { label: 'Projects', to: '/projects', img: '/images/website-analysis.webp', alt: 'Website analysis on a laptop' },
]

function TileLink({ to, className, children }: { to: string; className: string; children: ReactNode }) {
  return to.startsWith('#') ? <a href={to} className={className}>{children}</a> : <Link to={to} className={className}>{children}</Link>
}

export default function Home() {
  const s = useSettings()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const posts = useAppSelector((st) => st.posts.items.filter((p) => p.status === 'published' && p.publishAt <= Date.now()).slice(0, 3))
  const [quick, setQuick] = useState({ name: '', email: '' })
  useEffect(() => { dispatch(fetchPublicPosts()) }, [dispatch])

  function startContact(e: FormEvent) {
    e.preventDefault()
    navigate(`/contact?${new URLSearchParams(quick).toString()}`)
  }

  return (
    <>
      <Seo title={s.meta.home.title} description={s.meta.home.description} path="/" jsonLd={[personLd, businessLd]} />

      {/* 1 — Full-bleed hero photo with framed intro box */}
      <section className="relative">
        <img src="/images/digital-marketing.webp" alt="" aria-hidden="true" fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-brand-lightest/30" />
        <div className="container-page relative flex min-h-[520px] items-center justify-center py-16 sm:min-h-[600px]">
          <div className="w-full max-w-3xl bg-white/95 p-3 shadow-xl">
            <div className="border border-brand-light px-6 py-10 text-center sm:px-12 sm:py-14">
              <p className="kicker">Local SEO &amp; Digital Marketing</p>
              <h1 className="heading-caps mt-5 text-4xl sm:text-6xl">{s.heroTitle}</h1>
              <p className="mx-auto mt-5 max-w-xl text-base text-brand-darkest/90">Get found on Google. Turn local searches into real customers.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <BookButton />
                <Link to="/contact" className="btn-outline">Contact me</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Image tiles with label overlays */}
      <section className="container-page grid gap-6 py-14 sm:grid-cols-3">
        {tiles.map((t) => (
          <TileLink key={t.label} to={t.to} className="group block border border-brand-light p-2.5 transition hover:border-brand-darkest">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={t.img} alt={t.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-3 bottom-3 bg-white/90 py-3 text-center font-display text-xs font-semibold uppercase tracking-[0.28em] text-brand-darkest transition group-hover:bg-brand-darkest group-hover:text-white">
                {t.label}
              </span>
            </div>
          </TileLink>
        ))}
      </section>

      {/* 3 — Inline "get in touch" band (like the reference newsletter bar) */}
      <section className="bg-brand-lightest">
        <form onSubmit={startContact} className="container-page flex flex-col items-stretch gap-4 py-8 lg:flex-row lg:items-center">
          <h2 className="shrink-0 font-serif text-3xl font-light lg:mr-6">Let&rsquo;s talk Local SEO</h2>
          <label className="sr-only" htmlFor="q-name">First name</label>
          <input id="q-name" className="input flex-1" placeholder="First name" value={quick.name} onChange={(e) => setQuick({ ...quick, name: e.target.value })} />
          <label className="sr-only" htmlFor="q-email">Email address</label>
          <input id="q-email" type="email" className="input flex-1" placeholder="Email address" value={quick.email} onChange={(e) => setQuick({ ...quick, email: e.target.value })} />
          <button className="btn-primary">Get in touch</button>
        </form>
      </section>

      {/* 4 — Photo collage around centered intro text */}
      <section className="relative overflow-hidden py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_1.2fr_1fr]">
          <div className="relative mx-auto w-64 lg:w-full">
            <img src="/images/cristiane-abreu.webp" alt="Cristiane Abreu, Local SEO specialist" width={900} height={1200} loading="lazy"
              className="aspect-[3/4] w-full object-cover" />
            <img src="/images/seoforwordpress.webp" alt="" aria-hidden="true" loading="lazy"
              className="absolute -bottom-8 -left-6 hidden w-32 border-4 border-white object-cover shadow-md sm:block" />
          </div>
          <div className="text-center">
            <p className="kicker">Strategy that brings customers to your door</p>
            <h2 className="heading-caps mt-5 text-4xl sm:text-5xl">Local growth, without the overwhelm.</h2>
            <p className="mx-auto mt-6 max-w-md text-brand-darkest/90">{s.heroSubtitle}</p>
            <Link to="/about" className="btn-primary mt-8">Learn more</Link>
          </div>
          <img src="/images/markentinggroup.webp" alt="Marketing team planning a local SEO campaign" loading="lazy"
            className="hidden aspect-[4/5] w-full object-cover lg:block lg:-mt-24" />
        </div>
      </section>

      {/* 5 — About snippet with tilted framed photos */}
      <section className="soft-bg overflow-hidden py-20">
        <div className="container-page grid items-center gap-14 md:grid-cols-2">
          <div className="relative mx-auto h-[420px] w-full max-w-md sm:h-[480px]">
            <div className="frame absolute left-0 top-0 w-[62%] -rotate-6">
              <img src="/images/crisbg.webp" alt="Cristiane Abreu smiling" loading="lazy" className="aspect-square w-full object-cover" />
            </div>
            <div className="frame absolute bottom-0 right-0 w-[62%] rotate-3">
              <img src="/images/analyze.webp" alt="SEO analytics reports" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
          <div>
            <p className="kicker">Hello, I&rsquo;m Cristiane</p>
            <h2 className="mt-3 font-serif text-4xl font-light sm:text-5xl">About Cristiane</h2>
            <p className="mt-6 text-brand-darkest/90">{s.aboutIntro}</p>
            <p className="mt-6 font-semibold">Fluent in English, Portuguese and Spanish</p>
            <p className="mt-3 line-clamp-4 text-brand-darkest/90">{s.aboutBody}</p>
            <p className="mt-6 font-script text-4xl text-brand-darkest">Cristiane</p>
            <Link to="/about" className="btn-primary mt-6">Read more of my story</Link>
          </div>
        </div>
      </section>

      {/* 6 — Services / offer cards */}
      <section id="services" className="container-page scroll-mt-16 py-20">
        <div className="text-center">
          <p className="kicker">How I can help</p>
          <h2 className="heading-caps mt-4 text-4xl sm:text-5xl">Services</h2>
          <div className="thin-rule mx-auto mt-6" />
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((sv) => (
            <article key={sv.title} className="flex flex-col bg-brand-lightest/60 p-4 text-center">
              <div className="frame"><img src={sv.img} alt={sv.title} loading="lazy" className="aspect-[4/3] w-full object-cover" /></div>
              <p className="kicker mt-6">Local SEO service</p>
              <h3 className="mt-2 font-serif text-2xl font-light">{sv.title}</h3>
              <p className="mt-3 flex-1 px-2 text-[15px] text-brand-darkest/90">{sv.text}</p>
              <div className="mt-6"><Link to="/contact" className="btn-primary">Get started</Link></div>
            </article>
          ))}
        </div>
      </section>

      {/* 7 — Quick access split */}
      <section className="soft-bg overflow-hidden py-20">
        <div className="container-page grid items-center gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div className="divide-y divide-brand-light">
            <p className="kicker pb-4">Quick access</p>
            {[
              { title: 'Work With Me', text: 'Book a free consultation and get a clear Local SEO action plan for your business.', cta: <BookButton label="Book a call →" /> },
              { title: 'See My Projects', text: 'Real estate, agency, salon and eCommerce websites built to rank locally and generate leads.', cta: <Link to="/projects" className="btn-primary">View projects →</Link> },
              { title: 'Read the Latest', text: 'Practical Local SEO, Google Business Profile and digital marketing tips for small businesses.', cta: <Link to="/blog" className="btn-primary">Visit the blog →</Link> },
            ].map((q) => (
              <div key={q.title} className="py-7">
                <h3 className="font-serif text-3xl font-light sm:text-4xl">{q.title}</h3>
                <p className="mt-3 max-w-xl text-brand-darkest/90">{q.text}</p>
                <div className="mt-5">{q.cta}</div>
              </div>
            ))}
          </div>
          <div className="relative mx-auto w-full max-w-sm pb-16">
            <img src="/images/cris.webp" alt="Professional reviewing a local marketing plan" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            <div className="frame absolute -bottom-2 -right-4 w-1/2 rotate-6">
              <img src="/images/googleads.webp" alt="" aria-hidden="true" loading="lazy" className="aspect-square w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 8 — Latest from the blog (when published) */}
      {posts.length > 0 && (
        <section className="container-page py-20">
          <h2 className="heading-caps text-center text-4xl sm:text-5xl">Latest from the blog</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.id} to={`/blog/${p.slug}`} className="group relative block aspect-[3/4] overflow-hidden">
                <img src={p.coverImage || '/images/searchengineoptimization.webp'} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-6 bottom-8 bg-white px-5 py-6 text-center">
                  <p className="kicker text-[10px]">{p.tags[0] || fmtDate(p.publishAt)}</p>
                  <h3 className="mt-2 font-serif text-2xl font-light leading-tight group-hover:underline">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center"><Link to="/blog" className="btn-outline">All articles</Link></div>
        </section>
      )}

      {/* 9 — Featured projects */}
      <section className="container-page py-20">
        <div className="mb-12 text-center">
          <p className="kicker">Recent work</p>
          <h2 className="heading-caps mt-4 text-4xl sm:text-5xl">Featured projects</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <a key={p.title} href={p.link} target="_blank" rel="noopener noreferrer" className="group flex flex-col border border-brand-light p-2.5 transition hover:border-brand-darkest">
              <div className="flex aspect-[4/3] items-center justify-center bg-brand-lightest/50 p-6">
                <img src={p.img} alt={p.title} loading="lazy" className="max-h-full w-auto object-contain" />
              </div>
              <div className="flex-1 px-3 py-5 text-center">
                <p className="kicker text-[10px]">{p.tags.split(',')[0]}</p>
                <h3 className="mt-2 font-serif text-xl font-light group-hover:underline">{p.title}</h3>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-10 text-center"><Link to="/projects" className="btn-primary">See all projects</Link></div>
      </section>

      {/* 10 — CTA band */}
      <section className="bg-brand-light">
        <div className="container-page py-16 text-center">
          <p className="kicker">Free consultation</p>
          <h2 className="mt-4 font-serif text-4xl font-light sm:text-5xl">Ready to get more customers from Google?</h2>
          <p className="mx-auto mt-4 max-w-2xl">Book a free consultation and get a clear Local SEO action plan for your business.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3"><BookButton /><Link to="/contact" className="btn-outline">Send a message</Link></div>
        </div>
      </section>

      {/* 11 — Image strip */}
      <section aria-label="Follow along" className="pt-14">
        <p className="kicker mb-6 text-center">
          <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">Follow along on LinkedIn →</a>
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6">
          {['searchengineoptimization', 'crisbg', 'digital-marketing', 'website-analysis', 'cristiane-abreu', 'analyze'].map((n) => (
            <a key={n} href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="group block aspect-square overflow-hidden" aria-label="Cristiane Abreu on LinkedIn">
              <img src={`/images/${n}.webp`} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-90" />
            </a>
          ))}
        </div>
      </section>
    </>
  )
}
