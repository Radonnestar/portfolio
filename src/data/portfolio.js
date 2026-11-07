export const profile = {
  name: 'Your Name',
  role: 'Full-stack developer & creative coder',
  location: 'Your City, Country',
  email: 'you@example.com',
  bio: [
    "Hi! I'm a developer who loves building fast, playful web experiences with React, Node and a dash of 3D.",
    'I enjoy turning ideas into polished products, from the database all the way to the pixels on screen.',
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/your-username' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/your-username' },
    { label: 'Email', href: 'mailto:you@example.com' },
  ],
}

export const skills = [
  {
    group: 'Frontend',
    items: [['React', 90], ['JavaScript', 88], ['Tailwind CSS', 90], ['Three.js', 65]],
  },
  {
    group: 'Backend',
    items: [['Node.js', 85], ['Express', 85], ['SQL / SQLite', 75], ['REST APIs', 88]],
  },
  {
    group: 'Tools',
    items: [['Git & GitHub', 85], ['VS Code', 90], ['Figma', 60]],
  },
]

export const experience = [
  {
    role: 'Frontend Developer',
    company: 'Company Name',
    period: '2024 – Present',
    points: ['Built and shipped features used by thousands of users.', 'Improved page speed and accessibility.'],
  },
  {
    role: 'Intern, Web Development',
    company: 'Another Company',
    period: '2023 – 2024',
    points: ['Worked with a small team on a React dashboard.', 'Wrote REST endpoints in Node.js.'],
  },
]

export const education = [
  {
    degree: 'B.Sc. in Computer Science & Engineering',
    school: 'Your University',
    period: '2021 – 2025',
    note: 'Relevant courses: Algorithms, Databases, Computer Graphics.',
  },
  {
    degree: 'Higher Secondary Certificate',
    school: 'Your College',
    period: '2019 – 2021',
    note: '',
  },
]

export const projects = [
  {
    title: 'Project One',
    description: 'A short, punchy description of what it does and why it matters.',
    tags: ['React', 'Node', 'SQLite'],
    live: '#',
    code: '#',
  },
  {
    title: 'Project Two',
    description: 'Another project. Mention the problem you solved and the result.',
    tags: ['Three.js', 'Vite'],
    live: '#',
    code: '#',
  },
  {
    title: 'Project Three',
    description: 'Something you are proud of. Keep it to one or two lines.',
    tags: ['Tailwind', 'Express'],
    live: '#',
    code: '#',
  },
]

export const research = [
  {
    title: 'Title of Your Paper or Thesis',
    venue: 'Conference / Journal / University',
    year: '2025',
    summary: 'One or two lines about the problem and what you found.',
    link: '#',
  },
]