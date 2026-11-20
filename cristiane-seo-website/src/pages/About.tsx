import Seo, { personLd } from '@/components/Seo'
import { BookButton } from '@/components/Layout'
import PageHeader from '@/components/PageHeader'
import { experience, skills } from '@/data/content'
import { useSettings } from '@/lib/useSettings'
import { PHONE } from '@/lib/config'

export default function About() {
  const s = useSettings()
  return (
    <>
      <Seo title={s.meta.about.title} description={s.meta.about.description} path="/about" jsonLd={personLd} />
      <PageHeader kicker="Local SEO & Digital Marketing Specialist" title="About Cristiane Abreu" />

      <section className="container-page grid items-center gap-14 py-20 md:grid-cols-[1fr_1.4fr]">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="frame -rotate-3"><img src="/images/cristianeabreu.webp" alt="Portrait of Cristiane Abreu" className="aspect-[4/5] w-full object-cover" loading="lazy" /></div>
          <div className="frame absolute -bottom-10 -right-6 hidden w-2/5 rotate-6 sm:block">
            <img src="/images/searchengineoptimization.webp" alt="" aria-hidden="true" loading="lazy" className="aspect-square w-full object-cover" />
          </div>
        </div>
        <div>
          <p className="kicker">My story</p>
          <h2 className="mt-3 font-serif text-4xl font-light sm:text-5xl">Hello, I&rsquo;m Cristiane</h2>
          <p className="mt-6 text-lg">{s.aboutIntro}</p>
          <p className="mt-4 text-brand-darkest/90">{s.aboutBody}</p>
          <p className="mt-6 font-script text-4xl">Cristiane</p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <BookButton />
            <a href={`tel:${PHONE}`} className="link">{PHONE}</a>
          </div>
        </div>
      </section>

      <section className="soft-bg py-20">
        <div className="container-page">
          <div className="text-center">
            <p className="kicker">Where I&rsquo;ve worked</p>
            <h2 className="heading-caps mt-4 text-4xl sm:text-5xl">Experience</h2>
            <div className="thin-rule mx-auto mt-6" />
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {experience.map((e) => (
              <div key={e.company} className="card p-8">
                <h3 className="font-serif text-2xl font-light">{e.company}</h3>
                {e.roles.map((r) => (
                  <div key={r.title} className="mt-6 border-t border-brand-light pt-5">
                    <h4 className="kicker">{r.title}</h4>
                    <p className="mt-2 text-[15px] text-brand-darkest/90">{r.text}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 text-center">
        <p className="kicker">Toolbox</p>
        <h2 className="heading-caps mt-4 text-4xl sm:text-5xl">Skills</h2>
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {skills.map((sk) => <li key={sk} className="chip border-brand-light bg-brand-lightest/60 text-brand-darkest">{sk}</li>)}
        </ul>
      </section>
      <img src="/images/markentinggroup.webp" alt="Digital marketing team planning a local SEO campaign" loading="lazy" className="h-72 w-full object-cover" />
    </>
  )
}
