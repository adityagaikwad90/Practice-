import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Button from '../ui/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function WorkView({ setActiveTab }) {
  const [filter, setFilter] = useState('all');
  useScrollReveal(filter);

  const projects = [
    {
      id: 'cloud-cluster',
      category: 'cloud',
      categoryLabel: 'Cloud Infrastructure & DevOps',
      name: 'SolveSpace Cloud Cluster & CI/CD',
      tagline: 'High-availability AWS EC2 containerized platform',
      description: 'Production cloud infrastructure running Docker Compose microservices behind an Nginx reverse proxy with SSL termination, automated certificate renewal, and automated GitHub Actions CI/CD deployment.',
      highlights: [
        'Zero-downtime automated deployment with GitHub Actions',
        'Nginx HTTP/2 reverse proxy with dynamic load balancing & SSL',
        'Multi-stage Docker builds with minimal runtime image footprint',
        'Sub-20ms cluster response times under load'
      ],
      technologies: ['AWS EC2', 'Docker Compose', 'Nginx', 'GitHub Actions', 'Certbot TLS', 'Linux'],
      lead: 'Aditya Gaikwad (Cloud Lead)'
    },
    {
      id: 'client-portal',
      category: 'web',
      categoryLabel: 'Web Platform & Cloud API',
      name: 'Startup Recruitment & Inquiries Portal',
      tagline: 'Encrypted storage & client telemetry platform',
      description: 'High-performance React application integrated with Amazon S3 for secure encrypted PDF resume uploads, real-time client inquiry management, and instant application reference status tracking.',
      highlights: [
        'Direct AWS S3 integration with secure presigned upload mechanisms',
        'Tailwind CSS design token architecture with responsive layouts',
        'Live Express REST API endpoints with robust Multer stream handling',
        'Instant reference ID application tracking and status verification'
      ],
      technologies: ['React 18', 'Tailwind CSS', 'Node.js', 'Express', 'AWS S3', 'Vite'],
      lead: 'Manish Mali (Backend Lead)'
    },
    {
      id: 'android-engine',
      category: 'mobile',
      categoryLabel: 'Android Native Engineering',
      name: 'Native Android High-Framerate Suite',
      tagline: 'Declarative Kotlin Jetpack Compose architecture',
      description: 'Production Android application framework targeting Android 14+ (API 34). Clean MVVM architecture, offline-first Room database synchronization, biometric auth, and Google Play Store automated release tracks.',
      highlights: [
        '120 FPS buttery-smooth declarative Compose UI components',
        'Offline-first cache with Room DB and background WorkManager sync',
        'Kotlin Coroutines and Flow for reactive asynchronous data streams',
        'Google Play Store readiness with ProGuard optimization'
      ],
      technologies: ['Kotlin', 'Jetpack Compose', 'Room Database', 'Coroutines', 'Retrofit', 'MVVM'],
      lead: 'Mayur Choudhary (Android Lead)'
    },
    {
      id: 'media-engine',
      category: 'media',
      categoryLabel: 'Media & Automation Systems',
      name: 'Automated Media Rendering Engine',
      tagline: 'Automated 4K 60FPS video transcoding pipeline',
      description: 'Automated video rendering and promotional content pipeline creating 4K ultra-HD product reels, animated UI teasers, and high-tempo social media assets engineered for startup user acquisition.',
      highlights: [
        'Automated FFmpeg pipeline producing 9:16 and 16:9 4K exports',
        'Dynamic text animations, motion graphics, and audio sync',
        'Multi-bitrate encoding for seamless social platform distribution',
        'Optimized for high-tempo product demo pacing'
      ],
      technologies: ['Node.js', 'FFmpeg', 'AI Audio FX', 'Motion Graphics', 'Cloud Storage'],
      lead: 'SolveSpace Engineering Team'
    }
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-24 page-transition">
      {/* Editorial Header */}
      <div className="space-y-6">
        <span className="eyebrow-minimal block">PORTFOLIO</span>
        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-[#171717] font-heading leading-tight">
          Things we've built.
        </h1>
        <p className="text-base sm:text-lg text-[#777777] leading-relaxed max-w-2xl">
          A collection of production software, cloud infrastructure, and mobile applications engineered directly by our founding team.
        </p>

        {/* Minimal Category Filter */}
        <div className="pt-4 flex flex-wrap gap-2 text-xs">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'cloud', label: 'Cloud & DevOps' },
            { id: 'web', label: 'Web Platforms' },
            { id: 'mobile', label: 'Android' },
            { id: 'media', label: 'Media Systems' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-3 py-1.5 rounded-[4px] font-mono transition-colors cursor-pointer ${
                filter === btn.id
                  ? 'bg-[#171717] text-white'
                  : 'bg-[#F7F6F2] text-[#777777] hover:text-[#171717] border border-[#E7E7E7]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Editorial Showcase */}
      <div className="space-y-20">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="reveal-init border-t border-[#E7E7E7] hover:border-[#171717] pt-12 space-y-8 transition-colors duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#777777] block mb-1">
                  0{idx + 1} • {project.categoryLabel}
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium text-[#171717] font-heading">
                  {project.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#777777] mt-1 font-mono">
                  {project.tagline}
                </p>
              </div>

              <span className="text-xs font-mono text-[#777777]">
                {project.lead}
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#171717] leading-relaxed max-w-3xl">
              {project.description}
            </p>

            {/* Architectural Highlights */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#777777]">
                Architectural Highlights
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs sm:text-sm text-[#777777]">
                {project.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2">
                    <span className="text-[#171717] select-none">—</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {project.technologies.map((t, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 text-xs font-mono bg-[#F7F6F2] border border-[#E7E7E7] text-[#171717] rounded-[4px]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Start Project CTA */}
      <div className="border-t border-[#E7E7E7] pt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-xl font-medium text-[#171717] font-heading">
            Need similar architecture?
          </h3>
          <p className="text-sm text-[#777777]">
            Discuss your technical requirements directly with our founding engineers.
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => setActiveTab('contact')}
        >
          Start a Project
        </Button>
      </div>
    </div>
  );
}
