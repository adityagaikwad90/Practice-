import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
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
    { id: 'web-dev', label: 'Web Platform Development', desc: 'React & Next.js production web application' },
    { id: 'android-dev', label: 'Android Application', desc: 'Native Kotlin Jetpack Compose mobile app' },
    { id: 'cloud-solutions', label: 'Cloud & DevOps Infrastructure', desc: 'AWS EC2, Docker microservices & CI/CD' },
    { id: 'promo-videos', label: 'Promotional Video & Media', desc: '4K product teaser & motion animation' }
  ];

  const scaleOptions = [
    { id: 'small', label: 'Starter / MVP', desc: 'Core architecture and initial feature set' },
    { id: 'medium', label: 'Standard / Growth', desc: 'Full-featured build with database & API integrations' },
    { id: 'enterprise', label: 'Enterprise / Scale', desc: 'High-availability microservices with SLA' }
  ];

  const urgencyOptions = [
    { id: 'relaxed', label: 'Flexible Turnaround', desc: 'Standard development pace' },
    { id: 'standard', label: 'Priority Delivery', desc: 'Balanced sprint timeline' },
    { id: 'rush', label: 'Accelerated Rush', desc: 'Fast-track founder priority execution' }
  ];

  const handleApplyEstimate = () => {
    setFormService(selectedService);
    setFormBudget(getEstimatedPrice());
    setActiveTab('contact');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-16 page-transition">
      {/* Header */}
      <div className="space-y-4">
        <span className="eyebrow-minimal block">COST ESTIMATOR</span>
        <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-[#171717] font-heading">
          Project scope & investment estimator.
        </h1>
        <p className="text-sm text-[#777777] max-w-xl">
          Select your project parameters to calculate an indicative investment estimate. Actual scopes are refined during technical discovery.
        </p>
      </div>

      <div className="space-y-12 border-t border-[#E7E7E7] pt-10">
        {/* Step 1: Service */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#777777]">
            01 • Select Primary Discipline
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {serviceOptions.map((opt) => {
              const isSelected = selectedService === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedService(opt.id)}
                  className={`p-4 text-left rounded-md border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#171717] bg-[#F7F6F2]'
                      : 'border-[#E7E7E7] bg-white hover:border-[#B5B5B5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#171717]">{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#171717]" />}
                  </div>
                  <p className="text-xs text-[#777777] mt-1">{opt.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Scale */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#777777]">
            02 • Project Scope & Complexity
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {scaleOptions.map((opt) => {
              const isSelected = projectScale === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setProjectScale(opt.id)}
                  className={`p-4 text-left rounded-md border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#171717] bg-[#F7F6F2]'
                      : 'border-[#E7E7E7] bg-white hover:border-[#B5B5B5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#171717]">{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#171717]" />}
                  </div>
                  <p className="text-xs text-[#777777] mt-1">{opt.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Priority */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#777777]">
            03 • Delivery Speed
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {urgencyOptions.map((opt) => {
              const isSelected = timelineUrgency === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTimelineUrgency(opt.id)}
                  className={`p-4 text-left rounded-md border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#171717] bg-[#F7F6F2]'
                      : 'border-[#E7E7E7] bg-white hover:border-[#B5B5B5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#171717]">{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#171717]" />}
                  </div>
                  <p className="text-xs text-[#777777] mt-1">{opt.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Estimate Result Box */}
        <div className="border border-[#E7E7E7] bg-[#F7F6F2] rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#777777]">Indicative Investment</span>
            <div className="text-3xl sm:text-4xl font-normal text-[#171717] font-heading">
              {getEstimatedPrice()}
              <span className="text-xs font-mono text-[#777777] ml-2 font-normal">INR (Approx.)</span>
            </div>
            <p className="text-xs text-[#777777]">
              Final cost depends on architecture specifications, integrations, and milestones.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleApplyEstimate}
          >
            Request Project Proposal
          </Button>
        </div>
      </div>
    </div>
  );
}
