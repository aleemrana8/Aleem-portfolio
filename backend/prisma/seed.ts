import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const hashedPassword = await bcrypt.hash("aleem811", 12);
  const user = await prisma.user.upsert({
    where: { email: "aleem811" },
    update: { password: hashedPassword },
    create: {
      email: "aleem811",
      password: hashedPassword,
      name: "Rana Muhammad Aleem Akhtar",
      role: "ADMIN",
    },
  });

  // Profile
  const profile = await prisma.profile.findFirst();
  if (!profile) {
    await prisma.profile.create({
      data: {
        userId: user.id,
        name: "Rana Muhammad Aleem Akhtar",
        headline: "AI Team Lead & Product Manager",
        subheadline: "Building AI-driven automation, scalable systems, and product experiences that convert complexity into outcomes.",
        summary: "I architect intelligent systems at the intersection of AI and healthcare. As a Product Manager and AI Team Lead at CareCloud MTBC, I lead cross-functional teams to design, build, and deploy autonomous AI agents that handle 10K+ calls monthly — transforming how healthcare organizations operate. With a solution-architecture mindset and hands-on engineering roots, I bridge the gap between complex business requirements and scalable technical delivery.",
        email: "raleem811811@gmail.com",
        phone: "+923151664843",
        location: "Islamabad, Pakistan",
        avatarUrl: "/images/profile.png",
        resumeUrl: "/resume.pdf",
        githubUrl: "https://github.com/aleemrana8",
        linkedinUrl: "https://linkedin.com/in/aleem-akhtar",
        instagramUrl: "https://www.instagram.com/aleemakhtar811",
        metaTitle: "Aleem Akhtar — AI Team Lead & Product Manager",
        metaDesc: "Portfolio of Rana Muhammad Aleem Akhtar. AI Team Lead and Product Manager specializing in healthcare automation, scalable AI agents, and technical delivery leadership.",
      },
    });
  }

  // Experiences
  const experiences = [
    {
      title: "AI Team Lead / Product Manager",
      company: "CareCloud MTBC",
      location: "Islamabad, Pakistan",
      startDate: "Jan 2026",
      endDate: null,
      current: true,
      description: "Leading AI automation initiatives across healthcare product lines, architecting and deploying autonomous conversational agents at scale.",
      bullets: [
        "Architected and deployed the Front Desk AI Agent — an autonomous system handling scheduling, rescheduling, cancellations, and menu navigation across 10K+ monthly calls with measurable reduction in wait times.",
        "Led deployment and optimization of AI agents on LiveKit, n8n, and ElevenLabs platforms, establishing the technical foundation for scalable healthcare automation.",
        "Directed a cross-functional team of AI engineers and operations specialists, driving sprint execution and technical delivery for multiple concurrent AI product initiatives.",
        "Implemented risk management frameworks and delivery KPIs that consistently ensured on-time project completion while maintaining technical excellence."
      ],
      tags: ["LiveKit", "n8n", "ElevenLabs", "AI Agents", "Solution Architecture", "Healthcare", "Agile/Scrum"],
      order: 0,
      featured: true,
    },
    {
      title: "Product Manager",
      company: "CareCloud MTBC",
      location: "Islamabad, Pakistan",
      startDate: "Aug 2025",
      endDate: "Dec 2025",
      current: false,
      description: "Managed end-to-end delivery of RCM automation and AI-powered healthcare solutions.",
      bullets: [
        "Led end-to-end delivery of Revenue Cycle Management automation — architecting workflows for medical coding, denial management, payment posting, EOB/ERA reconciliation, and billing optimization.",
        "Partnered with engineering teams to design and implement AI-powered automation solutions, reducing manual processes by significant margins across healthcare operations.",
        "Managed development and deployment of appointment scheduling agents with seamless healthcare system integration.",
        "Oversaw sprint planning, technical delivery, and KPI tracking to ensure timely release of automation features and platform improvements."
      ],
      tags: ["RCM", "AI Automation", "Healthcare Billing", "Sprint Planning", "Jira", "REST APIs"],
      order: 1,
      featured: true,
    },
    {
      title: "Product Manager Intern",
      company: "CareCloud MTBC",
      location: "Islamabad, Pakistan",
      startDate: "May 2025",
      endDate: "Aug 2025",
      current: false,
      description: "Coordinated cross-functional healthcare technology project delivery and RCM process analysis.",
      bullets: [
        "Managed project timelines, deliverables, and tracking using industry-standard tools to ensure smooth execution of healthcare technology initiatives.",
        "Coordinated across development, QA, and operations teams to monitor progress, resolve blockers, and maintain delivery velocity.",
        "Analyzed Revenue Cycle Management processes including coding, billing, and payment posting — building domain expertise that shaped future automation strategies."
      ],
      tags: ["Project Tracking", "RCM Analysis", "Cross-functional Coordination", "QA"],
      order: 2,
      featured: false,
    },
    {
      title: "IT Support Manager Intern",
      company: "PARCO",
      location: "Kotaddu, Pakistan",
      startDate: "Jun 2024",
      endDate: "Sep 2024",
      current: false,
      description: "Managed IT support operations, system maintenance, and data delivery projects.",
      bullets: [
        "Provided end-to-end IT support for troubleshooting, system maintenance, and new user environment setup.",
        "Led an online data delivery project, ensuring secure, efficient data management and operational continuity.",
        "Documented IT processes and supported daily technical operations across the organization."
      ],
      tags: ["IT Support", "System Administration", "Data Management", "Documentation"],
      order: 3,
      featured: false,
    },
    {
      title: "Freelance Product Manager",
      company: "Fiverr",
      location: "Remote",
      startDate: "Feb 2022",
      endDate: null,
      current: true,
      description: "Managing end-to-end client projects across multiple domains with consistent high satisfaction ratings.",
      bullets: [
        "Managed end-to-end client projects across multiple domains — coordinating tasks, timelines, communications, and budgets for consistent on-time delivery.",
        "Led marketing and gig optimization efforts, growing service visibility and delivering multiple projects with top-rated client satisfaction.",
        "Built a reputation for reliable delivery, clear communication, and professional project execution."
      ],
      tags: ["Client Management", "Freelancing", "Digital Marketing", "Project Delivery"],
      order: 4,
      featured: false,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }

  // Projects
  const projects = [
    {
      title: "Front Desk AI Agent",
      slug: "front-desk-agent",
      tagline: "Autonomous conversational AI for healthcare appointment management",
      problem: "Healthcare organizations were overwhelmed by high call volumes for appointment scheduling, rescheduling, and cancellations — leading to long wait times, missed appointments, and frustrated patients. Manual call handling was expensive, error-prone, and unscalable.",
      solution: "Designed and deployed an autonomous Front Desk AI Agent capable of handling the full appointment lifecycle through natural conversation. The agent manages scheduling, rescheduling, cancellations, and menu navigation with zero human intervention, processing 10K+ calls per month.",
      role: "Team Lead — Led solution design, development coordination, call flow architecture, and system integration strategy. Directed AI engineers and operations team through agile sprints.",
      outcome: "Successfully automated front desk operations at scale, enabling the rollout of additional AI agents for Refill Request Management, Lab Reports Handling, and Callback Management. Significantly improved patient experience and operational efficiency.",
      stack: ["LiveKit", "n8n", "ElevenLabs", "REST APIs", "Node.js", "AI/ML"],
      featured: true,
      published: true,
      order: 0,
    },
    {
      title: "RCM Automation Platform",
      slug: "rcm-automation",
      tagline: "AI-driven Revenue Cycle Management automation for healthcare",
      problem: "Revenue Cycle Management in healthcare involves complex, manual, error-prone workflows — from medical coding and billing to payment posting and EOB/ERA reconciliation. These processes were slow, expensive, and prone to claim denials and revenue leakage.",
      solution: "Built an AI-driven RCM automation platform that streamlines medical coding, automates payment posting, handles denial management, and reconciles EOB/ERA documents. Implemented intelligent workflows to minimize manual intervention and maximize revenue recovery.",
      role: "AI RCM Product Manager — Led end-to-end development and delivery, designed automation workflows, partnered with engineering teams, and ensured alignment between technical implementation and business outcomes.",
      outcome: "Reduced manual effort across healthcare billing operations, minimized coding errors, improved revenue recovery rates, and established a scalable automation foundation for ongoing RCM optimization.",
      stack: ["AI/ML", "n8n", "Python", "REST APIs", "Healthcare APIs", "PostgreSQL"],
      featured: true,
      published: true,
      order: 1,
    },
    {
      title: "TechSpace Community Platform",
      slug: "techspace",
      tagline: "React-based community web application for tech professionals",
      problem: "Tech communities lacked a unified platform that combined user profiles, community building, product discovery, ambassador programs, tools, and job listings in one cohesive experience.",
      solution: "Developed a comprehensive React-based community platform featuring user profiles, communities, products, ambassador programs, developer tools, and job listings. Integrated Ant Design for polished UI components, Cloudinary for media management, and external APIs for enhanced functionality.",
      role: "Product Owner — Defined product vision, managed feature development, prepared technical documentation covering system architecture and development execution.",
      outcome: "Delivered a production-ready community platform with a modern, responsive UI and comprehensive feature set. Created detailed Project Plan documentation covering system architecture, features, and development roadmap.",
      stack: ["React.js", "Ant Design", "Cloudinary", "REST APIs", "Node.js", "JavaScript"],
      featured: true,
      published: true,
      order: 2,
    },
    {
      title: "Techlution AI",
      slug: "techlution-ai",
      tagline: "End-to-end AI-powered IT solutions SaaS platform with hiring, CRM & multi-channel communication",
      problem: "IT service companies struggled with fragmented tools — separate platforms for corporate presence, recruitment, client management, project tracking, and communication — leading to inefficiency and poor candidate/client experience.",
      solution: "Built a comprehensive full-stack SaaS platform combining a premium corporate website with Three.js 3D animations, an AI-powered hiring pipeline (resume parsing, AI interviews, avatar interviews, coding assessments), a full admin CRM with lead/project/finance management, and multi-provider WhatsApp integration — all powered by GPT-4o and Google Gemini AI.",
      role: "Full-Stack Developer & Architect — Designed the complete system architecture, built 20+ frontend pages with Three.js 3D animations, developed 44+ backend services, and deployed as PWA + Android app.",
      outcome: "Delivered a production SaaS platform deployed on Vercel/Render with CI/CD pipeline, featuring 12 AI hiring tools, a 6-tier RBAC admin panel, real-time Socket.io dashboards, and multi-provider WhatsApp automation.",
      stack: ["React", "TypeScript", "Vite", "Three.js", "Express.js", "PostgreSQL", "Prisma", "MongoDB", "Redis", "OpenAI GPT-4o", "Google Gemini", "Socket.io", "Docker", "Capacitor"],
      featured: true,
      published: true,
      order: 3,
    },
    {
      title: "AI Job Assistant",
      slug: "ai-job-assistant",
      tagline: "Autonomous AI agent that hunts, scores, and applies to jobs while you sleep",
      problem: "Job seekers spend hours daily searching job boards, manually evaluating listings, and crafting applications — a repetitive, time-consuming process that distracts from interview preparation and skill development.",
      solution: "Built a fully autonomous AI agent platform that scrapes LinkedIn & Indeed daily, scores every listing 1–10 against your CV using GPT-4o, generates tailored cover letters, sends daily email digests of top matches, and auto-applies to high-score jobs — all orchestrated through n8n workflows.",
      role: "Full-Stack Developer & AI Engineer — Architected the dual-backend system (Node.js + FastAPI), built the React dashboard, designed the n8n AI pipeline, and implemented the auto-apply engine with Celery workers.",
      outcome: "Delivered a complete job hunting automation platform with live dashboard, color-coded AI scoring, one-click cover letter generation, application pipeline tracking, and CI/CD deployment — eliminating manual job search entirely.",
      stack: ["React", "Vite", "Node.js", "Express", "FastAPI", "Python", "OpenAI GPT-4o", "n8n", "SQLite", "PostgreSQL", "Celery", "Docker"],
      featured: true,
      published: true,
      order: 4,
    },
    {
      title: "Aleem Voice Agent",
      slug: "aleem-voice-agent",
      tagline: "AI-powered hospital voice receptionist with 24-state FSM engine and full EHR system",
      problem: "Hospitals rely on human receptionists to handle high call volumes for appointment booking, rescheduling, and cancellations — leading to long hold times, scheduling errors, missed calls, and poor patient experience, especially outside business hours.",
      solution: "Built a production-grade AI voice receptionist powered by a 24-state Finite State Machine with OpenAI GPT-4o for NLU, Deepgram for speech-to-text, and Cartesia for text-to-speech. The system handles natural multi-turn conversations with slot locking, spelling confirmation, and go-back support — integrated with a full EHR system and athenahealth-inspired admin panel.",
      role: "Full-Stack Developer & AI Architect — Designed the 24-state FSM conversation engine, built the FastAPI backend with 13 API routers (72+ endpoints), developed the Next.js 15 frontend with admin panel, and deployed the LiveKit cloud voice agent.",
      outcome: "Delivered a complete AI-native healthcare platform with real-time voice calls via WebRTC, SIP telephony integration, concurrent-safe appointment booking with slot locking, dual dashboard system, and full audit trail — handling the entire patient interaction lifecycle autonomously.",
      stack: ["Python", "FastAPI", "Next.js 15", "React 19", "TypeScript", "MongoDB", "Redis", "OpenAI GPT-4o", "LiveKit", "Deepgram", "Cartesia", "Docker", "WebRTC"],
      featured: true,
      published: true,
      order: 5,
    },
    {
      title: "Aleem Family Golf",
      slug: "family-golf",
      tagline: "Full-stack golf facility platform with online booking, reviews & cinematic animations",
      problem: "Golf facilities relied on phone calls and walk-ins for bookings, had no digital presence for showcasing services, and lacked a system for collecting customer reviews or managing newsletter subscriptions — limiting customer reach and engagement.",
      solution: "Built a full-stack web application with Express.js backend and SQLite database, featuring online booking for driving range, lessons, adventure golf, and party packages. Includes a customer review system with moderation, newsletter subscriptions, contact management, and an immersive frontend with GSAP scroll animations, cinematic hero video, and custom cursor effects.",
      role: "Full-Stack Developer — Designed and built the complete application from server-side rendering with EJS to REST API endpoints, database schema, GSAP animations, Docker deployment, and CI/CD pipeline with 21 automated tests.",
      outcome: "Delivered a production-ready platform with clean server-side routing, responsive design, comprehensive API (bookings, reviews, newsletter, contact), security features (Helmet, rate limiting, parameterized queries), and a fully automated CI/CD pipeline with Docker and GitHub Actions.",
      stack: ["Node.js", "Express", "SQLite", "EJS", "GSAP", "Docker", "GitHub Actions", "Helmet", "Nginx"],
      featured: true,
      published: true,
      order: 6,
    },
  ];

  for (const proj of projects) {
    await prisma.project.create({ data: proj });
  }

  // Skill Groups
  const skillGroups = [
    {
      name: "Leadership & Delivery",
      icon: "crown",
      order: 0,
      skills: [
        { name: "Solution Architecture", level: 90 },
        { name: "Agile / Scrum", level: 95 },
        { name: "Sprint Planning", level: 90 },
        { name: "Risk Management", level: 85 },
        { name: "Jira & Trello", level: 90 },
        { name: "Decision Making", level: 90 },
        { name: "CRM Tools", level: 80 },
      ],
    },
    {
      name: "AI & Automation",
      icon: "brain",
      order: 1,
      skills: [
        { name: "n8n Workflows", level: 90 },
        { name: "LiveKit", level: 85 },
        { name: "ElevenLabs", level: 85 },
        { name: "RAG Pipelines", level: 80 },
        { name: "LLM Integration", level: 85 },
        { name: "AI Agents", level: 90 },
      ],
    },
    {
      name: "Frontend & Backend",
      icon: "code",
      order: 2,
      skills: [
        { name: "JavaScript", level: 85 },
        { name: "React.js", level: 85 },
        { name: "React Native", level: 75 },
        { name: "REST APIs", level: 90 },
        { name: "Node.js", level: 80 },
        { name: "TypeScript", level: 75 },
      ],
    },
    {
      name: "QA & Analytics",
      icon: "chart",
      order: 3,
      skills: [
        { name: "Selenium", level: 80 },
        { name: "Cypress", level: 80 },
        { name: "Excel Analytics", level: 85 },
        { name: "Statistical Analysis", level: 75 },
        { name: "Critical Thinking", level: 90 },
      ],
    },
    {
      name: "Tools & Platforms",
      icon: "settings",
      order: 4,
      skills: [
        { name: "IT Project Mgmt", level: 85 },
        { name: "Network Setup", level: 75 },
        { name: "Help Desk", level: 80 },
        { name: "Cybersecurity", level: 70 },
        { name: "Digital Marketing", level: 80 },
        { name: "Content Creation", level: 75 },
      ],
    },
  ];

  for (const group of skillGroups) {
    const { skills, ...groupData } = group;
    const created = await prisma.skillGroup.create({ data: groupData });
    for (let i = 0; i < skills.length; i++) {
      await prisma.skill.create({
        data: { ...skills[i], groupId: created.id, order: i },
      });
    }
  }

  // Blog Posts (placeholder articles)
  const posts = [
    {
      title: "How AI Agents Are Transforming Healthcare Front Desk Operations",
      slug: "ai-agents-healthcare-front-desk",
      excerpt: "Exploring how autonomous conversational AI is reshaping patient scheduling, reducing wait times, and enabling healthcare organizations to scale operations without adding headcount.",
      content: "Coming soon — a deep dive into the architecture, challenges, and outcomes of deploying AI agents in healthcare front desk operations.",
      tags: ["AI", "Healthcare", "Automation", "Conversational AI"],
      published: true,
      featured: true,
      publishedAt: new Date("2026-04-15"),
    },
    {
      title: "Technical Project Management for AI Teams: Lessons from the Field",
      slug: "technical-pm-ai-teams",
      excerpt: "What it takes to lead AI engineering teams — from sprint planning and risk management to balancing innovation velocity with production reliability.",
      content: "Coming soon — practical insights on managing AI projects, from ideation to production deployment.",
      tags: ["Project Management", "AI", "Leadership", "Agile"],
      published: true,
      featured: true,
      publishedAt: new Date("2026-03-20"),
    },
    {
      title: "Building Scalable Automation Workflows with n8n and AI",
      slug: "scalable-automation-n8n-ai",
      excerpt: "A technical overview of designing resilient, scalable automation pipelines using n8n, AI models, and healthcare system integrations.",
      content: "Coming soon — architecture patterns and best practices for enterprise-grade automation workflows.",
      tags: ["n8n", "Automation", "AI", "Architecture"],
      published: true,
      featured: false,
      publishedAt: new Date("2026-02-10"),
    },
    {
      title: "From Software Engineering to AI Leadership: A Career Transition Blueprint",
      slug: "software-engineering-to-ai-leadership",
      excerpt: "Reflections on transitioning from hands-on software engineering to leading AI teams and driving technical strategy at scale.",
      content: "Coming soon — a personal blueprint for engineers moving into technical leadership roles.",
      tags: ["Career", "Leadership", "AI", "Engineering"],
      published: true,
      featured: false,
      publishedAt: new Date("2026-01-15"),
    },
    {
      title: "The Solution Architecture Mindset: Thinking Beyond Code",
      slug: "solution-architecture-mindset",
      excerpt: "Why thinking architecturally — not just technically — is the key to delivering systems that scale, adapt, and create lasting business value.",
      content: "Coming soon — exploring the mindset shift from developer to solution architect.",
      tags: ["Architecture", "Strategy", "Leadership", "Engineering"],
      published: true,
      featured: false,
      publishedAt: new Date("2025-12-01"),
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.create({ data: post });
  }

  // Site Settings
  await prisma.siteSettings.create({
    data: {
      siteName: "Aleem Akhtar Portfolio",
      themeMode: "dark",
      primaryColor: "#64ffda",
      secondaryColor: "#8892b0",
      fontFamily: "Inter",
      enableBlog: true,
      enableContact: true,
      maintenanceMode: false,
    },
  });

  // Categories
  const categories = [
    { name: "AI & Automation", slug: "ai-automation" },
    { name: "Leadership", slug: "leadership" },
    { name: "Healthcare", slug: "healthcare" },
    { name: "Engineering", slug: "engineering" },
  ];
  for (const cat of categories) {
    await prisma.category.create({ data: cat });
  }

  // Testimonials
  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      company: "HealthFirst Clinic",
      content: "Aleem's Front Desk AI Agent transformed our patient scheduling. We went from 45-minute average wait times to near-instant appointment handling. His technical vision and execution are exceptional.",
      featured: true,
      order: 0,
    },
    {
      name: "Ahmed Hassan",
      role: "VP of Engineering",
      company: "CareCloud MTBC",
      content: "Working with Aleem has been transformative for our AI initiatives. He bridges the gap between complex technical architectures and business outcomes with remarkable clarity and precision.",
      featured: true,
      order: 1,
    },
    {
      name: "Maria Chen",
      role: "Product Director",
      company: "TechSpace Inc.",
      content: "Aleem delivered our community platform ahead of schedule with exceptional quality. His ability to translate product vision into scalable technical architecture is rare and invaluable.",
      featured: true,
      order: 2,
    },
    {
      name: "Usman Khalid",
      role: "Senior AI Engineer",
      company: "CareCloud MTBC",
      content: "As a team lead, Aleem creates an environment where engineers thrive. He understands the technical depth of AI systems while keeping the team focused on delivering real impact.",
      featured: true,
      order: 3,
    },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  // Case Studies
  const caseStudies = [
    {
      slug: "front-desk-agent",
      title: "Front Desk AI Agent",
      subtitle: "Autonomous conversational AI handling 10K+ healthcare calls monthly",
      problem: "Healthcare organizations were overwhelmed by high call volumes for appointment scheduling, rescheduling, and cancellations — leading to long wait times, missed appointments, and frustrated patients. Manual call handling was expensive, error-prone, and unscalable.",
      businessContext: "The US healthcare industry loses billions annually to inefficient front desk operations. With rising patient volumes and staffing shortages, organizations needed an AI-first approach to patient communication that could scale without proportional cost increases.",
      solution: "Designed and deployed an autonomous Front Desk AI Agent capable of handling the full appointment lifecycle through natural conversation. The agent manages scheduling, rescheduling, cancellations, and menu navigation with zero human intervention.",
      architecture: "```mermaid\nflowchart TD\n  A[Incoming Call] --> B[LiveKit Voice Pipeline]\n  B --> C[Speech-to-Text]\n  C --> D[AI Intent Recognition]\n  D --> E{Intent Type}\n  E -->|Schedule| F[Appointment Scheduler]\n  E -->|Reschedule| G[Reschedule Handler]\n  E -->|Cancel| H[Cancellation Handler]\n  E -->|Menu| I[Menu Navigation]\n  F --> J[Healthcare API Integration]\n  G --> J\n  H --> J\n  J --> K[Response Generation]\n  K --> L[ElevenLabs TTS]\n  L --> M[Voice Response to Patient]\n```",
      challenges: [
        { "title": "Real-time voice processing", "description": "Achieving sub-second latency for natural conversational flow required optimizing the entire voice pipeline from STT to TTS." },
        { "title": "Healthcare compliance", "description": "Ensuring HIPAA-compliant data handling while maintaining conversational context across multi-turn interactions." },
        { "title": "Edge case handling", "description": "Building robust fallback mechanisms for ambiguous requests, accent variations, and complex scheduling scenarios." }
      ],
      aiIntegrations: ["LiveKit Voice Pipeline", "ElevenLabs TTS", "OpenAI GPT-4", "n8n Workflow Orchestration", "Custom Intent Recognition"],
      metrics: [
        { "label": "Monthly Calls Handled", "value": "10,000+", "description": "Autonomous calls processed monthly" },
        { "label": "Wait Time Reduction", "value": "95%", "description": "From 45-min average to near-instant" },
        { "label": "Automation Rate", "value": "87%", "description": "Calls resolved without human intervention" },
        { "label": "Patient Satisfaction", "value": "4.8/5", "description": "Post-call survey scores" }
      ],
      stack: ["LiveKit", "n8n", "ElevenLabs", "OpenAI", "Node.js", "PostgreSQL", "REST APIs"],
      timeline: [
        { "date": "Sep 2025", "milestone": "Project kickoff and requirements gathering" },
        { "date": "Oct 2025", "milestone": "Voice pipeline architecture design" },
        { "date": "Nov 2025", "milestone": "Core agent development and testing" },
        { "date": "Dec 2025", "milestone": "Healthcare API integration" },
        { "date": "Jan 2026", "milestone": "Production deployment and scaling" }
      ],
      lessons: [
        "Voice AI requires fundamentally different UX thinking than text-based chat",
        "Healthcare domain knowledge is critical for building trust in AI systems",
        "Iterative testing with real call recordings accelerates quality improvements"
      ],
      futureWork: [
        "Multi-language support for diverse patient populations",
        "Predictive scheduling based on historical patterns",
        "Integration with additional healthcare EHR systems"
      ],
      published: true,
      featured: true,
      order: 0,
    },
    {
      slug: "rcm-automation",
      title: "RCM Automation Platform",
      subtitle: "AI-driven Revenue Cycle Management automation for healthcare",
      problem: "Revenue Cycle Management in healthcare involves complex, manual, error-prone workflows — from medical coding and billing to payment posting and EOB/ERA reconciliation. These processes were slow, expensive, and prone to claim denials.",
      businessContext: "Healthcare providers lose an estimated 5-10% of revenue due to billing errors and claim denials. The RCM market is worth $300B+ globally, and AI automation represents the next frontier in reducing revenue leakage.",
      solution: "Built an AI-driven RCM automation platform that streamlines medical coding, automates payment posting, handles denial management, and reconciles EOB/ERA documents through intelligent workflows.",
      architecture: "```mermaid\nflowchart TD\n  A[Claims Submission] --> B[AI Coding Engine]\n  B --> C[Validation Layer]\n  C --> D{Claim Status}\n  D -->|Approved| E[Payment Posting]\n  D -->|Denied| F[Denial Management AI]\n  F --> G[Appeal Generation]\n  G --> H[Resubmission]\n  E --> I[EOB/ERA Reconciliation]\n  I --> J[Revenue Analytics Dashboard]\n```",
      challenges: [
        { "title": "Complex billing rules", "description": "Healthcare billing involves thousands of CPT/ICD codes with payer-specific rules that change frequently." },
        { "title": "Data integration", "description": "Connecting multiple EHR systems, clearinghouses, and payer portals into a unified automation pipeline." },
        { "title": "Accuracy requirements", "description": "Medical billing errors can result in compliance violations — the system needed 99%+ accuracy." }
      ],
      aiIntegrations: ["AI Medical Coding", "n8n Workflows", "NLP for EOB Parsing", "Denial Prediction ML", "Automated Appeal Generation"],
      metrics: [
        { "label": "Manual Effort Reduction", "value": "70%", "description": "Reduction in manual billing tasks" },
        { "label": "Denial Rate Reduction", "value": "40%", "description": "Fewer claim denials through AI validation" },
        { "label": "Revenue Recovery", "value": "25%", "description": "Improvement in revenue recovery rate" },
        { "label": "Processing Speed", "value": "5x", "description": "Faster claim processing end-to-end" }
      ],
      stack: ["Python", "n8n", "PostgreSQL", "AI/ML", "REST APIs", "Healthcare APIs"],
      timeline: [
        { "date": "Aug 2025", "milestone": "RCM workflow analysis and automation design" },
        { "date": "Sep 2025", "milestone": "AI coding engine development" },
        { "date": "Oct 2025", "milestone": "Denial management automation" },
        { "date": "Nov 2025", "milestone": "EOB/ERA reconciliation system" },
        { "date": "Dec 2025", "milestone": "Production deployment and optimization" }
      ],
      lessons: [
        "Healthcare billing automation requires deep domain expertise, not just technical skills",
        "Incremental automation yields faster ROI than big-bang replacements",
        "Payer-specific rules make one-size-fits-all approaches impossible"
      ],
      futureWork: [
        "Real-time claim status tracking dashboard",
        "Predictive analytics for denial prevention",
        "Cross-payer optimization engine"
      ],
      published: true,
      featured: true,
      order: 1,
    },
    {
      slug: "techspace",
      title: "TechSpace Community Platform",
      subtitle: "Full-stack community platform for tech professionals",
      problem: "Tech communities lacked a unified platform that combined user profiles, community building, product discovery, ambassador programs, tools, and job listings in one cohesive experience.",
      businessContext: "The developer community platform market is growing rapidly, with platforms like Dev.to and Hashnode proving demand. TechSpace aimed to differentiate by combining community features with product discovery and career tools.",
      solution: "Developed a comprehensive React-based community platform featuring user profiles, communities, products, ambassador programs, developer tools, and job listings with modern UI/UX.",
      architecture: "```mermaid\nflowchart TD\n  A[React Frontend] --> B[REST API Layer]\n  B --> C[User Service]\n  B --> D[Community Service]\n  B --> E[Product Service]\n  B --> F[Job Service]\n  C --> G[PostgreSQL]\n  D --> G\n  E --> G\n  F --> G\n  A --> H[Cloudinary CDN]\n```",
      challenges: [
        { "title": "Feature complexity", "description": "Building 6+ major feature modules while maintaining a cohesive, intuitive user experience." },
        { "title": "Performance at scale", "description": "Optimizing feed rendering and community interactions for thousands of concurrent users." },
        { "title": "Content moderation", "description": "Implementing community guidelines enforcement without hindering user engagement." }
      ],
      aiIntegrations: ["Content Recommendation Engine", "Auto-tagging System"],
      metrics: [
        { "label": "Feature Modules", "value": "6+", "description": "Major platform features shipped" },
        { "label": "Delivery", "value": "Ahead of Schedule", "description": "Completed before deadline" },
        { "label": "UI Components", "value": "50+", "description": "Reusable Ant Design components" },
        { "label": "Client Rating", "value": "5/5", "description": "Client satisfaction score" }
      ],
      stack: ["React.js", "Ant Design", "Node.js", "Cloudinary", "REST APIs", "JavaScript"],
      timeline: [
        { "date": "Mar 2024", "milestone": "Product vision and architecture design" },
        { "date": "Apr 2024", "milestone": "Core platform development" },
        { "date": "May 2024", "milestone": "Community and product features" },
        { "date": "Jun 2024", "milestone": "Testing and production deployment" }
      ],
      lessons: [
        "Feature prioritization is critical when building multi-module platforms",
        "Reusable component libraries dramatically accelerate development",
        "Clear documentation enables smooth handoffs and future maintenance"
      ],
      futureWork: [
        "AI-powered content recommendations",
        "Real-time collaboration features",
        "Mobile native apps"
      ],
      published: true,
      featured: true,
      order: 2,
    },
  ];

  for (const cs of caseStudies) {
    await prisma.caseStudy.create({ data: cs });
  }

  // Resume Templates
  const resumeTemplates = [
    {
      name: "Product Manager",
      slug: "technical-pm",
      template: "# Rana Muhammad Aleem Akhtar\n## Product Manager\n\n### Summary\nResults-driven Product Manager with expertise in AI automation, healthcare technology, and agile delivery...",
      keywords: ["Project Management", "Agile", "Scrum", "AI", "Healthcare", "Delivery"],
    },
    {
      name: "AI Team Lead",
      slug: "ai-lead",
      template: "# Rana Muhammad Aleem Akhtar\n## AI Team Lead\n\n### Summary\nAI Team Lead specializing in deploying autonomous conversational agents at scale...",
      keywords: ["AI", "Machine Learning", "Team Leadership", "Automation", "LLM"],
    },
    {
      name: "Solution Architect",
      slug: "solution-architect",
      template: "# Rana Muhammad Aleem Akhtar\n## Solution Architect\n\n### Summary\nSolution Architect bridging complex business requirements with scalable technical systems...",
      keywords: ["Architecture", "System Design", "API", "Microservices", "Cloud"],
    },
    {
      name: "Product Manager",
      slug: "product-manager",
      template: "# Rana Muhammad Aleem Akhtar\n## Product Manager\n\n### Summary\nProduct-focused leader driving AI product strategy from ideation to production...",
      keywords: ["Product", "Strategy", "Roadmap", "User Research", "Analytics"],
    },
  ];

  for (const rt of resumeTemplates) {
    await prisma.resumeTemplate.create({ data: rt });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
