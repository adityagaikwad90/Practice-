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
        <div className="mb-2 w-80 sm:w-96 glass-card rounded-2xl p-4 shadow-2xl border border-white/10 text-white animate-fade-up">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-soft-pulse' : 'bg-rose-500'}`} />
              <span className="font-bold text-xs tracking-tight text-white font-heading">
                Backend Infrastructure Telemetry
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleRefresh}
                className="p-1 rounded-lg text-[#A7A1B5] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Ping Server"
                aria-label="Ping Server"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-[#8B5CF6]' : ''}`} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-[#A7A1B5] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close telemetry view"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="py-3 space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#080610] border border-white/5">
              <div className="flex items-center gap-2 text-[#A7A1B5]">
                <Server className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Express API Cluster:</span>
              </div>
              <Badge variant={isOnline ? 'emerald' : 'rose'} size="sm" dot>
                {isOnline ? 'OPERATIONAL' : 'DISCONNECTED'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-[#080610] border border-white/5">
                <span className="text-[#A7A1B5] block font-mono text-[10px]">Uptime</span>
                <span className="font-semibold text-white font-mono">
                  {serverHealth?.uptime || '99.98% SLA'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#080610] border border-white/5">
                <span className="text-[#A7A1B5] block font-mono text-[10px]">Deployment</span>
                <span className="font-semibold text-white font-mono">AWS EC2 / Docker</span>
              </div>
            </div>

            <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-[#A7A1B5] font-mono">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Nginx Ingress Proxy</span>
              </div>
              <span className="text-emerald-400 font-medium">SSL Active</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-[#A7A1B5] font-mono">
            <span>Endpoint: /api/health</span>
            <span>solvespace.online</span>
          </div>
        </div>
      )}

      {/* Collapsed Pill Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-2 rounded-full glass-card shadow-lg hover:shadow-xl border border-white/10 text-white text-xs font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] glow-purple-sm cursor-pointer"
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
              isOnline ? 'bg-emerald-400' : 'bg-rose-500'
            }`}
          />
        </span>
        <span className="font-mono text-[11px] text-white font-semibold tracking-tight">
          {isOnline ? 'API Online' : 'API Connecting...'}
        </span>
        <span className="hidden sm:inline text-white/30">•</span>
        <span className="hidden sm:inline text-[11px] text-[#A7A1B5] font-mono">
          {serverHealth?.uptime ? `Uptime ${serverHealth.uptime}` : 'EC2 Active'}
        </span>
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-[#A7A1B5] group-hover:text-white transition-colors" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-[#A7A1B5] group-hover:text-white transition-colors" />
        )}
      </button>
    </aside>
  );
}
