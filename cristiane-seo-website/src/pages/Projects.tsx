import Seo from '@/components/Seo'
import PageHeader from '@/components/PageHeader'
import { BookButton } from '@/components/Layout'
import { projects } from '@/data/content'
import { useSettings } from '@/lib/useSettings'

export default function Projects() {
  const s = useSettings()
  return (
    <>
      <Seo title={s.meta.projects.title} description={s.meta.projects.description} path="/projects" />
      <PageHeader kicker="Recent work" title="Projects">
        <p>Websites and Local SEO work built to improve local visibility and generate leads.</p>
      </PageHeader>
      <section className="container-page grid gap-10 py-20 md:grid-cols-2">
        {projects.map((p) => (
          <article key={p.title} className="flex flex-col border border-brand-light p-3">
            <div className="flex h-60 items-center justify-center bg-brand-lightest/60 p-8">
              <img src={p.img} alt={p.title} loading="lazy" className="max-h-full w-auto object-contain" />
            </div>
            <div className="flex flex-1 flex-col px-4 py-7 text-center">
              <p className="kicker text-[10px]">{p.tags}</p>
              <h2 className="mt-3 font-serif text-3xl font-light">{p.title}</h2>
              <p className="mt-4 flex-1 text-brand-darkest/90">{p.description}</p>
              <div className="mt-6"><a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-primary">Visit website</a></div>
            </div>
          </article>
        ))}
      </section>
      <section className="bg-brand-light py-14 text-center">
        <h2 className="font-serif text-3xl font-light sm:text-4xl">Want results like these for your business?</h2>
        <div className="mt-6"><BookButton /></div>
      </section>
    </>
  )
}
