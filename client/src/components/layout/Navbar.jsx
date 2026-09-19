import React, { useState } from 'react';
import { Sparkles, Layers, Calculator, Users, Send, MessageSquare, Zap, ArrowRight, Menu } from 'lucide-react';
import Button from '../ui/Button';
import MobileNav from './MobileNav';

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Overview', icon: Sparkles },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'estimator', label: 'Cost Estimator', icon: Calculator },
    { id: 'team', label: 'Founders', icon: Users },
    { id: 'inquiries', label: 'Client Portal', icon: MessageSquare }
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-6 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Mark */}
          <div
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center shadow-sm shadow-indigo-500/25 transition-transform duration-200 group-hover:scale-105">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 font-heading">
                  SolveSpace
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full font-bold">
                  STUDIO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-wide">solvespace.online</p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/90 border border-slate-200/90 p-1.5 rounded-full shadow-xs" role="tablist">
            {navItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/60 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop CTA Header Action */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => setActiveTab('contact')}
              className="shadow-sm shadow-indigo-500/20"
            >
              Start Project
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="md:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5 text-indigo-600" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navItems={[
          ...navItems,
          { id: 'contact', label: 'Start Project', icon: Send }
        ]}
      />
    </>
  );
}
