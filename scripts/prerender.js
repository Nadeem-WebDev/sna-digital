// Runs after the client + SSR builds: renders the app to HTML and injects it
// into dist/index.html so crawlers (Google, ChatGPT, Perplexity...) see real content.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadEnv } from 'vite';
import { fetchProjects } from '../lib/airtableProjects.js';
import { buildLlmsTxt } from './llms.js';

const root = process.cwd();
const htmlPath = path.join(root, 'dist', 'index.html');
const env = loadEnv('production', root, '');

let projects = [];
if (env.AIRTABLE_PAT && env.AIRTABLE_BASE_ID) {
  try {
    projects = await fetchProjects(env.AIRTABLE_PAT, env.AIRTABLE_BASE_ID);
  } catch (err) {
    console.warn(`[prerender] Could not fetch projects, continuing without them: ${err.message}`);
  }
} else {
  console.warn('[prerender] AIRTABLE_PAT / AIRTABLE_BASE_ID not set, projects will load client-side only');
}

const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);
const appHtml = await render({ initialProjects: projects });

// Escape "<" so project text can never close the script tag early
const projectsJson = JSON.stringify(projects).replace(/</g, '\\u003c');

const template = fs.readFileSync(htmlPath, 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('[prerender] <div id="root"></div> not found in dist/index.html');
}

const html = template.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>\n    <script>window.__INITIAL_PROJECTS__ = ${projectsJson};</script>`
);

fs.writeFileSync(htmlPath, html);
fs.writeFileSync(path.join(root, 'dist', 'llms.txt'), buildLlmsTxt(projects));
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`[prerender] Wrote ${htmlPath} (${projects.length} projects, ${Math.round(appHtml.length / 1024)} KB of HTML)`);
