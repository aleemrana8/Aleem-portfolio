// Static data — used as fallback when the API is not available
// All content is derived from the CV and rewritten for portfolio presentation

export const profileData = {
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
};

export const experienceData = [
  {
    id: "1",
    title: "AI Team Lead / Technical Project Manager",
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
    title: "Project Manager",
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
    title: "Project Manager Intern",
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
    title: "Freelance Project Manager",
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
  },
  {
    id: "2",
    title: "RCM Automation Platform",
    slug: "rcm-automation",
    tagline: "AI-driven Revenue Cycle Management automation for healthcare",
    problem: "Revenue Cycle Management involves complex, manual, error-prone workflows — from medical coding to payment posting and EOB/ERA reconciliation.",
    solution: "Built an AI-driven RCM automation platform that streamlines medical coding, automates payment posting, handles denial management, and reconciles EOB/ERA documents.",
    role: "AI RCM Project Manager — Led end-to-end development and delivery, designed automation workflows.",
    outcome: "Reduced manual effort across healthcare billing operations, minimized coding errors, and improved revenue recovery rates.",
    stack: ["AI/ML", "n8n", "Python", "REST APIs", "Healthcare APIs", "PostgreSQL"],
    featured: true,
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
  },
];

export const skillGroupsData = [
  {
    name: "Leadership & Delivery",
    icon: "crown",
    skills: ["Solution Architecture", "Agile / Scrum", "Sprint Planning", "Risk Management", "Jira & Trello", "Decision Making", "CRM Tools"],
  },
  {
    name: "AI & Automation",
    icon: "brain",
    skills: ["n8n Workflows", "LiveKit", "ElevenLabs", "RAG Pipelines", "LLM Integration", "AI Agents"],
  },
  {
    name: "Frontend & Backend",
    icon: "code",
    skills: ["JavaScript", "React.js", "React Native", "REST APIs", "Node.js", "TypeScript"],
  },
  {
    name: "QA & Analytics",
    icon: "chart",
    skills: ["Selenium", "Cypress", "Excel Analytics", "Statistical Analysis", "Critical Thinking"],
  },
  {
    name: "Tools & Platforms",
    icon: "settings",
    skills: ["IT Project Mgmt", "Network Setup", "Help Desk", "Cybersecurity", "Digital Marketing", "Content Creation"],
  },
];

export const blogPostsData = [
  {
    id: "1",
    title: "How AI Agents Are Transforming Healthcare Front Desk Operations",
    slug: "ai-agents-healthcare-front-desk",
    excerpt: "Exploring how autonomous conversational AI is reshaping patient scheduling, reducing wait times, and enabling healthcare organizations to scale operations without adding headcount.",
    tags: ["AI", "Healthcare", "Automation"],
    publishedAt: "2026-04-15",
  },
  {
    id: "2",
    title: "Technical Project Management for AI Teams: Lessons from the Field",
    slug: "technical-pm-ai-teams",
    excerpt: "What it takes to lead AI engineering teams — from sprint planning and risk management to balancing innovation velocity with production reliability.",
    tags: ["Project Management", "AI", "Leadership"],
    publishedAt: "2026-03-20",
  },
  {
    id: "3",
    title: "Building Scalable Automation Workflows with n8n and AI",
    slug: "scalable-automation-n8n-ai",
    excerpt: "A technical overview of designing resilient, scalable automation pipelines using n8n, AI models, and healthcare system integrations.",
    tags: ["n8n", "Automation", "Architecture"],
    publishedAt: "2026-02-10",
  },
  {
    id: "4",
    title: "From Software Engineering to AI Leadership: A Career Transition Blueprint",
    slug: "software-engineering-to-ai-leadership",
    excerpt: "Reflections on transitioning from hands-on software engineering to leading AI teams and driving technical strategy at scale.",
    tags: ["Career", "Leadership", "AI"],
    publishedAt: "2026-01-15",
  },
  {
    id: "5",
    title: "The Solution Architecture Mindset: Thinking Beyond Code",
    slug: "solution-architecture-mindset",
    excerpt: "Why thinking architecturally — not just technically — is the key to delivering systems that scale, adapt, and create lasting business value.",
    tags: ["Architecture", "Strategy", "Leadership"],
    publishedAt: "2025-12-01",
  },
];

export const statsData = [
  { label: "Years Experience", value: "4+" },
  { label: "Projects Delivered", value: "20+" },
  { label: "AI Agents Deployed", value: "10+" },
  { label: "Monthly AI Calls", value: "10K+" },
  { label: "Team Members Led", value: "15+" },
  { label: "Healthcare Clients", value: "30+" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];
