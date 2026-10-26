import { fetchProjects } from '../lib/airtableProjects.js';

export default async function handler(req, res) {
  const { AIRTABLE_PAT, AIRTABLE_BASE_ID } = process.env;

  if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID) {
    return res.status(500).json({ error: "Missing API credentials" });
  }

  try {
    const projects = await fetchProjects(AIRTABLE_PAT, AIRTABLE_BASE_ID);
    return res.status(200).json(projects);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json(error.data);
    }
    console.error("Failed to fetch projects:", error);
    return res.status(500).json({ error: "Failed to fetch projects" });
  }
}
