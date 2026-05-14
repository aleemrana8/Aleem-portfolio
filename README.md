<div align="center">

<!-- Header Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a192f,50:112240,100:64ffda&height=220&section=header&text=Aleem%20Akhtar%20Portfolio&fontSize=42&fontColor=64ffda&animation=fadeIn&fontAlignY=36&desc=Product%20Manager%20%E2%80%A2%20Technical%20Project%20Manager%20%E2%80%A2%20AI%20Team%20Lead&descSize=16&descColor=ccd6f6&descAlignY=55" width="100%" />

<!-- Badges -->
[![Next.js](https://img.shields.io/badge/Next.js-14.2-000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.4-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![OpenAI](https://img.shields.io/badge/GPT--4o--mini-Streaming-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io/)
[![Three.js](https://img.shields.io/badge/Three.js-3D-000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)

<br/>

> **A world-class, AI-powered developer portfolio** featuring a RAG chatbot, 3D hero scene, glassmorphism UI, premium email templates, and a full admin CMS — built by **Rana Muhammad Aleem Akhtar**.

**🌐 Live: [aleem-portfolio.vercel.app](https://aleem-portfolio.vercel.app)**

</div>

---

## 🎯 Purpose

This isn't just a portfolio — it's a **living technical showcase**. It demonstrates full-stack engineering, AI integration, DevOps practices, and product thinking through:

- **7 featured AI & automation projects** with interactive case studies & system architecture diagrams
- **Ask Aleem AI** — a strict portfolio-only RAG chatbot powered by GPT-4o-mini
- **3D immersive hero** built with React Three Fiber & Drei
- **Technical Leadership** section showcasing product delivery capabilities
- **Why Hire Me** — recruiter-focused value proposition section
- **Trusted Technologies Wall** — 40+ categorized tech pills with hover effects
- **Impact Metrics Dashboard** — animated counters (10K+ calls, 72+ endpoints, 24-state FSM)
- **Nodemailer integration** with premium branded HTML email templates
- **Full admin panel** with blog CMS, contact management, and analytics

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🤖 AI & Intelligence
- **Ask Aleem AI** chatbot with streaming GPT-4o-mini
- RAG knowledge base injection (~8K tokens)
- Server-side topic filter (blocks off-topic before API call)
- Recruiter detection with proactive engagement
- Markdown rendering with bold, code, lists, links

</td>
<td width="50%">

### 🎨 Frontend Excellence
- **Next.js 14** App Router with TypeScript
- **Three.js** 3D hero scene (React Three Fiber + Drei)
- **Framer Motion** page transitions & scroll animations
- Dynamic imports for code-splitting & fast load
- Glassmorphism cards with hover effects
- Fully responsive (mobile-first)
- ESLint + Prettier configured

</td>
</tr>
<tr>
<td width="50%">

### 🏗️ Backend & Data
- **NestJS 10** modular architecture
- **Prisma ORM** with 24+ models
- **PostgreSQL 16** (Docker)
- JWT authentication with Passport.js
- Swagger API documentation
- Rate limiting & Helmet security
- Database health checks

</td>
<td width="50%">

### 📧 Email & Contact
- **Nodemailer** via Next.js API Route (works on Vercel)
- Premium dark-themed HTML email templates
- **Owner notification** with structured message card
- **Auto thank-you** to sender with portfolio links
- Input validation & HTML escaping
- Rate-limited submissions (5/hr/IP)

</td>
</tr>
<tr>
<td width="50%">

### 📊 Admin CMS
- Secure admin panel at `/admin`
- Manage Profile, Experience, Projects, Skills
- Blog CMS with drafts & publishing
- Contact message inbox with read/unread
- Analytics dashboard

</td>
<td width="50%">

### 🐳 DevOps
- **Docker Compose** multi-service setup
- PostgreSQL + Redis + Backend containers
- Prisma migrations & seed scripts
- Environment-based configuration
- Health check endpoints

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technologies |
|:---:|:---|
| **Frontend** | Next.js 14 · React 18 · TypeScript 5.6 · Tailwind CSS 3.4 · Framer Motion 11 · Three.js · React Three Fiber · Drei · TanStack Query 5 · Nodemailer |
| **Backend** | NestJS 10 · Prisma 5.22 · PostgreSQL 16 · Passport.js · JWT · Swagger · Helmet · Nodemailer |
| **AI** | OpenAI GPT-4o-mini · LangChain · RAG Pipeline · Vector Embeddings · Streaming SSE |
| **DevOps** | Docker Compose · GitHub Actions · Vercel · Railway · ESLint · Prettier |

</div>

---

## 📂 Project Architecture

```
aleem-portfolio/
├── 🐳 docker-compose.yml              # PostgreSQL + Redis + Backend
│
├── 🖥️ frontend/                        # Next.js 14 App
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx                # Main portfolio (Hero → Contact)
│   │   │   ├── api/chat/route.ts       # 🤖 Ask Aleem AI streaming endpoint
│   │   │   ├── api/contact/route.ts    # 📧 Contact form email (Nodemailer)
│   │   │   └── admin/                  # Admin CMS panel
│   │   ├── components/
│   │   │   ├── ai/AIChatWidget.tsx     # 💬 Premium chatbot widget with portfolio logo
│   │   │   ├── 3d/HeroScene.tsx        # 🌐 Three.js 3D scene
│   │   │   ├── sections/              # Hero, About, Leadership, Experience, Skills, Metrics, TechWall, WhyHireMe, Services, Contact
│   │   │   └── projects/              # ProjectCard, ProjectDetail, ArchitectureFlow
│   │   └── lib/
│   │       ├── knowledge-base.ts       # 📚 RAG knowledge base builder
│   │       ├── data.ts                 # Static portfolio data
│   │       └── api.ts                  # Backend API client
│   └── public/images/projects/         # 🖼️ Project showcase images
│
├── ⚙️ backend/                          # NestJS API
│   ├── prisma/
│   │   ├── schema.prisma               # 24+ database models
│   │   └── seed.ts                     # Portfolio seed data
│   └── src/
│       ├── auth/                       # JWT authentication
│       ├── contact/                    # Contact form + email sending
│       ├── prisma/                     # Prisma service module
│       ├── lib/mailer.ts               # 📧 Premium HTML email templates
│       └── [modules]/                  # Profile, Experience, Projects, Skills, Blog, etc.
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+
- **Docker** & Docker Compose
- **Gmail App Password** (for contact form emails)
- **OpenAI API Key** (for Ask Aleem AI chatbot)

### 1️⃣ Clone & Install

```bash
git clone https://github.com/aleemrana8/Aleem-portfolio.git
cd Aleem-portfolio
```

### 2️⃣ Start Database

```bash
docker-compose up db redis -d
```

### 3️⃣ Setup Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your SMTP_PASS and other secrets
npm install --legacy-peer-deps
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

> Backend runs at **http://localhost:4000** | Swagger docs at **http://localhost:4000/api/docs**

### 4️⃣ Setup Frontend

```bash
cd frontend
npm install --legacy-peer-deps
# Create .env.local with:
#   OPENAI_API_KEY=your_key
#   NEXT_PUBLIC_API_URL=http://localhost:4000/api
#   NEXT_PUBLIC_SITE_URL=http://localhost:3000
#   SMTP_USER=your_email@gmail.com
#   SMTP_PASS=your_gmail_app_password
npm run dev
```

> Frontend runs at **http://localhost:3000**

### 5️⃣ Full Docker Deployment

```bash
docker-compose up --build
```

---

## 🗄️ Database Schema

<div align="center">

**24+ Prisma Models** across 5 domains:

</div>

| Domain | Models |
|:---|:---|
| **Portfolio Core** | `Profile` · `Experience` · `Project` · `SkillGroup` · `Skill` · `Media` |
| **Content** | `BlogPost` · `Category` · `Testimonial` · `CaseStudy` |
| **Communication** | `ContactMessage` · `ChatSession` · `ChatMessage` · `RecruiterLead` |
| **AI & RAG** | `AIEmbedding` (vector store) · `ResumeTemplate` · `ResumeDownload` |
| **Analytics** | `AnalyticsEvent` · `VisitorSession` · `BlogView` · `ProjectMetric` · `SiteSettings` |

---

## 🤖 Ask Aleem AI — Portfolio Chatbot

<div align="center">

*RAG-powered, streaming, portfolio-only intelligence system*

</div>

| Feature | Detail |
|:---|:---|
| **Model** | GPT-4o-mini (streaming via SSE) |
| **Knowledge Base** | ~8K token RAG injection from all portfolio data |
| **Topic Filter** | Server-side regex blocks off-topic queries before API call |
| **Boundary** | Strict portfolio-only — refuses general knowledge, math, coding tutorials |
| **Recruiter Mode** | Detects hiring managers and proactively highlights availability |
| **Rate Limit** | 25 requests/min/IP |
| **Input Sanitization** | 2000 char limit, 12 message history window |

---

## 📧 Email System

When someone submits the contact form, **two premium HTML emails** are sent:

| Email | Recipient | Content |
|:---|:---|:---|
| **Owner Notification** | raleem811811@gmail.com | Structured card with sender info, subject, message, and one-click reply button |
| **Thank You** | Sender | Professional confirmation with message recap, GitHub/LinkedIn links, and ETA |

Both emails use a **dark navy theme** (`#0a192f`) with the portfolio's signature `#64ffda` accent color and **RA** monogram branding.

---

## 🔐 Admin Panel

Access at `http://localhost:3000/admin/login`

| Feature | Description |
|:---|:---|
| **Dashboard** | Overview stats and quick actions |
| **Content Management** | Edit Profile, Experience, Projects, Skills |
| **Blog CMS** | Create/edit posts with drafts and publishing |
| **Contact Inbox** | View messages, mark as read, delete |
| **Analytics** | Page views, visitor tracking, engagement |

---

## 📊 Portfolio Showcase

### Featured Projects (7)

| # | Project | Domain | Stack Highlights |
|:---:|:---|:---|:---|
| 1 | **Front Desk AI Agent** | Healthcare AI | LiveKit · n8n · ElevenLabs |
| 2 | **RCM Automation Platform** | Healthcare Billing | AI/ML · Python · n8n |
| 3 | **TechSpace Community** | Social Platform | React · Ant Design · Cloudinary |
| 4 | **Techlution AI** | SaaS Platform | React · Three.js · GPT-4o · Socket.io |
| 5 | **AI Job Assistant** | Career Automation | FastAPI · n8n · Celery · GPT-4o |
| 6 | **Aleem Voice Agent** | Voice AI | LiveKit · Deepgram · 24-state FSM |
| 7 | **Aleem Family Golf** | Booking Platform | Express · SQLite · GSAP · Docker |

### Career Journey (5 Roles)

| Role | Company | Period |
|:---|:---|:---|
| AI Team Lead / Product Manager | CareCloud MTBC | Jan 2026 — Present |
| Product Manager | CareCloud MTBC | Aug — Dec 2025 |
| PM Intern | CareCloud MTBC | May — Aug 2025 |
| IT Support Manager Intern | PARCO | Jun — Sep 2024 |
| Freelance Product Manager | Fiverr | Feb 2022 — Present |

### Skill Groups (6 × 58 Skills)

`Leadership & Delivery` · `AI & Automation` · `Frontend Development` · `Backend & Data` · `DevOps & Cloud` · `Tools & Platforms`

**Tools & Platforms:** VS Code · Visual Studio · PyCharm · Git & GitHub · Postman · Figma · MySQL · MongoDB Atlas · pgAdmin · Slack · Notion · Digital Marketing · Technical Documentation · CRM Systems

---

## 🌐 Environment Variables

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://aleem:portfolio_secret_2024@localhost:5434/portfolio
JWT_SECRET=your_jwt_secret
PORT=4000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
```

### Frontend (`frontend/.env.local`)

```env
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CHATBOT_NAME=Ask Aleem AI
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
```

---

## 📝 License

This project is built as a personal portfolio. All rights reserved by **Rana Muhammad Aleem Akhtar**.

---

## 📬 Contact

<div align="center">

[![Email](https://img.shields.io/badge/Email-raleem811811%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:raleem811811@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Aleem%20Akhtar-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/aleem-akhtar)
[![GitHub](https://img.shields.io/badge/GitHub-aleemrana8-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/aleemrana8)
[![Instagram](https://img.shields.io/badge/Instagram-aleemakhtar811-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/aleemakhtar811)

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a192f,50:112240,100:64ffda&height=100&section=footer" width="100%" />

**Built with 💚 by Rana Muhammad Aleem Akhtar**

*AI Team Lead · Product Manager · Technical Project Manager*

</div>
- JWT-secured admin routes
- Zod input validation
- Accessible: semantic HTML, keyboard navigation, ARIA labels
