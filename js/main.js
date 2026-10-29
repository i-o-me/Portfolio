/**
 * main.js - Core Interactive Logic
 * Ivan Oliver D. Mijares | Personal Portfolio Website
 * 
 * Loaded after data.js and render.js.
 * Plain script file, no ES modules.
 * Sets up theme, sticky header, mobile nav, active highlighting,
 * scroll reveal, project filtering, dialog modal, copy email, back to top,
 * and optional recent GitHub repositories.
 */

(function () {
  'use strict';

  /**
   * Helper: refresh Lucide icons safely
   */
  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  /**
   * Helper: set an icon button without rebuilding the entire button markup.
   */
  function setIconButton(button, iconName) {
    if (!button) return;
    const existing = button.querySelector('[data-lucide]');
    if (existing) {
      existing.setAttribute('data-lucide', iconName);
      refreshIcons();
      return;
    }

    button.innerHTML = `<i data-lucide="${iconName}" aria-hidden="true"></i>`;
    refreshIcons();
  }

  /**
   * Run work when the browser is idle, with a safe fallback.
   */
  function scheduleIdleWork(callback) {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(callback, { timeout: 200 });
      return;
    }

    setTimeout(callback, 50);
  }

  // ===========================================================================
  // 1. THEME TOGGLE
  // ===========================================================================
  const ThemeManager = {
    STORAGE_KEY: 'theme',

    init() {
      let currentTheme = 'light';
      try {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved === 'dark' || saved === 'light') {
          currentTheme = saved;
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          currentTheme = 'dark';
        }
      } catch (err) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          currentTheme = 'dark';
        }
      }

      this.applyTheme(currentTheme, false);

      const toggleBtn = document.getElementById('theme-toggle');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => this.toggle());
      }

      // Listen for OS color scheme change if user hasn't set an explicit preference
      try {
        if (window.matchMedia) {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const handler = (e) => {
            try {
              if (!localStorage.getItem(this.STORAGE_KEY)) {
                this.applyTheme(e.matches ? 'dark' : 'light', false);
              }
            } catch (err) {}
          };
          if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handler);
          } else if (typeof mediaQuery.addListener === 'function') {
            mediaQuery.addListener(handler);
          }
        }
      } catch (err) {}
    },

    applyTheme(theme, save = true) {
      document.documentElement.setAttribute('data-theme', theme);
      if (document.documentElement.dataset) {
        document.documentElement.dataset.theme = theme;
      }

      if (save) {
        try {
          localStorage.setItem(this.STORAGE_KEY, theme);
        } catch (err) {}
      }

      this.updateIcon(theme);
    },

    updateIcon(theme) {
      const toggleBtn = document.getElementById('theme-toggle');
      if (!toggleBtn) return;

      const isDark = theme === 'dark';
      toggleBtn.setAttribute('aria-label', isDark ? 'Toggle light mode' : 'Toggle dark mode');

      // Swap between sun and moon icon
      const targetIcon = isDark ? 'sun' : 'moon';
      setIconButton(toggleBtn, targetIcon);
    },

    toggle() {
      const current = document.documentElement.dataset.theme || document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      this.applyTheme(next, true);
    }
  };

  // ===========================================================================
  // 2. STICKY HEADER
  // ===========================================================================
  const HeaderManager = {
    init() {
      const header = document.getElementById('site-header');
      if (!header) return;

      let ticking = false;
      const updateHeader = () => {
        if (window.scrollY > 20) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
        ticking = false;
      };

      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(updateHeader);
          ticking = true;
        }
      }, { passive: true });

      updateHeader();
    }
  };

  // ===========================================================================
  // 3. MOBILE MENU
  // ===========================================================================
  const MenuManager = {
    init() {
      const menuBtn = document.getElementById('menu-toggle');
      const nav = document.getElementById('site-nav');
      if (!menuBtn || !nav) return;

      this.menuBtn = menuBtn;
      this.nav = nav;
      this.isOpen = false;

      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });

      // Close on link click inside nav
      nav.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) {
          this.close();
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
          menuBtn.focus();
        }
      });

      // Close on click outside the nav and menu button
      document.addEventListener('click', (e) => {
        if (this.isOpen && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
          this.close();
        }
      });

      // Trap focus reasonably within open menu
      nav.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab' || !this.isOpen) return;

        const focusables = [
          menuBtn,
          ...Array.from(nav.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
        ];

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      });
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    open() {
      this.isOpen = true;
      this.nav.style.transform = 'none';
      this.nav.style.opacity = '1';
      this.nav.classList.add('nav--open');
      this.menuBtn.setAttribute('aria-expanded', 'true');
      this.menuBtn.setAttribute('aria-label', 'Close menu');
      document.body.classList.remove('no-scroll');

      // Swap icon to 'x'
      setIconButton(this.menuBtn, 'x');

      // Focus first link in nav
      const firstLink = this.nav.querySelector('a');
      if (firstLink) {
        firstLink.focus();
      }
    },

    close() {
      if (!this.isOpen) return;
      this.isOpen = false;
      this.nav.style.transform = 'none';
      this.nav.style.opacity = '0';
      this.nav.classList.remove('nav--open');
      this.menuBtn.setAttribute('aria-expanded', 'false');
      this.menuBtn.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('no-scroll');

      // Swap icon to 'menu'
      setIconButton(this.menuBtn, 'menu');
    }
  };

  // ===========================================================================
  // 4. ACTIVE SECTION HIGHLIGHTING
  // ===========================================================================
  const NavHighlighter = {
    init() {
      const sections = document.querySelectorAll('main section[id]');
      const navLinks = document.querySelectorAll('#nav-links a, #site-nav a');
      if (!sections.length || !navLinks.length) return;

      if (!('IntersectionObserver' in window)) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              const href = link.getAttribute('href');
              if (href === `#${id}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'true');
              } else if (href && href.startsWith('#')) {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
              }
            });
          }
        });
      }, {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      });

      sections.forEach(section => observer.observe(section));
    }
  };

  // ===========================================================================
  // 5. SCROLL REVEAL
  // ===========================================================================
  const ScrollReveal = {
    init() {
      const revealElements = document.querySelectorAll('.reveal');
      if (!revealElements.length) return;

      // Check prefers-reduced-motion
      let prefersReducedMotion = false;
      try {
        prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      } catch (err) {}

      if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealElements.forEach(el => el.classList.add('revealed'));
        return;
      }

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });

      revealElements.forEach(el => observer.observe(el));
    }
  };

  // ===========================================================================
  // 6. PROJECT FILTERS
  // ===========================================================================
  const ProjectFilters = {
    init() {
      const filterContainer = document.getElementById('project-filters');
      const projectsGrid = document.getElementById('projects-grid');
      if (!filterContainer || !projectsGrid) return;

      const filterButtons = filterContainer.querySelectorAll('[data-filter]');
      if (!filterButtons.length) return;

      filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const filter = btn.getAttribute('data-filter');

          filterButtons.forEach(b => {
            const isSelected = b === btn;
            b.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
            if (isSelected) {
              b.classList.add('active');
            } else {
              b.classList.remove('active');
            }
          });

          this.applyFilter(filter);
        });
      });
    },

    applyFilter(filter) {
      const cards = Array.from(document.querySelectorAll('#projects-grid .project-card, #projects-grid [data-categories]'));
      if (!cards.length) return;

      const target = (filter || 'all').toLowerCase();

      requestAnimationFrame(() => {
        cards.forEach(card => {
          const rawCats = card.getAttribute('data-categories') || '';
          const categories = rawCats.split(/[\s,]+/).map(c => c.trim().toLowerCase());
          const match = target === 'all' || categories.includes(target);

          if (match) {
            card.style.display = '';
            card.classList.remove('card--hidden');
            card.classList.add('card--visible');
            card.removeAttribute('aria-hidden');
            return;
          }

          card.classList.remove('card--visible');
          card.classList.add('card--hidden');
          card.setAttribute('aria-hidden', 'true');

          setTimeout(() => {
            if (card.classList.contains('card--hidden')) {
              card.style.display = 'none';
            }
          }, 250);
        });
      });
    }
  };

  // ===========================================================================
  // 7. PROJECT MODAL
  // ===========================================================================
  const ProjectModal = {
    init() {
      const modal = document.getElementById('project-modal');
      const closeBtn = document.getElementById('modal-close');
      const projectsGrid = document.getElementById('projects-grid');
      if (!modal) return;

      this.modal = modal;
      this.closeBtn = closeBtn;
      this.lastFocused = null;

      // Listen for clicks on project cards
      if (projectsGrid) {
        projectsGrid.addEventListener('click', (e) => {
          // Ignore clicks on explicit links/buttons inside the card
          if (e.target.closest('a, button')) return;

          const card = e.target.closest('.project-card, [data-project-id]');
          if (!card) return;

          const projectId = card.getAttribute('data-project-id');
          if (projectId) {
            this.open(projectId, card);
          }
        });

        // Keyboard support (Enter/Space on cards)
        projectsGrid.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            if (e.target.closest('a, button')) return;
            const card = e.target.closest('.project-card, [data-project-id]');
            if (card) {
              e.preventDefault();
              const projectId = card.getAttribute('data-project-id');
              if (projectId) {
                this.open(projectId, card);
              }
            }
          }
        });
      }

      // Close button
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.close());
      }

      // Backdrop click and carousel nav buttons
      modal.addEventListener('click', (e) => {
        const navButton = e.target.closest('.modal__nav-btn');
        if (navButton) {
          e.preventDefault();
          this.changeSlide(navButton.getAttribute('data-action'));
          return;
        }

        // Native <dialog> click target is the dialog element itself when clicking backdrop
        if (e.target === modal) {
          this.close();
        }
      });

      // Native dialog cancel / close event (e.g. Escape key)
      modal.addEventListener('close', () => {
        document.body.classList.remove('no-scroll');
        if (this.lastFocused && typeof this.lastFocused.focus === 'function') {
          this.lastFocused.focus();
        }
      });
      modal.addEventListener('cancel', () => {
        document.body.classList.remove('no-scroll');
        if (this.lastFocused && typeof this.lastFocused.focus === 'function') {
          this.lastFocused.focus();
        }
      });
    },

    open(projectId, triggerElement) {
      this.lastFocused = triggerElement || document.activeElement;

      if (window.Render && typeof window.Render.renderModalContent === 'function') {
        window.Render.renderModalContent(projectId);
      } else if (typeof window.renderModalContent === 'function') {
        window.renderModalContent(projectId);
      }

      document.body.classList.add('no-scroll');

      if (typeof this.modal.showModal === 'function') {
        try {
          this.modal.showModal();
        } catch (err) {
          this.modal.setAttribute('open', '');
        }
      } else {
        this.modal.setAttribute('open', '');
      }

      if (this.closeBtn) {
        this.closeBtn.focus();
      }
    },

    changeSlide(direction) {
      const carousel = this.modal.querySelector('.modal__carousel');
      if (!carousel) return;

      const slides = Array.from(carousel.querySelectorAll('.modal__screenshot'));
      if (!slides.length) return;

      const activeIndex = slides.findIndex(slide => !slide.hidden);
      const currentIndex = activeIndex >= 0 ? activeIndex : 0;
      const nextIndex = direction === 'prev'
        ? (currentIndex - 1 + slides.length) % slides.length
        : (currentIndex + 1) % slides.length;

      slides.forEach((slide, index) => {
        const isActive = index === nextIndex;
        slide.classList.toggle('is-active', isActive);
        slide.hidden = !isActive;
      });

      const counter = carousel.querySelector('.modal__carousel-count');
      if (counter) {
        counter.textContent = `${nextIndex + 1} / ${slides.length}`;
      }
    },

    close() {
      if (typeof this.modal.close === 'function') {
        try {
          this.modal.close();
        } catch (err) {
          this.modal.removeAttribute('open');
        }
      } else {
        this.modal.removeAttribute('open');
      }

      document.body.classList.remove('no-scroll');
      if (this.lastFocused && typeof this.lastFocused.focus === 'function') {
        this.lastFocused.focus();
      }
    }
  };

  // ===========================================================================
  // 8. COPY EMAIL
  // ===========================================================================
  const CopyEmail = {
    init() {
      // Use event delegation on document so dynamic rendering doesn't drop the listener
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('#copy-email-btn');
        if (!btn) return;
        e.preventDefault();
        this.copy(btn);
      });
    },

    async copy(btn) {
      let email = btn.getAttribute('data-email');
      if (!email) {
        if (typeof PROFILE !== 'undefined' && Array.isArray(PROFILE.emailParts) && PROFILE.emailParts.length >= 2) {
          email = PROFILE.emailParts[0] + '@' + PROFILE.emailParts[1];
        } else {
          const emailLink = document.querySelector('a[href^="mailto:"]');
          if (emailLink) {
            email = emailLink.getAttribute('href').replace('mailto:', '').split('?')[0];
          }
        }
      }

      if (!email) return;

      let success = false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
          success = true;
        }
      } catch (err) {}

      if (!success) {
        try {
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.left = '-9999px';
          textArea.style.top = '-9999px';
          textArea.setAttribute('readonly', '');
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          success = document.execCommand('copy');
          document.body.removeChild(textArea);
        } catch (err) {}
      }

      const feedback = document.getElementById('copy-feedback');
      const originalSpan = btn.querySelector('span');
      const originalText = originalSpan ? originalSpan.textContent : 'Copy';

      // Update button state
      btn.classList.add('copied');
      btn.innerHTML = '<i data-lucide="check" aria-hidden="true"></i><span>Copied!</span>';
      refreshIcons();

      if (feedback) {
        feedback.textContent = 'Email address copied to clipboard.';
      }

      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = `<i data-lucide="copy" aria-hidden="true"></i><span>${originalText}</span>`;
        refreshIcons();
        if (feedback) {
          feedback.textContent = '';
        }
      }, 2000);
    }
  };

  // ===========================================================================
  // 9. BACK TO TOP
  // ===========================================================================
  const BackToTop = {
    init() {
      const btn = document.getElementById('back-to-top');
      if (!btn) return;

      let ticking = false;
      const onScroll = () => {
        if (window.scrollY > 500) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
        ticking = false;
      };

      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(onScroll);
          ticking = true;
        }
      }, { passive: true });

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        try {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        } catch (err) {
          window.scrollTo(0, 0);
        }
      });

      onScroll();
    }
  };

  // ===========================================================================
  // 10. SMOOTH SCROLL OFFSET
  // ===========================================================================
  const SmoothScroll = {
    init() {
      document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;

        const href = anchor.getAttribute('href');
        if (!href || href === '#' || href === '#top') {
          if (href === '#' || href === '#top') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          return;
        }

        const target = document.querySelector(href);
        if (target) {
          // Close mobile menu if open
          MenuManager.close();
        }
      });
    }
  };

  // ===========================================================================
  // 11. RECENT GITHUB REPOSITORIES (Optional Feed)
  // ===========================================================================
  const GitHubRepos = {
    async init() {
      const section = document.getElementById('github-repos');
      const content = document.getElementById('github-repos-content');
      if (!section || !content) return;

      scheduleIdleWork(async () => {
        try {
          const response = await fetch('https://api.github.com/users/i-o-me/repos?sort=updated&per_page=6', {
            headers: {
              'Accept': 'application/vnd.github.v3+json'
            }
          });

          if (!response.ok) {
            section.style.display = 'none';
            return;
          }

          const repos = await response.json();
          if (!Array.isArray(repos) || repos.length === 0) {
            section.style.display = 'none';
            return;
          }

          if (window.Render && typeof window.Render.renderGitHubRepos === 'function') {
            window.Render.renderGitHubRepos(repos);
          } else {
            const escape = (str) => {
              if (!str) return '';
              return String(str).replace(/[&<>"']/g, (m) => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
              }[m]));
            };

            const truncate = (str, len = 80) => {
              if (!str) return '';
              return str.length > len ? str.slice(0, len).trim() + '...' : str;
            };

            const itemsHtml = repos.map(repo => `
              <a href="${escape(repo.html_url)}" target="_blank" rel="noopener noreferrer" class="card github-repo-card">
                <div class="github-repo-card__header">
                  <i data-lucide="folder-git-2" aria-hidden="true" class="github-repo-card__icon"></i>
                  <h3 class="github-repo-card__title">${escape(repo.name)}</h3>
                  <i data-lucide="external-link" aria-hidden="true" class="icon-xs"></i>
                </div>
                <p class="github-repo-card__desc">${escape(truncate(repo.description)) || 'No description provided.'}</p>
                <div class="github-repo-card__meta">
                  ${repo.language ? `<span class="github-repo-card__lang">${escape(repo.language)}</span>` : ''}
                  ${typeof repo.stargazers_count === 'number' ? `<span class="github-repo-card__stars"><i data-lucide="star" aria-hidden="true"></i> ${repo.stargazers_count}</span>` : ''}
                </div>
              </a>
            `).join('');

            content.innerHTML = `<div class="github-repos__grid">${itemsHtml}</div>`;
            refreshIcons();
          }

          section.style.display = '';
        } catch (err) {
          section.style.display = 'none';
        }
      });
    }
  };

  // ==========================================================================
  // 12. APP OBJECT & INITIALIZATION
  // ==========================================================================
  const App = {
    init() {
      ThemeManager.init();
      HeaderManager.init();
      MenuManager.init();
      NavHighlighter.init();
      ScrollReveal.init();
      ProjectFilters.init();
      ProjectModal.init();
      CopyEmail.init();
      BackToTop.init();
      SmoothScroll.init();
      GitHubRepos.init();
    }
  };

  // Expose global App object
  window.App = App;

  // DOMContentLoaded initialization
  document.addEventListener('DOMContentLoaded', () => {
    if (window.Render && typeof window.Render.init === 'function') {
      window.Render.init();
    }
    App.init();
  });
})();
