# Portfolio

A personal portfolio styled as a nostalgic retro desktop OS: a pixel-art meadow wallpaper, a beige CRT computer you switch on, draggable windows, a taskbar, and a sleepy kid lying in the grass.

> 🚧 Work in progress. Content is placeholder and will be filled in soon.

**Live site:** _coming soon_

## Features

- Retro OS desktop with draggable, minimizable and maximizable windows
- Pixel-art icons: About, Projects, Skills, Experience, Education, Research, Contact
- Animated wallpaper (the character falls asleep when the computer is off)
- Boot sequence, sound effects and a chiptune background loop (built with the Web Audio API)
- Working contact form and projects list backed by a serverless API and Postgres

## Tech stack

- **Frontend:** React, Vite, Tailwind CSS v4
- **Backend:** Vercel Functions (`/api`), Neon serverless Postgres, zod
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
api/            Serverless endpoints (contact, projects, messages)
backend/        Database helpers
public/frames/  Wallpaper animation frames
src/components/ Desktop, windows, taskbar, computer, icons
src/data/       Portfolio content (edit this to make it yours)
src/lib/        Sound engine
```

## Customizing

Edit `src/data/portfolio.js` with your own name, bio, skills, experience, education, projects and research.

## Deploy

```bash
npx vercel --prod
```

## License

TBD
