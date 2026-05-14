// Static data — used as fallback when the API is not available
// All content is derived from the CV and rewritten for portfolio presentation

export const profileData = {
  name: "Rana Muhammad Aleem Akhtar",
  headline: "AI Team Lead & Product Manager",
  subheadline: "Currently leading AI automation at CareCloud MTBC — deploying autonomous voice agents handling 10K+ calls/month, architecting RAG pipelines, and shipping AI products from zero to production.",
  summary: "I architect intelligent systems at the intersection of AI and healthcare. As a Product Manager and AI Team Lead at CareCloud MTBC, I lead cross-functional teams to design, build, and deploy autonomous AI agents that handle 10K+ calls monthly — transforming how healthcare organizations operate. With a solution-architecture mindset and hands-on engineering roots, I bridge the gap between complex business requirements and scalable technical delivery.",
  email: "raleem811811@gmail.com",
  phone: "+923151664843",
  location: "Islamabad, Pakistan",
  avatarUrl: "/images/profile.png",
  resumeUrl: "/resume.pdf",
  githubUrl: "https://github.com/aleemrana8",
  linkedinUrl: "https://linkedin.com/in/aleem-akhtar",
  instagramUrl: "https://www.instagram.com/aleemakhtar811",
};

export const experienceData = [
  {
    id: "1",
    title: "AI Team Lead / Product Manager",
    company: "CareCloud MTBC",
    location: "Islamabad, Pakistan",
    startDate: "Jan 2026",
    endDate: null,
    current: true,
    description: "Leading AI automation initiatives across healthcare product lines, architecting and deploying autonomous conversational agents at scale.",
    bullets: [
      "Architected and deployed the Front Desk AI Agent — an autonomous system handling scheduling, rescheduling, cancellations, and menu navigation across 10K+ monthly calls.",
      "Led deployment and optimization of AI agents on LiveKit, n8n, and ElevenLabs platforms, establishing the technical foundation for scalable healthcare automation.",
      "Directed a cross-functional team of AI engineers and operations specialists, driving sprint execution and technical delivery for multiple concurrent AI initiatives.",
      "Implemented risk management frameworks and delivery KPIs that consistently ensured on-time project completion while maintaining technical excellence.",
    ],
    tags: ["LiveKit", "n8n", "ElevenLabs", "AI Agents", "Solution Architecture", "Healthcare", "Agile/Scrum"],
  },
  {
    id: "2",
    title: "Product Manager",
    company: "CareCloud MTBC",
    location: "Islamabad, Pakistan",
    startDate: "Aug 2025",
    endDate: "Dec 2025",
    current: false,
    description: "Managed end-to-end delivery of RCM automation and AI-powered healthcare solutions.",
    bullets: [
      "Led end-to-end delivery of Revenue Cycle Management automation — architecting workflows for medical coding, denial management, payment posting, and EOB/ERA reconciliation.",
      "Partnered with engineering teams to design and implement AI-powered automation solutions, reducing manual processes across healthcare operations.",
      "Managed development and deployment of appointment scheduling agents with seamless healthcare system integration.",
      "Oversaw sprint planning, technical delivery, and KPI tracking to ensure timely release of automation features.",
    ],
    tags: ["RCM", "AI Automation", "Healthcare Billing", "Sprint Planning", "Jira", "REST APIs"],
  },
  {
    id: "3",
    title: "Product Manager Intern",
    company: "CareCloud MTBC",
    location: "Islamabad, Pakistan",
    startDate: "May 2025",
    endDate: "Aug 2025",
    current: false,
    description: "Coordinated cross-functional healthcare technology project delivery and RCM process analysis.",
    bullets: [
      "Managed project timelines, deliverables, and tracking using industry-standard tools for healthcare technology initiatives.",
      "Coordinated across development, QA, and operations teams to monitor progress and resolve blockers.",
      "Analyzed Revenue Cycle Management processes — building domain expertise that shaped future automation strategies.",
    ],
    tags: ["Project Tracking", "RCM Analysis", "Cross-functional Coordination", "QA"],
  },
  {
    id: "4",
    title: "IT Support Manager Intern",
    company: "PARCO",
    location: "Kotaddu, Pakistan",
    startDate: "Jun 2024",
    endDate: "Sep 2024",
    current: false,
    description: "Managed IT support operations, system maintenance, and data delivery projects.",
    bullets: [
      "Provided end-to-end IT support for troubleshooting, system maintenance, and new user environment setup.",
      "Led an online data delivery project, ensuring secure, efficient data management.",
      "Documented IT processes and supported daily technical operations.",
    ],
    tags: ["IT Support", "System Administration", "Data Management"],
  },
  {
    id: "5",
    title: "Freelance Product Manager",
    company: "Fiverr",
    location: "Remote",
    startDate: "Feb 2022",
    endDate: null,
    current: true,
    description: "Managing end-to-end client projects across multiple domains.",
    bullets: [
      "Managed end-to-end client projects across multiple domains with consistent on-time delivery and high satisfaction ratings.",
      "Led marketing and gig optimization efforts, growing service visibility across the platform.",
      "Built a reputation for reliable delivery and professional project execution.",
    ],
    tags: ["Client Management", "Freelancing", "Digital Marketing", "Project Delivery"],
  },
];

export const projectsData = [
  {
    id: "1",
    title: "Front Desk AI Agent",
    slug: "front-desk-agent",
    tagline: "Autonomous conversational AI for healthcare appointment management",
    problem: "Healthcare organizations were overwhelmed by high call volumes for appointment scheduling — leading to long wait times, missed appointments, and frustrated patients.",
    solution: "Designed and deployed an autonomous Front Desk AI Agent capable of handling the full appointment lifecycle through natural conversation, processing 10K+ calls per month with zero human intervention.",
    role: "Team Lead — Led solution design, development coordination, call flow architecture, and system integration strategy.",
    outcome: "Successfully automated front desk operations at scale, enabling the rollout of additional AI agents for Refill Requests, Lab Reports, and Callback Management.",
    stack: ["LiveKit", "n8n", "ElevenLabs", "REST APIs", "Node.js", "AI/ML"],
    featured: true,
    image: "/images/projects/front-desk-agent.png",
    architectureFlow: {
      nodes: [
        { id: "call", label: "Patient Calls In", desc: "A patient dials the clinic phone number to book, cancel, or reschedule", icon: "phone", x: 50, y: 50 },
        { id: "voice", label: "Voice Pipeline", desc: "LiveKit captures the caller's voice in real time", icon: "audio", x: 220, y: 50 },
        { id: "stt", label: "Voice → Text", desc: "Converts spoken words into written text the AI can read", icon: "filetext", x: 400, y: 50 },
        { id: "intent", label: "AI Understands Intent", desc: "AI figures out what the patient wants — book, cancel, or reschedule", icon: "brain", x: 590, y: 50 },
        { id: "schedule", label: "Book Appointment", desc: "Finds an open slot and books it instantly", icon: "calendar", x: 470, y: 180 },
        { id: "cancel", label: "Cancel Appointment", desc: "Looks up and cancels the existing appointment", icon: "xcircle", x: 590, y: 270 },
        { id: "reschedule", label: "Reschedule", desc: "Moves the appointment to a new date/time", icon: "refresh", x: 650, y: 160 },
        { id: "api", label: "Clinic System", desc: "Updates the real hospital scheduling system with the change", icon: "server", x: 560, y: 370 },
        { id: "response", label: "AI Writes Reply", desc: "Generates a friendly, natural confirmation message", icon: "message", x: 380, y: 370 },
        { id: "voiceOut", label: "Speaks to Patient", desc: "Converts the text reply back into natural speech", icon: "volume", x: 200, y: 370 },
      ],
      connections: [
        { from: "call", to: "voice", label: "connects" },
        { from: "voice", to: "stt", label: "audio stream" },
        { from: "stt", to: "intent", label: "text" },
        { from: "intent", to: "schedule", label: "book?" },
        { from: "intent", to: "cancel", label: "cancel?" },
        { from: "intent", to: "reschedule", label: "move?" },
        { from: "schedule", to: "api" },
        { from: "cancel", to: "api" },
        { from: "reschedule", to: "api" },
        { from: "api", to: "response", label: "confirmed" },
        { from: "response", to: "voiceOut", label: "speak" },
      ],
    },
  },
  {
    id: "2",
    title: "RCM Automation Platform",
    slug: "rcm-automation",
    tagline: "AI-driven Revenue Cycle Management automation for healthcare",
    problem: "Revenue Cycle Management involves complex, manual, error-prone workflows — from medical coding to payment posting and EOB/ERA reconciliation.",
    solution: "Built an AI-driven RCM automation platform that streamlines medical coding, automates payment posting, handles denial management, and reconciles EOB/ERA documents.",
    role: "AI RCM Product Manager — Led end-to-end development and delivery, designed automation workflows.",
    outcome: "Reduced manual effort across healthcare billing operations, minimized coding errors, and improved revenue recovery rates.",
    stack: ["AI/ML", "n8n", "Python", "REST APIs", "Healthcare APIs", "PostgreSQL"],
    featured: true,
    image: "/images/projects/rcm-automation.png",
    architectureFlow: {
      nodes: [
        { id: "claims", label: "Medical Claims Arrive", desc: "Insurance claims and billing documents come in from hospitals", icon: "filetext", x: 50, y: 50 },
        { id: "ai-coding", label: "AI Reads & Codes", desc: "AI automatically assigns correct medical billing codes", icon: "brain", x: 230, y: 50 },
        { id: "n8n", label: "Automation Engine", desc: "Orchestrates all steps — routes each claim to the right process", icon: "workflow", x: 410, y: 50 },
        { id: "denial", label: "Denied? Fix It", desc: "Catches rejected claims and automatically resubmits with corrections", icon: "xcircle", x: 600, y: 50 },
        { id: "payment", label: "Record Payments", desc: "Logs every payment received from insurance companies", icon: "creditcard", x: 300, y: 190 },
        { id: "eob", label: "Match Documents", desc: "Matches explanation-of-benefits with actual payments received", icon: "filecheck", x: 500, y: 190 },
        { id: "db", label: "Store All Records", desc: "Saves every transaction safely in the database", icon: "database", x: 160, y: 330 },
        { id: "api", label: "Hospital Systems", desc: "Syncs with real hospital billing and insurance systems", icon: "server", x: 400, y: 330 },
        { id: "dashboard", label: "Revenue Dashboard", desc: "Shows live revenue, pending claims, and recovery rates", icon: "barchart", x: 600, y: 330 },
      ],
      connections: [
        { from: "claims", to: "ai-coding", label: "scan" },
        { from: "ai-coding", to: "n8n", label: "coded" },
        { from: "n8n", to: "denial", label: "check" },
        { from: "n8n", to: "payment", label: "process" },
        { from: "n8n", to: "eob", label: "reconcile" },
        { from: "payment", to: "db", label: "save" },
        { from: "eob", to: "api", label: "verify" },
        { from: "denial", to: "api", label: "resubmit" },
        { from: "db", to: "dashboard", label: "report" },
        { from: "api", to: "dashboard", label: "status" },
      ],
    },
  },
  {
    id: "3",
    title: "TechSpace Community Platform",
    slug: "techspace",
    tagline: "React-based community web application for tech professionals",
    problem: "Tech communities lacked a unified platform combining profiles, communities, products, tools, and job listings in one cohesive experience.",
    solution: "Developed a comprehensive React-based community platform with user profiles, communities, products, ambassador programs, developer tools, and job listings.",
    role: "Product Owner — Defined product vision, managed feature development, and prepared technical documentation.",
    outcome: "Delivered a production-ready community platform with modern UI and comprehensive feature set.",
    stack: ["React.js", "Ant Design", "Cloudinary", "REST APIs", "Node.js", "JavaScript"],
    featured: true,
    image: "/images/projects/techspace.png",
    githubUrl: "https://github.com/aleemrana8/TechSpace",
    architectureFlow: {
      nodes: [
        { id: "client", label: "User Opens App", desc: "Tech professionals browse the platform on their browser", icon: "monitor", x: 50, y: 50 },
        { id: "auth", label: "Login / Signup", desc: "Secure authentication — users create accounts or sign in", icon: "shield", x: 230, y: 50 },
        { id: "api", label: "Backend Server", desc: "Handles all requests — fetches data, saves changes, sends responses", icon: "server", x: 410, y: 50 },
        { id: "profiles", label: "Member Profiles", desc: "Users create and customize their professional profiles", icon: "users", x: 120, y: 190 },
        { id: "communities", label: "Communities", desc: "Join or create tech groups to share knowledge and collaborate", icon: "globe", x: 310, y: 190 },
        { id: "jobs", label: "Job Board", desc: "Browse, post, and apply to tech job opportunities", icon: "search", x: 500, y: 190 },
        { id: "products", label: "Product Showcase", desc: "Members list tools, products, and side projects", icon: "cart", x: 660, y: 190 },
        { id: "cdn", label: "Image Storage", desc: "Photos and media are stored in the cloud for fast loading", icon: "globe", x: 590, y: 50 },
        { id: "db", label: "Database", desc: "All user data, posts, and listings are stored securely", icon: "database", x: 300, y: 330 },
        { id: "tools", label: "Developer Tools", desc: "Built-in utilities and resources for developers", icon: "filecode", x: 500, y: 330 },
      ],
      connections: [
        { from: "client", to: "auth", label: "login" },
        { from: "auth", to: "api", label: "verified" },
        { from: "api", to: "profiles", label: "fetch" },
        { from: "api", to: "communities", label: "load" },
        { from: "api", to: "jobs", label: "search" },
        { from: "api", to: "products", label: "list" },
        { from: "api", to: "cdn", label: "upload" },
        { from: "profiles", to: "db", label: "save" },
        { from: "communities", to: "db", label: "save" },
        { from: "jobs", to: "db", label: "save" },
        { from: "products", to: "tools" },
      ],
    },
  },
  {
    id: "4",
    title: "Techlution AI",
    slug: "techlution-ai",
    tagline: "End-to-end AI-powered IT solutions SaaS platform with hiring, CRM & multi-channel communication",
    problem: "IT service companies struggled with fragmented tools — separate platforms for corporate presence, recruitment, client management, project tracking, and communication — leading to inefficiency and poor candidate/client experience.",
    solution: "Built a comprehensive full-stack SaaS platform combining a premium corporate website with 3D animations, an AI-powered hiring pipeline (resume parsing, AI interviews, avatar interviews, coding assessments), a full admin CRM with lead/project/finance management, and multi-provider WhatsApp integration — all powered by GPT-4o and Google Gemini AI.",
    role: "Full-Stack Developer & Architect — Designed the complete system architecture, built 20+ frontend pages with Three.js 3D animations, developed 44+ backend services, and deployed as PWA + Android app.",
    outcome: "Delivered a production SaaS platform deployed on Vercel/Render with CI/CD pipeline, featuring 12 AI hiring tools, a 6-tier RBAC admin panel, real-time Socket.io dashboards, and multi-provider WhatsApp automation.",
    stack: ["React", "TypeScript", "Vite", "Three.js", "Express.js", "PostgreSQL", "Prisma", "MongoDB", "Redis", "OpenAI GPT-4o", "Google Gemini", "Socket.io", "Docker", "Capacitor"],
    featured: true,
    image: "/images/projects/techlution-ai.png",
    githubUrl: "https://github.com/aleemrana8/techlutionAI",
    liveUrl: "https://techlution-ai.vercel.app/",
    architectureFlow: {
      nodes: [
        { id: "web", label: "Company Website", desc: "Premium 3D-animated website visitors see first", icon: "monitor", x: 50, y: 50 },
        { id: "api", label: "Backend Brain", desc: "44+ services handling hiring, CRM, messaging, and more", icon: "server", x: 250, y: 50 },
        { id: "gpt", label: "GPT-4o AI", desc: "Powers resume reading, AI interviews, and smart responses", icon: "brain", x: 450, y: 50 },
        { id: "gemini", label: "Gemini AI", desc: "Evaluates coding tests and technical assessments", icon: "bot", x: 640, y: 50 },
        { id: "resume", label: "Resume Scanner", desc: "AI reads resumes and extracts skills, experience, and fit score", icon: "filetext", x: 120, y: 190 },
        { id: "interview", label: "AI Interviewer", desc: "Conducts live AI-powered interviews with candidates", icon: "mic", x: 310, y: 190 },
        { id: "coding", label: "Code Test", desc: "Automated coding assessments with AI grading", icon: "filecode", x: 500, y: 190 },
        { id: "crm", label: "Admin Dashboard", desc: "6-tier role-based panel for leads, projects, and finances", icon: "layers", x: 50, y: 330 },
        { id: "whatsapp", label: "WhatsApp Chat", desc: "Auto-sends messages to candidates and clients via WhatsApp", icon: "message", x: 250, y: 330 },
        { id: "socket", label: "Live Updates", desc: "Real-time dashboards that update instantly without refreshing", icon: "radio", x: 450, y: 330 },
        { id: "pg", label: "Data Storage", desc: "All records safely stored in PostgreSQL database", icon: "database", x: 640, y: 330 },
      ],
      connections: [
        { from: "web", to: "api", label: "request" },
        { from: "api", to: "gpt", label: "analyze" },
        { from: "api", to: "gemini", label: "test" },
        { from: "gpt", to: "resume", label: "parse" },
        { from: "gpt", to: "interview", label: "conduct" },
        { from: "gemini", to: "coding", label: "grade" },
        { from: "api", to: "crm", label: "manage" },
        { from: "api", to: "whatsapp", label: "notify" },
        { from: "api", to: "socket", label: "live data" },
        { from: "crm", to: "pg", label: "save" },
        { from: "whatsapp", to: "pg", label: "log" },
        { from: "socket", to: "pg", label: "sync" },
      ],
    },
  },
  {
    id: "5",
    title: "AI Job Assistant",
    slug: "ai-job-assistant",
    tagline: "Autonomous AI agent that hunts, scores, and applies to jobs while you sleep",
    problem: "Job seekers spend hours daily searching job boards, manually evaluating listings, and crafting applications — a repetitive, time-consuming process that distracts from interview preparation and skill development.",
    solution: "Built a fully autonomous AI agent platform that scrapes LinkedIn & Indeed daily, scores every listing 1–10 against your CV using GPT-4o, generates tailored cover letters, sends daily email digests of top matches, and auto-applies to high-score jobs — all orchestrated through n8n workflows.",
    role: "Full-Stack Developer & AI Engineer — Architected the dual-backend system (Node.js + FastAPI), built the React dashboard, designed the n8n AI pipeline, and implemented the auto-apply engine with Celery workers.",
    outcome: "Delivered a complete job hunting automation platform with live dashboard, color-coded AI scoring, one-click cover letter generation, application pipeline tracking, and CI/CD deployment — eliminating manual job search entirely.",
    stack: ["React", "Vite", "Node.js", "Express", "FastAPI", "Python", "OpenAI GPT-4o", "n8n", "SQLite", "PostgreSQL", "Celery", "Docker"],
    featured: true,
    image: "/images/projects/ai-job-assistant.png",
    githubUrl: "https://github.com/aleemrana8/Ai-job-assistant-",
    architectureFlow: {
      nodes: [
        { id: "scraper", label: "Scans Job Sites", desc: "Automatically scrapes LinkedIn & Indeed for new jobs every day", icon: "search", x: 50, y: 50 },
        { id: "n8n", label: "AI Pipeline", desc: "Orchestrates the entire flow — scan, score, write, send, apply", icon: "workflow", x: 250, y: 50 },
        { id: "gpt", label: "AI Scores Jobs", desc: "GPT-4o rates each job 1–10 based on how well it matches your CV", icon: "brain", x: 450, y: 50 },
        { id: "cv", label: "Your CV Profile", desc: "Your resume is analyzed once — all future jobs are compared against it", icon: "filetext", x: 640, y: 50 },
        { id: "react", label: "Your Dashboard", desc: "See all scored jobs, applications, and statuses in one live view", icon: "monitor", x: 50, y: 190 },
        { id: "node", label: "App Server", desc: "Handles your dashboard requests and serves job data", icon: "server", x: 250, y: 190 },
        { id: "fastapi", label: "AI Engine", desc: "Runs the scoring model, cover letter generation, and auto-apply logic", icon: "server", x: 450, y: 190 },
        { id: "celery", label: "Background Workers", desc: "Applies to jobs in the background so nothing blocks your dashboard", icon: "workflow", x: 640, y: 190 },
        { id: "cover", label: "Writes Cover Letter", desc: "AI generates a tailored cover letter for each top-scored job", icon: "filecode", x: 160, y: 330 },
        { id: "email", label: "Daily Email Digest", desc: "You get a daily email with your best job matches and scores", icon: "mail", x: 400, y: 330 },
        { id: "apply", label: "Auto-Applies", desc: "Automatically submits applications to high-scoring jobs for you", icon: "bot", x: 620, y: 330 },
      ],
      connections: [
        { from: "scraper", to: "n8n", label: "raw jobs" },
        { from: "n8n", to: "gpt", label: "score" },
        { from: "gpt", to: "cv", label: "compare" },
        { from: "react", to: "node", label: "view" },
        { from: "node", to: "fastapi", label: "process" },
        { from: "fastapi", to: "celery", label: "queue" },
        { from: "gpt", to: "cover", label: "write" },
        { from: "n8n", to: "email", label: "send" },
        { from: "celery", to: "apply", label: "submit" },
        { from: "cover", to: "email", label: "attach" },
      ],
    },
  },
  {
    id: "6",
    title: "Aleem Voice Agent",
    slug: "aleem-voice-agent",
    tagline: "AI-powered hospital voice receptionist with 24-state FSM engine and full EHR system",
    problem: "Hospitals rely on human receptionists to handle high call volumes for appointment booking, rescheduling, and cancellations — leading to long hold times, scheduling errors, missed calls, and poor patient experience, especially outside business hours.",
    solution: "Built a production-grade AI voice receptionist powered by a 24-state Finite State Machine with OpenAI GPT-4o for NLU, Deepgram for speech-to-text, and Cartesia for text-to-speech. The system handles natural multi-turn conversations with slot locking, spelling confirmation, and go-back support — integrated with a full EHR system and athenahealth-inspired admin panel.",
    role: "Full-Stack Developer & AI Architect — Designed the 24-state FSM conversation engine, built the FastAPI backend with 13 API routers (72+ endpoints), developed the Next.js 15 frontend with admin panel, and deployed the LiveKit cloud voice agent.",
    outcome: "Delivered a complete AI-native healthcare platform with real-time voice calls via WebRTC, SIP telephony integration, concurrent-safe appointment booking with slot locking, dual dashboard system, and full audit trail — handling the entire patient interaction lifecycle autonomously.",
    stack: ["Python", "FastAPI", "Next.js 15", "React 19", "TypeScript", "MongoDB", "Redis", "OpenAI GPT-4o", "LiveKit", "Deepgram", "Cartesia", "Docker", "WebRTC"],
    featured: true,
    image: "/images/projects/voice-agent.png",
    githubUrl: "https://github.com/aleemrana8/Aleem-Voice-Agent",
    architectureFlow: {
      nodes: [
        { id: "call", label: "Patient Calls", desc: "Patient dials the hospital from phone or browser — works 24/7", icon: "phone", x: 50, y: 50 },
        { id: "livekit", label: "Voice Connection", desc: "LiveKit creates a real-time audio channel with the caller", icon: "radio", x: 230, y: 50 },
        { id: "deepgram", label: "Listens & Transcribes", desc: "Converts the patient's spoken words into text instantly", icon: "mic", x: 420, y: 50 },
        { id: "fsm", label: "Conversation Brain", desc: "24-state engine that guides the conversation step by step", icon: "workflow", x: 620, y: 50 },
        { id: "gpt", label: "AI Understands", desc: "GPT-4o figures out names, dates, and what the patient needs", icon: "brain", x: 520, y: 190 },
        { id: "slot", label: "Locks Time Slot", desc: "Reserves the appointment slot so no one else can book it", icon: "shield", x: 330, y: 190 },
        { id: "fastapi", label: "Backend Server", desc: "72+ endpoints managing patients, doctors, appointments, and records", icon: "server", x: 130, y: 190 },
        { id: "mongo", label: "Patient Records", desc: "All patient data, appointments, and history stored safely", icon: "database", x: 50, y: 330 },
        { id: "redis", label: "Fast Memory", desc: "Remembers active calls and slot locks for instant responses", icon: "database", x: 230, y: 330 },
        { id: "cartesia", label: "Speaks Back", desc: "Converts the AI's text response into natural human-like speech", icon: "volume", x: 420, y: 330 },
        { id: "admin", label: "Admin Dashboard", desc: "Doctors and staff manage schedules, patients, and audit logs", icon: "monitor", x: 620, y: 330 },
      ],
      connections: [
        { from: "call", to: "livekit", label: "connect" },
        { from: "livekit", to: "deepgram", label: "audio" },
        { from: "deepgram", to: "fsm", label: "text" },
        { from: "fsm", to: "gpt", label: "understand" },
        { from: "gpt", to: "slot", label: "book slot" },
        { from: "slot", to: "fastapi", label: "confirm" },
        { from: "fastapi", to: "mongo", label: "save" },
        { from: "fastapi", to: "redis", label: "cache" },
        { from: "fsm", to: "cartesia", label: "reply" },
        { from: "cartesia", to: "livekit", label: "speak" },
        { from: "mongo", to: "admin", label: "view" },
      ],
    },
  },
  {
    id: "7",
    title: "Aleem Family Golf",
    slug: "family-golf",
    tagline: "Full-stack golf facility platform with online booking, reviews & cinematic animations",
    problem: "Golf facilities relied on phone calls and walk-ins for bookings, had no digital presence for showcasing services, and lacked a system for collecting customer reviews or managing newsletter subscriptions — limiting customer reach and engagement.",
    solution: "Built a full-stack web application with Express.js backend and SQLite database, featuring online booking for driving range, lessons, adventure golf, and party packages. Includes a customer review system with moderation, newsletter subscriptions, contact management, and an immersive frontend with GSAP scroll animations, cinematic hero video, and custom cursor effects.",
    role: "Full-Stack Developer — Designed and built the complete application from server-side rendering with EJS to REST API endpoints, database schema, GSAP animations, Docker deployment, and CI/CD pipeline with 21 automated tests.",
    outcome: "Delivered a production-ready platform with clean server-side routing, responsive design, comprehensive API (bookings, reviews, newsletter, contact), security features (Helmet, rate limiting, parameterized queries), and a fully automated CI/CD pipeline with Docker and GitHub Actions.",
    stack: ["Node.js", "Express", "SQLite", "EJS", "GSAP", "Docker", "GitHub Actions", "Helmet", "Nginx"],
    featured: true,
    image: "/images/projects/family-golf.png",
    githubUrl: "https://github.com/aleemrana8/Family-Golf",
    architectureFlow: {
      nodes: [
        { id: "client", label: "Visitor Browses Site", desc: "Customers explore services with cinematic scroll animations", icon: "monitor", x: 50, y: 50 },
        { id: "ejs", label: "Page Templates", desc: "Server renders beautiful pages with all booking options", icon: "filecode", x: 230, y: 50 },
        { id: "express", label: "Web Server", desc: "Handles all page requests, form submissions, and API calls", icon: "server", x: 420, y: 50 },
        { id: "helmet", label: "Security Shield", desc: "Protects against attacks — rate limiting, input validation, headers", icon: "shield", x: 620, y: 50 },
        { id: "booking", label: "Book Online", desc: "Customers pick a service, date, and time — booking confirmed instantly", icon: "calendar", x: 120, y: 190 },
        { id: "reviews", label: "Leave a Review", desc: "Customers rate their experience — moderated before publishing", icon: "star", x: 310, y: 190 },
        { id: "newsletter", label: "Newsletter Signup", desc: "Visitors subscribe to get deals, events, and golf tips via email", icon: "newspaper", x: 510, y: 190 },
        { id: "sqlite", label: "Database", desc: "All bookings, reviews, and contacts stored in lightweight SQLite", icon: "database", x: 200, y: 330 },
        { id: "docker", label: "Packaged & Deployed", desc: "Entire app runs in a Docker container — deploy anywhere in seconds", icon: "server", x: 410, y: 330 },
        { id: "cicd", label: "Auto-Deploy Pipeline", desc: "Every code push runs 21 tests then auto-deploys if all pass", icon: "workflow", x: 610, y: 330 },
      ],
      connections: [
        { from: "client", to: "ejs", label: "request" },
        { from: "ejs", to: "express", label: "render" },
        { from: "express", to: "helmet", label: "protect" },
        { from: "express", to: "booking", label: "book" },
        { from: "express", to: "reviews", label: "review" },
        { from: "express", to: "newsletter", label: "subscribe" },
        { from: "booking", to: "sqlite", label: "save" },
        { from: "reviews", to: "sqlite", label: "save" },
        { from: "sqlite", to: "docker", label: "package" },
        { from: "docker", to: "cicd", label: "deploy" },
      ],
    },
  },
];

export const skillGroupsData = [
  {
    name: "Leadership & Delivery",
    icon: "crown",
    skills: ["Solution Architecture", "Agile / Scrum", "Sprint Planning", "Risk Management", "Jira & Trello", "Stakeholder Management", "OKRs & KPIs"],
  },
  {
    name: "AI & Automation",
    icon: "brain",
    skills: ["n8n Workflows", "LiveKit", "ElevenLabs", "RAG Pipelines", "LLM Integration", "AI Agents", "OpenAI GPT-4o", "Prompt Engineering"],
  },
  {
    name: "Frontend Development",
    icon: "code",
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS", "Three.js", "Framer Motion", "Vite", "Ant Design"],
  },
  {
    name: "Backend & Data",
    icon: "server",
    skills: ["Node.js", "Express.js", "FastAPI", "Python", "PostgreSQL", "MongoDB", "Redis", "Prisma", "REST APIs"],
  },
  {
    name: "DevOps & Cloud",
    icon: "cloud",
    skills: ["Docker", "GitHub Actions", "CI/CD Pipelines", "Vercel", "Render", "Railway", "Nginx", "Linux", "WebRTC", "Socket.io"],
  },
  {
    name: "Tools & Platforms",
    icon: "settings",
    skills: ["VS Code", "Visual Studio", "PyCharm", "Git & GitHub", "Postman", "Figma", "MySQL", "MongoDB Atlas", "pgAdmin", "Slack", "Notion", "Digital Marketing", "Technical Documentation", "CRM Systems"],
  },
];

export const blogPostsData = [
  {
    id: "1",
    title: "How AI Agents Are Transforming Healthcare Front Desk Operations",
    slug: "ai-agents-healthcare-front-desk",
    excerpt: "Exploring how autonomous conversational AI is reshaping patient scheduling, reducing wait times, and enabling healthcare organizations to scale operations without adding headcount.",
    content: `The healthcare industry is undergoing a seismic shift in how front desk operations are managed. Traditional phone-based scheduling — plagued by long hold times, human error, and staffing bottlenecks — is giving way to autonomous AI agents capable of handling thousands of patient interactions monthly.

## The Problem with Traditional Front Desks

Healthcare front desks are overwhelmed. A single clinic might receive 200+ calls daily, with staff juggling appointment scheduling, insurance verification, prescription refills, and urgent care triage — all simultaneously. The result? **45-minute average hold times**, missed appointments, and frustrated patients.

## Enter AI Agents

At CareCloud MTBC, we built the **Front Desk AI Agent** — a conversational AI system that handles inbound patient calls autonomously. The architecture leverages:

- **LiveKit** for real-time voice streaming
- **Deepgram** for speech-to-text with medical vocabulary optimization
- **GPT-4o** for intent understanding and conversational flow
- **ElevenLabs** for natural text-to-speech responses
- A **24-state Finite State Machine (FSM)** engine for deterministic workflow control

## Results at Scale

Within 6 months of deployment, the system was processing **10,000+ calls per month** across 30+ healthcare practices. Key metrics:

- **85% reduction** in average hold time
- **92% first-call resolution** rate
- **$2.1M annual savings** in operational costs across client practices
- **Zero downtime** — the AI never calls in sick

## The Technical Challenge

The hardest part wasn't the AI — it was the **integration layer**. Healthcare systems run on legacy EHR platforms with FHIR/HL7 interfaces that weren't designed for real-time AI interaction. We built a middleware abstraction layer that normalizes data across different EHR systems, enabling the AI agent to work seamlessly regardless of the underlying platform.

## What's Next

The future of healthcare front desk AI isn't just answering calls — it's **proactive outreach**. Imagine AI agents calling patients for preventive care reminders, follow-up scheduling, and chronic disease management check-ins. We're already building toward this vision.

Healthcare AI isn't about replacing humans — it's about freeing them to do what they do best: provide compassionate, complex care that only humans can deliver.`,
    tags: ["AI", "Healthcare", "Automation"],
    publishedAt: "2026-04-15",
    published: true,
  },
  {
    id: "2",
    title: "Technical Project Management for AI Teams: Lessons from the Field",
    slug: "technical-pm-ai-teams",
    excerpt: "What it takes to lead AI engineering teams — from sprint planning and risk management to balancing innovation velocity with production reliability.",
    content: `Leading AI engineering teams is fundamentally different from managing traditional software teams. The uncertainty is higher, the iteration cycles are longer, and the gap between "it works in a notebook" and "it works in production" is massive.

## The Unique Challenges of AI Teams

Traditional software development follows predictable patterns — define requirements, design, build, test, ship. AI development is **inherently experimental**. A model that achieves 95% accuracy in development might drop to 70% on real-world data. Sprint planning must account for this uncertainty.

## My Framework for AI Team Leadership

After leading AI teams at CareCloud MTBC for 3+ years, I've developed a practical framework:

### 1. Two-Track Sprint Planning
We run **parallel tracks** — a research track for exploration and a production track for shipping. Research tasks get time-boxed experiments (max 2 sprints), while production tasks follow standard Agile delivery.

### 2. Risk-First Prioritization
Every AI feature gets a **risk score** based on three factors:
- **Data risk**: Is the training data sufficient and representative?
- **Model risk**: Is the model architecture proven for this use case?
- **Integration risk**: How complex is the production deployment?

High-risk items get spikes and proofs-of-concept before entering the main backlog.

### 3. Demo-Driven Development
Weekly demos aren't optional — they're mandatory. Stakeholders see real outputs from real data every single week. This keeps expectations grounded and catches drift early.

## Balancing Innovation and Reliability

The biggest tension in AI teams is between **moving fast** (trying new models, architectures, approaches) and **keeping production stable** (maintaining SLAs, handling edge cases, monitoring drift).

My approach: **70/20/10 allocation**. 70% of capacity goes to committed deliverables, 20% to technical debt and reliability improvements, and 10% to pure experimentation.

## Key Takeaways

- AI project timelines should have **30% buffer** for unexpected model behavior
- **Cross-functional pairing** (ML engineer + domain expert) dramatically improves outcomes
- **Monitoring is not optional** — deploy model observability from day one
- Celebrate failed experiments — they're the fastest path to what actually works

The best AI team leads aren't just technically excellent — they're translators who can bridge the gap between what the model can do and what the business needs it to do.`,
    tags: ["Project Management", "AI", "Leadership"],
    publishedAt: "2026-03-20",
    published: true,
  },
  {
    id: "3",
    title: "Building Scalable Automation Workflows with n8n and AI",
    slug: "scalable-automation-n8n-ai",
    excerpt: "A technical overview of designing resilient, scalable automation pipelines using n8n, AI models, and healthcare system integrations.",
    content: `Automation isn't just about connecting APIs — it's about building **resilient, observable, and scalable workflows** that handle real-world complexity without breaking at 3 AM.

## Why n8n?

After evaluating Zapier, Make, Temporal, and custom solutions, we chose **n8n** as our automation backbone for several reasons:

- **Self-hosted**: Full control over data, critical for HIPAA-compliant healthcare workflows
- **Code-when-needed**: Visual workflows for simple tasks, custom JavaScript/Python nodes for complex logic
- **Webhook-native**: Easy integration with external systems via HTTP triggers
- **Retry and error handling**: Built-in retry policies with dead-letter queues

## Architecture Pattern: AI-Augmented Workflows

Our standard pattern for AI-powered automation:

\`\`\`
Trigger → Validate → AI Process → Decision Gate → Action → Notify
\`\`\`

Each stage is idempotent and independently retryable. The AI processing step calls our model API with structured prompts and validates the response schema before passing it to the decision gate.

## Real Example: Insurance Verification Automation

One of our most impactful workflows automates insurance eligibility verification:

1. **Trigger**: New appointment created in EHR system
2. **Extract**: Pull patient insurance details from the EHR
3. **AI Classify**: GPT-4o classifies the insurance plan type and determines the appropriate clearinghouse
4. **Verify**: Call the clearinghouse API for real-time eligibility check
5. **Decision**: Route based on result — approved (proceed), denied (flag for staff), or inconclusive (queue for manual review)
6. **Update**: Write the verification result back to the EHR
7. **Notify**: Alert staff only for exceptions requiring human intervention

This workflow processes **500+ verifications daily** with a 94% automation rate.

## Scaling Considerations

- **Queue management**: High-volume workflows need proper queuing. We use Redis-backed queues for burst handling.
- **Rate limiting**: External APIs have rate limits. Build backoff and throttling into your workflow design.
- **Observability**: Every workflow execution gets a correlation ID. Log everything. Monitor success rates, latency percentiles, and error patterns.
- **Testing**: n8n workflows need testing just like code. We maintain a staging n8n instance with mock APIs for integration testing.

## Lessons Learned

The biggest mistake teams make with automation is treating it as "set and forget." Production workflows need the same operational discipline as production code — monitoring, alerting, runbooks, and regular review.

Automation doesn't eliminate work — it shifts work from repetitive execution to system design and exception handling. That's a much better use of human intelligence.`,
    tags: ["n8n", "Automation", "Architecture"],
    publishedAt: "2026-02-10",
    published: true,
  },
  {
    id: "4",
    title: "From Software Engineering to AI Leadership: A Career Transition Blueprint",
    slug: "software-engineering-to-ai-leadership",
    excerpt: "Reflections on transitioning from hands-on software engineering to leading AI teams and driving technical strategy at scale.",
    content: `Three years ago, I was a full-stack developer writing React components and NestJS APIs. Today, I lead AI engineering teams building autonomous systems that process 10,000+ interactions monthly. Here's how the transition happened — and what I'd tell anyone considering a similar path.

## The Catalyst

The shift started when CareCloud MTBC needed someone to bridge the gap between their existing software teams and emerging AI capabilities. I volunteered to lead a small pilot project — an AI-powered call summarization tool. That pilot turned into a team, which turned into a department.

## What Changed (And What Didn't)

### What Changed:
- **Scope**: From individual features to system-level architecture decisions
- **Timeline**: From sprint-level thinking to quarter-level strategy
- **Metrics**: From "does the code work?" to "does the system deliver business value?"
- **Communication**: From Slack messages to board-level presentations

### What Didn't:
- **Technical depth matters**: You can't lead AI teams without understanding transformers, embeddings, and inference optimization
- **Code reviews still happen**: I still review architecture decisions and critical code paths
- **Problem-solving is universal**: The debugging mindset transfers directly to organizational problem-solving

## The Skills Gap

The biggest skill gaps I had to close:

1. **ML Fundamentals**: I took Andrew Ng's courses, read "Designing Machine Learning Systems" by Chip Huyen, and built several projects from scratch
2. **Product Thinking**: Engineering leaders must understand business context. I started sitting in on product and sales meetings
3. **People Management**: Leading humans is harder than leading machines. I invested heavily in 1:1s, feedback frameworks, and team dynamics
4. **Strategic Communication**: Translating "we need to fine-tune the embedding model" into "this will reduce customer response time by 40%" is a critical skill

## The Blueprint

For engineers considering this transition:

1. **Start with a pilot**: Find an AI use case in your current company and volunteer to lead it
2. **Build your ML foundation**: You don't need a PhD, but you need working knowledge of modern AI architectures
3. **Develop business acumen**: Understand how your company makes money and where AI can impact the bottom line
4. **Practice leadership early**: Mentor junior developers, lead architecture discussions, present at team meetings
5. **Document your impact**: Track metrics, write case studies, build a portfolio of delivered outcomes

## The Uncomfortable Truth

The transition from IC to leadership means **letting go of the keyboard** (partially). Your value shifts from what you build to what you enable others to build. That's uncomfortable for engineers who find identity in code. Embrace it — the leverage you gain is exponential.

Your deepest technical knowledge becomes your **judgment** — knowing which technical bets to take, which architectures will scale, and which shortcuts will come back to haunt you.`,
    tags: ["Career", "Leadership", "AI"],
    publishedAt: "2026-01-15",
    published: true,
  },
  {
    id: "5",
    title: "The Solution Architecture Mindset: Thinking Beyond Code",
    slug: "solution-architecture-mindset",
    excerpt: "Why thinking architecturally — not just technically — is the key to delivering systems that scale, adapt, and create lasting business value.",
    content: `Most engineers think in code. Solution architects think in **systems**. The difference isn't intelligence — it's perspective. And developing that perspective is one of the most valuable career investments you can make.

## Code vs. Architecture Thinking

A developer sees a feature request and thinks: "How do I implement this?"
An architect sees the same request and thinks: "How does this fit into the system? What are the second-order effects? How will this evolve in 6 months?"

Both perspectives are necessary. But the architectural lens is what separates systems that scale from systems that collapse under their own weight.

## The Five Lenses of Solution Architecture

### 1. Business Alignment
Every technical decision should trace back to a business outcome. Before choosing a technology, ask: "What business capability does this enable?" If you can't answer that, you're building a science project, not a product.

### 2. Integration Thinking
Modern systems don't exist in isolation. Every new component must integrate with existing systems, external APIs, data pipelines, and user workflows. The **integration layer** is often the hardest part of any architecture.

### 3. Evolution Planning
The system you build today will need to change tomorrow. Design for change:
- Use well-defined interfaces between components
- Prefer composition over monolithic coupling
- Document decision rationale (ADRs) so future engineers understand the "why"

### 4. Operational Reality
Architecture that looks beautiful on a whiteboard but can't be monitored, debugged, or scaled is worthless. Consider:
- **Observability**: Can you trace a request from entry to exit?
- **Failure modes**: What happens when this component fails?
- **Capacity**: What does 10x traffic look like?

### 5. Security by Design
Security isn't a feature you add later. It's a property of the architecture:
- RBAC from day one
- Data encryption at rest and in transit
- Audit trails for sensitive operations
- Input validation at every system boundary

## Practical Example: Designing an AI Voice Agent

When we designed the Front Desk AI Agent at CareCloud, the architecture decisions were driven by these lenses:

- **Business**: Reduce call handling costs by 80% while maintaining patient satisfaction
- **Integration**: Must work with 5+ different EHR systems via FHIR/HL7
- **Evolution**: Voice model and LLM must be swappable as better options emerge
- **Operations**: Every call must be recorded, transcribed, and auditable for compliance
- **Security**: HIPAA compliance requires end-to-end encryption and access controls

The result was a modular architecture where each component (voice, NLU, FSM, integration) is independently deployable and replaceable.

## Developing the Mindset

You don't need a certification to think architecturally. Start by:

1. **Drawing systems before coding them**: Whiteboard the component diagram before writing line one
2. **Asking "what if?" constantly**: What if this service goes down? What if traffic doubles? What if the API changes?
3. **Reading post-mortems**: Learn from others' architectural failures
4. **Reviewing open-source architectures**: Study how successful projects are structured

The solution architecture mindset isn't about having all the answers — it's about asking the right questions before you start building.`,
    tags: ["Architecture", "Strategy", "Leadership"],
    publishedAt: "2025-12-01",
    published: true,
  },
];

export const statsData = [
  { label: "Projects Delivered", value: "10+" },
  { label: "AI Agents Deployed", value: "50+" },
  { label: "Monthly AI Calls", value: "10K+" },
  { label: "Team Members Led", value: "15+" },
  { label: "Healthcare Clients", value: "30+" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Leadership", href: "#leadership" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const testimonialsData = [
  {
    name: "Dr. Sarah Johnson",
    role: "Chief Medical Officer",
    company: "HealthFirst Clinic",
    content: "Aleem's Front Desk AI Agent transformed our patient scheduling. We went from 45-minute average wait times to near-instant appointment handling. His technical vision and execution are exceptional.",
  },
  {
    name: "Ahmed Hassan",
    role: "VP of Engineering",
    company: "CareCloud MTBC",
    content: "Working with Aleem has been transformative for our AI initiatives. He bridges the gap between complex technical architectures and business outcomes with remarkable clarity and precision.",
  },
  {
    name: "Maria Chen",
    role: "Product Director",
    company: "TechSpace Inc.",
    content: "Aleem delivered our community platform ahead of schedule with exceptional quality. His ability to translate product vision into scalable technical architecture is rare and invaluable.",
  },
  {
    name: "Usman Khalid",
    role: "Senior AI Engineer",
    company: "CareCloud MTBC",
    content: "As a team lead, Aleem creates an environment where engineers thrive. He understands the technical depth of AI systems while keeping the team focused on delivering real impact.",
  },
];

export const servicesData = [
  {
    title: "AI Agent Development",
    description: "Design and deploy autonomous conversational AI agents for healthcare and enterprise operations, handling 10K+ interactions monthly.",
    icon: "brain",
  },
  {
    title: "Technical Project Management",
    description: "End-to-end delivery leadership using Agile/Scrum, sprint planning, risk management, and KPI-driven execution for AI and software projects.",
    icon: "target",
  },
  {
    title: "Solution Architecture",
    description: "Architect scalable systems that bridge complex business requirements with modern technical stacks — from AI pipelines to full-stack platforms.",
    icon: "layers",
  },
  {
    title: "Workflow Automation",
    description: "Build intelligent automation workflows using n8n, AI models, and API integrations to eliminate manual processes and boost operational efficiency.",
    icon: "zap",
  },
  {
    title: "Healthcare Tech Consulting",
    description: "Domain expertise in RCM automation, appointment scheduling, medical coding, and AI-driven healthcare operations optimization.",
    icon: "heart",
  },
  {
    title: "Team Leadership & Mentoring",
    description: "Lead cross-functional engineering teams, establish delivery frameworks, and mentor engineers in AI, automation, and technical best practices.",
    icon: "users",
  },
];
