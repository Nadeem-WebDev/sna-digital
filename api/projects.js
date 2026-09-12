export default async function handler(req, res) {
  const { AIRTABLE_PAT, AIRTABLE_BASE_ID } = process.env;

  if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID) {
    return res.status(500).json({ error: "Missing API credentials" });
  }

  try {
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/projects?view=Grid%20view`, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    const projects = (data.records || []).map((record) => {
      const rawTags = record.fields.tags || '';
      const tagsArray = Array.isArray(rawTags) 
        ? rawTags 
        : rawTags.split(',').map((t) => t.trim()).filter(Boolean);

      return {
        title: record.fields.title || "Untitled Project",
        description: record.fields.description || "",
        tags: tagsArray,
        metric: record.fields.metric || "",
        liveUrl: record.fields.liveUrl || "#",
        githubUrl: record.fields.githubUrl || "#",
        image: record.fields.image || "",
      };
    });

    return res.status(200).json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return res.status(500).json({ error: "Failed to fetch projects" });
  }
}