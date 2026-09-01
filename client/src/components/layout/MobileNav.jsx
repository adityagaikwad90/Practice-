import React, { useEffect } from 'react';
import { X, ArrowRight, Zap } from 'lucide-react';
import Button from '../ui/Button';

export default function MobileNav({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  navItems
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex flex-col">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Menu */}
      <div className="relative ml-auto w-full max-w-xs h-full bg-white border-l border-slate-200 p-6 flex flex-col justify-between shadow-2xl z-10 animate-fade-up">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                <Zap className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="font-bold text-sm text-slate-900 tracking-tight font-heading">SOLVESPACE</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5" role="tablist" aria-label="Mobile Navigation Tabs">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom CTA */}
        <div className="pt-6 border-t border-slate-100 space-y-3">
          <Button
            variant="primary"
            size="md"
            icon={ArrowRight}
            iconPosition="right"
            className="w-full"
            onClick={() => {
              setActiveTab('contact');
              onClose();
            }}
          >
            Request Quote
          </Button>

          <p className="text-[11px] text-center text-slate-500 font-mono">
            solvespace.online
          </p>
        </div>
      </div>
    </div>
  );
}
