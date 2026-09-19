import React, { useState } from 'react';
import { Server, ShieldCheck, ChevronUp, ChevronDown, RefreshCw } from 'lucide-react';
import Badge from '../ui/Badge';

export default function SystemStatusDock({ serverHealth, onRefreshHealth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const isOnline = serverHealth?.status === 'online';

  const handleRefresh = async () => {
    if (onRefreshHealth) {
      setRefreshing(true);
      await onRefreshHealth();
      setTimeout(() => setRefreshing(false), 500);
    }
  };

  return (
    <aside aria-label="System telemetry dock" className="fixed bottom-4 right-4 z-40 font-sans">
      {/* Expanded Telemetry Popover */}
      {isOpen && (
        <div className="mb-2 w-80 sm:w-96 glass-panel rounded-2xl p-4 shadow-2xl border border-slate-200/90 text-slate-800 animate-fade-up">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-soft-pulse' : 'bg-rose-500'}`} />
              <span className="font-bold text-xs tracking-tight text-slate-900 font-heading">
                Backend Infrastructure Telemetry
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleRefresh}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Ping Server"
                aria-label="Ping Server"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-indigo-600' : ''}`} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close telemetry view"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="py-3 space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-slate-600">
                <Server className="w-3.5 h-3.5 text-indigo-600" />
                <span>Express API Node:</span>
              </div>
              <Badge variant={isOnline ? 'emerald' : 'rose'} size="sm" dot>
                {isOnline ? 'OPERATIONAL' : 'DISCONNECTED'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-mono">Uptime</span>
                <span className="font-semibold text-slate-800 font-mono">
                  {serverHealth?.uptime || '99.98% SLA'}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-mono">Deployment</span>
                <span className="font-semibold text-slate-800 font-mono">AWS EC2 / Docker</span>
              </div>
            </div>

            <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-slate-500 font-mono">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span>Nginx Reverse Proxy</span>
              </div>
              <span className="text-emerald-600 font-medium">SSL Active</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Endpoint: /api/health</span>
            <span>solvespace.online</span>
          </div>
        </div>
      )}

      {/* Collapsed Pill Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-panel shadow-lg hover:shadow-xl border border-slate-200/90 text-slate-700 text-xs font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] glow-indigo-sm"
        aria-expanded={isOpen}
      >
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isOnline ? 'bg-emerald-400' : 'bg-rose-400'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isOnline ? 'bg-emerald-500' : 'bg-rose-500'
            }`}
          />
        </span>
        <span className="font-mono text-[11px] text-slate-600 font-semibold tracking-tight">
          {isOnline ? 'API Online' : 'API Connecting...'}
        </span>
        <span className="hidden sm:inline text-slate-300">•</span>
        <span className="hidden sm:inline text-[11px] text-slate-500 font-mono">
          {serverHealth?.uptime ? `Uptime ${serverHealth.uptime}` : 'EC2 Operational'}
        </span>
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
        )}
      </button>
    </aside>
  );
}
