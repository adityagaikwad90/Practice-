import React from 'react';
import { Globe, Smartphone, Cloud, Video, ArrowRight, CheckCircle2 } from 'lucide-react';
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
    { id: 'web-dev', label: 'Website Development', icon: Globe, desc: 'React / Next.js web application' },
    { id: 'android-dev', label: 'Android App Dev', icon: Smartphone, desc: 'Native Kotlin / Jetpack app' },
    { id: 'cloud-solutions', label: 'Cloud Solutions', icon: Cloud, desc: 'AWS / GCP & Docker DevOps' },
    { id: 'promo-videos', label: 'Promotional Video', icon: Video, desc: 'AI video reel & motion graphics' }
  ];

  const scaleOptions = [
    { id: 'small', label: 'Starter / MVP', desc: 'Core features, fast 1-2 week launch' },
    { id: 'medium', label: 'Growth / Standard', desc: 'Full custom design, backend & API integrations' },
    { id: 'enterprise', label: 'Enterprise / Scale', desc: 'High scale, containerized microservices & SLA' }
  ];

  const urgencyOptions = [
    { id: 'relaxed', label: 'Flexible Standard', desc: 'Normal turnaround' },
    { id: 'standard', label: 'Priority Delivery', desc: 'Balanced timeline' },
    { id: 'rush', label: 'Express Rush (+30%)', desc: 'Fast-track execution' }
  ];

  const handleApplyEstimate = () => {
    setFormService(selectedService);
    setFormBudget(getEstimatedPrice());
    setActiveTab('contact');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 animate-fade-up">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="indigo" dot>
          Transparent Pricing Engine
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">Estimate Your Project Budget</h2>
        <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
          Customize options below to calculate a instant, transparent cost estimation for your startup project.
        </p>
      </div>

      <Card padding="p-6 sm:p-8" className="space-y-8">
        {/* Step 1: Service Type */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 font-mono">
            1. Select Service Category
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {serviceOptions.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedService === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedService(item.id)}
                  className={`step-card ${isSelected ? 'active' : ''} flex flex-col justify-between p-4 text-left rounded-2xl transition-all duration-200`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`} />
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
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
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 font-mono">
            2. Scope & Complexity Scale
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {scaleOptions.map((scale) => {
              const isSelected = projectScale === scale.id;
              return (
                <button
                  key={scale.id}
                  type="button"
                  onClick={() => setProjectScale(scale.id)}
                  className={`step-card ${isSelected ? 'active' : ''} text-left p-4 rounded-2xl space-y-1 transition-all duration-200`}
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
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 font-mono">
            3. Delivery Speed Priority
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {urgencyOptions.map((time) => {
              const isSelected = timelineUrgency === time.id;
              return (
                <button
                  key={time.id}
                  type="button"
                  onClick={() => setTimelineUrgency(time.id)}
                  className={`step-card ${isSelected ? 'active' : ''} text-left p-4 rounded-2xl transition-all duration-200`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 font-heading">{time.label}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{time.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Result Calculation Output Card */}
        <div className="p-6 bg-gradient-to-r from-indigo-50 via-slate-50 to-blue-50 border border-indigo-200 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-6 shadow-sm">
          <div>
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-mono font-semibold">
              Estimated Investment
            </span>
            <div className="text-4xl font-extrabold text-slate-900 mt-1 tracking-tight font-heading">
              {getEstimatedPrice()}
            </div>
            <p className="text-xs text-slate-600 mt-1 font-normal">
              Includes full source code delivery, deployment configuration & 30 days post-launch support.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            onClick={handleApplyEstimate}
            className="w-full sm:w-auto shrink-0"
          >
            Apply & Quote Request
          </Button>
        </div>
      </Card>
    </div>
  );
}
