import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const hashedPassword = await bcrypt.hash("admin123456", 12);
  const user = await prisma.user.upsert({
    where: { email: "raleem811811@gmail.com" },
    update: {},
    create: {
      email: "raleem811811@gmail.com",
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
        headline: "AI Team Lead & Technical Project Manager",
        subheadline: "Building AI-driven automation, scalable systems, and product experiences that convert complexity into outcomes.",
        summary: "I architect intelligent systems at the intersection of AI and healthcare. As a Technical Project Manager and AI Team Lead at CareCloud MTBC, I lead cross-functional teams to design, build, and deploy autonomous AI agents that handle 10K+ calls monthly — transforming how healthcare organizations operate. With a solution-architecture mindset and hands-on engineering roots, I bridge the gap between complex business requirements and scalable technical delivery.",
        email: "raleem811811@gmail.com",
        phone: "+923151664843",
        location: "Islamabad, Pakistan",
        avatarUrl: "/images/profile.jpg",
        resumeUrl: "/resume.pdf",
        githubUrl: "https://github.com/aleemrana8",
        linkedinUrl: "https://linkedin.com/in/aleem-akhtar",
        instagramUrl: "https://www.instagram.com/aleemakhtar811",
        metaTitle: "Aleem Akhtar — AI Team Lead & Technical Project Manager",
        metaDesc: "Portfolio of Rana Muhammad Aleem Akhtar. AI Team Lead and Technical Project Manager specializing in healthcare automation, scalable AI agents, and technical delivery leadership.",
      },
    });
  }

  // Experiences
  const experiences = [
    {
      title: "AI Team Lead / Technical Project Manager",
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
      title: "Project Manager",
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
      title: "Project Manager Intern",
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
      title: "Freelance Project Manager",
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
      role: "AI RCM Project Manager — Led end-to-end development and delivery, designed automation workflows, partnered with engineering teams, and ensured alignment between technical implementation and business outcomes.",
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
