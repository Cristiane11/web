import Seo from '@/components/Seo'
import { courses, education } from '@/data/content'
import { useSettings } from '@/lib/useSettings'

export default function Education() {
  const s = useSettings()
  return (
    <div className="container-page py-14">
      <Seo title={s.meta.education.title} description={s.meta.education.description} path="/education" />
      <h1 className="text-4xl">Education</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {education.map((e) => (
          <div key={e.school} className="card">
            <h2 className="text-lg">{e.school}</h2>
            <p className="mt-2 text-sm text-slate-600">{e.detail}</p>
          </div>
        ))}
      </div>
      <h2 className="section-title mt-14">Courses & Certifications</h2>
      <div className="overflow-x-auto rounded-2xl border border-green-100">
        <table className="table-base">
          <thead><tr><th>Course</th><th>Details</th><th>Provider</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {courses.map((c) => <tr key={c.course}><td className="font-medium">{c.course}</td><td>{c.details}</td><td>{c.provider}</td></tr>)}
          </tbody>
        </table>
      </div>
      <img src="/images/cris.webp" alt="Cristiane Abreu at work" loading="lazy" className="mt-14 h-72 w-full rounded-3xl object-cover" />
    </div>
  )
}
