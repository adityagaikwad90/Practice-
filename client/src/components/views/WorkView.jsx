import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Button from '../ui/Button';
import TypographyReveal from '../ui/TypographyReveal';

export default function WorkView({ setActiveTab }) {
  const [filter, setFilter] = useState('all');
  const shouldReduceMotion = useReducedMotion();

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
    : projects.filter((p) => p.category === filter);

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'cloud', label: 'Cloud & DevOps' },
    { id: 'web', label: 'Web Platforms' },
    { id: 'mobile', label: 'Android' },
    { id: 'media', label: 'Media Systems' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-24 page-transition">
      {/* Editorial Header with Typography Reveal */}
      <div className="space-y-6">
        <span className="eyebrow-minimal block">PORTFOLIO</span>
        <TypographyReveal
          as="h1"
          lines={["Things we've built."]}
          className="text-4xl sm:text-6xl font-normal tracking-tight text-[#171717] font-heading leading-tight"
        />
        <p className="text-base sm:text-lg text-[#777777] leading-relaxed max-w-2xl">
          A collection of production software, cloud infrastructure, and mobile applications engineered directly by our founding team.
        </p>

        {/* Minimal Animated Category Filter Pills */}
        <div className="pt-4 flex flex-wrap gap-2 text-xs">
          {filterTabs.map((btn) => {
            const isSelected = filter === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`relative px-3.5 py-1.5 rounded-[4px] font-mono transition-colors cursor-pointer ${
                  isSelected ? 'text-white' : 'text-[#777777] hover:text-[#171717] bg-[#F7F6F2] border border-[#E7E7E7]'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-[#171717] rounded-[4px]"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{btn.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Editorial Showcase with Framer Motion Layout Transitions */}
      <motion.div layout className="space-y-16">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              key={project.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-[#E7E7E7] hover:border-[#171717] pt-12 space-y-8 transition-colors duration-300 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-[#777777] block mb-1">
                    0{idx + 1} • {project.categoryLabel}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium text-[#171717] font-heading group-hover:text-black transition-colors">
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
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

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
          icon={ArrowRight}
          iconPosition="right"
          onClick={() => setActiveTab('contact')}
        >
          Start a Project
        </Button>
      </div>
    </div>
  );
}
