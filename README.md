# Adnan Sami Srijon | Portfolio

A personal portfolio built as a nostalgic retro desktop: a pixel-art meadow, a beige CRT computer you switch on, draggable windows, a taskbar, and a sleepy kid in the grass who wakes up when you power on the machine.

**Live site:** https://portfolio-six-zeta-5fewaq2f7v.vercel.app

## What's inside

- **Retro OS desktop:** pixel icons for About, Projects, Skills, Experience, Education, Research and Contact. Windows can be dragged, minimized, maximized and closed.
- **Interactive computer:** pressing an icon while the computer is off shows a notice. Once it's on, the computer greets the visitor with a voice and on-screen subtitles, and stops the moment an icon is pressed.
- **Sliding layout:** when a window opens, the computer glides to the left and the windows open beside the monitor. It returns to the center when the last window closes.
- **Project showcase:** a card for each project, and a detail popup with screenshots, highlights, tools, and Live Demo and GitHub links.
- **Animated wallpaper:** the character falls asleep when the computer is off and stays wide awake when it's on.
- **Sound:** a startup sequence, click and window sounds, and a chiptune loop, all synthesized with the Web Audio API. Music and effects can be toggled from the taskbar.
- **Contact form:** messages are validated, rate-limited and stored in a Postgres database.

## Projects featured

| Project | Stack | Links |
|---|---|---|
| **Nexora**: digital agency website | React, Vite, TypeScript, Tailwind CSS | [Live](https://nexora-agency-website-seven.vercel.app/) · [Code](https://github.com/Radonnestar/nexora-agency-website) |
| **Saffron & Sage**: restaurant website | React, Vite, TypeScript, Tailwind CSS | [Live](https://saffron-sage-restaurant-website.vercel.app/) · [Code](https://github.com/Radonnestar/saffron-sage-restaurant-website) |
| **TaskFlow**: SaaS landing page with a working task dashboard | WordPress, PHP, MySQL, Tailwind CSS v4 | [Live](https://taskflow-demo.infinityfree.me) · [Code](https://github.com/Radonnestar/taskflow-saas-landing-page) |
| **Stride**: full-stack online shoe shop | React, TypeScript, Node.js, Express, PostgreSQL | [Live](https://stride-shop-six.vercel.app) · [Code](https://github.com/Radonnestar/stride-shop) |
| **THEIA**: cinematic scroll-driven 3D landing page | React, Three.js, GSAP, Lenis, Web Audio API | [Live](https://theia-app-lime.vercel.app) · [Code](https://github.com/Radonnestar/theia-app) |

## Tech stack

- **Frontend:** React, Vite, Tailwind CSS v4
- **Backend:** Vercel Functions (`/api`), Neon serverless Postgres, zod
- **Audio and speech:** Web Audio API, browser Speech Synthesis
- **Hosting:** Vercel

## Getting started

```bash
npm install
npx vercel dev
```

`vercel dev` runs the site and the API together on `http://localhost:3000`. For the frontend only, use `npm run dev`.

## Environment variables

Create a `.env.local` file (never commit it) and set the same variables in your Vercel project:

| Name | Purpose |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string |
| `ADMIN_TOKEN` | Secret token for the admin API routes |

## Project structure

```
api/             Serverless endpoints (contact, projects, messages)
backend/         Database helpers
public/frames/   Wallpaper animation frames
public/projects/ Project screenshots
src/components/  Desktop, windows, taskbar, computer, icons, notices
src/data/        Portfolio content (edit this to change the site)
src/lib/         Sound engine and greeting voice
```

## Customizing

All the content lives in `src/data/portfolio.js`: profile, skills, experience, education, projects and research. Project screenshots go in `public/projects/` and are referenced as `/projects/<file>`.

## Deploy

```bash
npx vercel --prod
```

## Notes

- The greeting voice depends on the voices installed in the visitor's browser, so it sounds different from one browser to another.
- On screens narrower than 768px the computer stays centered and windows open over the screen.
