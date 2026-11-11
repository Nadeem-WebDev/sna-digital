import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

// Runs the Vercel serverless functions in /api on the Vite dev server,
// so `npm run dev` behaves like production for /api/* requests
const vercelApiDev = (env) => ({
  name: 'vercel-api-dev',
  configureServer(server) {
    // Vercel functions read secrets from process.env
    Object.assign(process.env, env);

    server.middlewares.use('/api', async (req, res, next) => {
      const name = req.url.split('?')[0].replace(/^\/+|\/+$/g, '');
      const file = path.resolve('api', `${name}.js`);
      if (!name || !fs.existsSync(file)) return next();

      // Vercel parses JSON bodies onto req.body
      let raw = '';
      for await (const chunk of req) raw += chunk;
      try {
        req.body = raw && req.headers['content-type']?.includes('application/json') ? JSON.parse(raw) : raw;
      } catch {
        req.body = raw;
      }

      // Vercel's res.status().json() helpers
      res.status = (code) => { res.statusCode = code; return res; };
      res.json = (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
        return res;
      };

      try {
        const { default: handler } = await server.ssrLoadModule(file);
        await handler(req, res);
      } catch (err) {
        console.error(`[api/${name}]`, err);
        if (!res.headersSent) res.status(500).json({ error: err.message });
      }
    });
  },
});

// Vercel answers unknown URLs with dist/404.html; this makes `npm run dev` and
// `npm run preview` do the same instead of falling back to the home page
const notFoundPage = () => {
  const rewriteUnknownPages = (req, _res, next) => {
    const pathname = req.url.split('?')[0];
    const wantsPage = req.method === 'GET' && req.headers.accept?.includes('text/html');
    const isKnown = pathname === '/' || pathname === '/index.html' || pathname === '/404.html';
    // Anything with a file extension, or Vite/API internals, is left alone
    const isAssetOrInternal = path.extname(pathname) !== '' || /^\/(@|api\/|node_modules\/|src\/)/.test(pathname);

    if (wantsPage && !isKnown && !isAssetOrInternal) req.url = '/404.html';
    next();
  };

  return {
    name: 'not-found-page',
    configureServer(server) {
      server.middlewares.use(rewriteUnknownPages);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewriteUnknownPages);
    },
  };
};

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      tailwindcss(),
      react(),
      vercelApiDev(env),
      notFoundPage(),
    ],
    // Two pages: the site and the 404 page (the SSR build keeps its own entry)
    build: isSsrBuild ? {} : {
      rollupOptions: {
        input: {
          main: path.resolve('index.html'),
          notFound: path.resolve('404.html'),
        },
      },
    },
  };
});
