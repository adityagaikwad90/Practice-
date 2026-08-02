const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Startup Founders Data
const teamMembers = [
  {
    id: 'aditya',
    name: 'Aditya Gaikwad',
    role: 'Cloud Solution Provider',
    specialty: 'Cloud Infrastructure & DevOps',
    bio: 'Architecting ultra-reliable cloud solutions, containerized microservices, AWS/GCP infrastructure, and automated CI/CD pipelines.',
    skills: ['AWS / GCP', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Nginx & Load Balancing', 'System Security'],
    gradient: 'from-blue-600 to-cyan-500',
    badgeColor: '#3b82f6',
    github: 'https://github.com/adityagaikwad90',
    email: 'aditya@solvespace.online'
  },
  {
    id: 'mayur',
    name: 'Mayur Choudhary',
    role: 'Android Developer',
    specialty: 'Mobile App Architecture & UI/UX',
    bio: 'Crafting high-performance native & cross-platform Android mobile applications with seamless user experiences and Play Store deployment.',
    skills: ['Kotlin & Android SDK', 'Jetpack Compose', 'Flutter & React Native', 'Mobile Security', 'REST API Integration'],
    gradient: 'from-emerald-500 to-teal-400',
    badgeColor: '#10b981',
    github: 'https://github.com/mayurchoudhary',
    email: 'mayur@solvespace.online'
  },
  {
    id: 'manish',
    name: 'Manish Mali',
    role: 'Backend Developer',
    specialty: 'Scalable Systems & API Design',
    bio: 'Engineering robust Node.js/Express backend APIs, database architectures, microservices, and real-time backend infrastructure.',
    skills: ['Node.js & Express', 'MongoDB & PostgreSQL', 'REST & GraphQL APIs', 'System Architecture', 'Redis Caching'],
    gradient: 'from-purple-600 to-indigo-500',
    badgeColor: '#8b5cf6',
    github: 'https://github.com/manishmali',
    email: 'manish@solvespace.online'
  }
];

// Core Startup Services
const services = [
  {
    id: 'web-dev',
    title: 'Website Development',
    category: 'Web Solutions',
    shortDesc: 'Custom high-performance web applications, SaaS dashboards, and modern responsive websites built with React, Next.js, and Tailwind CSS.',
    fullDesc: 'We turn ambitious ideas into digital realities. Our web development team builds fast, SEO-optimized, and aesthetically breathtaking web platforms tailored for startups and scaling enterprises.',
    icon: 'Globe',
    features: [
      'React & Next.js Single Page Applications',
      'Modern Tailwind CSS & UI/UX Design System',
      'Fullstack Express & REST/GraphQL API Integration',
      'SEO Optimization & Lighthouse 95+ Performance',
      'Responsive Mobile-First Architecture'
    ],
    pricingStarting: 499,
    estTimeline: '1-3 Weeks'
  },
  {
    id: 'android-dev',
    title: 'Android App Development',
    category: 'Mobile Solutions',
    shortDesc: 'Native & cross-platform mobile apps for Android featuring high framerate UI, offline sync, push notifications, and Play Store readiness.',
    fullDesc: 'Deliver powerful mobile experiences straight to your customers Android smartphones. We specialize in clean architecture, Kotlin Jetpack Compose, and cross-platform Flutter solutions.',
    icon: 'Smartphone',
    features: [
      'Native Android Development (Kotlin / Jetpack)',
      'Cross-Platform Apps (Flutter / React Native)',
      'Google Play Store Publishing & ASO',
      'Biometric Auth, Camera & Sensor Integration',
      'Offline Storage & Cloud Database Sync'
    ],
    pricingStarting: 799,
    estTimeline: '2-5 Weeks'
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions & DevOps',
    category: 'Infrastructure',
    shortDesc: 'Enterprise-grade AWS/GCP cloud setup, Docker containerization, Kubernetes cluster orchestration, and automated CI/CD deployment pipelines.',
    fullDesc: 'Scale your applications effortlessly without downtime. We design cost-efficient, auto-scaling cloud architectures, secure reverse proxies, and automated deployment pipelines.',
    icon: 'Cloud',
    features: [
      'Docker & Docker Compose Containerization',
      'AWS / GCP Cloud Deployment & EC2 Setup',
      'Nginx Reverse Proxy & Automated SSL (Certbot)',
      'GitHub Actions & GitLab CI/CD Automation',
      'System Health Monitoring & Zero-Downtime Deploys'
    ],
    pricingStarting: 599,
    estTimeline: '1-2 Weeks'
  },
  {
    id: 'promo-videos',
    title: 'Promotional Videos & Media',
    category: 'Digital Media',
    shortDesc: 'High-impact video teasers, AI-powered promotional videos, app walkthroughs, and visual branding assets that convert visitors into buyers.',
    fullDesc: 'Captivate your audience in seconds. We produce sleek 4K promo reels, feature demo videos, animated motion graphics, and social media ad videos tailored for product launches.',
    icon: 'Video',
    features: [
      'AI-Enhanced Promotional Reel Production',
      'App Walkthrough & Product Feature Demos',
      '3D Motion Graphics & Visual FX',
      'High-Converting Social Media Video Ads',
      'Professional Voiceover & Sound Design'
    ],
    pricingStarting: 349,
    estTimeline: '3-7 Days'
  }
];

// In-Memory Database for Project Inquiries
let projectInquiries = [
  {
    id: 'INQ-1001',
    clientName: 'Alex Johnson',
    clientEmail: 'alex@techventures.io',
    serviceId: 'web-dev',
    serviceTitle: 'Website Development',
    budgetRange: '$1,000 - $2,500',
    timeline: 'Within 2 Weeks',
    projectDetails: 'We need a modern SaaS landing page and dashboard built with React and Tailwind CSS.',
    status: 'In Review',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'INQ-1002',
    clientName: 'Sarah Jenkins',
    clientEmail: 'sarah@fintechsolutions.com',
    serviceId: 'android-dev',
    serviceTitle: 'Android App Development',
    budgetRange: '$2,500 - $5,000',
    timeline: '1 Month',
    projectDetails: 'Building a secure Android mobile wallet application with biometrics and API integration.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 43200000).toISOString()
  }
];

// In-Memory Tasks for Dashboard
let tasks = [
  { id: 1, title: 'Deploy Nginx Reverse Proxy on EC2', category: 'Cloud Solutions', priority: 'High', completed: true },
  { id: 2, title: 'Implement Android App Jetpack Compose UI', category: 'Android Dev', priority: 'High', completed: true },
  { id: 3, title: 'Build Express REST API for Startup Web Portal', category: 'Backend', priority: 'High', completed: true },
  { id: 4, title: 'Create Promotional Launch Video Reel', category: 'Media', priority: 'Medium', completed: false }
];

// API Endpoints

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: process.env.APP_NAME || 'SolveSpace Technologies API',
    version: process.env.APP_VERSION || '2.0.0',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    team: ['Aditya Gaikwad', 'Mayur Choudhary', 'Manish Mali'],
    servicesCount: services.length
  });
});

// 2. Founders / Team Endpoint
app.get('/api/team', (req, res) => {
  res.json(teamMembers);
});

// 3. Core Services Endpoint
app.get('/api/services', (req, res) => {
  res.json(services);
});

// 4. Project Inquiries Endpoints
app.get('/api/inquiries', (req, res) => {
  res.json(projectInquiries);
});

app.post('/api/inquiries', (req, res) => {
  const { clientName, clientEmail, serviceId, budgetRange, timeline, projectDetails } = req.body;

  if (!clientName || !clientEmail || !projectDetails) {
    return res.status(400).json({ error: 'Name, email, and project details are required.' });
  }

  const matchedService = services.find(s => s.id === serviceId);
  const newInquiry = {
    id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
    clientName: clientName.trim(),
    clientEmail: clientEmail.trim(),
    serviceId: serviceId || 'custom',
    serviceTitle: matchedService ? matchedService.title : 'Custom Solution',
    budgetRange: budgetRange || '$500 - $1,500',
    timeline: timeline || 'Standard (2-3 Weeks)',
    projectDetails: projectDetails.trim(),
    status: 'Pending Review',
    createdAt: new Date().toISOString()
  };

  projectInquiries.unshift(newInquiry);
  console.log(`[INQUIRY CREATED] ${newInquiry.id} from ${newInquiry.clientName} (${newInquiry.clientEmail})`);
  res.status(201).json({ success: true, message: 'Inquiry submitted successfully!', inquiry: newInquiry });
});

// 5. Company Summary Stats
app.get('/api/stats', (req, res) => {
  res.json({
    projectsCompleted: 54,
    happyClients: 42,
    cloudDeployments: 88,
    activeServices: services.length,
    teamSize: teamMembers.length,
    systemUptime: '99.98%'
  });
});

// 6. Tasks Endpoints (for dashboard integration)
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`🚀 SolveSpace Technologies Server Running`);
  console.log(`📦 Version: 2.0.0 | Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌍 Server running on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Error: Port ${PORT} is already in use.`);
  } else {
    console.error('Server error:', err);
  }
});


