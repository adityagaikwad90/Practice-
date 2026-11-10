import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Lock,
  Code2,
  Cpu,
  Clock,
  Sparkles,
  Terminal,
  Calculator
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Button from '../ui/Button';
import HeroVisual3D from '../ui/HeroVisual3D';
import TypographyReveal from '../ui/TypographyReveal';
import IdeaToProductMotion from '../ui/IdeaToProductMotion';
import EngineeringBlueprint from '../ui/EngineeringBlueprint';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function HomeView({ setActiveTab }) {
  useScrollReveal();
  const shouldReduceMotion = useReducedMotion();

  // Highlighted Value Propositions (Why Startups Partner With Us)
  const clientAdvantages = [
    {
      icon: Code2,
      badge: 'NO JUNIORS',
      title: 'Direct Founder Execution',
      desc: 'You work directly with senior founding engineers. No account managers, middle-layer agency bloat, or outsourced junior developers.'
    },
    {
      icon: Lock,
      badge: '100% OWNERSHIP',
      title: 'Complete IP & Repo Transfer',
      desc: 'You retain full intellectual property from Day 1. Full access to GitHub repos, Dockerfiles, AWS infrastructure, and documentation.'
    },
    {
      icon: Zap,
      badge: 'RAPID SPRINT',
      title: 'Production Velocity',
      desc: 'Fast 2-week sprint cycles with live staging builds delivered every Friday. We prioritize working software over endless slide decks.'
    },
    {
      icon: ShieldCheck,
      badge: 'CLOUD NATIVE',
      title: 'Enterprise-Grade Security',
      desc: 'Pre-architected for security, SSL/TLS automation, encrypted S3 buckets, rate-limiting, and zero-downtime CI/CD container clusters.'
    }
  ];

  // Core Capabilities with Client-focused deliverables
  const services = [
    {
      id: 'cloud-solutions',
      title: 'Cloud & DevOps Engineering',
      tagline: 'AWS & GCP Infrastructure • Docker Microservices',
      desc: 'We architect and provision resilient cloud environments with automated CI/CD pipelines, containerized Docker clusters, and zero-downtime Nginx reverse proxies.',
      deliverables: ['AWS EC2 & ECS Clusters', 'Docker & Compose Orchestration', 'Automated GitHub Actions CI/CD', 'SSL/TLS & Security Hardening'],
      idealFor: 'High-traffic apps, microservices & reliable hosting'
    },
    {
      id: 'web-dev',
      title: 'Web Platform Development',
      tagline: 'React 18 • Next.js • Tailwind CSS Architecture',
      desc: 'High-performance Single Page Applications and customer portals engineered for sub-second page loads, responsive UX, and Core Web Vitals (95+ Lighthouse).',
      deliverables: ['React 18 & Next.js SPAs', 'Scalable UI Design Systems', 'REST & GraphQL Integrations', 'SEO & Performance Tuning'],
      idealFor: 'SaaS platforms, client portals & interactive web apps'
    },
    {
      id: 'android-dev',
      title: 'Android Native Engineering',
      tagline: 'Kotlin • Jetpack Compose • 120 FPS Mobile UI',
      desc: 'Native Android applications crafted with modern Kotlin and declarative Jetpack Compose. Built with offline-first Room database sync and Google Play Store delivery.',
      deliverables: ['Declarative Compose UI', 'Offline-First Room Sync', 'Kotlin Coroutines & Flow', 'Play Store Release Management'],
      idealFor: 'High-framerate mobile apps & offline-capable products'
    },
    {
      id: 'backend-dev',
      title: 'Backend Systems & APIs',
      tagline: 'Node.js Express • PostgreSQL • Redis Distributed Cache',
      desc: 'Resilient backend architectures handling high-throughput requests. From relational PostgreSQL schemas to sub-millisecond Redis caching and Amazon S3 asset pipelines.',
      deliverables: ['Scalable RESTful Microservices', 'Relational PostgreSQL Modeling', 'Sub-ms Redis Caching Layers', 'Amazon S3 Encrypted Storage'],
      idealFor: 'High-throughput APIs, database scale & secure storage'
    }
  ];

  // Featured Engineering Work with client-centric metrics
  const projects = [
    {
      id: 'cloud-cluster',
      name: 'SolveSpace Cloud Cluster & CI/CD',
      category: 'Cloud Infrastructure & DevOps',
      metric: 'Sub-20ms Cluster Response',
      desc: 'High-availability AWS EC2 environment running containerized Docker Compose microservices behind an Nginx reverse proxy with automated GitHub Actions delivery.',
      tech: 'AWS EC2 • Docker • Nginx • GitHub Actions'
    },
    {
      id: 'client-portal',
      name: 'Startup Recruitment & S3 Inquiries Portal',
      category: 'Fullstack Web Platform',
      metric: 'Encrypted S3 Private Pipeline',
      desc: 'Fullstack web application integrating Amazon S3 for secure encrypted PDF resume uploads, Express REST APIs, and instant reference ID status telemetry.',
      tech: 'React 18 • Express • AWS S3 • Tailwind'
    },
    {
      id: 'android-engine',
      name: 'Native Android High-Framerate Suite',
      category: 'Android Mobile Engineering',
      metric: 'Fluid 120 FPS UI Architecture',
      desc: 'Production Android mobile framework featuring declarative Jetpack Compose, Kotlin Coroutines, and offline Room DB sync targeting Android 14+.',
      tech: 'Kotlin • Jetpack Compose • Room DB • MVVM'
    },
    {
      id: 'media-engine',
      name: 'Automated Media Rendering Engine',
      category: 'Backend & Media Systems',
      metric: '4K 60FPS Video Transcoding',
      desc: 'Automated video rendering pipeline creating 4K product demo reels and motion graphics assets engineered for startup user acquisition.',
      tech: 'Node.js • FFmpeg • Cloud Storage'
    }
  ];

  // 4-Step Engagement Roadmap
  const engagementSteps = [
    {
      step: '01',
      title: 'Technical Scoping',
      timeframe: 'Day 1 – 2',
      desc: 'We review your requirements, determine technical feasibility, and provide a fixed milestone roadmap.'
    },
    {
      step: '02',
      title: 'Architecture Blueprint',
      timeframe: 'Week 1',
      desc: 'We map system diagrams, database models, and cloud infrastructure before writing production code.'
    },
    {
      step: '03',
      title: 'Sprint Development',
      timeframe: 'Weeks 2 – 4',
      desc: 'Our founding engineers author clean, typed code through direct weekly sprints with testable Friday builds.'
    },
    {
      step: '04',
      title: 'Production Handover',
      timeframe: 'Deployment Day',
      desc: 'We launch to live AWS / Google Play, handover all repository access, and provide documentation.'
    }
  ];

  // Founding Engineers
  const founders = [
    {
      name: 'Aditya Gaikwad',
      role: 'Cloud Engineering Lead',
      specialty: 'AWS EC2, Docker Clusters, Nginx SSL, CI/CD Pipelines & Security',
      email: 'aditya@solvespace.online'
    },
    {
      name: 'Mayur Choudhary',
      role: 'Android Solutions Architect',
      specialty: 'Native Kotlin, Jetpack Compose, Offline Room Cache & Play Store Releases',
      email: 'mayur@solvespace.online'
    },
    {
      name: 'Manish Mali',
      role: 'Backend Engineering Lead',
      specialty: 'Node.js Express REST APIs, PostgreSQL Schemas, Redis & Amazon S3',
      email: 'manish@solvespace.online'
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-36 pb-20 page-transition">
      {/* =========================================================================
          SECTION 1 — HERO: CLEAR STARTUP VALUE PROPOSITION
         ========================================================================= */}
      <section className="pt-8 sm:pt-16 px-6 sm:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Clear Value Prop & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Startup Status Pill */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F6F2] border border-[#E7E7E7] rounded-full text-xs font-mono text-[#171717]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>DIRECT FOUNDER ENGINEERING STUDIO</span>
            </motion.div>

            {/* Editorial Headline */}
            <TypographyReveal
              as="h1"
              lines={['We Architect & Build', 'Production Software.']}
              delay={0.15}
              stagger={0.15}
              className="text-4xl sm:text-6xl lg:text-[72px] font-normal tracking-tight text-[#171717] leading-[1.05] font-heading"
            />

            {/* Client-Centric Subtitle */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#777777] max-w-xl font-normal leading-relaxed"
            >
              SolveSpace Technologies partners with founders and scaling teams to engineer production-ready <strong className="text-[#171717] font-medium">Cloud Infrastructure</strong>, <strong className="text-[#171717] font-medium">Web Platforms</strong>, <strong className="text-[#171717] font-medium">Native Android Apps</strong>, and <strong className="text-[#171717] font-medium">Backend APIs</strong> — delivered in weeks, not months.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => setActiveTab('contact')}
              >
                Start a Project
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => setActiveTab('estimator')}
              >
                Instant Cost Estimator
              </Button>
            </motion.div>

            {/* Response Time & Guarantee Note */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xs font-mono text-[#777777] flex items-center gap-2 pt-1"
            >
              <Clock className="w-3.5 h-3.5 text-[#171717]" />
              <span>Founders review and respond to inquiries within 24 hours</span>
            </motion.div>
          </div>

          {/* Right Column: Abstract Chrome 3D Sculpture */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroVisual3D />
          </div>
        </div>

        {/* Startup Credibility Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-14 pt-8 border-t border-[#E7E7E7] grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
        >
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-medium text-[#171717] font-heading">
              50+
            </div>
            <p className="text-xs font-mono text-[#777777]">
              Microservices & Apps Shipped
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-medium text-[#171717] font-heading">
              99.98%
            </div>
            <p className="text-xs font-mono text-[#777777]">
              Production Uptime SLA
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-medium text-[#171717] font-heading">
              &lt; 20ms
            </div>
            <p className="text-xs font-mono text-[#777777]">
              Average API Cluster Latency
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-medium text-[#171717] font-heading">
              100%
            </div>
            <p className="text-xs font-mono text-[#777777]">
              Source Code & IP Handover
            </p>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          SECTION 2 — THE SOLVESPACE ADVANTAGE: WHY CLIENTS CHOOSE US
         ========================================================================= */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#E7E7E7] pt-16 sm:pt-24 space-y-12 reveal-init">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="eyebrow-minimal block">THE SOLVESPACE ADVANTAGE</span>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#171717] font-heading">
              Built for speed. Engineered for scale.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#777777] max-w-md">
            We eliminate layers of middle management and bureaucratic overhead, delivering production software with complete clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientAdvantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="mono-card p-6 rounded-lg space-y-4 hover:border-[#171717] hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-[#F7F6F2] rounded text-[#171717]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-medium text-[#777777] tracking-wider">
                      {adv.badge}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-[#171717] font-heading">
                    {adv.title}
                  </h3>
                  <p className="text-xs text-[#777777] leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — IDEA TO PRODUCT INTERACTIVE PIPELINE
         ========================================================================= */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#E7E7E7] pt-16 sm:pt-24 reveal-init">
        <IdeaToProductMotion />
      </section>

      {/* =========================================================================
          SECTION 4 — CAPABILITIES & DELIVERABLES (WHAT WE BUILD)
         ========================================================================= */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#E7E7E7] pt-16 sm:pt-24 space-y-12 reveal-init">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="eyebrow-minimal block">FOCUSED CAPABILITIES</span>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#171717] font-heading">
              What we build for you.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className="group text-xs sm:text-sm text-[#171717] hover:underline flex items-center gap-1 cursor-pointer font-medium"
          >
            <span>View detailed deliverables</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className={`reveal-init reveal-delay-${(idx % 4) + 1} mono-card-warm p-8 rounded-lg space-y-6 flex flex-col justify-between hover:border-[#171717] hover:shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 group`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#777777]">0{idx + 1} • CORE DISCIPLINE</span>
                  <span className="text-[11px] font-mono text-[#171717] bg-white px-2 py-0.5 rounded border border-[#E7E7E7]">
                    {service.idealFor}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-medium text-[#171717] font-heading group-hover:text-black transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-mono text-[#777777] mt-1">
                    {service.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
                  {service.desc}
                </p>

                {/* Key Deliverables Bullet Points */}
                <div className="space-y-2 pt-2 border-t border-[#E7E7E7]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#171717] font-medium block">
                    Key Deliverables:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#777777]">
                    {service.deliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#171717] shrink-0" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E7E7] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('contact')}
                  className="btn-primary-mono px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Request Scope</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('services')}
                  className="text-xs font-mono text-[#777777] hover:text-[#171717] transition-colors"
                >
                  Learn more →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — ANIMATED ENGINEERING BLUEPRINT
         ========================================================================= */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#E7E7E7] pt-16 sm:pt-24 reveal-init">
        <EngineeringBlueprint />
      </section>

      {/* =========================================================================
          SECTION 6 — SELECTED WORK & CLIENT PROOF
         ========================================================================= */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#E7E7E7] pt-16 sm:pt-24 space-y-12 reveal-init">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="eyebrow-minimal block">PROVEN ENGINEERING</span>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#171717] font-heading">
              Featured work & architectures.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('work')}
            className="group text-xs sm:text-sm text-[#171717] hover:underline flex items-center gap-1 cursor-pointer font-medium"
          >
            <span>View all projects</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`reveal-init reveal-delay-${(idx % 4) + 1} mono-card p-8 rounded-lg space-y-6 flex flex-col justify-between group transition-all duration-300 hover:border-[#171717] hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)]`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#777777]">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-[#171717] font-medium px-2 py-0.5 bg-[#F7F6F2] rounded border border-[#E7E7E7]">
                    {project.metric}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-medium text-[#171717] font-heading group-hover:text-black transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
                  {project.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E7E7E7] flex items-center justify-between text-xs">
                <span className="font-mono text-[#777777]">{project.tech}</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('work')}
                  className="font-medium text-[#171717] hover:underline flex items-center gap-1 cursor-pointer shrink-0 ml-3 group/btn"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — 4-STEP ENGAGEMENT ROADMAP
         ========================================================================= */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#E7E7E7] pt-16 sm:pt-24 space-y-12 reveal-init">
        <div className="space-y-2">
          <span className="eyebrow-minimal block">HOW WE PARTNER WITH YOU</span>
          <h2 className="text-2xl sm:text-4xl font-normal text-[#171717] font-heading">
            A transparent, sprint-based roadmap.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {engagementSteps.map((step) => (
            <div
              key={step.step}
              className="border-t border-[#171717] pt-4 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-[#171717]">
                  {step.step}
                </span>
                <span className="text-[10px] font-mono text-[#777777] bg-[#F7F6F2] px-2 py-0.5 rounded">
                  {step.timeframe}
                </span>
              </div>
              <h3 className="text-base font-medium text-[#171717] font-heading">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 — FOUNDING ENGINEERS (DIRECT ARCHITECT ACCESS)
         ========================================================================= */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#E7E7E7] pt-16 sm:pt-24 space-y-12 reveal-init">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="eyebrow-minimal block">DIRECT ARCHITECT ACCESS</span>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#171717] font-heading">
              Meet the founders writing your code.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#777777]">
            Dedicated Slack channel with founders on every client engagement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {founders.map((founder, idx) => (
            <div
              key={idx}
              className={`reveal-init reveal-delay-${(idx % 3) + 1} border-t border-[#E7E7E7] hover:border-[#171717] pt-6 space-y-3 transition-colors duration-300 group`}
            >
              <div>
                <h3 className="text-lg font-medium text-[#171717] font-heading">
                  {founder.name}
                </h3>
                <span className="text-xs font-mono text-[#777777] block mt-0.5">
                  {founder.role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
                {founder.specialty}
              </p>
              <div className="pt-2">
                <a
                  href={`mailto:${founder.email}`}
                  className="text-xs font-mono text-[#171717] hover:underline transition-colors"
                >
                  {founder.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 — INSTANT COST ESTIMATOR PROMPT
         ========================================================================= */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#E7E7E7] pt-16 sm:pt-24 reveal-init">
        <div className="mono-card-warm border border-[#E7E7E7] rounded-xl p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 hover:border-[#B5B5B5] transition-all">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-white border border-[#E7E7E7] rounded text-xs font-mono text-[#171717]">
              <Calculator className="w-3.5 h-3.5 text-[#171717]" />
              <span>TRANSPARENT PRICING CALCULATOR</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium text-[#171717] font-heading">
              Need an instant scope and budget estimate?
            </h3>
            <p className="text-sm text-[#777777] leading-relaxed">
              Use our interactive engineering calculator to tailor your required services, timeline urgency, and scale. Receive an indicative scope breakdown in seconds.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => setActiveTab('estimator')}
            className="shrink-0"
          >
            Calculate Project Scope
          </Button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10 — FINAL CALL TO ACTION
         ========================================================================= */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#E7E7E7] pt-16 sm:pt-24 reveal-init">
        <div className="bg-[#171717] text-white rounded-xl p-10 sm:p-20 text-center space-y-6 max-w-4xl mx-auto shadow-2xl">
          <span className="text-xs font-mono text-neutral-400 tracking-wider uppercase block">
            READY TO SHIP?
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white font-heading">
            Let's build your next digital product.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-lg mx-auto leading-relaxed">
            Reach out to schedule an initial scoping session directly with our founding engineers. We review specifications and provide architectural guidance within 24 hours.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('contact')}
              className="px-6 py-3 bg-white text-[#171717] font-medium text-sm sm:text-base rounded-md hover:bg-neutral-100 transition-all cursor-pointer flex items-center gap-2 active:scale-[0.98]"
            >
              <span>Schedule Technical Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('work')}
              className="px-6 py-3 bg-transparent text-white border border-neutral-700 font-medium text-sm sm:text-base rounded-md hover:bg-white/10 transition-all cursor-pointer"
            >
              Explore Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
