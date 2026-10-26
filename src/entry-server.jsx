import { renderToString } from 'react-dom/server';
import App from './App.jsx';

// Used at build time by scripts/prerender.js to generate static HTML for crawlers
export function render(props) {
  return renderToString(<App {...props} />);
}
