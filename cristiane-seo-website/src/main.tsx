import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import * as Sentry from '@sentry/react'
import App from './App'
import { store } from './store'
import './index.css'

const dsn = import.meta.env.VITE_SENTRY_DSN
if (dsn) {
  Sentry.init({ dsn, environment: import.meta.env.MODE, integrations: [Sentry.browserTracingIntegration()], tracesSampleRate: 0.2 })
}

const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID
if (gaId) {
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(s)
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void }
  w.dataLayer = w.dataLayer || []
  w.gtag = (...a: unknown[]) => { w.dataLayer.push(a) }
  w.gtag('js', new Date())
  w.gtag('config', gaId)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<p style={{ padding: 40, textAlign: 'center' }}>Something went wrong. Please refresh the page.</p>}>
      <HelmetProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </HelmetProvider>
    </Sentry.ErrorBoundary>
  </StrictMode>,
)
