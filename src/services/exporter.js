export const exportPortfolioToHtml = (data) => {
  const {
    personal = {},
    skills = [],
    projects = [],
    experience = [],
    education = [],
    socials = {}
  } = data;

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill.name);
    return acc;
  }, {});

  const skillsHtml = Object.entries(skillsByCategory).map(([category, items]) => `
    <div class="skills-category">
      <h3>${category}</h3>
      <div class="skills-grid">
        ${items.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
      </div>
    </div>
  `).join('');

  const projectsHtml = projects.map(proj => `
    <div class="project-card">
      ${proj.image ? `<div class="project-img-wrapper"><img src="${proj.image}" alt="${proj.title}" class="project-img"></div>` : ''}
      <div class="project-content">
        <h3>${proj.title}</h3>
        <p>${proj.description}</p>
        ${proj.tech ? `
          <div class="project-tech">
            ${proj.tech.split(',').map(t => `<span class="tech-tag">${t.trim()}</span>`).join('')}
          </div>
        ` : ''}
        <div class="project-links">
          ${proj.demoUrl ? `<a href="${proj.demoUrl}" target="_blank" class="btn btn-secondary">Live Demo</a>` : ''}
          ${proj.githubUrl ? `<a href="${proj.githubUrl}" target="_blank" class="btn btn-muted">GitHub</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  const experienceHtml = experience.map(exp => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-header">
        <span class="timeline-role">${exp.role}</span>
        <span class="timeline-company">${exp.company}</span>
      </div>
      <span class="timeline-duration">${exp.duration}</span>
      <p class="timeline-achievements">${exp.achievements}</p>
    </div>
  `).join('');

  const educationHtml = education.map(edu => `
    <div class="education-item">
      <h3>${edu.degree}</h3>
      <span class="edu-inst">${edu.institution}</span>
      <span class="edu-year">Graduated: ${edu.year}</span>
    </div>
  `).join('');

  const socialLinksHtml = `
    ${socials.github ? `<a href="${socials.github}" target="_blank" class="social-link">GitHub</a>` : ''}
    ${socials.linkedin ? `<a href="${socials.linkedin}" target="_blank" class="social-link">LinkedIn</a>` : ''}
    ${socials.twitter ? `<a href="${socials.twitter}" target="_blank" class="social-link">Twitter / X</a>` : ''}
    ${socials.customUrl && socials.customLabel ? `<a href="${socials.customUrl}" target="_blank" class="social-link">${socials.customLabel}</a>` : ''}
  `;

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${personal.name || 'My Portfolio'} | ${personal.title || 'Developer'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-primary: #0F172A;
      --bg-secondary: #1E293B;
      --card-bg: rgba(23, 32, 43, 0.7);
      --text-primary: #FFFFFF;
      --text-secondary: #94A3B8;
      --accent: #69AFDC;
      --accent-hover: #4A8DB5;
      --border: rgba(255, 255, 255, 0.08);
      --glow: rgba(105, 175, 220, 0.15);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--bg-primary);
      background-image: linear-gradient(135deg, #0F172A 0%, #1A2A3C 100%);
      color: var(--text-primary);
      line-height: 1.6;
      overflow-x: hidden;
      min-height: 100vh;
    }

    h1, h2, h3, h4 {
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 2rem;
    }

    /* Header & Hero Section */
    header {
      padding: 5rem 0 3rem 0;
      border-bottom: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1.5rem;
    }

    .profile-img {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid var(--accent);
      box-shadow: 0 0 25px var(--glow);
    }

    .hero-name {
      font-size: 3rem;
      letter-spacing: -1px;
      margin-bottom: 0.25rem;
      background: linear-gradient(135deg, #ffffff 0%, var(--accent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-title {
      font-size: 1.5rem;
      color: var(--accent);
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .hero-bio {
      max-width: 650px;
      color: var(--text-secondary);
      font-size: 1.05rem;
      margin-bottom: 1.5rem;
    }

    .meta-details {
      display: flex;
      gap: 1.5rem;
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    /* Social Links */
    .socials {
      display: flex;
      gap: 1.25rem;
    }

    .social-link {
      color: var(--text-secondary);
      text-decoration: none;
      font-weight: 500;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.02);
    }

    .social-link:hover {
      color: var(--accent);
      border-color: var(--accent);
      background: rgba(105, 175, 220, 0.05);
    }

    /* Sections */
    section {
      padding: 4rem 0;
      border-bottom: 1px solid var(--border);
    }

    .section-title {
      font-size: 2rem;
      margin-bottom: 2.5rem;
      position: relative;
      display: inline-block;
    }

    .section-title::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -6px;
      width: 40px;
      height: 3px;
      background-color: var(--accent);
      border-radius: 2px;
    }

    /* Skills */
    .skills-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .skills-category {
      background: var(--card-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border);
      padding: 1.5rem;
      border-radius: 16px;
    }

    .skills-category h3 {
      font-size: 1.15rem;
      margin-bottom: 1rem;
      color: var(--accent);
      border-bottom: 1px solid rgba(255,255,255,0.05);
      padding-bottom: 0.5rem;
    }

    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .skill-badge {
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--border);
      padding: 0.4rem 0.8rem;
      border-radius: 8px;
      font-size: 0.85rem;
      color: var(--text-secondary);
      transition: all 0.2s;
    }

    .skill-badge:hover {
      color: var(--text-primary);
      border-color: var(--accent);
      background: rgba(105, 175, 220, 0.05);
    }

    /* Projects Grid */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
    }

    .project-card {
      background: var(--card-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      border-color: rgba(105, 175, 220, 0.3);
    }

    .project-img-wrapper {
      width: 100%;
      height: 180px;
      overflow: hidden;
      border-bottom: 1px solid var(--border);
      background: rgba(0, 0, 0, 0.2);
    }

    .project-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .project-card:hover .project-img {
      transform: scale(1.05);
    }

    .project-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .project-content h3 {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
      color: var(--text-primary);
    }

    .project-content p {
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin-bottom: 1.25rem;
      flex-grow: 1;
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1.5rem;
    }

    .tech-tag {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      background: rgba(105, 175, 220, 0.08);
      border: 1px solid rgba(105, 175, 220, 0.15);
      border-radius: 6px;
      color: var(--accent);
    }

    .project-links {
      display: flex;
      gap: 0.75rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.6rem 1.2rem;
      border-radius: 8px;
      font-weight: 500;
      text-decoration: none;
      font-size: 0.85rem;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .btn-secondary {
      background: var(--accent);
      color: #0F172A;
    }

    .btn-secondary:hover {
      background: var(--accent-hover);
    }

    .btn-muted {
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-primary);
      border: 1px solid var(--border);
    }

    .btn-muted:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
    }

    /* Timeline Experience */
    .timeline {
      position: relative;
      padding-left: 2rem;
      margin-left: 0.5rem;
      border-left: 2px solid var(--border);
    }

    .timeline-item {
      position: relative;
      margin-bottom: 3rem;
    }

    .timeline-item:last-child {
      margin-bottom: 0;
    }

    .timeline-dot {
      position: absolute;
      left: calc(-2rem - 6px);
      top: 6px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent);
      border: 2px solid var(--bg-primary);
      box-shadow: 0 0 10px var(--accent);
    }

    .timeline-header {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 0.5rem;
      margin-bottom: 0.25rem;
    }

    .timeline-role {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .timeline-company {
      font-size: 1rem;
      color: var(--accent);
      font-weight: 500;
    }

    .timeline-duration {
      display: block;
      font-size: 0.8rem;
      color: var(--text-secondary);
      margin-bottom: 0.75rem;
    }

    .timeline-achievements {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }

    /* Education Item */
    .education-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .education-item {
      background: var(--card-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
    }

    .education-item h3 {
      font-size: 1.15rem;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .edu-inst {
      color: var(--accent);
      font-size: 0.95rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .edu-year {
      color: var(--text-secondary);
      font-size: 0.85rem;
    }

    /* Footer */
    footer {
      padding: 4rem 0 2rem 0;
      text-align: center;
      color: var(--text-secondary);
      font-size: 0.85rem;
    }

    footer a {
      color: var(--accent);
      text-decoration: none;
    }

    @media (max-width: 768px) {
      .hero-name { font-size: 2.25rem; }
      .meta-details { flex-direction: column; gap: 0.5rem; align-items: center; }
      .container { padding: 1rem; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      ${personal.image ? `<img src="${personal.image}" alt="${personal.name}" class="profile-img">` : ''}
      <div>
        <h1 class="hero-name">${personal.name || 'Anonymous User'}</h1>
        <p class="hero-title">${personal.title || 'Creative Professional'}</p>
        <p class="hero-bio">${personal.bio || 'Welcome to my online portfolio dashboard. I build premium web applications and user interfaces.'}</p>
      </div>

      <div class="meta-details">
        ${personal.location ? `<div class="meta-item">📍 ${personal.location}</div>` : ''}
        ${personal.email ? `<div class="meta-item">✉️ <a href="mailto:${personal.email}" style="color: inherit;">${personal.email}</a></div>` : ''}
      </div>

      <div class="socials">
        ${socialLinksHtml}
      </div>
    </header>

    ${skills.length > 0 ? `
    <section id="skills">
      <h2 class="section-title">My Skills</h2>
      <div class="skills-wrapper">
        ${skillsHtml}
      </div>
    </section>
    ` : ''}

    ${projects.length > 0 ? `
    <section id="projects">
      <h2 class="section-title">Featured Projects</h2>
      <div class="projects-grid">
        ${projectsHtml}
      </div>
    </section>
    ` : ''}

    ${experience.length > 0 ? `
    <section id="experience">
      <h2 class="section-title">Experience</h2>
      <div class="timeline">
        ${experienceHtml}
      </div>
    </section>
    ` : ''}

    ${education.length > 0 ? `
    <section id="education">
      <h2 class="section-title">Education</h2>
      <div class="education-grid">
        ${educationHtml}
      </div>
    </section>
    ` : ''}

    <footer>
      <p>&copy; ${new Date().getFullYear()} ${personal.name || 'Anonymous'}. Built with <a href="#">PortfolioPro</a>.</p>
    </footer>
  </div>
</body>
</html>`;

  // Trigger download of the HTML file
  const element = document.createElement("a");
  const file = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  element.href = URL.createObjectURL(file);
  element.download = `${(personal.name || 'portfolio').toLowerCase().replace(/\s+/g, '-')}-portfolio.html`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
