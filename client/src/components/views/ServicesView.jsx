import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function ServicesView({ setFormService, setActiveTab }) {
  useScrollReveal();
  const serviceCategories = [
    {
      id: 'cloud-solutions',
      title: 'Cloud & DevOps Engineering',
      tagline: 'Resilient, automated cloud infrastructure',
      description: 'We architect and provision enterprise-grade AWS and GCP environments designed for uptime, security, and low latency. Every deployment is containerized with Docker and driven by automated GitHub Actions CI/CD pipelines.',
      deliverables: [
        'AWS EC2, ECS, and S3 secure storage architectures',
        'Docker & Docker Compose containerized microservices',
        'Automated CI/CD deployment workflows with GitHub Actions',
        'Nginx reverse proxy with automated SSL/TLS certificate renewal',
        'System monitoring, access control, and network security policies'
      ],
      technologies: ['AWS EC2', 'AWS S3', 'Docker', 'Nginx', 'GitHub Actions', 'Linux']
    },
    {
      id: 'web-dev',
      title: 'Web Platform Development',
      tagline: 'High-speed, scalable web applications',
      description: 'We build responsive Single Page Applications and web platforms using React 18, Next.js, and modern CSS architecture. Focused on sub-second page loads, accessible UI components, and clean state management.',
      deliverables: [
        'Single Page Applications with React 18 and Next.js',
        'Design systems and accessible UI components',
        'REST and GraphQL API integration with client caching',
        'Core Web Vitals optimization (Lighthouse 95+ scores)',
        'Responsive layouts tested across mobile, tablet, and desktop'
      ],
      technologies: ['React 18', 'Next.js', 'Tailwind CSS', 'Vite', 'TypeScript']
    },
    {
      id: 'android-dev',
      title: 'Android Application Engineering',
      tagline: 'Native 120 FPS mobile experiences',
      description: 'We craft native Android applications with Kotlin and Jetpack Compose. Engineered for fluid animations, offline-first Room database synchronization, and automated Google Play Store release tracks.',
      deliverables: [
        'Declarative native UI with Jetpack Compose',
        'Offline-first data persistence using Room Database',
        'Reactive asynchronous streaming with Kotlin Coroutines and Flow',
        'Biometric authentication, camera, and device sensor integration',
        'Google Play Console deployment and release management'
      ],
      technologies: ['Kotlin', 'Jetpack Compose', 'Room DB', 'Coroutines', 'Android SDK']
    },
    {
      id: 'backend-dev',
      title: 'Backend Systems & APIs',
      tagline: 'High-throughput microservices and APIs',
      description: 'We engineer resilient backend systems using Node.js and Express. From relational database modeling in PostgreSQL to distributed Redis caching and secure cloud storage pipelines with Amazon S3.',
      deliverables: [
        'Scalable RESTful microservices and API gateways',
        'Relational and document database schema design (PostgreSQL / MongoDB)',
        'Amazon S3 private asset storage and presigned upload flows',
        'Authentication, authorization, and rate-limiting security layers',
        'Comprehensive integration testing and automated health telemetry'
      ],
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'AWS S3', 'Redis']
    }
  ];

  const handleSelectService = (id) => {
    if (setFormService) setFormService(id);
    setActiveTab('contact');
  };

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-24 page-transition">
      {/* Editorial Header */}
      <div className="space-y-6">
        <span className="eyebrow-minimal block">ENGINEERING SERVICES</span>
        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-[#171717] font-heading leading-tight">
          Capabilities built for production.
        </h1>
        <p className="text-base sm:text-lg text-[#777777] leading-relaxed max-w-2xl">
          We build digital software systems across four focused disciplines. Every engagement is executed with direct founder oversight, clean architecture, and complete source code ownership.
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-16">
        {serviceCategories.map((service, index) => (
          <div
            key={service.id}
            className="reveal-init border-t border-[#E7E7E7] hover:border-[#171717] pt-12 space-y-8 transition-colors duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#777777] block mb-1">
                  0{index + 1}
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium text-[#171717] font-heading">
                  {service.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#777777] mt-1 font-mono">
                  {service.tagline}
                </p>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleSelectService(service.id)}
              >
                Discuss this service
              </Button>
            </div>

            <p className="text-sm sm:text-base text-[#171717] leading-relaxed max-w-3xl">
              {service.description}
            </p>

            {/* Deliverables list */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#777777]">
                Key Deliverables
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs sm:text-sm text-[#777777]">
                {service.deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2">
                    <span className="text-[#171717] select-none">—</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              {service.technologies.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 text-xs font-mono bg-[#F7F6F2] border border-[#E7E7E7] text-[#171717] rounded-[4px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cost Estimator Link Banner */}
      <div className="mono-card-warm p-8 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-[#171717] font-heading">
            Need an indicative project estimate?
          </h3>
          <p className="text-xs sm:text-sm text-[#777777]">
            Use our interactive calculator to explore indicative project scopes and timelines.
          </p>
        </div>
        <Button
          variant="secondary"
          size="md"
          onClick={() => setActiveTab('estimator')}
          className="shrink-0"
        >
          Open Cost Estimator
        </Button>
      </div>
    </div>
  );
}
