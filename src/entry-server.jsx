import { renderToString } from 'react-dom/server';
import { prerender } from 'react-dom/static';
import App from './App.jsx';

// Used at build time by scripts/prerender.js to generate static HTML for crawlers.
export async function render(props) {
  // First pass waits for the lazy-loaded sections so their code is resolved...
  await prerender(<App {...props} />);
  // ...then a synchronous render outputs every section inline, with no hidden
  // streaming placeholders that crawlers without JavaScript couldn't read
  return renderToString(<App {...props} />);
}
