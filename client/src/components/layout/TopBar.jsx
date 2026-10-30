import React, { useState } from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export default function TopBar({ setActiveTab }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative z-30 bg-gradient-to-r from-[#100B20] via-[#171027] to-[#100B20] text-white text-xs py-2 px-4 border-b border-white/10 font-sans shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#7027D9]/30 text-[#C4B5FD] shrink-0 border border-[#8B5CF6]/30">
            <Sparkles className="w-3 h-3 text-[#C4B5FD]" />
          </span>
          <span className="font-medium text-[11px] sm:text-xs tracking-wide text-[#A7A1B5]">
            <strong className="font-semibold text-white">SolveSpace 2.0:</strong> Next-generation digital engineering for high-growth startups.
          </span>
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab('estimator')}
            className="hidden md:inline-flex items-center gap-1 font-semibold text-[#8B5CF6] hover:text-[#C4B5FD] underline underline-offset-2 ml-1 transition-colors cursor-pointer"
          >
            <span>Calculate project cost</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-[#A7A1B5] hover:text-white p-1 rounded-md transition-colors hidden sm:block cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
