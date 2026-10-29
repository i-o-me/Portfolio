# Ivan Oliver D. Mijares | Portfolio

A polished personal portfolio website showcasing web and mobile development work, project case studies, and technical capabilities. Built with plain HTML, CSS, and vanilla JavaScript for a lightweight, fast, and dependency-free setup.

## Overview

This portfolio is designed to present:

- personal branding and professional experience
- selected software projects and technical case studies
- responsive, accessible UI across desktop and mobile devices
- light and dark theme support with a smooth user experience

## Live Preview

Open the site locally in a browser, or serve the project with a local static server:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

The site can also be opened directly as a file using the browser's file system access.

## Project Structure

```text
portfolio/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── data.js
│   ├── render.js
│   └── main.js
├── assets/
│   └── images/
├── README.md
└── AGENT.MD
```

## Key Files

- `index.html` — main page structure and script loading
- `css/styles.css` — all layout, theme, and visual styling
- `js/data.js` — project content, profile details, skills, and metadata
- `js/render.js` — DOM rendering for sections and project cards
- `js/main.js` — interaction logic such as filters, theme toggle, and modal behavior

## Editing Content

All portfolio content is centralized in `js/data.js`.

### Update personal information

Edit the `PROFILE` object in `js/data.js`:

```js
const PROFILE = {
  name: 'Ivan Oliver D. Mijares',
  role: 'Computer Science graduate · Web and mobile developer',
  photo: null,
  // ...
};
```

### Add a new project

Add a new entry to the `PROJECTS` array:

```js
{
  id: 'my-new-project',
  title: 'My New Project',
  summary: 'A short description of the project and its purpose.',
  details: [
    'Key feature one',
    'Key feature two'
  ],
  tech: [
    { name: 'Django', iconType: 'devicon', iconClass: 'devicon-django-plain' },
    { name: 'Chart.js', iconType: 'lucide', iconClass: 'bar-chart-2' }
  ],
  categories: ['web'],
  repo: 'https://github.com/your-username/your-repo',
  demo: null,
  image: 'assets/images/my-project.png'
}
```

### Add screenshots and profile images

1. Place the image files inside `assets/images/`.
2. Update the relevant value in `js/data.js`:
   - profile photo: `PROFILE.photo`
   - project cover or gallery images: `image` / `images`
3. Prefer a 16:10 aspect ratio for project screenshots for a clean, consistent layout.

### Tech icon usage

- Devicon: Use classes from [devicon.dev](https://devicon.dev/)
- Lucide: Use icon names from [lucide.dev](https://lucide.dev/)

## Deploying to GitHub Pages

1. Push the repository to GitHub.
2. Open the repository on GitHub.
3. Go to **Settings** > **Pages**.
4. Under **Source**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder.
6. Save the settings.

The portfolio will be published at:

```text
https://your-username.github.io/portfolio/
```

## Features

- responsive, mobile-first layout
- dark and light theme support with saved preference persistence
- category-based project filtering
- interactive project detail modals
- smooth scroll and reveal effects
- accessible navigation and keyboard-friendly controls
- sticky header and back-to-top button
- clipboard-based email copy interaction
- no build step or framework dependency required

## Dependencies

- [Inter](https://fonts.google.com/specimen/Inter)
- [Lucide Icons](https://lucide.dev/)
- [Devicon](https://devicon.dev/)

## License

This project is intended for personal portfolio use and can be adapted for your own website or professional portfolio.
