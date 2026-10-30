import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Button from '../ui/Button';
import HeroVisual3D from '../ui/HeroVisual3D';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function HomeView({ setActiveTab }) {
  useScrollReveal();

  const services = [
    {
      id: 'cloud-solutions',
      title: 'Cloud & DevOps Engineering',
      desc: 'Containerized AWS and GCP cloud infrastructure, Docker clusters, automated CI/CD pipelines, and zero-downtime deployments.'
    },
    {
      id: 'web-dev',
      title: 'Web Development',
      desc: 'High-performance React and Next.js applications engineered for speed, clean component architectures, and responsive user experiences.'
    },
    {
      id: 'android-dev',
      title: 'Android Development',
      desc: 'Native 120 FPS Android mobile applications built in Kotlin and Jetpack Compose with offline-first synchronization.'
    },
    {
      id: 'backend-dev',
      title: 'Backend Engineering',
      desc: 'Robust Node.js and Express REST APIs, distributed database schemas, Redis caching, and encrypted cloud storage.'
    }
  ];

  const projects = [
    {
      id: 'cloud-cluster',
      name: 'SolveSpace Cloud Cluster & CI/CD',
      category: 'Cloud & DevOps',
      desc: 'High-availability AWS EC2 environment running containerized microservices behind an Nginx reverse proxy with automated GitHub Actions delivery.',
      tech: 'AWS EC2 • Docker • Nginx • GitHub Actions'
    },
    {
      id: 'client-portal',
      name: 'Startup Recruitment & Inquiries Portal',
      category: 'Web Platform',
      desc: 'Fullstack web application integrating Amazon S3 for secure encrypted resume uploads, Express REST APIs, and live inquiry tracking.',
      tech: 'React • Express • AWS S3 • Tailwind'
    },
    {
      id: 'android-engine',
      name: 'Native Android Mobile Architecture',
      category: 'Android Development',
      desc: 'Fluid 120 FPS Android architecture featuring declarative Jetpack Compose, Kotlin Coroutines, and offline Room DB sync.',
      tech: 'Kotlin • Jetpack Compose • Room DB • MVVM'
    },
    {
      id: 'media-engine',
      name: 'Automated Media Rendering Engine',
      category: 'Backend & Media Systems',
      desc: 'Automated video transcoding pipeline producing 4K 60FPS product reels and promotional media assets for startup user acquisition.',
      tech: 'Node.js • FFmpeg • Cloud Storage'
    }
  ];

  const processSteps = [
    {
      step: '01',
      name: 'Discover',
      desc: 'We analyze your requirements, establish technical scope, and set clear milestones.'
    },
    {
      step: '02',
      name: 'Architect',
      desc: 'We map system diagrams, database models, and cloud infrastructure before writing code.'
    },
    {
      step: '03',
      name: 'Build',
      desc: 'Our founding engineers author clean, well-tested code through direct weekly sprints.'
    },
    {
      step: '04',
      name: 'Deploy',
      desc: 'We launch to production on AWS or Google Play with continuous monitoring.'
    }
  ];

  const founders = [
    {
      name: 'Aditya Gaikwad',
      role: 'Cloud Engineering',
      desc: 'Specializing in AWS EC2, Docker microservices, automated CI/CD delivery, and secure cloud networking.',
      email: 'aditya@solvespace.online'
    },
    {
      name: 'Mayur Choudhary',
      role: 'Android Development',
      desc: 'Specializing in native Kotlin development, Jetpack Compose UI, offline cache, and Play Store releases.',
      email: 'mayur@solvespace.online'
    },
    {
      name: 'Manish Mali',
      role: 'Backend Engineering',
      desc: 'Specializing in Node.js Express APIs, PostgreSQL database architectures, and high-throughput systems.',
      email: 'manish@solvespace.online'
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-36 pb-20 page-transition">
      {/* =========================================================================
          SECTION 1 — HERO CINEMATIC ENTRANCE
         ========================================================================= */}
      <section className="pt-10 sm:pt-20 px-6 sm:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Staggered Entrance */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="hero-stagger-1">
              <span className="eyebrow-minimal block">
                SOLVESPACE TECHNOLOGIES
              </span>
            </div>

            <h1 className="hero-stagger-2 text-4xl sm:text-6xl lg:text-[76px] font-normal tracking-tight text-[#171717] leading-[1.05] font-heading">
              <span className="block">Move Ideas</span>
              <span className="block">Into Production.</span>
            </h1>

            <p className="hero-stagger-3 text-base sm:text-lg text-[#777777] max-w-xl font-normal leading-relaxed">
              We design, build and deploy digital products, cloud infrastructure and software systems for ambitious businesses.
            </p>

            <div className="hero-stagger-4 pt-2 flex flex-wrap items-center gap-4">
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
                onClick={() => setActiveTab('work')}
              >
                Explore Our Work
              </Button>
            </div>
          </div>

          {/* Right Column: Abstract Chrome 3D Sculpture */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroVisual3D />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — INTRODUCTION
         ========================================================================= */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#E7E7E7] pt-16 sm:pt-24 reveal-init">
        <div className="max-w-3xl space-y-6">
          <span className="eyebrow-minimal block">ABOUT THE STUDIO</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#171717] font-heading leading-tight">
            Engineering that turns ideas into reality.
          </h2>
          <p className="text-sm sm:text-base text-[#777777] leading-relaxed">
            SolveSpace Technologies is an independent digital engineering startup. We eliminate layers of middle management and agency overhead, partnering directly with founders and product teams to author production-ready cloud, web, and mobile software.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — SERVICES
         ========================================================================= */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#E7E7E7] pt-16 sm:pt-24 space-y-12 reveal-init">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="eyebrow-minimal block">CAPABILITIES</span>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#171717] font-heading">
              What we build.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className="group text-xs sm:text-sm text-[#171717] hover:underline flex items-center gap-1 cursor-pointer font-medium"
          >
            <span>View all services</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className={`reveal-init reveal-delay-${(idx % 4) + 1} border-t border-[#E7E7E7] hover:border-[#171717] pt-6 space-y-3 transition-colors duration-300 group`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#777777]">0{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('services')}
                  className="text-xs text-[#777777] group-hover:text-[#171717] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Explore</span>
                  <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-[#171717] font-heading">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — SELECTED WORK
         ========================================================================= */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#E7E7E7] pt-16 sm:pt-24 space-y-12 reveal-init">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="eyebrow-minimal block">PORTFOLIO</span>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#171717] font-heading">
              Things we've built.
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
              className={`reveal-init reveal-delay-${(idx % 4) + 1} mono-card-warm p-8 rounded-lg space-y-6 flex flex-col justify-between group transition-all duration-300 hover:border-[#B5B5B5] hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)]`}
            >
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#777777]">
                  {project.category}
                </span>
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
          SECTION 5 — HOW WE WORK
         ========================================================================= */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#E7E7E7] pt-16 sm:pt-24 space-y-12 reveal-init">
        <div className="space-y-2">
          <span className="eyebrow-minimal block">METHODOLOGY</span>
          <h2 className="text-2xl sm:text-4xl font-normal text-[#171717] font-heading">
            How we work.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, idx) => (
            <div
              key={step.step}
              className={`reveal-init reveal-delay-${(idx % 4) + 1} border-t border-[#171717] pt-4 space-y-2`}
            >
              <span className="text-xs font-mono font-medium text-[#171717] block">
                {step.step}
              </span>
              <h3 className="text-base font-medium text-[#171717] font-heading">
                {step.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — FOUNDERS
         ========================================================================= */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#E7E7E7] pt-16 sm:pt-24 space-y-12 reveal-init">
        <div className="space-y-2">
          <span className="eyebrow-minimal block">ENGINEERING TEAM</span>
          <h2 className="text-2xl sm:text-4xl font-normal text-[#171717] font-heading">
            The engineers behind SolveSpace.
          </h2>
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
                {founder.desc}
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
          SECTION 7 — CONTACT CTA
         ========================================================================= */}
      <section className="px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#E7E7E7] pt-16 sm:pt-24 reveal-init">
        <div className="bg-[#F7F6F2] border border-[#E7E7E7] rounded-lg p-10 sm:p-16 text-center space-y-6 max-w-4xl mx-auto hover:border-[#B5B5B5] transition-colors duration-300">
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-[#171717] font-heading">
            Have something in mind?
          </h2>
          <p className="text-sm sm:text-base text-[#777777] max-w-md mx-auto">
            Let's build something meaningful together.
          </p>
          <div className="pt-2">
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
      </section>
    </div>
  );
}
