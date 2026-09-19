import React from 'react';
import { Globe, Smartphone, Cloud, Video, Layers, Check, ArrowRight, Calculator } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function ServicesView({ services, setFormService, setActiveTab }) {
  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-7 h-7 text-indigo-600" />;
      case 'Smartphone': return <Smartphone className="w-7 h-7 text-emerald-600" />;
      case 'Cloud': return <Cloud className="w-7 h-7 text-sky-600" />;
      case 'Video': return <Video className="w-7 h-7 text-purple-600" />;
      default: return <Layers className="w-7 h-7 text-indigo-600" />;
    }
  };

  const getServiceBadgeVariant = (iconName) => {
    switch (iconName) {
      case 'Globe': return 'indigo';
      case 'Smartphone': return 'emerald';
      case 'Cloud': return 'sky';
      case 'Video': return 'purple';
      default: return 'neutral';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 animate-fade-up">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="indigo" dot>Engineering Services</Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
          Comprehensive Tech Services
        </h2>
        <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
          From fullstack web applications to automated AWS cloud architectures and high-impact media reels, built to accelerate startup growth.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => {
          const badgeVariant = getServiceBadgeVariant(service.icon);
          return (
            <Card
              key={service.id}
              hover
              padding="p-8"
              className="flex flex-col justify-between space-y-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="p-3.5 bg-indigo-50/80 rounded-2xl border border-indigo-100 shadow-xs">
                    {getServiceIcon(service.icon)}
                  </div>
                  <Badge variant={badgeVariant} size="md">
                    Starting at ${service.pricingStarting}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight font-heading">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {service.fullDesc}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[11px] font-bold uppercase text-slate-500 tracking-wider font-mono">
                    What We Deliver:
                  </h4>
                  <ul className="space-y-2.5">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-500 font-mono">
                  Est. Delivery: <strong className="text-slate-900 font-bold">{service.estTimeline}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={ArrowRight}
                    iconPosition="right"
                    onClick={() => {
                      setFormService(service.id);
                      setActiveTab('contact');
                    }}
                  >
                    Request Service
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
