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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      tailwindcss(),
      react(),
      vercelApiDev(env),
    ],
  };
});
