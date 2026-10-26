// Shared by the Vercel API route, the Vite dev server and the build-time prerender
export async function fetchProjects(pat, baseId) {
  const response = await fetch(
    `https://api.airtable.com/v0/${baseId}/projects?view=Grid%20view`,
    { headers: { Authorization: `Bearer ${pat}` } }
  );

  const data = await response.json();

  if (!response.ok) {
    const error = new Error('Airtable request failed');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return (data.records || []).map((record) => {
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
}
