import { useState } from 'react'

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  const links = [
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: 'X', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { name: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
  ]
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-primary-dark">Share:</span>
      {links.map((l) => (
        <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm">
          {l.name}
        </a>
      ))}
      <button
        type="button"
        className="btn-ghost btn-sm"
        onClick={() => navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) })}
      >
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  )
}
