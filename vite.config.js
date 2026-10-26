import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fetchProjects } from './lib/airtableProjects.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      tailwindcss(),
      react(),
      {
        name: 'local-airtable-handler',
        configureServer(server) {
          server.middlewares.use('/api/projects', async (req, res) => {
            const pat = env.AIRTABLE_PAT;
            const baseId = env.AIRTABLE_BASE_ID;

            res.setHeader('Content-Type', 'application/json');

            if (!pat || !baseId) {
              res.statusCode = 500;
              return res.end(JSON.stringify({ error: 'Missing AIRTABLE_PAT or AIRTABLE_BASE_ID in .env' }));
            }

            try {
              const projects = await fetchProjects(pat, baseId);
              res.statusCode = 200;
              res.end(JSON.stringify(projects));
            } catch (err) {
              res.statusCode = err.status || 500;
              res.end(JSON.stringify(err.data || { error: err.message }));
            }
          });
        },
      },
    ],
  };
});
