import React, { useEffect } from 'react';
import { X, ArrowRight, Zap, Sparkles } from 'lucide-react';
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
        className="fixed inset-0 bg-[#080610]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Menu */}
      <div className="relative ml-auto w-full max-w-xs h-full bg-[#100B20] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-10 animate-fade-up">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7027D9] to-[#3568FF] flex items-center justify-center shadow-md shadow-[#7027D9]/40">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-bold text-sm text-white tracking-tight font-heading block">SolveSpace</span>
                <span className="text-[10px] text-[#A7A1B5] font-mono">Technologies</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#A7A1B5] hover:text-white hover:bg-white/10 transition-colors"
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
                      ? 'bg-[#7027D9]/30 text-white border border-[#8B5CF6]/50 shadow-sm shadow-[#8B5CF6]/20'
                      : 'text-[#A7A1B5] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#8B5CF6]' : 'text-[#A7A1B5]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom CTA */}
        <div className="pt-6 border-t border-white/10 space-y-3">
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
            Contact Us
          </Button>

          <p className="text-[11px] text-center text-[#A7A1B5] font-mono">
            solvespace.online
          </p>
        </div>
      </div>
    </div>
  );
}
