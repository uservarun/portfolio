// =========================================================================
// PORTFOLIO CONFIGURATION - ZERO BLUFF, PRODUCTION-ALIGNED
// =========================================================================

export const personalInfo = {
  name: "Varun Sharma",
  initials: "VS",
  avatar: "/profile.jpg",
  profileImage: "/profile.jpg",
  status: "Online",
  email: "flowwithvarun@gmail.com",
  github: "https://github.com/uservarun",
  linkedin: "https://www.linkedin.com/in/uservarun/",
  leetcode: "https://leetcode.com/u/uservarun",
  codeforces: "https://codeforces.com/profile/uservarun",
  
  // Educational & Location details
  education: {
    degree: "B.Tech CSE (AIML)",
    institution: "GL Bajaj, Mathura",
    year: "2nd Year",
    location: "Bareilly, UP, India",
  },

  // Main Hero Headline
  headline: "Full-Stack Developer building fast, dependable software.",
  
  // Bio Description
  bio: "Hi, I'm Varun Sharma. Currently a 2nd year B.Tech CSE (AIML) student at GL Bajaj, Mathura, I build robust backend architectures and full-stack web applications using Java, Spring Boot, PostgreSQL, and React—focusing on clean code and reliable system design.",
};

// Top Filter Pills (Strictly authentic & curated)
export const skillsList = [
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "React.js",
  "PostGIS",
  "RESTful APIs",
  "Hibernate / JPA",
  "Spring Security",
  "Git & GitHub",
  "Postman",
  "Maven",
  "JavaScript (ES6+)",
];

// The 4 Core Grid Boxes
export const skillCategories = [
  {
    title: "BACKEND & SYSTEMS",
    skills: [
      "Java",
      "Spring Boot",
      "Spring Security & JWT",
      "Hibernate / JPA",
      "RESTful Microservices",
    ],
  },
  {
    title: "DATABASES & CLOUD",
    skills: [
      "PostgreSQL",
    ],
  },
  {
    title: "FRONTEND & UI",
    skills: [
      "React.js",
      "JavaScript (ES6+)",
      "CSS3",
    ],
  },
  {
    title: "DEVOPS & TOOLS",
    skills: [
      "Git & GitHub",
      "Postman",
      "Docker",
      "Linux / Shell Basics",
    ],
  },
];

export const projects = [
  {
    id: "roadsaathi",
    title: "RoadSaathi",
    subtitle: "Smart GIS Navigation & Automated Road Safety System",
    description:
      "A full-stack GIS navigation system that computes safer commute routes based on real-time road conditions, while using Vision AI and PostGIS to verify and cluster citizen-reported hazards for city repair teams.",
    highlights: [
      {
        title: "Safety-Weighted Routing",
        desc: "Computes multi-variable route safety scores across accident zones, hazard density, and weather, letting drivers navigate by Safest vs. Fastest paths.",
      },
      {
        title: "15m Spatial Deduplication",
        desc: "Uses PostGIS spatial clustering to automatically merge duplicate crowd-sourced hazard reports within 15 meters into single actionable repair tickets.",
      },
      {
        title: "Vision AI Verification",
        desc: "Audits user-submitted road photos via an asynchronous Gemini Flash pipeline to automatically score pothole severity and filter fake spam.",
      },
      {
        title: "Interactive GIS Dashboard",
        desc: "Built a responsive React & Leaflet interface with live incident clustering, route previews, and a municipal portal for tracking repair statuses.",
      },
    ],
    pipeline: [
      { step: 1, title: "Spatial Query Index", role: "GiST & ST_DWithin (15m)" },
      { step: 2, title: "Vision AI Triage", role: "Async Multimodal Audit" },
      { step: 3, title: "Access & Governance", role: "Stateless JWT & RBAC" },
      { step: 4, title: "GIS Visual Telemetry", role: "Incident Clustering & Heatmaps" },
    ],
    tags: ["Java", "Spring Boot", "PostGIS", "React", "Leaflet GIS", "REST API"],
    metrics: "Sub-Second Spatial Clustering & Zero Duplicate Municipal Tickets",
    github: "https://github.com/uservarun/roadSaathi-backend",
    liveDemo: "https://roadsaathi.vercel.app",
  },
];
