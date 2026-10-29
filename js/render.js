/**
 * render.js - Portfolio DOM Renderer
 * Ivan Oliver D. Mijares | Personal Portfolio Website
 * 
 * Plain JavaScript file (NOT an ES module).
 * Reads global data variables from data.js and builds all DOM sections.
 * 
 * Exposes the global `Render` object.
 */

(function () {
  'use strict';

  /**
   * Helper: Get assembled email address from PROFILE.emailParts (anti-scraping)
   * @returns {string}
   */
  function getEmail() {
    if (typeof PROFILE !== 'undefined' && Array.isArray(PROFILE.emailParts) && PROFILE.emailParts.length >= 2) {
      return PROFILE.emailParts[0] + '@' + PROFILE.emailParts[1];
    }
    return '';
  }

  /**
   * Helper: Safely escape HTML characters
   * @param {string} str
   * @returns {string}
   */
  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Global Render object
   */
  const Render = {
    /**
     * 1. Navigation (#nav-links)
     * Renders nav links from NAV_LINKS
     */
    renderNav() {
      const container = document.getElementById('nav-links');
      if (!container || typeof NAV_LINKS === 'undefined' || !Array.isArray(NAV_LINKS)) {
        return;
      }

      const isList = container.tagName.toLowerCase() === 'ul' || container.tagName.toLowerCase() === 'ol';

      const linksHtml = NAV_LINKS.map(link => {
        const linkTag = `<a href="${link.href}" class="nav__link nav-link">${escapeHtml(link.label)}</a>`;
        return isList ? `<li class="nav__item">${linkTag}</li>` : linkTag;
      }).join('');

      // If container is a div without a list, wrap in nav__list for styles.css compatibility
      if (!isList) {
        container.innerHTML = `<ul class="nav__list">${NAV_LINKS.map(link => `<li><a href="${link.href}" class="nav__link nav-link">${escapeHtml(link.label)}</a></li>`).join('')}</ul>`;
      } else {
        container.innerHTML = linksHtml;
      }
    },

    /**
     * 2. Hero Section (#hero-content)
     * Renders eyebrow, name, role line, location, intro, CTA buttons, social links, profile photo/placeholder
     */
    renderHero() {
      const container = document.getElementById('hero-content');
      if (!container || typeof PROFILE === 'undefined') {
        return;
      }

      const email = getEmail();

      // Profile photo or circular placeholder with lucide user icon
      const photoHtml = PROFILE.photo
        ? `<div class="profile-avatar">
             <img src="${PROFILE.photo}" alt="${escapeHtml(PROFILE.name)}" width="160" height="160" loading="lazy">
           </div>`
        : `<div class="profile-avatar">
             <div class="profile-avatar__placeholder" aria-label="Profile photo placeholder">
               <i data-lucide="user" aria-hidden="true"></i>
             </div>
           </div>`;

      container.innerHTML = `
        <div class="hero__grid">
          <div class="hero__content">
            <p class="hero__eyebrow">${escapeHtml(PROFILE.eyebrow)}</p>
            <h1 class="hero__heading">${escapeHtml(PROFILE.name)}</h1>
            <p class="hero__role">${escapeHtml(PROFILE.role)}</p>
            <div class="hero__location">
              <i data-lucide="map-pin" aria-hidden="true"></i>
              <span>${escapeHtml(PROFILE.location)}</span>
            </div>
            <p class="hero__intro">${escapeHtml(PROFILE.intro)}</p>

            <div class="hero__actions">
              <a href="#projects" class="btn btn--primary">View Projects</a>
              <a href="#contact" class="btn btn--secondary">Get in Touch</a>
              <div class="hero__socials">
                <a href="${PROFILE.github}" target="_blank" rel="noopener noreferrer" class="btn btn--ghost btn--icon hero__social-link" aria-label="GitHub profile (opens in new tab)">
                  <i class="devicon-github-original" aria-hidden="true"></i>
                </a>
                <a href="mailto:${email}" class="btn btn--ghost btn--icon hero__social-link" aria-label="Send email to Ivan">
                  <i data-lucide="mail" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="hero__visual">
            ${photoHtml}
          </div>
        </div>
      `;
    },

    /**
     * 3. About Section (#about-content)
     * Renders about paragraphs and quick facts cards
     */
    renderAbout() {
      const container = document.getElementById('about-content');
      if (!container || typeof ABOUT === 'undefined') {
        return;
      }

      const paragraphsHtml = (ABOUT.paragraphs || []).map(p => {
        return `<p>${escapeHtml(p)}</p>`;
      }).join('');

      const factsHtml = (ABOUT.quickFacts || []).map(fact => {
        return `
          <div class="fact-item">
            <div class="fact-item__icon" aria-hidden="true">
              <i data-lucide="${fact.icon}"></i>
            </div>
            <div class="fact-item__content">
              <span class="fact-item__value">${escapeHtml(fact.text)}</span>
            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = `
        <div class="about__grid">
          <div class="about__text">
            ${paragraphsHtml}
          </div>
          <div class="quick-facts">
            ${factsHtml}
          </div>
        </div>
      `;
    },

    /**
     * 4. Skills Section (#skills-content)
     * Renders grid of skill group cards with header icons and skill chips
     */
    renderSkills() {
      const container = document.getElementById('skills-content');
      if (!container || typeof SKILLS === 'undefined' || !Array.isArray(SKILLS)) {
        return;
      }

      const groupsHtml = SKILLS.map(group => {
        const chipsHtml = (group.skills || []).map(skill => {
          const iconHtml = skill.iconType === 'devicon'
            ? `<i class="${skill.iconClass} tech-chip__icon" aria-hidden="true"></i>`
            : `<i data-lucide="${skill.iconClass}" class="tech-chip__icon" aria-hidden="true"></i>`;

          const levelBadgeHtml = skill.level
            ? `<span class="tech-chip__badge">${escapeHtml(skill.level)}</span>`
            : '';

          const noteHtml = skill.note
            ? ` <span class="tech-chip__badge">${escapeHtml(skill.note)}</span>`
            : '';

          return `
            <span class="tech-chip skill-chip">
              ${iconHtml}
              <span class="tech-chip__name">${escapeHtml(skill.name)}</span>
              ${levelBadgeHtml}
              ${noteHtml}
            </span>
          `;
        }).join('');

        return `
          <div class="card skill-card">
            <div class="skill-card__header">
              <div class="skill-card__icon" aria-hidden="true">
                <i data-lucide="${group.icon}"></i>
              </div>
              <h3 class="skill-card__title">${escapeHtml(group.title)}</h3>
            </div>
            <div class="skill-card__chips chips-wrap">
              ${chipsHtml}
            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = `<div class="skills-grid">${groupsHtml}</div>`;
    },

    /**
     * 5. Projects Section (#project-filters, #projects-grid, and #more-github / #more-repos)
     * Renders filter buttons, project cards, and More on GitHub row
     */
    renderProjects() {
      // 5.1 Project Filters
      const filtersContainer = document.getElementById('project-filters');
      if (filtersContainer) {
        filtersContainer.innerHTML = `
          <div class="project-filters" role="group" aria-label="Filter projects by category">
            <button type="button" class="filter-btn active" data-filter="all" aria-pressed="true">All</button>
            <button type="button" class="filter-btn" data-filter="web" aria-pressed="false">Web</button>
            <button type="button" class="filter-btn" data-filter="mobile" aria-pressed="false">Mobile</button>
            <button type="button" class="filter-btn" data-filter="ai" aria-pressed="false">AI / ML</button>
          </div>
        `;
      }

      // 5.2 Projects Grid
      const gridContainer = document.getElementById('projects-grid');
      if (gridContainer && typeof PROJECTS !== 'undefined' && Array.isArray(PROJECTS)) {
        const cardsHtml = PROJECTS.map(project => {
          const projectImages = Array.isArray(project.images) && project.images.length
            ? project.images
            : project.image ? [project.image] : [];

          const imageHtml = projectImages.length
            ? `<img src="${projectImages[0]}" alt="${escapeHtml(project.title)} screenshot" width="640" height="400" loading="lazy">`
            : `<div class="screenshot-placeholder" aria-label="Screenshot placeholder">
                 <i data-lucide="image" aria-hidden="true"></i>
                 <span>Screenshot coming soon</span>
               </div>`;

          const categoriesAttr = (project.categories || []).join(' ');

          const techChipsHtml = (project.tech || []).map(t => {
            const iconHtml = t.iconType === 'devicon'
              ? `<i class="${t.iconClass} tech-chip__icon" aria-hidden="true"></i>`
              : `<i data-lucide="${t.iconClass}" class="tech-chip__icon" aria-hidden="true"></i>`;
            return `<span class="tech-chip">${iconHtml}<span>${escapeHtml(t.name)}</span></span>`;
          }).join('');

          return `
            <article class="card project-card" data-project-id="${project.id}" data-categories="${categoriesAttr}" role="button" tabindex="0" aria-haspopup="dialog" aria-label="View details for ${escapeHtml(project.title)}">
              <div class="project-card__thumb">
                ${imageHtml}
              </div>
              <div class="project-card__body">
                <div class="project-card__header">
                  <h3 class="project-card__title">${escapeHtml(project.title)}</h3>
                </div>
                <p class="project-card__summary">${escapeHtml(project.summary)}</p>
                <div class="project-card__chips chips-wrap">
                  ${techChipsHtml}
                </div>
                <div class="project-card__footer">
                  <span class="project-card__link-text">
                    <span>View details</span>
                    <i data-lucide="arrow-right" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
            </article>
          `;
        }).join('');

        gridContainer.innerHTML = cardsHtml;
        if (!gridContainer.classList.contains('projects-grid')) {
          gridContainer.classList.add('projects-grid');
        }
      }

      // 5.3 More on GitHub
      const moreReposContainer = document.getElementById('more-github') || document.getElementById('more-repos');
      if (moreReposContainer && typeof MORE_REPOS !== 'undefined' && Array.isArray(MORE_REPOS)) {
        const reposHtml = MORE_REPOS.map(repo => {
          return `
            <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="more-github__link">
              <strong>${escapeHtml(repo.name)}</strong>
              <span>(${escapeHtml(repo.tech)})</span>
              <i data-lucide="external-link" aria-hidden="true"></i>
            </a>
          `;
        }).join('');

        const allReposUrl = typeof GITHUB_ALL_REPOS !== 'undefined'
          ? GITHUB_ALL_REPOS
          : 'https://github.com/i-o-me?tab=repositories';

        moreReposContainer.innerHTML = `
          <div class="more-github">
            <span class="more-github__title">
              <i class="devicon-github-original" aria-hidden="true"></i>
              More on GitHub
            </span>
            <div class="more-github__items">
              ${reposHtml}
              <a href="${allReposUrl}" target="_blank" rel="noopener noreferrer" class="more-github__link">
                <span>View all repositories</span>
                <i data-lucide="arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        `;
      }
    },

    /**
     * 6. Project Modal Content (#modal-content)
     * Populates modal dialog with screenshot, title, summary, details, tech chips, and action links
     * @param {string} projectId
     */
    renderModalContent(projectId) {
      const container = document.getElementById('modal-content');
      if (!container || typeof PROJECTS === 'undefined') {
        return;
      }

      const project = PROJECTS.find(p => p.id === projectId);
      if (!project) {
        container.innerHTML = '<p class="modal__error">Project details could not be found.</p>';
        return;
      }

      const projectImages = Array.isArray(project.images) && project.images.length
        ? project.images
        : project.image ? [project.image] : [];
      const isDietProject = project.id === 'diet-recommendation';

      const screenshotHtml = projectImages.length > 0
        ? `<div class="modal__carousel ${isDietProject ? 'modal__carousel--diet-fit' : ''}" data-project-id="${project.id}">
             <div class="modal__gallery-stage">
               ${projectImages.map((img, index) => `
                 <div class="modal__screenshot ${index === 0 ? 'is-active' : ''}" data-slide-index="${index}" ${index === 0 ? '' : 'hidden'}>
                   <img src="${img}" alt="${escapeHtml(project.title)} screenshot ${index + 1}" width="640" height="400" loading="lazy">
                 </div>
               `).join('')}
             </div>
             <div class="modal__carousel-controls">
               <button type="button" class="modal__nav-btn modal__nav-btn--prev" data-action="prev" aria-label="Previous screenshot">
                 <i data-lucide="chevron-left" aria-hidden="true"></i>
               </button>
               <span class="modal__carousel-count">1 / ${projectImages.length}</span>
               <button type="button" class="modal__nav-btn modal__nav-btn--next" data-action="next" aria-label="Next screenshot">
                 <i data-lucide="chevron-right" aria-hidden="true"></i>
               </button>
             </div>
           </div>`
        : `<div class="screenshot-placeholder modal__screenshot" aria-label="Screenshot placeholder">
             <i data-lucide="image" aria-hidden="true"></i>
             <span>Screenshot coming soon</span>
           </div>`;

      const detailsHtml = (project.details && project.details.length > 0)
        ? `<div>
             <h4 class="modal__details-heading">Key Highlights</h4>
             <ul class="modal__details-list">
               ${project.details.map(d => `<li>${escapeHtml(d)}</li>`).join('')}
             </ul>
           </div>`
        : '';

      const techChipsHtml = (project.tech || []).map(t => {
        const iconHtml = t.iconType === 'devicon'
          ? `<i class="${t.iconClass} tech-chip__icon" aria-hidden="true"></i>`
          : `<i data-lucide="${t.iconClass}" class="tech-chip__icon" aria-hidden="true"></i>`;
        return `<span class="tech-chip">${iconHtml}<span>${escapeHtml(t.name)}</span></span>`;
      }).join('');

      const repoBtn = project.repo
        ? `<a href="${project.repo}" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
             <i class="devicon-github-original" aria-hidden="true"></i>
             <span>View Repository</span>
             <i data-lucide="external-link" aria-hidden="true"></i>
           </a>`
        : '';

      const demoBtn = project.demo
        ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">
             <i data-lucide="globe" aria-hidden="true"></i>
             <span>Live Demo</span>
             <i data-lucide="external-link" aria-hidden="true"></i>
           </a>`
        : '';

      const footerHtml = (repoBtn || demoBtn)
        ? `<div class="modal__footer">${repoBtn}${demoBtn}</div>`
        : '';

      container.innerHTML = `
        <div class="modal__header">
          <h2 class="modal__title" id="modal-title">${escapeHtml(project.title)}</h2>
        </div>
        <div class="modal__body">
          ${screenshotHtml}
          <p class="modal__summary">${escapeHtml(project.summary)}</p>
          ${detailsHtml}
          <div>
            <h4 class="modal__tech-heading">Technologies Used</h4>
            <div class="chips-wrap" style="margin-top: 0.5rem;">
              ${techChipsHtml}
            </div>
          </div>
        </div>
        ${footerHtml}
      `;

      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    },

    /**
     * 7. Experience & Education Timeline (#timeline-content)
     * Renders vertical alternating timeline
     */
    renderTimeline() {
      const container = document.getElementById('timeline-content');
      if (!container || typeof TIMELINE === 'undefined' || !Array.isArray(TIMELINE)) {
        return;
      }

      const timelineItemsHtml = TIMELINE.map((item, index) => {
        const dateHtml = item.date
          ? `<time class="timeline__date">${escapeHtml(item.date)}</time>`
          : '';

        return `
          <div class="timeline__item">
            <div class="timeline__dot" aria-hidden="true"></div>
            <div class="card timeline__card">
              <div class="timeline__meta">
                <span class="timeline__badge">${item.type === 'work' ? 'Experience' : 'Education'}</span>
                ${dateHtml}
              </div>
              <h3 class="timeline__title">${escapeHtml(item.title)}</h3>
              <p class="timeline__org">${escapeHtml(item.organization)}</p>
              <p class="timeline__desc">${escapeHtml(item.description)}</p>
            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = `<div class="timeline">${timelineItemsHtml}</div>`;
    },

    /**
     * 8. Certifications (#certifications-content)
     * Renders grid of cert cards with lucide award icon
     */
    renderCertifications() {
      const container = document.getElementById('certifications-content');
      if (!container || typeof CERTIFICATIONS === 'undefined' || !Array.isArray(CERTIFICATIONS)) {
        return;
      }

      const certsHtml = CERTIFICATIONS.map(cert => {
        return `
          <div class="card cert-card">
            <div class="cert-card__icon" aria-hidden="true">
              <i data-lucide="award"></i>
            </div>
            <div class="cert-card__content">
              <h3 class="cert-card__title">${escapeHtml(cert.title)}</h3>
              <p class="cert-card__issuer">${escapeHtml(cert.issuer)}</p>
              <time class="cert-card__date">${escapeHtml(cert.date)}</time>
            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = `<div class="certs-grid">${certsHtml}</div>`;
    },

    /**
     * 9. Contact (#contact-content)
     * Renders contact intro, large tappable rows, copy email button with polite live feedback
     */
    renderContact() {
      const container = document.getElementById('contact-content');
      if (!container || typeof PROFILE === 'undefined') {
        return;
      }

      const email = getEmail();
      const githubDisplay = (PROFILE.github || '').replace(/^https?:\/\//, '');

      container.innerHTML = `
        <p class="contact__intro">I'm open to opportunities and happy to talk about a project.</p>

        <div class="contact-list">
          <!-- Email row with copy button -->
          <div class="contact-row contact-row--email">
            <div class="contact-row__main">
              <div class="contact-row__icon" aria-hidden="true">
                <i data-lucide="mail"></i>
              </div>
              <div class="contact-row__info">
                <span class="contact-row__label">Email</span>
                <a href="mailto:${email}" class="contact-row__value">${email}</a>
              </div>
            </div>
            <div class="contact-row__action">
              <button type="button" id="copy-email-btn" class="copy-btn" aria-label="Copy email address" data-email="${email}">
                <i data-lucide="copy" class="copy-btn__icon-copy" aria-hidden="true"></i>
                <i data-lucide="check" class="copy-btn__icon-check" aria-hidden="true"></i>
                <span class="copy-btn__text">Copy</span>
              </button>
            </div>
          </div>

          <!-- Phone row -->
          <a href="${PROFILE.phoneLink}" class="contact-row">
            <div class="contact-row__main">
              <div class="contact-row__icon" aria-hidden="true">
                <i data-lucide="phone"></i>
              </div>
              <div class="contact-row__info">
                <span class="contact-row__label">Phone</span>
                <span class="contact-row__value">${escapeHtml(PROFILE.phone)}</span>
              </div>
            </div>
            <div class="contact-row__action" aria-hidden="true">
              <i data-lucide="arrow-right" class="icon-sm"></i>
            </div>
          </a>

          <!-- GitHub row -->
          <a href="${PROFILE.github}" target="_blank" rel="noopener noreferrer" class="contact-row">
            <div class="contact-row__main">
              <div class="contact-row__icon" aria-hidden="true">
                <i class="devicon-github-original"></i>
              </div>
              <div class="contact-row__info">
                <span class="contact-row__label">GitHub</span>
                <span class="contact-row__value">${escapeHtml(githubDisplay)}</span>
              </div>
            </div>
            <div class="contact-row__action" aria-hidden="true">
              <i data-lucide="external-link" class="icon-sm"></i>
            </div>
          </a>

          <!-- Location row (not a link) -->
          <div class="contact-row" style="cursor: default;">
            <div class="contact-row__main">
              <div class="contact-row__icon" aria-hidden="true">
                <i data-lucide="map-pin"></i>
              </div>
              <div class="contact-row__info">
                <span class="contact-row__label">Location</span>
                <span class="contact-row__value">${escapeHtml(PROFILE.location)}</span>
              </div>
            </div>
          </div>
        </div>

        <div id="copy-feedback" class="sr-only" aria-live="polite"></div>
      `;
    },

    /**
     * 10. Footer (#footer-content)
     * Renders copyright with current year, GitHub icon link, and Back to top link
     */
    renderFooter() {
      const container = document.getElementById('footer-content');
      if (!container || typeof PROFILE === 'undefined') {
        return;
      }

      const currentYear = new Date().getFullYear();

      container.innerHTML = `
        <div class="footer__inner">
          <p class="footer__text">&copy; ${currentYear} ${escapeHtml(PROFILE.name)}</p>
          <div class="footer__links">
            <a href="${PROFILE.github}" target="_blank" rel="noopener noreferrer" class="footer__link" aria-label="GitHub profile">
              <i class="devicon-github-original" aria-hidden="true"></i>
              <span>GitHub</span>
            </a>
            <a href="#top" class="footer__link" aria-label="Back to top">
              <i data-lucide="arrow-up" aria-hidden="true"></i>
              <span>Back to top</span>
            </a>
          </div>
        </div>
      `;
    },

    /**
     * Optional: GitHub Recent Repositories Strip (#github-repos-content)
     * @param {Array} repos
     */
    renderGitHubRepos(repos) {
      const container = document.getElementById('github-repos-content');
      if (!container || !Array.isArray(repos) || repos.length === 0) {
        return;
      }

      const itemsHtml = repos.map(repo => {
        return `
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="github-strip__item">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
              <strong style="color: var(--text); font-size: 0.9375rem;">${escapeHtml(repo.name)}</strong>
              <i data-lucide="external-link" aria-hidden="true" style="width: 14px; height: 14px; color: var(--accent);"></i>
            </div>
            <p style="font-size: 0.8125rem; color: var(--text-muted); line-height: 1.5; margin: 0.25rem 0;">${escapeHtml(repo.description || 'No description provided.')}</p>
            <div style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.75rem; color: var(--text-muted); margin-top: auto;">
              ${repo.language ? `<span>${escapeHtml(repo.language)}</span>` : ''}
              ${typeof repo.stargazers_count === 'number' ? `<span>${repo.stargazers_count} stars</span>` : ''}
            </div>
          </a>
        `;
      }).join('');

      container.innerHTML = `<div class="github-strip">${itemsHtml}</div>`;

      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    },

    /**
     * 11. Render.init()
     * Calls all render methods in order and creates Lucide vector icons
     */
    init() {
      this.renderNav();
      this.renderHero();
      this.renderAbout();
      this.renderSkills();
      this.renderProjects();
      this.renderTimeline();
      this.renderCertifications();
      this.renderContact();
      this.renderFooter();

      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }
  };

  // Expose global Render object and renderModalContent function
  window.Render = Render;
  window.renderModalContent = Render.renderModalContent.bind(Render);
})();
