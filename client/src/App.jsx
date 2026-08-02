import React, { useState, useEffect } from 'react';
import {
  Globe,
  Smartphone,
  Cloud,
  Video,
  Layers,
  CheckCircle2,
  Server,
  Zap,
  Users,
  Calculator,
  Send,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Check,
  AlertCircle,
  Activity,
  Mail,
  Github
} from 'lucide-react';
import './App.css';

export default function App() {
  // Navigation & State
  const [activeTab, setActiveTab] = useState('home');
  const [serverHealth, setServerHealth] = useState({ status: 'checking', message: 'Connecting to server...' });
  const [teamMembers, setTeamMembers] = useState([]);
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState({ projectsCompleted: 50, happyClients: 40, cloudDeployments: 80, systemUptime: '99.9%' });
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Estimator State
  const [selectedService, setSelectedService] = useState('web-dev');
  const [projectScale, setProjectScale] = useState('medium');
  const [timelineUrgency, setTimelineUrgency] = useState('standard');

  // Inquiry Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formService, setFormService] = useState('web-dev');
  const [formBudget, setFormBudget] = useState('$1,000 - $2,500');
  const [formTimeline, setFormTimeline] = useState('Within 2 Weeks');
  const [formDetails, setFormDetails] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  // Check Backend Health & Fetch Initial Data
  const checkHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setServerHealth({ status: 'online', message: `${data.app || 'Express API'} online`, uptime: data.uptime });
      } else {
        setServerHealth({ status: 'offline', message: 'Server error response' });
      }
    } catch (err) {
      setServerHealth({ status: 'offline', message: 'Unable to reach backend API' });
    }
  };

  const fetchInitialData = async () => {
    try {
      const [teamRes, servicesRes, statsRes] = await Promise.all([
        fetch('/api/team'),
        fetch('/api/services'),
        fetch('/api/stats')
      ]);

      if (teamRes.ok) setTeamMembers(await teamRes.json());
      if (servicesRes.ok) setServices(await servicesRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (err) {
      console.error('Error loading startup data:', err);
    }
  };

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        setInquiries(await res.json());
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  useEffect(() => {
    checkHealth();
    fetchInitialData();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeTab === 'inquiries') {
      fetchInquiries();
    }
  }, [activeTab]);

  // Handle Form Submission
  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formDetails.trim()) return;

    setFormSubmitting(true);
    setSubmitSuccess(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: formName,
          clientEmail: formEmail,
          serviceId: formService,
          budgetRange: formBudget,
          timeline: formTimeline,
          projectDetails: formDetails
        })
      });

      if (res.ok) {
        const data = await res.json();
        setSubmitSuccess(data.inquiry);
        setFormName('');
        setFormEmail('');
        setFormDetails('');
      } else {
        alert('Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Inquiry error:', err);
      alert('Error connecting to server.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Calculate Instant Estimate
  const getEstimatedPrice = () => {
    let basePrice = 500;
    if (selectedService === 'web-dev') basePrice = 499;
    if (selectedService === 'android-dev') basePrice = 799;
    if (selectedService === 'cloud-solutions') basePrice = 599;
    if (selectedService === 'promo-videos') basePrice = 349;

    let scaleMultiplier = 1;
    if (projectScale === 'medium') scaleMultiplier = 1.8;
    if (projectScale === 'enterprise') scaleMultiplier = 3.2;

    let urgencyMultiplier = 1;
    if (timelineUrgency === 'rush') urgencyMultiplier = 1.3;
    if (timelineUrgency === 'relaxed') urgencyMultiplier = 0.9;

    const estimatedTotal = Math.round(basePrice * scaleMultiplier * urgencyMultiplier);
    return `$${estimatedTotal.toLocaleString()}`;
  };

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-8 h-8 text-blue-400" />;
      case 'Smartphone': return <Smartphone className="w-8 h-8 text-emerald-400" />;
      case 'Cloud': return <Cloud className="w-8 h-8 text-cyan-400" />;
      case 'Video': return <Video className="w-8 h-8 text-purple-400" />;
      default: return <Layers className="w-8 h-8 text-indigo-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      {/* Top Announcement & System Status Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-2 text-xs flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>SolveSpace Technologies • Official Startup Services Platform</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Server className="w-3.5 h-3.5 text-indigo-400" />
            <span>EC2 Node API:</span>
            <span className={`font-semibold px-2 py-0.5 rounded ${serverHealth.status === 'online' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
              {serverHealth.status.toUpperCase()}
            </span>
          </div>
          {serverHealth.uptime && (
            <span className="hidden md:inline text-slate-400">Uptime: {serverHealth.uptime}</span>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
                SOLVESPACE <span className="text-xs px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full font-normal">TECH</span>
              </h1>
              <p className="text-[11px] text-slate-400 tracking-wide font-mono">solvespace.online</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-slate-900/80 border border-slate-800 p-1.5 rounded-full">
            {[
              { id: 'home', label: 'Home', icon: Sparkles },
              { id: 'services', label: 'Services', icon: Layers },
              { id: 'estimator', label: 'Cost Estimator', icon: Calculator },
              { id: 'team', label: 'Founders', icon: Users },
              { id: 'contact', label: 'Get Started', icon: Send },
              { id: 'inquiries', label: 'Client Portal', icon: MessageSquare }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setActiveTab('contact')}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02]"
          >
            <span>Request Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* HERO SECTION (Displayed on Home tab) */}
        {activeTab === 'home' && (
          <div className="space-y-24 pb-20">
            {/* Hero Banner */}
            <section className="relative pt-16 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
              <div className="text-center max-w-4xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Accelerate Your Tech Startup</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  High-Performance Web, Mobile, Cloud & Media Solutions
                </h1>

                <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                  Engineered by 3 specialized startup founders: <strong>Aditya Gaikwad</strong> (Cloud Provider), <strong>Mayur Choudhary</strong> (Android Developer), and <strong>Manish Mali</strong> (Backend Developer).
                </p>

                <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
                  <button
                    onClick={() => setActiveTab('estimator')}
                    className="flex items-center gap-3 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base shadow-xl shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5"
                  >
                    <Calculator className="w-5 h-5" />
                    <span>Calculate Project Cost</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('services')}
                    className="flex items-center gap-2 px-8 py-4 rounded-xl glass-panel hover:bg-slate-800/60 text-slate-200 font-semibold text-base transition-all"
                  >
                    <span>Explore 4 Core Services</span>
                    <ArrowRight className="w-4 h-4 text-indigo-400" />
                  </button>
                </div>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
                {[
                  { label: 'Projects Delivered', value: `${stats.projectsCompleted}+`, icon: CheckCircle2, color: 'text-indigo-400' },
                  { label: 'Happy Clients', value: `${stats.happyClients}+`, icon: Users, color: 'text-emerald-400' },
                  { label: 'Cloud Deployments', value: `${stats.cloudDeployments}+`, icon: Cloud, color: 'text-cyan-400' },
                  { label: 'System Uptime', value: stats.systemUptime, icon: ShieldCheck, color: 'text-purple-400' }
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="glass-panel p-6 rounded-2xl text-center space-y-2 border border-slate-800">
                      <Icon className={`w-7 h-7 mx-auto ${stat.color}`} />
                      <div className="text-3xl font-extrabold text-white">{stat.value}</div>
                      <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Quick Services Overview */}
            <section className="px-6 max-w-7xl mx-auto">
              <div className="text-center space-y-3 mb-12">
                <h2 className="text-3xl font-bold text-white">Our 4 Startup Pillars</h2>
                <p className="text-slate-400 text-sm max-w-xl mx-auto">Everything your business needs from infrastructure setup to mobile apps and promotional videos.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Website Development',
                    desc: 'Custom React & Next.js web applications, responsive UI/UX, and high-converting landing pages.',
                    icon: Globe,
                    tag: 'React / Next.js'
                  },
                  {
                    title: 'Android Development',
                    desc: 'Native Kotlin & Jetpack Compose mobile apps with smooth performance and Play Store publishing.',
                    icon: Smartphone,
                    tag: 'Kotlin / Flutter'
                  },
                  {
                    title: 'Cloud Solutions',
                    desc: 'AWS/GCP setup, Docker containerization, Nginx reverse proxies, and automated CI/CD pipelines.',
                    icon: Cloud,
                    tag: 'AWS / Docker'
                  },
                  {
                    title: 'Promotional Videos',
                    desc: 'High-impact AI promotional reels, product feature walkthroughs, and animated video ads.',
                    icon: Video,
                    tag: 'AI Video / Motion'
                  }
                ].map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <div key={idx} className="glass-panel p-6 rounded-2xl glass-panel-hover flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-indigo-400" />
                        </div>
                        <span className="text-[11px] font-mono font-semibold px-2.5 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-md">
                          {s.tag}
                        </span>
                        <h3 className="text-xl font-bold text-white">{s.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                      </div>

                      <button
                        onClick={() => setActiveTab('services')}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 pt-2"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Meet The Founders Banner */}
            <section className="px-6 max-w-7xl mx-auto">
              <div className="glass-panel p-8 sm:p-12 rounded-3xl relative overflow-hidden border border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
                <div className="max-w-3xl space-y-6 relative z-10">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Leadership & Engineering</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Driven by Specialized Founder Expertise</h2>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Unlike traditional agencies, your project is directly architected and executed by our core founders: <strong>Aditya Gaikwad</strong> (Cloud & DevOps Lead), <strong>Mayur Choudhary</strong> (Android Lead), and <strong>Manish Mali</strong> (Backend Lead).
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      onClick={() => setActiveTab('team')}
                      className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-200 transition-all"
                    >
                      Meet The Team
                    </button>
                    <button
                      onClick={() => setActiveTab('contact')}
                      className="px-6 py-3 rounded-xl glass-panel text-white font-semibold text-sm hover:bg-slate-800 transition-all"
                    >
                      Book Free Technical Consultation
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Comprehensive Tech Startup Services</h2>
              <p className="text-slate-400 text-sm sm:text-base">
                We deliver complete end-to-end digital solutions tailored to accelerate your growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map(service => (
                <div key={service.id} className="glass-panel p-8 rounded-3xl space-y-6 border border-slate-800 glass-panel-hover flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-700/60">
                        {getServiceIcon(service.icon)}
                      </div>
                      <span className="text-xs font-mono px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full font-medium">
                        Starting at ${service.pricingStarting}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-slate-300 text-sm leading-relaxed">{service.fullDesc}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">What We Include:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800/80 flex justify-between items-center">
                    <div className="text-xs text-slate-400">
                      Est. Delivery: <strong className="text-slate-200">{service.estTimeline}</strong>
                    </div>
                    <button
                      onClick={() => {
                        setFormService(service.id);
                        setActiveTab('contact');
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
                    >
                      <span>Request This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COST ESTIMATOR TAB */}
        {activeTab === 'estimator' && (
          <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
                <Calculator className="w-3.5 h-3.5" />
                <span>Instant Project Estimator</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">Estimate Your Project Budget</h2>
              <p className="text-slate-400 text-sm">Select options to get an instant cost and timeline approximation.</p>
            </div>

            <div className="glass-panel p-8 rounded-3xl space-y-8 border border-slate-800">
              {/* Step 1: Select Service */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">1. Select Service Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { id: 'web-dev', label: 'Website Development', icon: Globe },
                    { id: 'android-dev', label: 'Android App Dev', icon: Smartphone },
                    { id: 'cloud-solutions', label: 'Cloud Solutions', icon: Cloud },
                    { id: 'promo-videos', label: 'Promotional Video', icon: Video }
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedService(item.id)}
                        className={`p-4 rounded-xl border text-left flex flex-col justify-between gap-3 transition-all ${
                          selectedService === item.id
                            ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${selectedService === item.id ? 'text-indigo-400' : 'text-slate-500'}`} />
                        <span className="text-xs font-bold">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Project Scale */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">2. Select Project Scope & Scale</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'small', label: 'Starter / MVP', desc: 'Basic features, quick setup' },
                    { id: 'medium', label: 'Growth / Standard', desc: 'Full features, custom design' },
                    { id: 'enterprise', label: 'Enterprise / Scale', desc: 'High load, complex backend' }
                  ].map(scale => (
                    <button
                      key={scale.id}
                      type="button"
                      onClick={() => setProjectScale(scale.id)}
                      className={`p-4 rounded-xl border text-left space-y-1 transition-all ${
                        projectScale === scale.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{scale.label}</div>
                      <div className="text-[11px] text-slate-400">{scale.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Timeline Urgency */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">3. Delivery Speed</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'relaxed', label: 'Flexible (Standard)' },
                    { id: 'standard', label: 'Priority (Normal)' },
                    { id: 'rush', label: 'Express Rush (+30%)' }
                  ].map(time => (
                    <button
                      key={time.id}
                      type="button"
                      onClick={() => setTimelineUrgency(time.id)}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                        timelineUrgency === time.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {time.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimate Result Box */}
              <div className="p-6 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-500/30 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-6">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Estimated Budget Range</span>
                  <div className="text-4xl font-extrabold text-white mt-1">{getEstimatedPrice()}</div>
                  <p className="text-xs text-slate-400 mt-1">Includes initial design, deployment setup & 30 days support.</p>
                </div>

                <button
                  onClick={() => {
                    setFormService(selectedService);
                    setFormBudget(getEstimatedPrice());
                    setActiveTab('contact');
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Submit This Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FOUNDERS & TEAM TAB */}
        {activeTab === 'team' && (
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Meet Our Startup Founders</h2>
              <p className="text-slate-400 text-sm sm:text-base">
                Three specialized engineers leading Cloud Infrastructure, Mobile Development, and Backend Systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map(member => (
                <div key={member.id} className="glass-panel p-8 rounded-3xl space-y-6 border border-slate-800 glass-panel-hover flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* Avatar Initials Badge */}
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${member.gradient} flex items-center justify-center text-white font-extrabold text-xl shadow-lg`}>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{member.name}</h3>
                        <p className="text-xs font-semibold text-indigo-400">{member.role}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{member.specialty}</p>
                      </div>
                    </div>

                    <p className="text-slate-300 text-xs leading-relaxed">{member.bio}</p>

                    <div className="space-y-2">
                      <h4 className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">Core Technical Stack:</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {member.skills.map((skill, i) => (
                          <span key={i} className="text-[11px] px-2.5 py-1 bg-slate-900 text-slate-300 border border-slate-700/80 rounded-md">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                    <a
                      href={`mailto:${member.email}`}
                      className="text-xs text-indigo-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{member.email}</span>
                    </a>
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INQUIRY & CONTACT FORM TAB */}
        {activeTab === 'contact' && (
          <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold text-white">Start Your Project with Us</h2>
              <p className="text-slate-400 text-sm">Fill out details below for an instant review by Aditya, Mayur, and Manish.</p>
            </div>

            {submitSuccess && (
              <div className="p-6 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl text-emerald-300 space-y-3 animate-fade-in">
                <div className="flex items-center gap-2 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Inquiry Received Successfully! (ID: {submitSuccess.id})</span>
                </div>
                <p className="text-xs text-emerald-200">
                  Thank you, <strong>{submitSuccess.clientName}</strong>! Our founder team will review your inquiry for <strong>{submitSuccess.serviceTitle}</strong> and reach out to <strong>{submitSuccess.clientEmail}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitSuccess(null)}
                  className="text-xs underline text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  Submit Another Project Request
                </button>
              </div>
            )}

            <form onSubmit={handleSubmitInquiry} className="glass-panel p-8 rounded-3xl space-y-6 border border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={formEmail}
                    onChange={e => setFormEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Service Category</label>
                  <select
                    value={formService}
                    onChange={e => setFormService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm bg-slate-900"
                  >
                    <option value="web-dev">Website Development</option>
                    <option value="android-dev">Android App Development</option>
                    <option value="cloud-solutions">Cloud Solutions & DevOps</option>
                    <option value="promo-videos">Promotional Video Production</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Budget Range</label>
                  <select
                    value={formBudget}
                    onChange={e => setFormBudget(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm bg-slate-900"
                  >
                    <option value="$350 - $1,000">$350 - $1,000</option>
                    <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                    <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                    <option value="$5,000+">$5,000+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Target Timeline</label>
                  <select
                    value={formTimeline}
                    onChange={e => setFormTimeline(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm bg-slate-900"
                  >
                    <option value="Urgent (1 Week)">Urgent (1 Week)</option>
                    <option value="Within 2 Weeks">Within 2 Weeks</option>
                    <option value="1 Month">1 Month</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Project Overview & Requirements *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your startup goals, required features, or tech stack preferences..."
                  value={formDetails}
                  onChange={e => setFormDetails(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                {formSubmitting ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Project Request</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* CLIENT PORTAL / INQUIRIES TAB (Admin & Transparency View) */}
        {activeTab === 'inquiries' && (
          <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Live Project Inquiries (Real-Time Storage)</h2>
                <p className="text-slate-400 text-xs mt-1">Inquiries submitted via Express API endpoint <code>/api/inquiries</code>.</p>
              </div>

              <button
                onClick={fetchInquiries}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 self-start"
              >
                <Activity className="w-4 h-4 text-indigo-400" />
                <span>Refresh Data</span>
              </button>
            </div>

            {loadingInquiries ? (
              <div className="glass-panel p-12 text-center text-slate-400 text-sm">Loading project inquiries from server...</div>
            ) : inquiries.length === 0 ? (
              <div className="glass-panel p-12 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
                <p className="text-slate-400 text-sm">No project inquiries submitted yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inquiries.map(inq => (
                  <div key={inq.id} className="glass-panel p-6 rounded-2xl space-y-4 border border-slate-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-indigo-300 rounded font-semibold">{inq.id}</span>
                        <h3 className="text-lg font-bold text-white mt-1">{inq.clientName}</h3>
                        <p className="text-xs text-slate-400">{inq.clientEmail}</p>
                      </div>

                      <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 rounded-full">
                        {inq.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="text-slate-300">
                        Service: <strong className="text-white">{inq.serviceTitle}</strong>
                      </div>
                      <div className="text-slate-400">
                        Budget: {inq.budgetRange} • Timeline: {inq.timeline}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-xl text-xs text-slate-300 border border-slate-800">
                      "{inq.projectDetails}"
                    </div>

                    <div className="text-[11px] text-slate-500">
                      Received: {new Date(inq.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="font-bold text-lg text-white">SolveSpace Technologies</span>
            </div>
            <p className="text-slate-400 text-xs max-w-md leading-relaxed">
              Full-service digital engineering startup specializing in Web Development, Android App Development, Cloud Architecture, and Promotional Video Reels.
            </p>
            <div className="text-xs font-mono text-indigo-400">Domain: solvespace.online</div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-white tracking-wider">Founders</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Aditya Gaikwad – Cloud Solution Provider</li>
              <li>Mayur Choudhary – Android Developer</li>
              <li>Manish Mali – Backend Developer</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-white tracking-wider">Tech Stack</h4>
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">React 18</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">Tailwind CSS</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">Node / Express</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">Docker</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">Nginx</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} SolveSpace Technologies. All rights reserved. Powered by Docker & EC2.
        </div>
      </footer>
    </div>
  );
}
