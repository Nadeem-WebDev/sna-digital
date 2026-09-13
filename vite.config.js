import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

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

            if (!pat || !baseId) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: 'Missing AIRTABLE_PAT or AIRTABLE_BASE_ID in .env' }));
            }

            try {
              const response = await fetch(
                `https://api.airtable.com/v0/${baseId}/projects?view=Grid%20view`,
                { headers: { Authorization: `Bearer ${pat}` } }
              );

              const data = await response.json();

              if (!response.ok) {
                res.statusCode = response.status;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify(data));
              }

              const projects = (data.records || []).map((record) => {
                const rawTags = record.fields.tags || '';
                const tagsArray = Array.isArray(rawTags) 
                  ? rawTags 
                  : rawTags.split(',').map((t) => t.trim()).filter(Boolean);

                return {
                  title: record.fields.title || 'Untitled Project',
                  description: record.fields.description || '',
                  tags: tagsArray,
                  metric: record.fields.metric || '',
                  liveUrl: record.fields.liveUrl || '#',
                  githubUrl: record.fields.githubUrl || '#',
                  image: record.fields.image || '',
                };
              });

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(projects));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        },
      },
    ],
  };
});