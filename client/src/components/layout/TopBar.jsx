import React from 'react';
import { Server, ShieldCheck } from 'lucide-react';
import Badge from '../ui/Badge';

export default function TopBar({ serverHealth }) {
  const isOnline = serverHealth?.status === 'online';

  return (
    <header className="relative z-20 bg-slate-100/80 border-b border-slate-200/80 px-4 sm:px-6 py-2 text-xs backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 text-slate-600">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-soft-pulse" />
          <span className="tracking-wide font-medium text-[11px] sm:text-xs">
            SolveSpace Technologies <span className="hidden sm:inline">• Startup Digital Engineering Platform</span>
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <Server className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-slate-600 hidden md:inline">API Server Node:</span>
            <Badge variant={isOnline ? 'emerald' : 'rose'} dot size="sm">
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </Badge>
          </div>

          {serverHealth?.uptime && (
            <div className="hidden lg:flex items-center gap-1 text-slate-500 text-[11px] font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Uptime: {serverHealth.uptime}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
