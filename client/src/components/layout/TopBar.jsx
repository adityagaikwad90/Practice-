import React, { useState } from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export default function TopBar({ setActiveTab }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative z-30 bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white text-xs py-2 px-4 border-b border-indigo-700/50 font-sans shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500/30 text-indigo-200 shrink-0">
            <Sparkles className="w-3 h-3 text-indigo-300" />
          </span>
          <span className="font-medium text-[11px] sm:text-xs tracking-wide">
            <strong className="font-semibold text-white">SolveSpace 2.0:</strong> Now deploying production React, Kotlin Android & AWS Cloud stacks with guaranteed delivery.
          </span>
          <button
            type="button"
            onClick={() => setActiveTab && setActiveTab('estimator')}
            className="hidden md:inline-flex items-center gap-1 font-semibold text-indigo-200 hover:text-white underline underline-offset-2 ml-1 transition-colors"
          >
            <span>Estimate project cost</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-indigo-300 hover:text-white p-1 rounded-md transition-colors hidden sm:block"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
