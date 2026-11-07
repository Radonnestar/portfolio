export const profile = {
  name: 'Adnan Sami Srijon',
  role: 'Full-stack developer & cybersecurity researcher',
  location: 'Dhaka, Bangladesh',
  email: 'adnansamisrijon@gmail.com',
  bio: [
    "I'm a Computer Science graduate from BRAC University with hands-on experience in frontend and backend development, alongside active research in cybersecurity, federated learning, and medical AI.",
    "I build scalable, user-focused applications, and I'm passionate about learning new technologies and solving real-world problems through code.",
  ],
  achievements: [
    'Two research papers accepted for presentation: IEEE SPICSCON 2026 and EMA4MICCAI 2026',
    'Honourable Mention, Blockchain Olympiad Bangladesh 2025: finalist among 200+ teams across Bangladesh (AI category)',
    'Finalist, CS Spectrum: Code Crush 2023, a competitive problem solving event by BRAC University Computer Club',
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/Radonnestar' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adnan-sami-srijon-394100263/' },
    { label: 'Email', href: 'mailto:adnansamisrijon@gmail.com' },
  ],
}

export const skills = [
  {
    group: 'Languages',
    items: ['C', 'Java', 'Objective-C', 'C#', 'Python', 'JavaScript'],
  },
  {
    group: 'Frameworks & Libraries',
    items: [
      'React',
      'Node.js',
      'Express.js',
      'Spring Boot',
      'Django',
      'Tailwind CSS',
      'Bootstrap',
      'NumPy',
      'Scikit-learn',
      'Matplotlib',
      'LangChain',
      'LangGraph',
      'Scanpy',
      'MAGIC',
      'OpenGL',
    ],
  },
  {
    group: 'Databases',
    items: ['PostgreSQL', 'Supabase', 'MySQL'],
  },
  {
    group: 'Tools',
    items: ['Git', 'Docker'],
  },
]

export const experience = [
  {
    role: 'Cyber Security Intern',
    company: 'CodeAlpha',
    period: 'Nov 2026 - Present',
    points: [
      'Selected for a virtual Cyber Security Internship, completing hands-on tasks.',
      'Developing open-source security tools on GitHub.',
      'Documenting project workflows.',
    ],
  },
  {
    role: 'Student Researcher (Research Intern)',
    company: 'Elite Research Lab LLC',
    period: 'Oct 2026 - Present',
    points: [
      'Researching post-quantum cryptography, federated learning, and security failure modes.',
      'Focused on building trustworthy and resilient machine learning architectures.',
    ],
  },
  {
    role: 'Assistant Secretary of Administration (former)',
    company: 'NDIURC',
    period: 'Sep 2019 - Dec 2022',
    points: [
      'Conference Management Officer (CMO), Notre Dame College Model United Nations (NDCMUN) 2020.',
      'Admin, Notre Dame College Model United Nations (NDCMUN) 2022.',
    ],
  },
]

export const education = [
  {
    degree: 'BS in Computer Science',
    school: 'BRAC University',
    period: 'Sept 2022 - Sept 2026',
    note: 'GPA: 3.68 / 4.00. Coursework: Data Structure, Computer Algorithm, Computer Graphics, Computer Architecture, Automata and Computability, Artificial Intelligence, Machine Learning, Database Systems, System Design, Software Engineering.',
  },
]

// Images go in client/public/projects/ and are referenced as '/projects/<file>'
export const projects = [
  {
    title: 'Nexora',
    tagline: 'A modern, responsive website for a digital agency, with services, portfolio, pricing and contact.',
    description:
      'Nexora is a business website for a fictional digital agency offering web development, branding, UI/UX design and digital marketing. It presents the services, a portfolio, pricing plans, an about section and a contact form in a clean, fast layout that works on any screen size.',
    details: [
      'Services, portfolio, pricing, about and contact sections',
      'Fully responsive from phone to desktop',
      'Smooth, subtle animations',
      'Clean, reusable component structure',
    ],
    tags: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Lucide React', 'Vercel'],
    live: 'https://nexora-agency-website-seven.vercel.app/',
    code: 'https://github.com/Radonnestar/nexora-agency-website',
    images: ['/projects/nexora.png'],
  },
  {
    title: 'Saffron & Sage',
    tagline: 'An elegant restaurant website with a menu, photo gallery and reservation enquiry form.',
    description:
      'Saffron & Sage is a website for a fictional restaurant. It shows the food menu and featured dishes, a photo gallery, opening hours and location, and lets guests send a reservation enquiry. The design is warm and refined, and it stays easy to use on a phone.',
    details: [
      'Menu with featured dishes',
      'Photo gallery',
      'Opening hours and location',
      'Reservation enquiry form',
      'Responsive layout',
    ],
    tags: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Lucide React', 'Vercel'],
    live: 'https://saffron-sage-restaurant-website.vercel.app/',
    code: 'https://github.com/Radonnestar/saffron-sage-restaurant-website',
    images: ['/projects/saffron-sage.png'],
  },
  {
    title: 'TaskFlow',
    tagline: 'A SaaS landing page with a working login and personal task dashboard, on a custom WordPress theme.',
    description:
      'TaskFlow is a landing page for a fictional productivity platform, and it is also a working app. Visitors can sign up, log in and manage their own tasks in a dashboard, with tasks stored in a custom database table and served through a secure REST API. The theme is hand-coded with no page builder, and has animated sections and a fast load time.',
    details: [
      "Signup and login using WordPress's own user system",
      'Personal task dashboard backed by a custom database table and REST API',
      'Hand-coded theme, no heavy page builders',
      'Motion effects and strong Lighthouse scores',
    ],
    tags: ['WordPress', 'PHP', 'MySQL', 'Tailwind CSS v4', 'JavaScript', 'InfinityFree'],
    live: 'https://taskflow-demo.infinityfree.me',
    code: 'https://github.com/Radonnestar/taskflow-saas-landing-page',
    images: ['/projects/taskflow.png'],
  },
  {
    title: 'Stride',
    tagline: 'A full-stack online shoe shop with accounts, checkout, order tracking and an admin dashboard.',
    description:
      'Stride is a demo online shoe shop built from scratch. Shoppers can browse and filter shoes, pick a size, check out and follow their orders, while an admin dashboard shows revenue, order status and stock. The storefront has custom animation and a day and dark theme, and the whole site scores 99, 96, 100 and 92 on Lighthouse.',
    details: [
      'Animated storefront with live stock per size',
      'Accounts, cart, checkout and order history',
      'Order tracking from confirmed to delivered or returned',
      'Admin dashboard with revenue chart, order management and stock editing',
      'Secure Node API with an order system that never oversells',
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL (Supabase)', 'Vercel'],
    live: 'https://stride-shop-six.vercel.app',
    code: 'https://github.com/Radonnestar/stride-shop',
    images: ['/projects/stride.png'],
  },
]

export const research = [
  {
    title: 'Security Failure Modes in Hybrid Classical-Post-Quantum TLS Deployments: An Empirical Study',
    venue: '5th IEEE SPICSCON 2026',
    year: '2026 · Accepted',
    summary:
      'An empirical study of how hybrid classical and post-quantum TLS deployments can fail. Co-authored with collaborators and mentors. Accepted for presentation.',
    link: '',
  },
  {
    title: 'When Efficiency Meets Fragility: Adversarial Vulnerability Shifts in Quantized Medical VLMs',
    venue: '2nd MICCAI Workshop on Efficient Medical AI (EMA4MICCAI 2026)',
    year: '2026 · Accepted',
    summary:
      'A study of how adversarial vulnerability shifts when medical vision-language models are quantized for efficiency. Solo-authored, taken end-to-end independently. Accepted for presentation.',
    link: '',
  },
]