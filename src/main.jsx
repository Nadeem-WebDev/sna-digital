import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App initialProjects={window.__INITIAL_PROJECTS__ || []} />
  </StrictMode>
)

// Production HTML is prerendered (scripts/prerender.js), so attach to it; dev starts empty
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
