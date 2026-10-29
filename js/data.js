/**
 * data.js - Portfolio Content Data
 * Ivan Oliver D. Mijares | Personal Portfolio Website
 * 
 * Plain script file defining global constants for site content.
 * Designed for easy editing without touching HTML templates or logic.
 */

// =============================================================================
// 1. PROFILE
// =============================================================================
const PROFILE = {
  name: 'Ivan Oliver D. Mijares',
  eyebrow: "Hi, I'm",
  role: 'Computer Science graduate \u00b7 Web and mobile developer',
  intro: "I build complete applications from start to finish, from how the system works to how easy it is to use. I like solving practical problems and learning new tools along the way.",
  photo: 'assets/images/profile.jpg',
  location: 'Midsayap, North Cotabato, Philippines',
  email: null, // Assembled in JS for anti-scraping - see render.js
  emailParts: ['ivanmijares018', 'gmail.com'], // assembled as part[0] + '@' + part[1]
  phone: '+63 966 764 2839',
  phoneLink: 'tel:+639667642839',
  github: 'https://github.com/i-o-me',
  linkedin: null, // TODO: add LinkedIn URL when available
};

// =============================================================================
// 2. ABOUT
// =============================================================================
const ABOUT = {
  paragraphs: [
    "I'm a fresh Computer Science graduate from the University of Southern Mindanao in Kabacan, Cotabato (BS Computer Science, June 2026). I enjoy building things end-to-end, from backend logic and database design to the interface people actually use.",
    "I'm comfortable working independently, picking up new tools as needed, and explaining technical decisions clearly. My thesis involved fine-tuning a DistilBERT model for multilingual fake news detection, delivered as a Chrome extension."
  ],
  quickFacts: [
    { icon: 'map-pin', text: 'Midsayap, North Cotabato, Philippines' },
    { icon: 'graduation-cap', text: 'BS Computer Science, University of Southern Mindanao (2026)' },
    { icon: 'code-xml', text: 'Web, mobile, and applied ML' }
  ]
};

// =============================================================================
// 3. SKILLS
// =============================================================================
const SKILLS = [
  {
    title: 'Frontend and Mobile',
    icon: 'code-xml',
    skills: [
      { name: 'Flutter', iconType: 'devicon', iconClass: 'devicon-flutter-plain' },
      { name: 'HTML', iconType: 'devicon', iconClass: 'devicon-html5-plain' },
      { name: 'CSS', iconType: 'devicon', iconClass: 'devicon-css3-plain' },
      { name: 'JavaScript', iconType: 'devicon', iconClass: 'devicon-javascript-plain' },
      { name: 'Responsive Design', iconType: 'lucide', iconClass: 'smartphone' },
      { name: 'FlutterFlow', iconType: 'lucide', iconClass: 'smartphone' },
      { name: 'React', iconType: 'devicon', iconClass: 'devicon-react-original', level: 'Learning' },
      { name: 'TypeScript', iconType: 'devicon', iconClass: 'devicon-typescript-plain', level: 'Learning' }
    ]
  },
  {
    title: 'Backend and APIs',
    icon: 'globe',
    skills: [
      { name: 'Python', iconType: 'devicon', iconClass: 'devicon-python-plain' },
      { name: 'Django', iconType: 'devicon', iconClass: 'devicon-django-plain' },
      { name: 'PHP', iconType: 'devicon', iconClass: 'devicon-php-plain' },
      { name: 'Laravel', iconType: 'devicon', iconClass: 'devicon-laravel-original' },
      { name: 'FastAPI', iconType: 'devicon', iconClass: 'devicon-fastapi-plain' },
      { name: 'REST API Design', iconType: 'lucide', iconClass: 'globe' },
      { name: 'Webhooks', iconType: 'lucide', iconClass: 'globe' },
      { name: 'Third-party API Integration', iconType: 'lucide', iconClass: 'globe' },
      { name: 'Node.js', iconType: 'devicon', iconClass: 'devicon-nodejs-plain', level: 'Familiar' }
    ]
  },
  {
    title: 'Databases',
    icon: 'database',
    skills: [
      { name: 'PostgreSQL', iconType: 'devicon', iconClass: 'devicon-postgresql-plain' },
      { name: 'MySQL', iconType: 'devicon', iconClass: 'devicon-mysql-original' },
      { name: 'Supabase', iconType: 'devicon', iconClass: 'devicon-supabase-plain' },
      { name: 'Firebase Realtime DB', iconType: 'devicon', iconClass: 'devicon-firebase-plain' },
      { name: 'SQLite', iconType: 'devicon', iconClass: 'devicon-sqlite-plain' }
    ]
  },
  {
    title: 'Security and Access Control',
    icon: 'shield',
    skills: [
      { name: 'Row-Level Security', iconType: 'lucide', iconClass: 'shield' },
      { name: 'Role-Based Access Control', iconType: 'lucide', iconClass: 'shield' },
      { name: 'Authentication', iconType: 'lucide', iconClass: 'shield' },
      { name: 'Multi-Tenant Data Isolation', iconType: 'lucide', iconClass: 'shield' },
      { name: 'Audit Logging', iconType: 'lucide', iconClass: 'shield' }
    ]
  },
  {
    title: 'AI and ML',
    icon: 'brain',
    skills: [
      {
        name: 'Applied ML',
        note: '(Random Forest, Gradient Boosting, regression, NLP)',
        iconType: 'lucide',
        iconClass: 'brain'
      },
      { name: 'DistilBERT Fine-Tuning', iconType: 'lucide', iconClass: 'brain' },
      { name: 'AI-Assisted Dev Workflows', iconType: 'lucide', iconClass: 'brain' }
    ]
  },
  {
    title: 'Tools',
    icon: 'wrench',
    skills: [
      { name: 'Git', iconType: 'devicon', iconClass: 'devicon-git-plain' },
      { name: 'GitHub', iconType: 'devicon', iconClass: 'devicon-github-original' },
      { name: 'VS Code', iconType: 'devicon', iconClass: 'devicon-vscode-plain' },
      { name: 'Laragon', iconType: 'lucide', iconClass: 'wrench' },
      { name: 'Vercel', iconType: 'lucide', iconClass: 'globe' },
      { name: 'Railway', iconType: 'lucide', iconClass: 'wrench', level: 'Familiar' }
    ]
  }
];

// =============================================================================
// 4. PROJECTS
// =============================================================================
const PROJECTS = [
  {
    id: 'fintrack',
    title: 'FinTrack: Personal Finance Tracker',
    summary: 'A personal finance web app for tracking expenses, budgets, and savings goals with AI-powered spending predictions and recommendations.',
    details: [
      'Spending Predictor using XGBoost Regressor',
      'Budget Recommender using Gradient Boosting',
      'Goal Recommender using Linear Optimization',
      'Expense dashboard with category tracking and trend analysis'
    ],
    tech: [
      { name: 'Django', iconType: 'devicon', iconClass: 'devicon-django-plain' },
      { name: 'SQLite', iconType: 'devicon', iconClass: 'devicon-sqlite-plain' },
      { name: 'XGBoost Regressor', iconType: 'lucide', iconClass: 'brain' },
      { name: 'Gradient Boosting', iconType: 'lucide', iconClass: 'brain' },
      { name: 'Linear Optimization', iconType: 'lucide', iconClass: 'bar-chart-2' },
      { name: 'Chart.js', iconType: 'lucide', iconClass: 'bar-chart-2' }
    ],
    categories: ['web', 'ai'],
    repo: 'https://github.com/i-o-me/FinTrack',
    demo: null,
    image: 'assets/images/fintract/Fintract1.png',
    images: [
      'assets/images/fintract/Fintract1.png',
      'assets/images/fintract/Fintract2.png',
      'assets/images/fintract/Fintract3.png'
    ]
  },
  {
    id: 'recipedia',
    title: 'Recipedia: Community Recipe Platform',
    summary: 'A Laravel-based community recipe platform where users can submit, browse, and manage recipes with email verification and admin moderation.',
    details: [
      'User authentication with email verification and role-based access',
      'Recipe submission, approval flow, and admin moderation dashboard',
      'Recipe browsing, image uploads, and downloadable recipe text files'
    ],
    tech: [
      { name: 'Laravel', iconType: 'devicon', iconClass: 'devicon-laravel-original' },
      { name: 'MySQL', iconType: 'devicon', iconClass: 'devicon-mysql-original' }
    ],
    categories: ['web'],
    repo: 'https://github.com/i-o-me/Recipedia',
    demo: null,
    image: 'assets/images/Recipedia/Recipedia1.png',
    images: [
      'assets/images/Recipedia/Recipedia1.png',
      'assets/images/Recipedia/Recipedia2.png',
      'assets/images/Recipedia/Recipedia3.png',
      'assets/images/Recipedia/Recipedia4.png',
      'assets/images/Recipedia/Recipedia5.png'
    ]
  },
  {
    id: 'diet-recommendation',
    title: 'Diet Recommendation App',
    summary: 'A mobile nutrition app that calculates BMI and daily calorie targets, then recommends personalized meals based on the user’s goals and activity level.',
    details: [
      'BMI and metabolism calculations for personalized calorie targets',
      'Meal recommendations with protein, carbs, and fat breakdowns',
      'Flutter mobile UI connected to FastAPI nutrition logic'
    ],
    tech: [
      { name: 'Flutter', iconType: 'devicon', iconClass: 'devicon-flutter-plain' },
      { name: 'Python', iconType: 'devicon', iconClass: 'devicon-python-plain' },
      { name: 'FastAPI', iconType: 'devicon', iconClass: 'devicon-fastapi-plain' }
    ],
    categories: ['mobile'],
    repo: 'https://github.com/i-o-me/calorie',
    demo: null,
    image: 'assets/images/Diet/Diet1.jpg',
    images: [
      'assets/images/Diet/Diet1.jpg',
      'assets/images/Diet/Diet2.jpg',
      'assets/images/Diet/Diet3.jpg',
      'assets/images/Diet/Diet4.jpg',
      'assets/images/Diet/Diet5.jpg',
      'assets/images/Diet/Diet6.jpg',
      'assets/images/Diet/Diet7.jpg'
    ]
  },
  {
    id: 'multilingual-fake-news',
    title: 'Multilingual Fake News Detection',
    summary: 'My undergraduate thesis: a fine-tuned DistilBERT model that detects fake news in English,Tagalog, and Cebuano, delivered as a Chrome extension.',
    details: [
      'Model fine-tuning on a labeled dataset',
      'Packaged as a browser extension'
    ],
    tech: [
      { name: 'Python', iconType: 'devicon', iconClass: 'devicon-python-plain' },
      { name: 'DistilBERT', iconType: 'lucide', iconClass: 'brain' },
      { name: 'Chrome Extension', iconType: 'lucide', iconClass: 'globe' },
      { name: 'JavaScript', iconType: 'devicon', iconClass: 'devicon-javascript-plain' }
    ],
    categories: ['ai'],
    repo: null, // TODO: add repo URL
    demo: null,
    image: 'assets/images/Thesis/Thesis1.png',
    images: [
      'assets/images/Thesis/Thesis1.png',
      'assets/images/Thesis/Thesis2.png',
      'assets/images/Thesis/Thesis3.png',
      'assets/images/Thesis/Thesis4.png',
      'assets/images/Thesis/Thesis5.png',
      'assets/images/Thesis/Thesis6.png',
      'assets/images/Thesis/Thesis7.png'
    ]
  },
];

// =============================================================================
// 5. MORE REPOSITORIES & GITHUB LINKS
// =============================================================================
const MORE_REPOS = [
  { name: 'library_system', tech: 'Laravel / Blade', url: 'https://github.com/i-o-me/library_system' },
  { name: 'LoanManagementSystem', tech: 'C#', url: 'https://github.com/i-o-me/LoanManagementSystem' }
];

const GITHUB_ALL_REPOS = 'https://github.com/i-o-me?tab=repositories';

// =============================================================================
// 6. TIMELINE (Experience and Education)
// =============================================================================
const TIMELINE = [
  {
    type: 'work',
    icon: 'briefcase',
    title: 'IT Intern',
    organization: 'Cotabato Police Provincial Office',
    description: 'Maintained and troubleshot computer systems and office networks. Supported data entry, documentation, and IT administrative tasks.',
    date: '' // no specific date given
  },
  {
    type: 'education',
    icon: 'graduation-cap',
    title: 'BS Computer Science',
    organization: 'University of Southern Mindanao (USM), Kabacan, Cotabato',
    description: 'Thesis: Multilingual Fake News Detection Using DistilBERT (Chrome extension).',
    date: 'June 2026'
  }
];

// =============================================================================
// 7. CERTIFICATIONS
// =============================================================================
const CERTIFICATIONS = [
  {
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM SkillsBuild',
    date: 'Feb 2025'
  },
  {
    title: 'Introduction to Modern AI',
    issuer: 'Cisco Networking Academy',
    date: 'Jun 2025'
  },
  {
    title: 'Introduction to Data Science',
    issuer: 'Cisco Networking Academy',
    date: 'May 2025'
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: 'May 2025'
  },
  {
    title: 'Data Fundamentals',
    issuer: 'IBM SkillsBuild',
    date: 'Jun 2025'
  }
];

// =============================================================================
// 8. NAVIGATION LINKS
// =============================================================================
const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' }
];
