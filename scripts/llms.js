// Builds /llms.txt: a plain-text summary of the business for AI assistants
// (ChatGPT, Claude, Perplexity...). Generated at build time so the project
// list always matches Airtable.
export function buildLlmsTxt(projects) {
  const projectLines = projects.length
    ? projects
        .map((p) => {
          const link = p.liveUrl && p.liveUrl !== '#' ? ` (${p.liveUrl})` : '';
          const tags = p.tags?.length ? ` Built with: ${p.tags.join(', ')}.` : '';
          return `- **${p.title}**${link}: ${p.description}${tags}`;
        })
        .join('\n')
    : '- See https://sna-digital.vercel.app/#projects';

  return `# SNA Digital

> SNA Digital is a freelance web development studio in Goregaon West, Mumbai, India, run by full-stack developer Nadeem Shaikh. It builds custom websites, booking platforms and web apps for local businesses, and runs Meta ads and local SEO / Google Ads campaigns to bring them customers.

## About

- Founder: Nadeem Shaikh, Full Stack Web Developer, B.E. Information Technology (2025)
- Location: Bhagat Singh Nagar, Goregaon West, Mumbai, Maharashtra 400104, India
- Serves: Goregaon, Andheri and the rest of Mumbai in person; clients across India remotely
- Work model: freelance, project-based. Pricing is quoted per project after discussing the client's requirements.

## Services

- **Custom Web Development**: fast, custom-designed websites and web apps, including built-in booking systems and property databases tailored to the business.
- **Meta & Social Ads**: hyper-local, data-driven Facebook and Instagram ad campaigns that capture high-intent leads and drive footfall.
- **Local SEO & Google Ads**: local search optimisation and Google Ads so the business appears first when nearby clients search for its services.

## Tech stack

React, Node.js, Express, Python, PHP, Tailwind CSS, Framer Motion, MongoDB, MySQL, PostgreSQL, Linux, Git/GitHub.

## Projects

${projectLines}

## Contact

- Website: https://sna-digital.vercel.app/
- Email: nadeem786shaikh92@gmail.com
- Phone / WhatsApp: +91 8972469383
- LinkedIn: https://www.linkedin.com/in/nadeem-shaikh-1035a4345/
- GitHub: https://github.com/Nadeem-WebDev
- Instagram: https://www.instagram.com/nadeem_7_shaikh/
`;
}
