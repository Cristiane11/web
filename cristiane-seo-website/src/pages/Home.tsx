import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Seo, { businessLd, personLd } from '@/components/Seo'
import { BookButton } from '@/components/Layout'
import { projects, services } from '@/data/content'
import { useSettings } from '@/lib/useSettings'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchPublicPosts } from '@/store/postsSlice'
import { fmtDate } from '@/lib/utils'

export default function Home() {
  const s = useSettings()
  const dispatch = useAppDispatch()
  const posts = useAppSelector((st) => st.posts.items.filter((p) => p.status === 'published').slice(0, 3))
  useEffect(() => { dispatch(fetchPublicPosts()) }, [dispatch])

  return (
    <>
      <Seo title={s.meta.home.title} description={s.meta.home.description} path="/" jsonLd={[personLd, businessLd]} />
      <section className="bg-gradient-to-br from-primary-dark via-primary to-green-600 text-white">
        <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-accent">Local SEO & Digital Marketing</p>
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">{s.heroTitle}</h1>
            <p className="mt-5 text-lg text-green-50">{s.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookButton className="btn-accent" />
              <Link to="/contact" className="btn border border-white/60 text-white hover:bg-white/10">Contact me</Link>
            </div>
          </div>
          <img src="/images/cristiane-abreu.webp" alt="Cristiane Abreu, Local SEO specialist" width={900} height={1200}
            className="mx-auto aspect-[3/4] w-full max-w-sm rounded-3xl object-cover shadow-2xl ring-4 ring-accent/40" fetchPriority="high" />
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="section-title text-center">How I help local businesses grow</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((sv) => (
            <article key={sv.title} className="card overflow-hidden p-0">
              <img src={sv.img} alt={sv.title} loading="lazy" className="h-44 w-full object-cover" />
              <div className="p-5">
                <h3 className="text-lg">{sv.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{sv.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-accent-soft py-16">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="section-title mb-0">Latest projects</h2>
            <Link to="/projects" className="btn-ghost">See all projects →</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p) => (
              <a key={p.title} href={p.link} target="_blank" rel="noopener noreferrer" className="card group p-0">
                <img src={p.img} alt={p.title} loading="lazy" className="h-36 w-full rounded-t-2xl bg-white object-contain" />
                <div className="p-4">
                  <h3 className="text-base group-hover:text-primary">{p.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{p.tags}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="container-page py-16">
          <h2 className="section-title">From the blog</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.id} to={`/blog/${p.slug}`} className="card hover:border-primary">
                <p className="text-xs text-slate-500">{fmtDate(p.publishAt)}</p>
                <h3 className="mt-1 text-lg">{p.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="bg-primary-dark py-14 text-center text-white">
        <div className="container-page">
          <h2 className="text-3xl text-white">Ready to get more customers from Google?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-green-100">Book a free consultation and get a clear Local SEO action plan for your business.</p>
          <div className="mt-6"><BookButton /></div>
        </div>
      </section>
    </>
  )
}
