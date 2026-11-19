import Seo, { personLd } from '@/components/Seo'
import { BookButton } from '@/components/Layout'
import { experience, skills } from '@/data/content'
import { useSettings } from '@/lib/useSettings'
import { PHONE } from '@/lib/config'

export default function About() {
  const s = useSettings()
  return (
    <div className="container-page py-14">
      <Seo title={s.meta.about.title} description={s.meta.about.description} path="/about" jsonLd={personLd} />
      <div className="grid items-start gap-10 md:grid-cols-[1fr_2fr]">
        <img src="/images/cristianeabreu.webp" alt="Portrait of Cristiane Abreu" className="w-full rounded-3xl object-cover shadow-lg" loading="lazy" />
        <div>
          <h1 className="text-4xl">About Cristiane Abreu</h1>
          <p className="mt-2 font-semibold text-primary">Local SEO & Digital Marketing Specialist</p>
          <p className="mt-5 text-lg text-slate-700">{s.aboutIntro}</p>
          <p className="mt-4 text-slate-700">{s.aboutBody}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <BookButton className="btn-primary" />
            <a href={`tel:${PHONE}`} className="font-semibold text-primary">{PHONE}</a>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="section-title">Experience</h2>
        <div className="space-y-8">
          {experience.map((e) => (
            <div key={e.company} className="card">
              <h3 className="text-xl">{e.company}</h3>
              {e.roles.map((r) => (
                <div key={r.title} className="mt-4">
                  <h4 className="font-semibold text-primary">{r.title}</h4>
                  <p className="mt-1 text-slate-700">{r.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="section-title">Skills</h2>
        <ul className="flex flex-wrap gap-2">
          {skills.map((sk) => <li key={sk} className="badge bg-accent-soft px-3 py-1.5 text-sm text-primary-dark">{sk}</li>)}
        </ul>
      </section>
      <img src="/images/markentinggroup.webp" alt="Digital marketing team planning a local SEO campaign" loading="lazy" className="mt-16 h-64 w-full rounded-3xl object-cover" />
    </div>
  )
}
