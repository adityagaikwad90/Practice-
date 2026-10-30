import React, { useState, useEffect, useRef } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Search,
  Building2,
  DollarSign,
  UploadCloud,
  FileText,
  X,
  AlertCircle,
  Check,
  Copy,
  ShieldCheck,
  Eye,
  Trash2,
  User,
  Mail,
  Phone,
  Linkedin,
  Github,
  ArrowLeft
} from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Modal from '../ui/Modal';
import { CardSkeleton } from '../ui/Skeleton';

// Fallback initial jobs data
const DEFAULT_JOBS = [
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
      'State Management',
      'REST & GraphQL APIs',
      'Vite & Webpack'
    ],
    responsibilities: [
      'Develop modern Single Page Applications using React 18 and Tailwind CSS.',
      'Build reusable, accessible UI component libraries following atomic design principles.',
      'Optimize frontend bundle sizes, rendering cycles, and Core Web Vitals.',
      'Integrate with Express REST APIs and external microservices securely.',
      'Participate in architectural discussions and code reviews with founder leads.'
    ],
    qualifications: [
      '2+ years of professional experience with React.js in production.',
      'Strong grasp of modern JavaScript, asynchronous patterns, and DOM manipulation.',
      'Demonstrated experience with responsive CSS architectures (Tailwind CSS preferred).',
      'Familiarity with Git, GitHub workflows, and CI/CD pipelines.'
    ]
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
      'AWS S3 Storage',
      'Docker & Containerization'
    ],
    responsibilities: [
      'Architect and implement scalable RESTful APIs and background services with Express.js.',
      'Design clean relational and document database schemas with high indexing efficiency.',
      'Integrate secure file storage pipelines with Amazon S3 and presigned URL flows.',
      'Implement defensive security practices: payload validation, CORS policies, and rate limits.'
    ],
    qualifications: [
      '2+ years of professional backend development with Node.js and Express.',
      'Proven experience building REST APIs consumed by production React/mobile apps.',
      'Solid understanding of asynchronous Node.js execution, event loops, and streams.',
      'Experience with SQL/NoSQL databases and ORM/ODMs.'
    ]
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
      'VPC & Route53',
      'IAM Roles & Security',
      'Nginx & SSL/TLS Management'
    ],
    responsibilities: [
      'Design, provision, and maintain production AWS cloud environments.',
      'Configure enterprise-grade Amazon S3 buckets with encryption and private access.',
      'Setup and manage EC2 instances, reverse proxies (Nginx), and automated SSL renewals.',
      'Enforce strict AWS IAM security boundaries, credential rotation, and audit logs.'
    ],
    qualifications: [
      '3+ years of dedicated AWS infrastructure engineering experience.',
      'Deep expertise in core AWS services: EC2, S3, VPC, IAM, RDS, Route 53.',
      'Experience managing Linux server environments and shell scripting.',
      'Strong commitment to security best practices and zero-downtime deployments.'
    ]
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
      'GitHub Actions CI/CD',
      'Linux Administration',
      'Nginx Configuration & Load Balancing',
      'Bash & Python Scripting',
      'Health Monitoring & Telemetry'
    ],
    responsibilities: [
      'Build and optimize automated CI/CD pipelines for frontend and backend microservices.',
      'Containerize applications using multi-stage Docker builds to minimize image footprints.',
      'Implement zero-downtime deployment workflows and automated rollback strategies.',
      'Manage reverse proxies, SSL certificates (Certbot), and domain routing.'
    ],
    qualifications: [
      '2+ years of professional experience in DevOps, SRE, or Infrastructure roles.',
      'Strong proficiency with Docker, Docker Compose, and container networking.',
      'Hands-on experience creating robust GitHub Actions or GitLab CI workflows.',
      'Comfortable navigating Linux environments.'
    ]
  }
];

export default function CareersView({ setActiveTab }) {
  const [jobs, setJobs] = useState(DEFAULT_JOBS);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');

  const [currentView, setCurrentView] = useState('list'); // 'list' | 'apply' | 'confirmation'
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobModalDetails, setJobModalDetails] = useState(null);

  // Application Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [experience, setExperience] = useState('2 - 5 Years');
  const [technicalSkills, setTechnicalSkills] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');

  // Resume Upload State
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Form State
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [submissionSuccessData, setSubmissionSuccessData] = useState(null);
  const [copiedId, setCopiedId] = useState(false);

  // Status Lookup State
  const [lookupId, setLookupId] = useState('');
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');

  const fetchJobs = async () => {
    setLoadingJobs(true);
    try {
      const res = await fetch('/api/jobs');
      if (res.ok) {
        const data = await res.json();
        if (data.jobs && data.jobs.length > 0) {
          setJobs(data.jobs);
        }
      }
    } catch (err) {
      console.warn('Using default jobs list:', err);
    } finally {
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = (file) => {
    setResumeError('');
    if (!file) return;

    const isPdfExt = file.name.toLowerCase().endsWith('.pdf');
    const isPdfMime = file.type === 'application/pdf';

    if (!isPdfExt && !isPdfMime) {
      setResumeError('Please upload a PDF document (.pdf).');
      setResumeFile(null);
      return;
    }

    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setResumeError(`File size exceeds the 10MB limit.`);
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
    if (formErrors.resume) {
      setFormErrors((prev) => ({ ...prev, resume: '' }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setResumeError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleStartApply = (job) => {
    setSelectedJob(job);
    setJobPosition(job.title);
    setTechnicalSkills(job.requiredSkills.slice(0, 4).join(', '));
    setFormErrors({});
    setSubmissionError('');
    setCurrentView('apply');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validateForm = () => {
    const errors = {};
    if (!fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!email.trim()) errors.email = 'Email Address is required.';
    if (!phone.trim()) errors.phone = 'Phone Number is required.';
    if (!location.trim()) errors.location = 'Location is required.';
    if (!jobPosition.trim()) errors.jobPosition = 'Position is required.';
    if (!technicalSkills.trim()) errors.technicalSkills = 'Skills are required.';
    if (!resumeFile) errors.resume = 'Please upload your resume in PDF format.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setSubmissionError('');

    if (!validateForm()) return;

    setIsSubmitting(true);
    setUploadProgress(20);

    const formData = new FormData();
    formData.append('fullName', fullName.trim());
    formData.append('email', email.trim());
    formData.append('phone', phone.trim());
    formData.append('location', location.trim());
    formData.append('jobPosition', jobPosition.trim());
    formData.append('jobId', selectedJob ? selectedJob.id : '');
    formData.append('experience', experience.trim());
    formData.append('technicalSkills', technicalSkills.trim());
    formData.append('linkedinUrl', linkedinUrl.trim());
    formData.append('portfolioUrl', portfolioUrl.trim());
    formData.append('resume', resumeFile);

    try {
      const progressTimer = setInterval(() => {
        setUploadProgress((prev) => (prev < 85 ? prev + 15 : prev));
      }, 250);

      const res = await fetch('/api/applications', {
        method: 'POST',
        body: formData
      });

      clearInterval(progressTimer);
      setUploadProgress(100);

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application.');
      }

      setSubmissionSuccessData(data.application);
      setCurrentView('confirmation');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setFullName('');
      setEmail('');
      setPhone('');
      setLocation('');
      setTechnicalSkills('');
      setLinkedinUrl('');
      setPortfolioUrl('');
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

    } catch (err) {
      setSubmissionError(err.message || 'Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleCopyId = (id) => {
    if (!id) return;
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleLookupStatus = async (e) => {
    e.preventDefault();
    if (!lookupId.trim()) return;

    setLookupLoading(true);
    setLookupError('');
    setLookupResult(null);

    try {
      const res = await fetch(`/api/applications/${encodeURIComponent(lookupId.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Application not found with this ID.');
      }
      setLookupResult(data.application);
    } catch (err) {
      setLookupError(err.message);
    } finally {
      setLookupLoading(false);
    }
  };

  const departments = ['ALL', 'Frontend Engineering', 'Backend Engineering', 'Cloud Infrastructure', 'DevOps & SRE'];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.requiredSkills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDept =
      selectedDepartment === 'ALL' || job.department === selectedDepartment;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-16 page-transition">
      {/* 1. APPLICATION CONFIRMATION */}
      {currentView === 'confirmation' && submissionSuccessData && (
        <div className="space-y-8 max-w-xl mx-auto text-left">
          <div className="space-y-3">
            <span className="eyebrow-minimal block">APPLICATION RECEIVED</span>
            <h1 className="text-3xl sm:text-4xl font-normal text-[#171717] font-heading">
              Application submitted.
            </h1>
            <p className="text-sm text-[#777777]">
              Your resume has been received and securely stored. Our founding engineers will review your application directly.
            </p>
          </div>

          <div className="mono-card-warm p-6 rounded-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E7]">
              <div>
                <span className="text-[11px] font-mono text-[#777777] block uppercase">Reference ID</span>
                <span className="text-base font-mono font-medium text-[#171717]">
                  {submissionSuccessData.applicationId}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyId(submissionSuccessData.applicationId)}
                className="btn-secondary-mono px-3 py-1 text-xs cursor-pointer"
              >
                {copiedId ? 'Copied' : 'Copy ID'}
              </button>
            </div>

            <div className="text-xs font-mono space-y-1.5 text-[#777777]">
              <div>Position: <strong className="text-[#171717]">{submissionSuccessData.jobPosition}</strong></div>
              <div>Candidate: <strong className="text-[#171717]">{submissionSuccessData.fullName}</strong></div>
              <div>Status: <span className="text-[#171717]">{submissionSuccessData.applicationStatus || 'Submitted'}</span></div>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentView('list')}
            >
              View Other Openings
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => setActiveTab('home')}
            >
              Return Home
            </Button>
          </div>
        </div>
      )}

      {/* 2. APPLICATION FORM */}
      {currentView === 'apply' && (
        <div className="max-w-2xl mx-auto space-y-8">
          <button
            type="button"
            onClick={() => setCurrentView('list')}
            className="text-xs font-mono text-[#777777] hover:text-[#171717] flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Open Positions</span>
          </button>

          <div className="space-y-2">
            <span className="eyebrow-minimal block">{selectedJob ? selectedJob.department : 'Engineering'}</span>
            <h1 className="text-3xl sm:text-4xl font-normal text-[#171717] font-heading">
              Apply for {jobPosition}
            </h1>
            <p className="text-xs sm:text-sm text-[#777777]">
              All submissions are reviewed directly by Aditya, Mayur, and Manish.
            </p>
          </div>

          {submissionError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-700">
              {submissionError}
            </div>
          )}

          <form onSubmit={handleSubmitApplication} className="space-y-6 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                required
                placeholder="Rahul Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={formErrors.fullName}
              />
              <Input
                label="Email Address"
                type="email"
                required
                placeholder="rahul@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={formErrors.email}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={formErrors.phone}
              />
              <Input
                label="Location"
                required
                placeholder="Pune, India / Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                error={formErrors.location}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Position"
                required
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
              >
                {jobs.map((j) => (
                  <option key={j.id} value={j.title}>{j.title}</option>
                ))}
              </Select>
              <Select
                label="Experience Level"
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="1 - 3 Years">1 - 3 Years</option>
                <option value="2 - 5 Years">2 - 5 Years</option>
                <option value="5+ Years">5+ Years</option>
              </Select>
            </div>

            <Input
              label="Technical Skills"
              required
              placeholder="React, TypeScript, Node.js, AWS, Docker"
              value={technicalSkills}
              onChange={(e) => setTechnicalSkills(e.target.value)}
              error={formErrors.technicalSkills}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="LinkedIn URL (Optional)"
                placeholder="https://linkedin.com/in/username"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
              />
              <Input
                label="GitHub / Portfolio (Optional)"
                placeholder="https://github.com/username"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
              />
            </div>

            {/* Resume File Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#777777]">
                Resume (PDF, max 10MB) <span className="text-rose-600">*</span>
              </label>

              {!resumeFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  className={`border border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
                    isDragging ? 'border-[#171717] bg-[#F7F6F2]' : 'border-[#E7E7E7] hover:border-[#171717]'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={(e) => handleFileSelect(e.target.files[0])}
                    className="hidden"
                  />
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-[#171717]">
                      Click to choose file or drag & drop PDF
                    </p>
                    <p className="text-[11px] text-[#777777]">PDF format up to 10MB</p>
                  </div>
                </div>
              ) : (
                <div className="p-3 border border-[#E7E7E7] rounded-md flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-[#171717]">{resumeFile.name}</span>
                    <span className="text-[#777777] ml-2">({formatFileSize(resumeFile.size)})</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-xs text-rose-600 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}

              {(resumeError || formErrors.resume) && (
                <p className="text-xs text-rose-600">{resumeError || formErrors.resume}</p>
              )}
            </div>

            <div className="pt-4 border-t border-[#E7E7E7] flex gap-3">
              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Uploading & Submitting...' : 'Submit Application'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setCurrentView('list')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* 3. MAIN CAREERS LIST */}
      {currentView === 'list' && (
        <>
          <div className="space-y-6">
            <span className="eyebrow-minimal block">CAREERS</span>
            <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-[#171717] font-heading leading-tight">
              Build with us.
            </h1>
            <p className="text-base sm:text-lg text-[#777777] leading-relaxed max-w-2xl">
              We are a team of experienced software engineers. We value high agency, clean craftsmanship, and direct ownership over corporate hierarchy.
            </p>

            {/* Search & Filter */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="w-full sm:w-72">
                <Input
                  placeholder="Search roles or skills..."
                  icon={Search}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-1.5 text-xs">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={`px-3 py-1.5 rounded-[4px] font-mono transition-colors cursor-pointer ${
                      selectedDepartment === dept
                        ? 'bg-[#171717] text-white'
                        : 'bg-[#F7F6F2] text-[#777777] hover:text-[#171717] border border-[#E7E7E7]'
                    }`}
                  >
                    {dept === 'ALL' ? 'All Roles' : dept}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Job Openings List */}
          <div className="space-y-8">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="border-t border-[#E7E7E7] pt-8 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono text-[#777777] block mb-1">
                      {job.department}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-medium text-[#171717] font-heading">
                      {job.title}
                    </h2>
                  </div>

                  <span className="text-xs font-mono text-[#171717] font-medium">
                    {job.salaryRange}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#777777] leading-relaxed max-w-3xl">
                  {job.shortDescription}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {job.requiredSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs font-mono bg-[#F7F6F2] border border-[#E7E7E7] text-[#171717] rounded-[4px]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setJobModalDetails(job)}
                      className="text-xs text-[#777777] hover:text-[#171717] underline cursor-pointer"
                    >
                      View Details
                    </button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleStartApply(job)}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Status Tracker */}
          <div className="border-t border-[#E7E7E7] pt-12 space-y-4">
            <span className="eyebrow-minimal block">CHECK STATUS</span>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <p className="text-xs text-[#777777] max-w-sm">
                Already applied? Track your submission status using your Reference ID.
              </p>

              <form onSubmit={handleLookupStatus} className="flex gap-2">
                <Input
                  placeholder="SOLVE-APP-..."
                  value={lookupId}
                  onChange={(e) => setLookupId(e.target.value)}
                  className="w-52 font-mono text-xs"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                  loading={lookupLoading}
                >
                  Track
                </Button>
              </form>
            </div>

            {lookupError && (
              <p className="text-xs text-rose-600">{lookupError}</p>
            )}

            {lookupResult && (
              <div className="p-4 bg-[#F7F6F2] border border-[#E7E7E7] rounded-md text-xs font-mono space-y-1">
                <div>Reference ID: <strong className="text-[#171717]">{lookupResult.applicationId}</strong></div>
                <div>Position: <span className="text-[#171717]">{lookupResult.jobPosition}</span></div>
                <div>Status: <strong className="text-[#171717]">{lookupResult.applicationStatus || 'Under Review'}</strong></div>
              </div>
            )}
          </div>
        </>
      )}

      {/* MODAL FOR JOB DETAILS */}
      {jobModalDetails && (
        <Modal
          isOpen={!!jobModalDetails}
          onClose={() => setJobModalDetails(null)}
          title={jobModalDetails.title}
          subtitle={`${jobModalDetails.department} • ${jobModalDetails.location}`}
        >
          <div className="space-y-5 text-xs sm:text-sm text-[#777777]">
            <div className="p-3 bg-[#F7F6F2] border border-[#E7E7E7] rounded-md text-xs font-mono text-[#171717] flex justify-between">
              <span>{jobModalDetails.experienceLevel}</span>
              <span>{jobModalDetails.salaryRange}</span>
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-xs text-[#171717] uppercase block">Overview</span>
              <p className="leading-relaxed">{jobModalDetails.description}</p>
            </div>

            {jobModalDetails.responsibilities && (
              <div className="space-y-1.5">
                <span className="font-mono text-xs text-[#171717] uppercase block">Responsibilities</span>
                <ul className="space-y-1">
                  {jobModalDetails.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#171717]">—</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4 border-t border-[#E7E7E7] flex justify-end gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setJobModalDetails(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const j = jobModalDetails;
                  setJobModalDetails(null);
                  handleStartApply(j);
                }}
              >
                Apply for Position
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
