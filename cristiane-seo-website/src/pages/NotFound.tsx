import { Link } from 'react-router-dom'
import Seo from '@/components/Seo'

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <Seo title="Page not found | Cristiane Abreu" description="The page you are looking for does not exist." noindex />
      <h1 className="text-5xl">404</h1>
      <p className="mt-4 text-slate-600">Sorry, this page does not exist.</p>
      <Link to="/" className="btn-primary mt-6">Go home</Link>
    </div>
  )
}
