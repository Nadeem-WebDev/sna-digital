import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import './index.css'
import { NotFound } from './pages/NotFound.jsx'

// Entry for 404.html. Not prerendered: the page is noindex, so crawlers don't need its content
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotFound />
  </StrictMode>
)

// Log 404s to Analytics so broken links pointing at the site show up in reports
const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID
if (trackingId) {
  ReactGA.initialize(trackingId)
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname, title: '404 Not Found' })
}
