import React, { useState } from 'react';
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
  Check,
  Terminal,
  Cpu,
  Layers,
  Code2,
  Lock,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import Button from '../ui/Button';
import StatCard from '../ui/StatCard';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

export default function HomeView({ stats, setActiveTab }) {
  const [consoleTab, setConsoleTab] = useState('cloud');

  const pillars = [
    {
      id: 'web-dev',
      title: 'Website Development',
      tagline: 'High-Converting Web & SaaS Apps',
      desc: 'Blazing fast React & Next.js web applications with ultra-responsive UX, dynamic animations, SEO optimization, and 95+ Lighthouse scores.',
      icon: Globe,
      tag: 'React / Next.js',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 border-indigo-100',
      price: 'From $499',
      timeline: '1-3 Weeks',
      bullets: ['Custom Component Architecture', 'Tailwind CSS Modern UI', 'Full API & Database Integrations']
    },
    {
      id: 'android-dev',
      title: 'Android App Development',
      tagline: 'Native Kotlin & Jetpack Compose',
      desc: 'Native 120fps mobile experiences engineered for Android. Offline sync, Google Play Store publishing readiness, biometric auth, and clean MVVM.',
      icon: Smartphone,
      tag: 'Kotlin / Jetpack',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-100',
      price: 'From $799',
      timeline: '2-5 Weeks',
      bullets: ['Native Android SDK & Compose', 'Play Store Deployment Ready', 'Real-Time Sync & Notifications']
    },
    {
      id: 'cloud-solutions',
      title: 'Cloud Solutions & DevOps',
      tagline: 'Zero-Downtime AWS / GCP Architecture',
      desc: 'Containerized microservices via Docker, automated GitHub Actions CI/CD pipelines, Nginx reverse proxy with SSL, and auto-scaling EC2 instances.',
      icon: Cloud,
      tag: 'AWS / Docker / EC2',
      color: 'text-sky-600',
      bgColor: 'bg-sky-50 border-sky-100',
      price: 'From $599',
      timeline: '1-2 Weeks',
      bullets: ['Docker Microservices Setup', 'Nginx Load Balancing & SSL', 'Automated CI/CD Delivery']
    },
    {
      id: 'promo-videos',
      title: 'Promotional Videos & Media',
      tagline: 'High-Impact Product Reels & Motion',
      desc: 'Cinematic 4K promotional video teasers, AI-enhanced app walkthroughs, 3D motion graphics, and social media ad reels designed to drive user conversions.',
      icon: Video,
      tag: 'AI Video / Motion FX',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-100',
      price: 'From $349',
      timeline: '3-7 Days',
      bullets: ['4K Product Launch Teasers', 'Dynamic 3D UI Walkthroughs', 'Conversion-Focused Ad Cuts']
    }
  ];

  const techStackList = [
    'AWS EC2', 'Docker Compose', 'React 18', 'Tailwind CSS v4', 'Node.js',
    'Kotlin Compose', 'Nginx Proxy', 'Express API', 'Git CI/CD', 'Next.js',
    'PostgreSQL', 'Redis Cache'
  ];

  return (
    <div className="space-y-20 sm:space-y-32 pb-24 animate-fade-up">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-12 px-4 sm:px-6 max-w-7xl mx-auto text-center">
        {/* Subtle decorative grid background glow */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-200/80 text-indigo-700 text-xs font-semibold tracking-wider uppercase font-mono shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Digital Engineering Studio for High-Growth Startups</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] font-heading">
            We Engineer & Scale <br className="hidden sm:inline" />
            <span className="gradient-text">Production Software</span> That Wins
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Directly architected by specialized startup founders:{' '}
            <strong className="text-indigo-700 font-semibold">Aditya Gaikwad</strong> (Cloud),{' '}
            <strong className="text-indigo-700 font-semibold">Mayur Choudhary</strong> (Android), and{' '}
            <strong className="text-indigo-700 font-semibold">Manish Mali</strong> (Backend).
            Zero middle management, pure engineering velocity.
          </p>

          {/* Hero CTAs */}
          <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={Calculator}
              onClick={() => setActiveTab('estimator')}
              className="shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              Calculate Project Cost →
            </Button>

            <Button
              variant="secondary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => setActiveTab('services')}
            >
              Explore 4 Core Services
            </Button>
          </div>

          {/* Trust Guarantees Row */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Direct Founder Code Reviews</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Full Source Code Ownership</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Guaranteed Delivery Timelines</span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE STARTUP CONSOLE PREVIEW */}
        <div className="mt-14 max-w-5xl mx-auto text-left">
          <div className="rounded-3xl border border-slate-200 bg-white/95 shadow-xl overflow-hidden glass-panel">
            {/* Console Header Bar */}
            <div className="bg-slate-900 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                  solvespace-system-preview // v2.0
                </span>
              </div>

              {/* Interactive Console Tabs */}
              <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
                {[
                  { id: 'cloud', label: 'AWS Cloud', icon: Cloud },
                  { id: 'web', label: 'Web Platform', icon: Globe },
                  { id: 'android', label: 'Android Compose', icon: Smartphone },
                  { id: 'media', label: 'Media Engine', icon: Video }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = consoleTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setConsoleTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Console Tab Content */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white font-mono text-xs">
              {consoleTab === 'cloud' && (
                <div className="space-y-4 animate-fade-up">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-slate-800 text-slate-400">
                    <span className="text-emerald-400 font-bold">● CLOUD CLUSTER: AWS EC2 / DOCKER REVERSE PROXY</span>
                    <span>REGION: us-east-1 • SLA: 99.98%</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                      <span className="text-slate-400 text-[11px]">Nginx Ingress Proxy</span>
                      <div className="text-emerald-400 font-bold text-sm">HTTP/2 • SSL Active</div>
                      <span className="text-slate-500 text-[10px]">Zero Downtime Certbot Auto-Renew</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                      <span className="text-slate-400 text-[11px]">Docker Compose Cluster</span>
                      <div className="text-indigo-400 font-bold text-sm">3 Microservices Running</div>
                      <span className="text-slate-500 text-[10px]">Express API + Client + Nginx</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                      <span className="text-slate-400 text-[11px]">Lead Architect</span>
                      <div className="text-white font-bold text-sm">Aditya Gaikwad</div>
                      <span className="text-slate-500 text-[10px]">Cloud Solution Provider</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 overflow-x-auto text-[11px]">
                    <code>$ docker-compose up -d --build && curl -I https://solvespace.online/api/health</code><br />
                    <span className="text-emerald-400">HTTP/1.1 200 OK • Status: Online • Cluster Latency: 18ms</span>
                  </div>
                </div>
              )}

              {consoleTab === 'web' && (
                <div className="space-y-4 animate-fade-up">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-slate-800 text-slate-400">
                    <span className="text-indigo-400 font-bold">● REACT & NEXT.JS WEB ARCHITECTURE</span>
                    <span>LIGHTHOUSE SCORE: 98/100</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                      <span className="text-slate-400 text-[11px]">Component Framework</span>
                      <div className="text-indigo-400 font-bold text-sm">React 18 + Tailwind v4</div>
                      <span className="text-slate-500 text-[10px]">Clean Design System Tokens</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                      <span className="text-slate-400 text-[11px]">Performance</span>
                      <div className="text-emerald-400 font-bold text-sm">&lt; 50ms TTFB</div>
                      <span className="text-slate-500 text-[10px]">Edge caching & Vite optimization</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                      <span className="text-slate-400 text-[11px]">Backend Lead</span>
                      <div className="text-white font-bold text-sm">Manish Mali</div>
                      <span className="text-slate-500 text-[10px]">Node.js Express & Database Lead</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 overflow-x-auto text-[11px]">
                    <code>export default function StartupApp() &#123; return &lt;Engine status="scalable" /&gt;; &#125;</code><br />
                    <span className="text-indigo-400">Built for conversions, responsive viewports, and modern SEO.</span>
                  </div>
                </div>
              )}

              {consoleTab === 'android' && (
                <div className="space-y-4 animate-fade-up">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-slate-800 text-slate-400">
                    <span className="text-emerald-400 font-bold">● NATIVE KOTLIN & JETPACK COMPOSE ENGINE</span>
                    <span>TARGET: Android 14+ (API 34)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                      <span className="text-slate-400 text-[11px]">Mobile Framework</span>
                      <div className="text-emerald-400 font-bold text-sm">Kotlin / Jetpack</div>
                      <span className="text-slate-500 text-[10px]">Declarative UI & Coroutines</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                      <span className="text-slate-400 text-[11px]">App Performance</span>
                      <div className="text-emerald-400 font-bold text-sm">120 FPS Fluid Motion</div>
                      <span className="text-slate-500 text-[10px]">Zero UI jank, Room DB offline sync</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                      <span className="text-slate-400 text-[11px]">Mobile Lead</span>
                      <div className="text-white font-bold text-sm">Mayur Choudhary</div>
                      <span className="text-slate-500 text-[10px]">Android Architect</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 overflow-x-auto text-[11px]">
                    <code>@Composable fun AppScreen() &#123; AnimatedVisibility(visible = ready) &#123; ... &#125; &#125;</code><br />
                    <span className="text-emerald-400">Published directly to Google Play Store with automated release tracks.</span>
                  </div>
                </div>
              )}

              {consoleTab === 'media' && (
                <div className="space-y-4 animate-fade-up">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-slate-800 text-slate-400">
                    <span className="text-purple-400 font-bold">● AI PROMOTIONAL REELS & MOTION GRAPHICS</span>
                    <span>OUTPUT: 4K Ultra-HD 60FPS</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                      <span className="text-slate-400 text-[11px]">Media Formats</span>
                      <div className="text-purple-400 font-bold text-sm">9:16 Reels + 16:9 4K</div>
                      <span className="text-slate-500 text-[10px]">Tailored for TikTok, IG, & YouTube</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                      <span className="text-slate-400 text-[11px]">Conversion Rate</span>
                      <div className="text-emerald-400 font-bold text-sm">+340% Engagement</div>
                      <span className="text-slate-500 text-[10px]">Hooks audiences in first 3 seconds</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-1">
                      <span className="text-slate-400 text-[11px]">Production Pipeline</span>
                      <div className="text-white font-bold text-sm">AI Voice & FX</div>
                      <span className="text-slate-500 text-[10px]">Dynamic text overlays & audio sync</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 overflow-x-auto text-[11px]">
                    <code>render_video(format="reel_4k", pacing="high_tempo", audio="studio_mastered")</code><br />
                    <span className="text-purple-400">Ready to boost marketing campaigns and product launches.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tech Stack Marquee Ticker */}
        <div className="mt-14 overflow-hidden py-4 border-y border-slate-200/80 max-w-6xl mx-auto">
          <div className="text-center text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-3 font-semibold">
            ENGINEERED WITH PRODUCTION TECH STACKS
          </div>
          <div className="ticker-track flex items-center gap-4">
            {[...techStackList, ...techStackList].map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-100/80 border border-slate-200 text-slate-700 shrink-0"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-14 max-w-5xl mx-auto">
          <StatCard
            label="Projects Delivered"
            value={`${stats.projectsCompleted || 54}+`}
            icon={CheckCircle2}
            color="text-indigo-600"
            bgColor="bg-indigo-50 border-indigo-100"
            subtitle="Verified client builds"
          />
          <StatCard
            label="Happy Clients"
            value={`${stats.happyClients || 42}+`}
            icon={Users}
            color="text-emerald-600"
            bgColor="bg-emerald-50 border-emerald-100"
            subtitle="Startups & scaling teams"
          />
          <StatCard
            label="Cloud Deployments"
            value={`${stats.cloudDeployments || 88}+`}
            icon={Cloud}
            color="text-sky-600"
            bgColor="bg-sky-50 border-sky-100"
            subtitle="Docker & EC2 auto-scaling"
          />
          <StatCard
            label="System Uptime"
            value={stats.systemUptime || '99.98%'}
            icon={ShieldCheck}
            color="text-purple-600"
            bgColor="bg-purple-50 border-purple-100"
            subtitle="High SLA guarantee"
          />
        </div>
      </section>

      {/* 4 Core Pillars Overview */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-14">
          <Badge variant="indigo" dot>Our Core Pillars</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            4 Specialized Engineering Pillars
          </h2>
          <p className="text-slate-600 text-xs sm:text-base max-w-xl mx-auto">
            Everything modern startups require to launch, scale, and capture market share without building an internal 10-person dev team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                hover
                padding="p-8"
                className="flex flex-col justify-between space-y-6 relative overflow-hidden group"
              >
                <div className="space-y-5">
                  <div className="flex justify-between items-start">
                    <div className={`w-14 h-14 rounded-2xl border ${item.bgColor} flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-105`}>
                      <Icon className={`w-7 h-7 ${item.color}`} />
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-slate-900 block">{item.price}</span>
                      <span className="text-[11px] font-mono text-slate-400">Est. {item.timeline}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono font-semibold text-indigo-600 uppercase tracking-wider block mb-1">
                      {item.tagline}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-heading">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="space-y-2 pt-2">
                    {item.bullets.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <Badge variant="neutral" size="sm">{item.tag}</Badge>
                  <button
                    type="button"
                    onClick={() => setActiveTab('services')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 transition-colors group-hover:translate-x-0.5"
                  >
                    <span>View Deliverables</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Founders Leadership Banner */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="light-card p-8 sm:p-14 rounded-3xl relative overflow-hidden border border-slate-200 bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/50 shadow-md">
          <div className="max-w-3xl space-y-6 relative z-10">
            <Badge variant="indigo" size="sm" dot>FOUNDER-LED EXECUTION</Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              You Work Directly With Our Technical Founders
            </h2>
            <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
              We eliminate junior developers and account managers. Every architectural decision, code commit, and infrastructure deployment is personally executed by our leads:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-mono text-indigo-600 uppercase font-bold block">Cloud Infrastructure</span>
                <strong className="text-slate-900 text-sm font-heading block mt-0.5">Aditya Gaikwad</strong>
                <p className="text-[11px] text-slate-500 mt-1">AWS EC2, Docker, Nginx, DevOps CI/CD</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-mono text-emerald-600 uppercase font-bold block">Android Engineering</span>
                <strong className="text-slate-900 text-sm font-heading block mt-0.5">Mayur Choudhary</strong>
                <p className="text-[11px] text-slate-500 mt-1">Native Kotlin, Jetpack Compose, Flutter</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-mono text-purple-600 uppercase font-bold block">Backend Systems</span>
                <strong className="text-slate-900 text-sm font-heading block mt-0.5">Manish Mali</strong>
                <p className="text-[11px] text-slate-500 mt-1">Node.js Express, MongoDB, REST APIs</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
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
                Book Founder Discovery Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose SolveSpace: 3 Startup Advantages */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <Badge variant="indigo">Engineering Standard</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Built Specifically for High-Growth Startups
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            High engineering standards delivered with startup agility and zero technical debt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Zero Downtime Cloud Deployment',
              desc: 'Automated CI/CD pipelines on AWS with Docker containerization, Nginx reverse proxy, and zero-downtime rolling deploys.',
              badge: 'DevOps & Reliability'
            },
            {
              title: 'Native High-Framerate Apps',
              desc: 'High-performance Kotlin & Jetpack Compose apps tested across varied screen densities, battery profiles, and network speeds.',
              badge: 'Mobile Excellence'
            },
            {
              title: 'Fixed Pricing & Guaranteed Dates',
              desc: 'Clear, transparent scope agreements with upfront cost calculators and guaranteed production delivery milestones.',
              badge: 'Predictable Scale'
            }
          ].map((item, i) => (
            <Card key={i} hover padding="p-7" className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 font-bold">
                {item.badge}
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-heading">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom Conversion CTA Section */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-14 text-center space-y-6 relative overflow-hidden border border-slate-800 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-semibold border border-indigo-500/30">
              READY TO SHIP YOUR PROJECT?
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-white">
              Launch Your Product With Founder-Level Speed
            </h2>
            <p className="text-slate-400 text-xs sm:text-base leading-relaxed">
              Calculate an instant budget estimate in 30 seconds, or submit your technical specifications for direct founder review within 24 hours.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={Calculator}
                onClick={() => setActiveTab('estimator')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
              >
                Estimate Project Budget
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => setActiveTab('contact')}
                className="bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
              >
                Submit Project Request
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
