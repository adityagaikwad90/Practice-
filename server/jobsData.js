// Sample Open Job Positions for SolveSpace Technologies
// Modular and easily editable for future job postings

const jobOpenings = [
  {
    id: 'react-developer',
    title: 'React.js Developer',
    department: 'Frontend Engineering',
    location: 'Pune, India (Hybrid / Remote)',
    employmentType: 'Full-time',
    experienceLevel: '2 - 5 Years',
    salaryRange: '₹8,00,000 - ₹14,00,000 / year',
    shortDescription: 'Build high-performance, responsive React web apps, reusable component systems, and modern SaaS dashboards.',
    description: 'We are looking for a passionate React.js Developer to craft lightning-fast web applications, interactive client portals, and fluid UI experiences. You will collaborate directly with our engineering founders to architect robust frontend applications that convert and scale.',
    requiredSkills: [
      'React 18+',
      'JavaScript (ES6+)',
      'TypeScript',
      'Tailwind CSS',
      'State Management (Zustand / Redux)',
      'REST & GraphQL APIs',
      'Vite & Webpack',
      'Responsive Design & Web Vitals'
    ],
    responsibilities: [
      'Develop modern, responsive Single Page Applications using React 18 and Tailwind CSS.',
      'Build reusable, accessible UI component libraries following atomic design principles.',
      'Optimize frontend bundle sizes, rendering cycles, and Core Web Vitals (LCP, FID, CLS).',
      'Integrate with Express REST APIs and external microservices securely.',
      'Participate in direct architectural discussions and code reviews with founder leads.'
    ],
    qualifications: [
      '2+ years of hands-on professional experience with React.js in production.',
      'Strong grasp of modern JavaScript, asynchronous patterns, and DOM manipulation.',
      'Demonstrated experience with responsive CSS architectures (Tailwind CSS preferred).',
      'Familiarity with Git, GitHub workflows, and CI/CD pipelines.',
      'Strong problem-solving skills and an eye for polished UI/UX aesthetics.'
    ],
    benefits: [
      'Competitive compensation package with performance incentives.',
      'Flexible hybrid or remote working options.',
      'Direct founder mentorship and rapid career advancement.',
      'Modern tech stack with zero legacy code burdens.'
    ],
    status: 'Active',
    postedDate: '2026-03-15'
  },
  {
    id: 'node-express-developer',
    title: 'Node.js / Express.js Developer',
    department: 'Backend Engineering',
    location: 'Pune, India (Hybrid / Remote)',
    employmentType: 'Full-time',
    experienceLevel: '2 - 5 Years',
    salaryRange: '₹8,50,000 - ₹15,00,000 / year',
    shortDescription: 'Engineer scalable Node.js/Express REST microservices, secure authentication, and cloud database architectures.',
    description: 'SolveSpace Technologies is seeking an experienced Node.js / Express.js Developer to build resilient backend services, real-time API integrations, and cloud storage pipelines. You will work closely with Manish Mali (Backend Lead) on core system architecture.',
    requiredSkills: [
      'Node.js (v18+)',
      'Express.js',
      'RESTful API Design',
      'PostgreSQL / MongoDB',
      'AWS S3 & Cloud Storage',
      'Authentication (JWT, OAuth)',
      'Docker & Containerization',
      'API Security & Rate Limiting'
    ],
    responsibilities: [
      'Architect and implement scalable RESTful APIs and background services with Express.js.',
      'Design clean relational and document database schemas with high indexing efficiency.',
      'Integrate secure file storage pipelines with Amazon S3 and presigned URL flows.',
      'Implement defensive security practices: payload validation, CORS policies, and rate limits.',
      'Write comprehensive unit and integration tests to ensure 99.9% API reliability.'
    ],
    qualifications: [
      '2+ years of professional backend development with Node.js and Express.',
      'Proven experience building REST APIs consumed by production React/mobile apps.',
      'Solid understanding of asynchronous Node.js execution, event loops, and streams.',
      'Experience with SQL/NoSQL databases and ORM/ODMs.',
      'Familiarity with AWS SDK and cloud file storage patterns.'
    ],
    benefits: [
      'High-impact role shaping core startup infrastructure.',
      'Flexible working arrangements and learning stipends.',
      'Exposure to multi-cloud architectures (AWS & GCP).',
      'Health insurance and wellness benefits.'
    ],
    status: 'Active',
    postedDate: '2026-03-20'
  },
  {
    id: 'aws-cloud-engineer',
    title: 'AWS / Cloud Engineer',
    department: 'Cloud Infrastructure',
    location: 'Pune, India (Hybrid / Remote)',
    employmentType: 'Full-time',
    experienceLevel: '3 - 6 Years',
    salaryRange: '₹10,00,000 - ₹18,00,000 / year',
    shortDescription: 'Architect ultra-reliable AWS infrastructure, S3 storage pipelines, EC2 auto-scaling, and secure VPC networks.',
    description: 'Join Aditya Gaikwad (Cloud Lead) in engineering high-availability AWS cloud environments, automated server provisioning, multi-region storage policies, and bulletproof cloud security configurations.',
    requiredSkills: [
      'Amazon Web Services (AWS)',
      'Amazon S3 & Storage Policies',
      'AWS EC2 & Auto-Scaling',
      'VPC, Route53 & CloudFront',
      'IAM Roles & Least Privilege Security',
      'Terraform / CloudFormation (IaC)',
      'Nginx & SSL/TLS Management',
      'CloudWatch & Telemetry'
    ],
    responsibilities: [
      'Design, provision, and maintain production AWS cloud environments.',
      'Configure enterprise-grade Amazon S3 buckets with encryption, private access, and lifecycle rules.',
      'Setup and manage EC2 instances, reverse proxies (Nginx), and automated SSL renewals.',
      'Enforce strict AWS IAM security boundaries, credential rotation, and audit logs.',
      'Monitor cloud resource utilization and optimize monthly AWS billing costs.'
    ],
    qualifications: [
      '3+ years of dedicated AWS infrastructure engineering experience.',
      'Deep expertise in core AWS services: EC2, S3, VPC, IAM, RDS, Route 53, CloudWatch.',
      'AWS Certified Solutions Architect or SysOps Administrator (preferred).',
      'Experience managing Linux server environments and shell scripting.',
      'Strong commitment to security best practices and zero-downtime deployments.'
    ],
    benefits: [
      'AWS Certification exam reimbursements and training access.',
      'Work with modern containerized and serverless architectures.',
      'Competitive compensation with equity incentives.',
      'Autonomous ownership over cloud infrastructure decisions.'
    ],
    status: 'Active',
    postedDate: '2026-03-25'
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    department: 'DevOps & SRE',
    location: 'Pune, India (Hybrid / Remote)',
    employmentType: 'Full-time',
    experienceLevel: '2 - 5 Years',
    salaryRange: '₹9,00,000 - ₹16,00,000 / year',
    shortDescription: 'Automate CI/CD pipelines, Docker container orchestration, system monitoring, and zero-downtime rollouts.',
    description: 'We are seeking an automation-driven DevOps Engineer to accelerate our deployment velocity. You will build and maintain automated GitHub Actions CI/CD pipelines, containerize web and mobile backends, and maintain production monitoring systems.',
    requiredSkills: [
      'Docker & Docker Compose',
      'GitHub Actions / GitLab CI',
      'Kubernetes / Container Orchestration',
      'Linux Administration',
      'Nginx Configuration & Load Balancing',
      'CI/CD Pipeline Automation',
      'Bash & Python Scripting',
      'Prometheus, Grafana & Health Monitoring'
    ],
    responsibilities: [
      'Build and optimize automated CI/CD pipelines for frontend and backend microservices.',
      'Containerize applications using multi-stage Docker builds to minimize image footprints.',
      'Implement zero-downtime deployment workflows and automated rollback strategies.',
      'Manage reverse proxies, SSL certificates (Certbot), and domain routing.',
      'Set up system telemetry, health alerts, and uptime dashboards for solvespace.online.'
    ],
    qualifications: [
      '2+ years of professional experience in DevOps, SRE, or Infrastructure roles.',
      'Strong proficiency with Docker, Docker Compose, and container networking.',
      'Hands-on experience creating robust GitHub Actions or GitLab CI workflows.',
      'Comfortable navigating Linux environments (systemd, cron, iptables, ufw).',
      'Passion for automation, reliability, and clean developer workflows.'
    ],
    benefits: [
      'Cutting-edge DevOps toolchain with modern infrastructure.',
      'Fast-paced startup environment with minimal red tape.',
      'Flexible remote/hybrid work options.',
      'Continuous learning budget for conferences and certifications.'
    ],
    status: 'Active',
    postedDate: '2026-04-01'
  }
];

module.exports = { jobOpenings };
