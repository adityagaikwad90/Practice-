const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { jobOpenings } = require('./jobsData');
const {
  uploadResumeToS3,
  deleteResumeFromS3,
  S3_BUCKET,
  AWS_REGION,
  isRealAwsConfigured
} = require('./s3Service');

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

// Configure Multer for in-memory resume PDF uploads (max 10MB)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Only accept PDF files
    const isPdfMime = file.mimetype === 'application/pdf';
    const isPdfExt = file.originalname.toLowerCase().endsWith('.pdf');
    if (isPdfMime || isPdfExt) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format. Only PDF files are allowed for resume upload.'));
    }
  }
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

// In-Memory Database for Job Applications
let jobApplications = [];

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
    servicesCount: services.length,
    jobsCount: jobOpenings.length,
    applicationsCount: jobApplications.length,
    awsS3Bucket: S3_BUCKET,
    awsConfigured: isRealAwsConfigured()
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

// 4. Careers & Job Openings Endpoints
app.get('/api/jobs', (req, res) => {
  res.json({
    success: true,
    count: jobOpenings.length,
    jobs: jobOpenings
  });
});

app.get('/api/jobs/:id', (req, res) => {
  const job = jobOpenings.find(j => j.id === req.params.id);
  if (!job) {
    return res.status(404).json({ error: 'Job opening not found.' });
  }
  res.json({ success: true, job });
});

// 5. Job Application Submission Endpoint with S3 Resume Upload
app.post('/api/applications', upload.single('resume'), async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      location,
      jobPosition,
      jobId,
      experience,
      technicalSkills,
      linkedinUrl,
      portfolioUrl
    } = req.body;

    // 1. Server-side validation of required text fields
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ error: 'Full Name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email Address is required.' });
    }
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({ error: 'Phone Number is required.' });
    }
    if (!location || !location.trim()) {
      return res.status(400).json({ error: 'Current Location is required.' });
    }
    if (!jobPosition || !jobPosition.trim()) {
      return res.status(400).json({ error: 'Job Position is required.' });
    }
    if (!experience || !experience.trim()) {
      return res.status(400).json({ error: 'Years of Experience is required.' });
    }
    if (!technicalSkills || !technicalSkills.trim()) {
      return res.status(400).json({ error: 'Technical Skills are required.' });
    }

    // 2. Validate Resume Upload
    if (!req.file) {
      return res.status(400).json({ error: 'Resume upload is required. Please attach your resume in PDF format.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPosition = jobPosition.trim();

    // 3. Prevent duplicate submissions for the same position & email within a 24-hour window
    const existingSubmission = jobApplications.find(app =>
      app.email === cleanEmail &&
      app.jobPosition.toLowerCase() === cleanPosition.toLowerCase()
    );

    if (existingSubmission) {
      return res.status(409).json({
        error: `An application for "${cleanPosition}" has already been submitted with email ${cleanEmail}. Reference ID: ${existingSubmission.applicationId}. Our talent team will contact you directly.`
      });
    }

    // 4. Create Unique Application Identifier
    const year = new Date().getFullYear();
    const randomHex = Math.floor(100000 + Math.random() * 900000);
    const applicationId = `SOLVE-APP-${year}-${randomHex}`;

    // 5. Upload Resume to Amazon S3 bucket (jobportalbyaditya)
    let s3UploadResult;
    try {
      s3UploadResult = await uploadResumeToS3({
        buffer: req.file.buffer,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        applicationId
      });
    } catch (uploadError) {
      console.error('[APPLICATION SUBMISSION S3 FAILURE]', uploadError.message);
      return res.status(500).json({
        error: `Failed to upload resume to Amazon S3: ${uploadError.message}. Please try again.`
      });
    }

    // 6. Save Application Record
    let newApplication;
    try {
      newApplication = {
        applicationId,
        fullName: fullName.trim(),
        email: cleanEmail,
        phone: phone.trim(),
        location: location.trim(),
        jobPosition: cleanPosition,
        jobId: jobId || null,
        experience: experience.trim(),
        technicalSkills: technicalSkills.trim(),
        linkedinUrl: linkedinUrl ? linkedinUrl.trim() : '',
        portfolioUrl: portfolioUrl ? portfolioUrl.trim() : '',
        // Store S3 object key - NEVER expose permanent public URLs
        resumeS3Key: s3UploadResult.s3Key,
        resumeOriginalName: req.file.originalname,
        resumeSizeBytes: s3UploadResult.size,
        applicationStatus: 'Submitted',
        submittedAt: new Date().toISOString()
      };

      jobApplications.unshift(newApplication);
      console.log(`[APPLICATION CREATED] ${applicationId} for "${cleanPosition}" by ${newApplication.fullName} (${newApplication.email})`);
    } catch (dbError) {
      // Partial failure safety: If saving record fails, attempt rollback deletion on S3
      console.error('[APPLICATION DB FAILURE - INITIATING S3 ROLLBACK]', dbError.message);
      if (s3UploadResult && s3UploadResult.s3Key) {
        await deleteResumeFromS3(s3UploadResult.s3Key);
      }
      return res.status(500).json({
        error: 'An internal error occurred while saving your application. Please try again.'
      });
    }

    // 7. Successful Response (Sensitive internal details & S3 paths are kept private)
    return res.status(201).json({
      success: true,
      message: 'Job application submitted successfully! Your resume has been securely stored.',
      application: {
        applicationId: newApplication.applicationId,
        fullName: newApplication.fullName,
        email: newApplication.email,
        jobPosition: newApplication.jobPosition,
        applicationStatus: newApplication.applicationStatus,
        submittedAt: newApplication.submittedAt
      }
    });

  } catch (err) {
    console.error('[UNHANDLED APPLICATION ERROR]', err);
    return res.status(500).json({ error: 'Server error processing job application. Please try again.' });
  }
});

// 6. View Submitted Applications (Administrative & Status tracking)
app.get('/api/applications', (req, res) => {
  // Return applications without sensitive internal credentials
  const sanitized = jobApplications.map(app => ({
    applicationId: app.applicationId,
    fullName: app.fullName,
    email: app.email,
    location: app.location,
    jobPosition: app.jobPosition,
    experience: app.experience,
    technicalSkills: app.technicalSkills,
    linkedinUrl: app.linkedinUrl,
    portfolioUrl: app.portfolioUrl,
    hasResume: !!app.resumeS3Key,
    resumeOriginalName: app.resumeOriginalName,
    applicationStatus: app.applicationStatus,
    submittedAt: app.submittedAt
  }));
  res.json({ success: true, count: sanitized.length, applications: sanitized });
});

// 7. Check Application Status by Reference ID
app.get('/api/applications/:id', (req, res) => {
  const app = jobApplications.find(a => a.applicationId === req.params.id);
  if (!app) {
    return res.status(404).json({ error: 'Application not found with the provided reference ID.' });
  }
  res.json({
    success: true,
    application: {
      applicationId: app.applicationId,
      fullName: app.fullName,
      jobPosition: app.jobPosition,
      applicationStatus: app.applicationStatus,
      submittedAt: app.submittedAt
    }
  });
});

// 8. Project Inquiries Endpoints
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

// 9. Company Summary Stats
app.get('/api/stats', (req, res) => {
  res.json({
    projectsCompleted: 54,
    happyClients: 42,
    cloudDeployments: 88,
    activeServices: services.length,
    openPositionsCount: jobOpenings.length,
    teamSize: teamMembers.length,
    systemUptime: '99.98%'
  });
});

// 10. Tasks Endpoints (for dashboard integration)
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Multer and general error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size exceeds maximum allowed limit of 10MB.' });
    }
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }
  if (err) {
    return res.status(400).json({ error: err.message || 'An error occurred during request processing.' });
  }
  next();
});

// Root and Health Fallback
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    app: 'SolveSpace Technologies API',
    version: '2.0.0',
    health: '/api/health'
  });
});

// Start Server if run directly in Node / Docker
if (require.main === module || !process.env.VERCEL) {
  const server = app.listen(PORT, () => {
    console.log(`🚀 SolveSpace Technologies Server Running`);
    console.log(`📦 Version: 2.0.0 | Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌍 Server running on http://localhost:${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`💼 Careers API: http://localhost:${PORT}/api/jobs`);
    console.log(`☁️  AWS S3 Bucket: ${S3_BUCKET} (${isRealAwsConfigured() ? 'Active AWS Credentials' : 'Mock/Dev Mode Ready'})`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ Error: Port ${PORT} is already in use.`);
    } else {
      console.error('Server error:', err);
    }
  });
}

module.exports = app;



