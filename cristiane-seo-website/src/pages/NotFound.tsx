import { Link } from 'react-router-dom'
import Seo from '@/components/Seo'

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <Seo title="Page not found | Cristiane Abreu" description="The page you are looking for does not exist." noindex />
      <p className="kicker">Error 404</p>
      <h1 className="heading-caps mt-4 text-5xl">Page not found</h1>
      <p className="mt-4 text-brand-darkest/90">Sorry, this page does not exist.</p>
      <Link to="/" className="btn-primary mt-8">Go home</Link>
    </div>
  )
}
