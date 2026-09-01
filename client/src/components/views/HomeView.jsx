import React from 'react';
import {
  Sparkles,
  Calculator,
  ArrowRight,
  Globe,
  Smartphone,
  Cloud,
  Video,
  CheckCircle2,
  Users,
  ShieldCheck,
  Zap,
  Check
} from 'lucide-react';
import Button from '../ui/Button';
import StatCard from '../ui/StatCard';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

export default function HomeView({ stats, setActiveTab }) {
  const pillars = [
    {
      title: 'Website Development',
      desc: 'Custom React & Next.js web applications with responsive UI/UX, fast speed, and high lighthouse scores.',
      icon: Globe,
      tag: 'React / Next.js',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 border-indigo-100'
    },
    {
      title: 'Android Development',
      desc: 'Native Kotlin & Jetpack Compose mobile apps with high framerates, offline sync, and Play Store publishing.',
      icon: Smartphone,
      tag: 'Kotlin / Jetpack',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-100'
    },
    {
      title: 'Cloud Solutions',
      desc: 'AWS/GCP cloud setup, Docker container microservices, Nginx reverse proxy, and automated CI/CD.',
      icon: Cloud,
      tag: 'AWS / Docker',
      color: 'text-sky-600',
      bgColor: 'bg-sky-50 border-sky-100'
    },
    {
      title: 'Promotional Videos',
      desc: 'High-impact AI promotional video reels, product feature walkthroughs, 3D motion graphics, and ad media.',
      icon: Video,
      tag: 'AI Video / Motion',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-100'
    }
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 animate-fade-up">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-8 px-4 sm:px-6 max-w-7xl mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Hero Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wider uppercase font-mono shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>DIGITAL ENGINEERING FOR STARTUPS</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] font-heading">
            High-Performance Web,<br className="hidden sm:inline" /> Mobile, Cloud & Media Solutions
          </h1>

          {/* Hero Description */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Architected by specialized startup founders:{' '}
            <strong className="text-indigo-700 font-semibold">Aditya Gaikwad</strong> (Cloud Provider),{' '}
            <strong className="text-indigo-700 font-semibold">Mayur Choudhary</strong> (Android Developer), and{' '}
            <strong className="text-indigo-700 font-semibold">Manish Mali</strong> (Backend Developer).
          </p>

          {/* Hero CTA Buttons */}
          <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={Calculator}
              onClick={() => setActiveTab('estimator')}
              className="shadow-sm hover:shadow-md"
            >
              Calculate Project Cost →
            </Button>

            <Button
              variant="secondary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => setActiveTab('services')}
              className="shadow-sm"
            >
              Explore 4 Core Services
            </Button>
          </div>
        </div>

        {/* Stats Highlight Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-20 max-w-5xl mx-auto">
          <StatCard
            label="Projects Delivered"
            value={`${stats.projectsCompleted || 54}+`}
            icon={CheckCircle2}
            color="text-indigo-600"
            bgColor="bg-indigo-50 border-indigo-100"
            subtitle="Verified successful builds"
          />
          <StatCard
            label="Happy Clients"
            value={`${stats.happyClients || 42}+`}
            icon={Users}
            color="text-emerald-600"
            bgColor="bg-emerald-50 border-emerald-100"
            subtitle="Startup & enterprise"
          />
          <StatCard
            label="Cloud Deployments"
            value={`${stats.cloudDeployments || 88}+`}
            icon={Cloud}
            color="text-sky-600"
            bgColor="bg-sky-50 border-sky-100"
            subtitle="Containerized & auto-scale"
          />
          <StatCard
            label="System Uptime"
            value={stats.systemUptime || '99.98%'}
            icon={ShieldCheck}
            color="text-purple-600"
            bgColor="bg-purple-50 border-purple-100"
            subtitle="Production SLA"
          />
        </div>
      </section>

      {/* 4 Core Pillars Overview */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <Badge variant="indigo">Core Pillars</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Our 4 Core Startup Pillars
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto">
            From cloud infrastructure and native Android apps to high-converting web apps and media.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} hover padding="p-6 sm:p-7" className="flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl border ${item.bgColor} flex items-center justify-center shadow-xs`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <Badge variant="indigo" size="sm">{item.tag}</Badge>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight font-heading">{item.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('services')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 pt-2 transition-colors group"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Founders Leadership Banner */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="light-card p-8 sm:p-12 rounded-3xl relative overflow-hidden border border-slate-200 bg-gradient-to-r from-slate-50 via-indigo-50/50 to-blue-50/40 shadow-sm">
          <div className="max-w-3xl space-y-5 relative z-10">
            <Badge variant="purple" size="sm">FOUNDERS & LEADERSHIP</Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Driven by Specialized Founder Technical Expertise
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Every project is directly architected by our founders:{' '}
              <strong className="text-slate-900 font-semibold">Aditya Gaikwad</strong> (Cloud Infrastructure Lead),{' '}
              <strong className="text-slate-900 font-semibold">Mayur Choudhary</strong> (Android Mobile Lead), and{' '}
              <strong className="text-slate-900 font-semibold">Manish Mali</strong> (Backend Systems Lead).
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => setActiveTab('team')}
              >
                Meet Founder Team
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setActiveTab('contact')}
              >
                Book Technical Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose SolveSpace */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">Why Startup Founders Partner With Us</h2>
          <p className="text-xs sm:text-sm text-slate-600">Enterprise engineering standards delivered with startup agility.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Zero Downtime Cloud Deployment',
              desc: 'Automated CI/CD pipelines on AWS/GCP with Nginx load balancing and containerized microservices.'
            },
            {
              title: 'High-Framerate Mobile Apps',
              desc: 'Native Jetpack Compose and Flutter apps optimized for speed, offline storage, and Play Store approval.'
            },
            {
              title: 'Transparent Project Pricing',
              desc: 'Clear scope boundaries, upfront cost estimation, and guaranteed timeline delivery.'
            }
          ].map((item, i) => (
            <Card key={i} hover padding="p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1 font-heading">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
