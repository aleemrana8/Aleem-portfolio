# 🚀 Production Deployment Guide

## Aleem AI Portfolio — Complete Deployment Playbook

---

## Architecture Overview

```
┌─────────────────────┐     ┌─────────────────────┐
│   Vercel (Frontend)  │────▶│  Railway/Render      │
│   Next.js 14 + SSR  │     │  (Backend API)       │
│   AI Chat Route      │     │  NestJS + Prisma     │
│   Edge Optimized     │     │  OpenAI GPT-4o-mini  │
└─────────────────────┘     └──────────┬────────────┘
                                       │
                            ┌──────────▼────────────┐
                            │   Neon PostgreSQL      │
                            │   + pgvector           │
                            │   (Vector Embeddings)  │
                            └────────────────────────┘
                                       │
                            ┌──────────▼────────────┐
                            │   Upstash Redis        │
                            │   (Optional Cache)     │
                            └────────────────────────┘
```

---

## Step 1: Database Setup (Neon PostgreSQL)

### 1.1 Create Neon Account & Project
1. Go to [neon.tech](https://neon.tech) and create an account
2. Create a new project: **aleem-portfolio**
3. Choose region: **US East (Virginia)** — closest to Vercel iad1
4. Copy the connection strings:
   - **Pooled connection** → `DATABASE_URL`
   - **Direct connection** → `DIRECT_DATABASE_URL`

### 1.2 Enable pgvector
Neon supports pgvector natively. Run in the Neon SQL Editor:
```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### 1.3 Run Prisma Migrations
```bash
cd backend
export DATABASE_URL="postgresql://USER:PASS@ep-xxx.us-east-2.aws.neon.tech/portfolio?sslmode=require"
export DIRECT_DATABASE_URL="postgresql://USER:PASS@ep-xxx.us-east-2.aws.neon.tech/portfolio?sslmode=require"
npx prisma migrate deploy
npx prisma db seed
```

### 1.4 Setup Vector Indexes
After migrations, run the pgvector setup SQL:
```bash
psql $DATABASE_URL -f prisma/migrations/setup_pgvector.sql
```
Or paste the contents of that file into Neon SQL Editor.

---

## Step 2: Backend Deployment (Railway)

### 2.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub account
3. Create new project → **Deploy from GitHub repo**
4. Select **aleemrana8/Aleem-portfolio**
5. Set root directory to: `backend`

### 2.2 Configure Environment Variables
In Railway dashboard → Variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Neon pooled connection string |
| `DIRECT_DATABASE_URL` | Neon direct connection string |
| `OPENAI_API_KEY` | Your OpenAI API key |
| `JWT_SECRET` | Generate: `openssl rand -hex 32` |
| `NODE_ENV` | `production` |
| `PORT` | `4000` |
| `CORS_ORIGIN` | `https://your-domain.vercel.app` |
| `SMTP_USER` | Gmail address |
| `SMTP_PASS` | Gmail App Password |
| `FRONTEND_URL` | `https://your-domain.vercel.app` |
| `REDIS_URL` | (optional) Upstash Redis URL |

### 2.3 Deploy
Railway auto-deploys from GitHub on push to main.
The Dockerfile handles:
1. `npm ci` → install deps
2. `prisma generate` → generate client
3. `npm run build` → compile TypeScript
4. `prisma migrate deploy` → run migrations
5. `node dist/main.js` → start server

### 2.4 Get Backend URL
After deploy, Railway assigns a URL like:
`https://aleem-portfolio-api-production.up.railway.app`

### Alternative: Render Deployment
1. Go to [render.com](https://render.com)
2. New → Web Service → Connect GitHub repo
3. Root directory: `backend`
4. Dockerfile path: `./Dockerfile`
5. Add same environment variables as above
6. Health check path: `/api/health`

---

## Step 3: Frontend Deployment (Vercel)

### 3.1 Create Vercel Project
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repo: **aleemrana8/Aleem-portfolio**
3. Configure:
   - **Framework**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install --legacy-peer-deps`
   - **Output Directory**: `.next`

### 3.2 Environment Variables
In Vercel dashboard → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend.up.railway.app/api` |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` |
| `NEXT_PUBLIC_CHATBOT_NAME` | `Ask Aleem AI` |
| `OPENAI_API_KEY` | Your OpenAI API key |

### 3.3 Custom Domain (Optional)
1. Vercel → Settings → Domains
2. Add your domain: `aleemai.dev` or `aleem.dev`
3. Update DNS records as Vercel instructs
4. SSL is automatic

### 3.4 Deployment Settings
- **Production Branch**: `main`
- **Preview Deployments**: Enabled (every PR gets a preview URL)
- **Auto Deploy**: Enabled
- **Region**: `iad1` (US East)

---

## Step 4: Sync Embeddings (Post-Deploy)

After both backend and database are running, seed the vector embeddings:

```bash
# Trigger embedding sync via API
curl -X POST https://your-backend-url/api/embeddings/sync \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Or from the admin panel once logged in.

This will:
1. Load all portfolio content from the database
2. Generate embeddings via OpenAI text-embedding-3-small
3. Store 1536-dimensional vectors in pgvector
4. Enable semantic search for the RAG chatbot

---

## Step 5: Redis Setup (Optional)

### Upstash Redis
1. Go to [upstash.com](https://upstash.com)
2. Create a Redis database
3. Choose region: US East 1
4. Copy the Redis URL
5. Add to Railway/Render as `REDIS_URL`

---

## Step 6: Monitoring & Analytics

### Vercel Analytics
Auto-enabled when deployed to Vercel. Tracks:
- Page views & unique visitors
- Web Vitals (LCP, FID, CLS)
- Geographic distribution

### Error Monitoring (Sentry — Optional)
1. Create a Sentry account at [sentry.io](https://sentry.io)
2. Install: `npm install @sentry/nextjs`
3. Run: `npx @sentry/wizard@latest -i nextjs`
4. Add `SENTRY_DSN` to Vercel environment variables

### Backend Monitoring
Railway/Render provide built-in:
- CPU/Memory metrics
- Request logs
- Deploy logs
- Health check status

---

## Step 7: CI/CD Pipeline

GitHub Actions automatically run on push to `main`:

### Frontend Pipeline (.github/workflows/frontend.yml)
1. Install dependencies
2. Type check
3. Build
4. Deploy to Vercel (if main branch)

### Backend Pipeline (.github/workflows/backend.yml)
1. Install dependencies
2. Generate Prisma Client
3. Build
4. Validate Prisma schema
5. Deploy to Railway (if main branch)

### Required GitHub Secrets
Set in GitHub → Settings → Secrets:

| Secret | Source |
|--------|--------|
| `VERCEL_TOKEN` | Vercel → Settings → Tokens |
| `VERCEL_ORG_ID` | Vercel → Settings → General |
| `VERCEL_PROJECT_ID` | Vercel → Project → Settings |
| `RAILWAY_TOKEN` | Railway → Settings → Tokens |
| `NEXT_PUBLIC_API_URL` | Your Railway backend URL |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel frontend URL |
| `OPENAI_API_KEY` | OpenAI dashboard |

---

## Step 8: Security Checklist

- [x] Helmet security headers enabled
- [x] CORS restricted to frontend origin
- [x] Rate limiting: 100 req/min global, 25 req/min for AI chat
- [x] Input sanitization via class-validator & Zod
- [x] JWT authentication on admin routes
- [x] bcrypt password hashing (12 rounds)
- [x] Environment variables for all secrets
- [x] Swagger docs disabled in production
- [x] X-Frame-Options: DENY
- [x] Content-Type-Options: nosniff
- [x] Topic filter blocks off-topic AI queries
- [x] Message length limits (2000 chars)
- [x] Conversation history capped (12 messages)

---

## Step 9: Performance Targets

| Metric | Target | Implementation |
|--------|--------|----------------|
| LCP | < 2.5s | Edge rendering, image optimization |
| FID | < 100ms | Dynamic imports, code splitting |
| CLS | < 0.1 | Proper image dimensions, font loading |
| TTFB | < 200ms | Vercel edge network |
| Lighthouse | 95+ | All optimizations combined |

---

## Quick Reference

### URLs Structure
| Service | URL |
|---------|-----|
| Frontend | `https://your-domain.vercel.app` |
| Backend API | `https://your-backend.up.railway.app/api` |
| Health Check | `https://your-backend.up.railway.app/api/health` |
| Swagger (dev) | `http://localhost:4000/api/docs` |

### Common Commands
```bash
# Local development
docker compose up -d db redis        # Start DB + Redis
cd backend && npm run dev             # Start backend
cd frontend && npm run dev            # Start frontend

# Database
cd backend
npx prisma migrate dev                # Create migration
npx prisma migrate deploy             # Apply migrations
npx prisma db seed                    # Seed data
npx prisma studio                     # Visual DB editor

# Embeddings
curl -X POST http://localhost:4000/api/embeddings/sync  # Sync vectors

# Build
cd frontend && npm run build          # Test production build
cd backend && npm run build           # Test backend build
```

---

## Troubleshooting

### Backend won't start on Railway
- Check `DATABASE_URL` includes `?sslmode=require` for Neon
- Ensure `DIRECT_DATABASE_URL` is set for migrations
- Check Railway logs for Prisma migration errors

### Chatbot not responding
- Verify `OPENAI_API_KEY` is set in both Vercel and Railway
- Check rate limits haven't been exceeded
- Ensure embeddings have been synced: `GET /api/embeddings/status`

### CORS errors
- Verify `CORS_ORIGIN` in Railway matches your Vercel domain exactly
- Include protocol: `https://your-domain.vercel.app`
- For multiple origins: `https://domain1.com,https://domain2.com`

### Build failures on Vercel
- Ensure install command is `npm install --legacy-peer-deps`
- Check that `NEXT_PUBLIC_API_URL` is set
- Clear Vercel build cache if needed
