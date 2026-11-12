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
    title: 'ScamShield',
    tagline:
      'A free, multilingual scam checker where you paste a message or link and Cyber, a roaming robot guide, tells you whether it looks like a scam, an ad or a normal message, and what to do next.',
    description:
      'ScamShield helps people in Bangladesh spot fake bKash, Nagad and Robi messages, prize traps and phishing links. A machine-learning model reads the text, a set of link checks looks at the web addresses (look-alike brand names, short links, domain age), and a safety-first rule combines both into one verdict. Cyber explains the result in plain words, can read it aloud, and wanders around the page while you use it. It is a helper, not a guarantee, and it can be wrong.',
    details: [
      'Works in English, Bangla (বাংলা) and Banglish, with a spoken explanation',
      'Combines a text model with link checks, and leans towards caution when unsure',
      'Shows which words and links pushed the result, marked inside your own message',
      'Includes a browser extension for Edge and Chrome that checks websites, pasted text and right-clicked links',
      'Cyber, the animated robot, plays football, drives a car, reads and takes selfies',
    ],
    tags: [
      'Python',
      'FastAPI',
      'Uvicorn',
      'scikit-learn',
      'pandas',
      'joblib',
      'HTML',
      'CSS',
      'JavaScript',
      'SVG',
      'Canvas',
      'Web Speech API',
      'Manifest V3',
      'RDAP',
      'Google Safe Browsing API',
      'Streamlit',
      'Git',
      'GitHub',
      'Vercel',
    ],
    live: 'https://scam-shield-ai-umber.vercel.app/',
    // The repository is private right now. Once it is public, paste
    // https://github.com/Radonnestar/ScamShield-AI here and the GitHub button will appear.
    code: '',
    images: ['/projects/scamshield.png'],
  },
  {
    title: 'The Scurvy Python Sea',
    tagline:
      'A pirate-themed Python learning adventure for kids, with a 3D voyage map, real coding challenges and a scripted Captain who teaches along the way.',
    description:
      'The Scurvy Python Sea teaches kids Python through a pirate voyage. Ten islands hold 40 lessons, and a scripted Captain Snake guides each one. Kids write and run real Python in the browser, then take on 75 “bounty” coding problems, earn XP, badges and printable certificates, and experiment freely in a code playground. A parent confirms each account by email, and every certificate carries a unique code and QR link that anyone can check on a public verify page.',
    details: [
      'Cinematic wanted-poster intro with a slot-machine reward, a hook tearing the poster down and tavern doors opening, all with synthesized sound',
      '3D voyage map built with Three.js, scrolling from island to island',
      'Runs real Python in the browser with no server, using Pyodide in a background worker, with 75 auto-judged coding problems',
      'XP, ranks, badges, and certificates as PNG or PDF with a QR code that links to a public verify page',
      'Parent email confirmation, plus an admin dashboard with charts of logins, sign-ups and lessons completed',
    ],
    tags: [
      'React 19',
      'Vite',
      'GSAP',
      'Three.js',
      'CodeMirror 6',
      'Pyodide',
      'ASP.NET Core 10',
      'Entity Framework Core',
      'PostgreSQL (Neon)',
      'JWT',
      'BCrypt',
      'Brevo',
      'Vercel',
      'Render',
      'Claude',
    ],
    live: 'https://scurvy-python-sea-gold.vercel.app',
    // No GitHub link yet. Paste the repository URL here and the GitHub button will appear.
    code: '',
    images: ['/projects/scurvy-python-sea.png'],
  },
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
  {
    title: 'THEIA: The Interface Architects',
    tagline: 'A cinematic, scroll-driven 3D landing page for a fictional UI/UX and frontend studio, built around a procedural 35mm projector in a design-studio loft.',
    description:
      'THEIA is a five-act scroll experience. The camera moves through a procedurally built studio loft, from a wide overview to a macro of the projector’s reels and gears, a tracking shot past the lens, and a final pull-back to a contact form. Everything in the scene is generated in code, with no imported models or textures. It also has a vibrant glass-style UI that changes accent colour with each act, and an opt-in cinematic audio loop. All studio names, numbers and copy are placeholders.',
    details: [
      'Five scroll-driven acts with a single camera timeline, using smooth scrolling (Lenis) synced to GSAP ScrollTrigger',
      'Fully procedural 3D scene with shadows, depth fog, a volumetric light beam with dust, and custom post-processing (depth of field, halation, film grain)',
      'Per-act accent colours, glass cards, and an interactive iris that opens when you hover the services',
      'Procedural Web Audio score: an 18-second looping cinematic swell, off until the visitor opts in',
      'Live FPS meter measured on the visitor’s GPU, with a prefers-reduced-motion mode and a no-WebGL fallback',
    ],
    tags: ['Vite', 'React', 'Tailwind CSS', 'Three.js', 'GSAP', 'ScrollTrigger', 'Lenis', 'Web Audio API', 'Vercel'],
    live: 'https://theia-app-lime.vercel.app',
    code: 'https://github.com/Radonnestar/theia-app',
    images: ['/projects/theia.png'],
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