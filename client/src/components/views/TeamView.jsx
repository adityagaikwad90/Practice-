import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Button from '../ui/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function TeamView({ setActiveTab }) {
  useScrollReveal();

  const founders = [
    {
      name: 'Aditya Gaikwad',
      role: 'Cloud Engineering Lead',
      bio: 'Architecting high-availability AWS and GCP cloud infrastructure, Docker container clusters, automated CI/CD pipelines, and network security.',
      email: 'aditya@solvespace.online',
      github: 'https://github.com/adityagaikwad90'
    },
    {
      name: 'Mayur Choudhary',
      role: 'Android Solutions Architect',
      bio: 'Engineering native Android applications with Kotlin, Jetpack Compose, offline-first Room database synchronization, and Play Store releases.',
      email: 'mayur@solvespace.online',
      github: 'https://github.com/mayurchoudhary'
    },
    {
      name: 'Manish Mali',
      role: 'Backend Engineering Lead',
      bio: 'Designing scalable Node.js and Express REST microservices, database schemas (PostgreSQL / MongoDB), and distributed backend architectures.',
      email: 'manish@solvespace.online',
      github: 'https://github.com/manishmali'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-24 page-transition">
      {/* Editorial Header */}
      <div className="space-y-6">
        <span className="eyebrow-minimal block">ABOUT THE STUDIO</span>
        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-[#171717] font-heading leading-tight">
          We build digital systems that endure.
        </h1>
        <p className="text-base sm:text-lg text-[#777777] leading-relaxed max-w-2xl">
          SolveSpace Technologies was founded on a simple principle: software is built best when the architects designing the system are the ones writing the code. We partner directly with founders and product teams to ship production-ready cloud, web, and mobile software.
        </p>
      </div>

      {/* Engineering Approach */}
      <div className="border-t border-[#E7E7E7] pt-16 space-y-10 reveal-init">
        <div className="space-y-2">
          <span className="eyebrow-minimal block">APPROACH & VALUES</span>
          <h2 className="text-2xl sm:text-3xl font-normal text-[#171717] font-heading">
            How we think about engineering.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border-t border-[#171717] pt-4 space-y-2">
            <span className="text-xs font-mono font-medium text-[#171717]">01</span>
            <h3 className="text-base font-medium text-[#171717] font-heading">
              Direct Founder Execution
            </h3>
            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
              No account managers or junior contractors. You collaborate directly with experienced founding engineers.
            </p>
          </div>

          <div className="border-t border-[#171717] pt-4 space-y-2">
            <span className="text-xs font-mono font-medium text-[#171717]">02</span>
            <h3 className="text-base font-medium text-[#171717] font-heading">
              Full Code Ownership
            </h3>
            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
              100% intellectual property transfer. You own the repository, documentation, and cloud accounts completely.
            </p>
          </div>

          <div className="border-t border-[#171717] pt-4 space-y-2">
            <span className="text-xs font-mono font-medium text-[#171717]">03</span>
            <h3 className="text-base font-medium text-[#171717] font-heading">
              Production Velocity
            </h3>
            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
              We focus on clean, maintainable software with automated deployments, high test coverage, and zero fluff.
            </p>
          </div>
        </div>
      </div>

      {/* Founders Section */}
      <div className="border-t border-[#E7E7E7] pt-16 space-y-10 reveal-init">
        <div className="space-y-2">
          <span className="eyebrow-minimal block">LEADERSHIP</span>
          <h2 className="text-2xl sm:text-3xl font-normal text-[#171717] font-heading">
            Founding Engineers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {founders.map((founder, idx) => (
            <div key={idx} className="reveal-init border-t border-[#E7E7E7] hover:border-[#171717] pt-6 space-y-3 transition-colors duration-300">
              <div>
                <h3 className="text-lg font-medium text-[#171717] font-heading">
                  {founder.name}
                </h3>
                <span className="text-xs font-mono text-[#777777] block mt-0.5">
                  {founder.role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
                {founder.bio}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs font-mono">
                <a
                  href={`mailto:${founder.email}`}
                  className="text-[#171717] hover:underline"
                >
                  {founder.email}
                </a>
                <a
                  href={founder.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#777777] hover:text-[#171717] inline-flex items-center gap-0.5"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="border-t border-[#E7E7E7] pt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-xl font-medium text-[#171717] font-heading">
            Let's work together.
          </h3>
          <p className="text-sm text-[#777777]">
            Reach out to schedule an initial technical conversation.
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => setActiveTab && setActiveTab('contact')}
        >
          Start a Project
        </Button>
      </div>
    </div>
  );
}
