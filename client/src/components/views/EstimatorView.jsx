import React from 'react';
import { Globe, Smartphone, Cloud, Video, ArrowRight, CheckCircle2, ShieldCheck, Code, Zap, Clock } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function EstimatorView({
  selectedService,
  setSelectedService,
  projectScale,
  setProjectScale,
  timelineUrgency,
  setTimelineUrgency,
  getEstimatedPrice,
  setFormService,
  setFormBudget,
  setActiveTab
}) {
  const serviceOptions = [
    { id: 'web-dev', label: 'Website Development', icon: Globe, desc: 'React & Next.js production web app', base: '$499' },
    { id: 'android-dev', label: 'Android App Dev', icon: Smartphone, desc: 'Native Kotlin Jetpack Compose app', base: '$799' },
    { id: 'cloud-solutions', label: 'Cloud Solutions', icon: Cloud, desc: 'AWS / GCP & Docker DevOps setup', base: '$599' },
    { id: 'promo-videos', label: 'Promotional Video', icon: Video, desc: 'AI 4K video reel & motion graphics', base: '$349' }
  ];

  const scaleOptions = [
    { id: 'small', label: 'Starter / MVP', desc: 'Core features, fast 1-2 week launch', multiplier: '1.0x' },
    { id: 'medium', label: 'Growth / Standard', desc: 'Custom design, backend & API integrations', multiplier: '1.8x' },
    { id: 'enterprise', label: 'Enterprise / Scale', desc: 'Containerized microservices & SLA support', multiplier: '3.2x' }
  ];

  const urgencyOptions = [
    { id: 'relaxed', label: 'Flexible Turnaround', desc: 'Standard development pace (Save 10%)' },
    { id: 'standard', label: 'Priority Delivery', desc: 'Balanced standard startup timeline' },
    { id: 'rush', label: 'Express Rush (+30%)', desc: 'Fast-track founder priority execution' }
  ];

  const handleApplyEstimate = () => {
    setFormService(selectedService);
    setFormBudget(getEstimatedPrice());
    setActiveTab('contact');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10 animate-fade-up">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="indigo" dot>
          Transparent Startup Pricing Engine
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
          Instant Project Budget Estimator
        </h2>
        <p className="text-slate-600 text-xs sm:text-base max-w-lg mx-auto">
          No hidden fees or surprise billings. Calculate an instant, transparent quote for your custom startup project.
        </p>
      </div>

      <Card padding="p-6 sm:p-10" className="space-y-10 border border-slate-200/90 shadow-lg">
        {/* Step 1: Service Type */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</span>
              <span>Select Core Service Category</span>
            </label>
            <span className="text-[11px] font-mono text-indigo-600 font-semibold">Required</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {serviceOptions.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedService === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedService(item.id)}
                  className={`step-card ${isSelected ? 'active ring-2 ring-indigo-600 bg-indigo-50/50' : ''} flex flex-col justify-between p-4 text-left rounded-2xl transition-all duration-200 hover:border-slate-300`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400 font-semibold">{item.base}</span>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 mb-0.5 font-heading">{item.label}</div>
                    <div className="text-[11px] text-slate-500 leading-tight">{item.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Project Complexity */}
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">2</span>
            <span>Project Scope & Complexity Scale</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {scaleOptions.map((scale) => {
              const isSelected = projectScale === scale.id;
              return (
                <button
                  key={scale.id}
                  type="button"
                  onClick={() => setProjectScale(scale.id)}
                  className={`step-card ${isSelected ? 'active ring-2 ring-indigo-600 bg-indigo-50/50' : ''} text-left p-4 rounded-2xl space-y-1.5 transition-all duration-200`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 font-heading">{scale.label}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">{scale.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Timeline */}
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">3</span>
            <span>Delivery Speed Priority</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {urgencyOptions.map((time) => {
              const isSelected = timelineUrgency === time.id;
              return (
                <button
                  key={time.id}
                  type="button"
                  onClick={() => setTimelineUrgency(time.id)}
                  className={`step-card ${isSelected ? 'active ring-2 ring-indigo-600 bg-indigo-50/50' : ''} text-left p-4 rounded-2xl transition-all duration-200`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 font-heading">{time.label}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{time.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Deliverables Inclusions Bar */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-600">
          <div className="flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5 text-indigo-600" />
            <span>Full Git Repo & Source</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Dockerized Deployment</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>30-Day Post-Launch SLA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>Direct Founder Oversight</span>
          </div>
        </div>

        {/* Result Calculation Output Card */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl border border-indigo-800/40">
          <div>
            <span className="text-[11px] text-indigo-300 uppercase tracking-widest font-mono font-semibold">
              Estimated Total Investment
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold text-white mt-1 tracking-tight font-heading">
              {getEstimatedPrice()}
            </div>
            <p className="text-xs text-indigo-200/80 mt-1.5 font-normal max-w-md leading-relaxed">
              Includes complete solution delivery, CI/CD automated setup, responsive UI, testing, and 30 days of direct founder support.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            onClick={handleApplyEstimate}
            className="w-full sm:w-auto shrink-0 bg-white text-indigo-950 hover:bg-indigo-50 font-bold shadow-md shadow-white/10"
          >
            Lock in Estimate & Request Quote
          </Button>
        </div>
      </Card>
    </div>
  );
}
