# Aleem Akhtar — Portfolio Website

A premium, modern, dark-themed portfolio website built with Next.js, Express, PostgreSQL (Docker), Prisma, Three.js, and Framer Motion. Inspired by brittanychiang.com with enhanced 3D visuals and glassmorphism design.

## Architecture

```
├── docker-compose.yml          # PostgreSQL + Backend + Frontend
├── backend/                    # Express + Prisma API
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── seed.ts             # Seed data from CV
│   └── src/
│       ├── index.ts            # Express server
│       ├── routes/             # API routes (auth, profile, experience, projects, skills, blog, contact, admin, settings)
│       ├── middleware/         # JWT auth middleware
│       └── lib/                # Prisma client
├── frontend/                   # Next.js 14 + React + TypeScript
│   └── src/
│       ├── app/                # App router pages
│       │   ├── page.tsx        # Main portfolio page
│       │   └── admin/          # Admin panel
│       ├── components/
│       │   ├── Navbar.tsx      # Sticky nav with active section
│       │   ├── Footer.tsx
│       │   ├── MotionWrappers.tsx
│       │   ├── 3d/             # Three.js 3D scenes
│       │   └── sections/       # Hero, About, Experience, Projects, Skills, Writing, Contact
│       └── lib/
│           ├── api.ts          # API client
│           ├── data.ts         # Static fallback data
│           └── utils.ts        # Tailwind utilities
```

## Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose

### 1. Start the Database

```bash
docker-compose up db -d
```

### 2. Setup Backend

```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```

The API runs at `http://localhost:4000`.

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

### 4. Add Your Profile Photo

Place your profile photo at `frontend/public/images/profile.jpg`.

### 5. Add Your Resume

Place your resume PDF at `frontend/public/resume.pdf`.

## Full Docker Deployment

```bash
docker-compose up --build
```

This starts PostgreSQL, the backend API, and the frontend — all containerized.

## Admin Panel

Access at `http://localhost:3000/admin/login`

**Default credentials:**
- Email: `raleem811811@gmail.com`
- Password: `admin123456`

> **Important:** Change the admin password in production.

### Admin Features
- Dashboard with stats
- Manage Profile, Experience, Projects
- Manage Blog Posts (drafts/published)
- View & manage Contact Messages
- Site Settings

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/profile` | No | Get profile |
| GET | `/api/experience` | No | Get all experiences |
| GET | `/api/projects` | No | Get published projects |
| GET | `/api/projects/featured` | No | Get featured projects |
| GET | `/api/skills` | No | Get skill groups |
| GET | `/api/blog` | No | Get published posts |
| POST | `/api/contact` | No | Submit contact form |
| POST | `/api/auth/login` | No | Admin login |
| GET | `/api/admin/stats` | Yes | Dashboard stats |
| PUT | `/api/profile` | Yes | Update profile |
| POST/PUT/DELETE | `/api/experience` | Yes | Manage experience |
| POST/PUT/DELETE | `/api/projects` | Yes | Manage projects |
| POST/PUT/DELETE | `/api/skills` | Yes | Manage skills |
| POST/PUT/DELETE | `/api/blog` | Yes | Manage blog posts |

## Tech Stack

**Frontend:** Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion, Three.js / React Three Fiber, Lucide Icons

**Backend:** Node.js, Express, TypeScript, Prisma ORM, JWT, Zod validation, Helmet, Rate Limiting

**Database:** PostgreSQL 16 (Docker)

**Design:** Dark theme, glassmorphism, 3D particle network, animated gradients, mouse-following spotlight

## Features

- Responsive on mobile, tablet, desktop
- 3D hero with particle network, glowing sphere, floating orbs
- Mouse-following gradient spotlight
- Smooth scroll with active section highlighting
- Animated section transitions (Framer Motion)
- Glassmorphism cards with hover effects
- Project modal with case study details
- Contact form with backend API
- Admin dashboard for content management
- SEO metadata, Open Graph, Twitter cards
- Rate-limited API endpoints
- JWT-secured admin routes
- Zod input validation
- Accessible: semantic HTML, keyboard navigation, ARIA labels
