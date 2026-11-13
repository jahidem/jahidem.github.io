// Single source of truth for all portfolio content.
// SYSLABO work is presented high-level with GENERIC product names (no internals).

export const profile = {
  name: "Jahid Hossain",
  firstName: "JAHID",
  lastName: "HOSSAIN",
  role: "Software Engineer",
  tagline: "Software engineer building production AI systems — with a research edge.",
  location: "Tokyo, Japan",
  email: "jahid.hossain.e99@gmail.com",
  cv: "/Jahid-Hossain-CV.pdf",
  socials: {
    github: "https://github.com/jahidem",
    linkedin: "https://linkedin.com/in/jahidem",
    leetcode: "https://leetcode.com/u/jahidem/",
    codeforces: "https://codeforces.com/profile/Jahidem",
  },
};

export const about = {
  intro:
    "I'm a software engineer based in Tokyo who builds AI-powered products end-to-end — from audio and retrieval pipelines to the interfaces people actually use.",
  body:
    "My focus is AI integration: wiring large language models, speech, and multi-agent retrieval into reliable, secure systems that ship. I care about clean architecture, observability, and getting production details right. Alongside engineering, I keep a foot in research and I'm actively looking to do more of it.",
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "SYSLABO Co., Ltd.",
    role: "System Engineer",
    period: "Nov 2025 — Present",
    location: "Tokyo, Japan",
    points: [
      "Core full-stack developer on an AI meeting-transcription & minutes platform (Next.js, Azure Speech, PostgreSQL): built the end-to-end audio pipeline — blob upload, Azure Storage Queue, and Container App Jobs workers for transcription, speaker diarization, and AI summary & infographic generation.",
      "Delivered Japanese-styled DOCX export with automated TOC, Microsoft Teams completion notifications, structured audit logging, and bilingual (EN/JA) i18n.",
      "Lead frontend & AI developer on an enterprise knowledge/assistant platform (Django ASGI, Celery, Redis Streams, Next.js, Azure AI Search, LangGraph): built multi-agent retrieval, real-time SSE streaming, and knowledge-graph visualization.",
      "Hardened and shipped both platforms on Azure — RBAC with Entra ID / MSAL SSO, prompt-injection guardrails, and hub-and-spoke Bicep infrastructure (Container Apps, App Gateway, PostgreSQL, Redis, VNet peering) with Azure Monitor observability.",
    ],
  },
  {
    company: "Brain Station 23",
    role: "Software Engineer I (AI/ML)",
    period: "Mar 2025 — Jul 2025",
    location: "Dhaka, Bangladesh",
    points: [
      "Developed audio processing pipelines with noise reduction and ASR integration for voice applications.",
      "Fine-tuned a TTS model for the Bengali language and built an automated evaluation pipeline.",
      "Built FastAPI backend services and React UI for voice-driven conversational interfaces.",
      "Benchmarked and evaluated LLM performance for Bengali/Banglish language processing.",
    ],
  },
  {
    company: "Itransition",
    role: "Intern Developer",
    period: "Jul 2024 — Sep 2024",
    location: "Remote",
    points: [
      "Built full-stack web applications using Spring Boot and Next.js.",
      "Interpreted requirements and implemented solutions, building foundational software-development skills.",
    ],
  },
  {
    company: "Worklife",
    role: "Software Engineer Intern",
    period: "Jun 2023 — Sep 2023",
    location: "Dhaka, Bangladesh",
    points: [
      "Contributed to system design and built a mobile app (React Native) with a Django backend, focused on usability.",
      "Experimented with LLM technologies to enhance app features with AI capabilities.",
    ],
  },
];

export type Project = {
  name: string;
  tag: string;
  blurb: string;
  stack: string[];
  links?: { label: string; url: string }[];
  confidential?: boolean;
};

export const projects: Project[] = [
  {
    name: "AI Meeting Intelligence Platform",
    tag: "SYSLABO · Production",
    blurb:
      "End-to-end platform that turns raw meeting audio into structured minutes: upload, queued transcription, speaker diarization, and AI summaries with infographic generation and Japanese-styled DOCX export.",
    stack: ["Next.js", "Azure Speech", "Container Apps", "PostgreSQL", "Azure Queue"],
    confidential: true,
  },
  {
    name: "Enterprise Knowledge Assistant",
    tag: "SYSLABO · Production",
    blurb:
      "Multi-agent knowledge platform with real-time SSE streaming, Azure AI Search retrieval, and interactive knowledge-graph visualization — hardened with Entra ID SSO and prompt-injection guardrails.",
    stack: ["Django ASGI", "LangGraph", "Celery", "Redis Streams", "Azure AI Search", "Next.js"],
    confidential: true,
  },
  {
    name: "CodeAstrix",
    tag: "Personal · Live",
    blurb:
      "An AI-driven interview agent that simulates real coding-interview scenarios with live implementation guidance and strategic solution planning. Practice DSA like you're already in the room.",
    stack: ["AI Agents", "React", "LLM"],
    links: [
      { label: "Live", url: "https://www.codeastrix.com" },
      { label: "Demo", url: "https://youtu.be/J6AtkptEabU" },
    ],
  },
  {
    name: "StudySync",
    tag: "Personal · Open Source",
    blurb:
      "An AI-powered study companion designed to enhance the studying experience for students through AI-driven learning tools.",
    stack: ["AI", "React", "Full-stack"],
    links: [
      { label: "GitHub", url: "https://github.com/brickedSoft/Studysync" },
      { label: "Demo", url: "https://youtu.be/TQvnx-vbvQs" },
    ],
  },
  {
    name: "EcoSync",
    tag: "Hackathon · Code Samurai BD",
    blurb:
      "A waste-management solution built for Dhaka North City Corporation during a day-long national hackathon — reached the final round (top 40).",
    stack: ["Full-stack", "Web"],
    links: [{ label: "GitHub", url: "https://github.com/jahidem" }],
  },
];

export const research = {
  title: "Book Chapter — Springer (Lecture Notes in Networks and Systems)",
  role: "Third author",
  blurb:
    "Peer-reviewed research contribution published as a Springer book chapter. I'm actively interested in doing more applied research at the intersection of ML and systems.",
  links: [
    {
      label: "Springer",
      url: "https://link.springer.com/chapter/10.1007/978-981-95-2961-2_24",
    },
    {
      label: "Scilit",
      url: "https://www.scilit.com/publications/05b911346deecb69fd3a861454c92823",
    },
  ],
};

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["C++", "Python", "JavaScript", "Java", "Bash"] },
  {
    group: "Frameworks",
    items: ["React", "Next.js", "Django", "React Native", "Spring Boot", "FastAPI"],
  },
  { group: "AI / ML", items: ["LangChain", "LangGraph", "Azure AI Search", "Azure Speech", "ASR / TTS"] },
  { group: "Cloud / Infra", items: ["Azure", "Container Apps", "PostgreSQL", "Redis", "Bicep IaC"] },
];

export const achievements: { title: string; detail: string; link?: string }[] = [
  {
    title: "Competitive Programming",
    detail: "Codeforces max rating 1500 · active on LeetCode · ICPC ID 20K8YTZ6494S",
    link: "https://codeforces.com/profile/Jahidem",
  },
  {
    title: "Code Samurai BD — Finalist",
    detail: "Team JU AMADEUS · reached the final round, top 40 of a national day-long hackathon.",
  },
  {
    title: "UAV Competition",
    detail: "Team High Figh Fly · ROS–Gazebo UAV simulations for indoor agriculture · 11th in simulation phase.",
  },
];

export const education = [
  {
    title: "B.Sc. in Information & Communication Technology",
    org: "Jahangirnagar University",
    period: "Mar 2020 — Apr 2025",
    detail: "CGPA 3.64 / 4.0",
  },
  {
    title: "Machine Learning Specialization",
    org: "Stanford University & DeepLearning.AI (Coursera)",
    period: "Jan 2024 — Apr 2024",
    detail: "Credentialed",
  },
];

export const nav = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Awards" },
  { id: "contact", label: "Contact" },
];
