import Seo from '@/components/Seo'
import PageHeader from '@/components/PageHeader'
import { courses, education } from '@/data/content'
import { useSettings } from '@/lib/useSettings'

export default function Education() {
  const s = useSettings()
  return (
    <>
      <Seo title={s.meta.education.title} description={s.meta.education.description} path="/education" />
      <PageHeader kicker="Always learning" title="Education" />
      <section className="container-page py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {education.map((e, i) => (
            <div key={e.school} className="bg-brand-lightest/60 p-8 text-center">
              <p className="font-serif text-4xl font-extralight text-brand-muted">0{i + 1}</p>
              <h2 className="mt-3 font-serif text-2xl font-light">{e.school}</h2>
              <p className="mt-3 text-[15px] text-brand-darkest/90">{e.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <p className="kicker">Professional development</p>
          <h2 className="heading-caps mt-4 text-3xl sm:text-4xl">Courses &amp; Certifications</h2>
          <div className="thin-rule mx-auto mt-6" />
        </div>
        <div className="mt-10 overflow-x-auto border border-brand-light">
          <table className="table-base">
            <thead><tr><th>Course</th><th>Details</th><th>Provider</th></tr></thead>
            <tbody className="divide-y divide-brand-light">
              {courses.map((c) => <tr key={c.course}><td className="font-medium">{c.course}</td><td>{c.details}</td><td>{c.provider}</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>
      <img src="/images/cris.webp" alt="Cristiane Abreu at work" loading="lazy" className="h-72 w-full object-cover" />
    </>
  )
}
