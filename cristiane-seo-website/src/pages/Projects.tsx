import Seo from '@/components/Seo'
import { projects } from '@/data/content'
import { useSettings } from '@/lib/useSettings'

export default function Projects() {
  const s = useSettings()
  return (
    <div className="container-page py-14">
      <Seo title={s.meta.projects.title} description={s.meta.projects.description} path="/projects" />
      <h1 className="text-4xl">Projects</h1>
      <p className="mt-3 max-w-2xl text-slate-600">Websites and Local SEO work built to improve local visibility and generate leads.</p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {projects.map((p) => (
          <article key={p.title} className="card flex flex-col p-0">
            <img src={p.img} alt={p.title} loading="lazy" className="h-56 w-full rounded-t-2xl bg-accent-soft object-contain" />
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-2xl">{p.title}</h2>
              <p className="mt-1 text-sm font-medium text-primary">{p.tags}</p>
              <p className="mt-3 flex-1 text-slate-700">{p.description}</p>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-outline mt-5 self-start">Visit website</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
