import type { ReactNode } from 'react'

/** Editorial page heading: small letter-spaced label, light uppercase serif title, thin rule. */
export default function PageHeader({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <section className="soft-bg border-b border-brand-light">
      <div className="container-page py-16 text-center sm:py-20">
        <p className="kicker">{kicker}</p>
        <h1 className="heading-caps mt-4 text-4xl sm:text-6xl">{title}</h1>
        <div className="thin-rule mx-auto mt-6" />
        {children && <div className="mx-auto mt-6 max-w-2xl text-brand-darkest/90">{children}</div>}
      </div>
    </section>
  )
}
