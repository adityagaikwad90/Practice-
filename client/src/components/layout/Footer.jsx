import React from 'react';
import { Zap, Server, ShieldCheck, ArrowUpRight, Cpu, Activity } from 'lucide-react';
import Badge from '../ui/Badge';

export default function Footer({ setActiveTab, serverHealth }) {
  const isOnline = serverHealth?.status === 'online';

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 px-4 sm:px-6 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div
              className="flex items-center gap-3 cursor-pointer group w-fit"
              onClick={() => setActiveTab && setActiveTab('home')}
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md transition-transform group-hover:scale-105">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight font-heading">
                SolveSpace Technologies
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              Full-service digital engineering startup specializing in Web Development, Android Apps, AWS Cloud Architecture, and Promotional Media.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-400 font-mono">
              <span>Domain:</span>
              <a
                href="https://solvespace.online"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 font-semibold"
              >
                solvespace.online
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase text-white tracking-wider font-mono">Platform</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('home')}
                  className="hover:text-white transition-colors"
                >
                  Overview & Hero
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('services')}
                  className="hover:text-white transition-colors"
                >
                  4 Core Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('estimator')}
                  className="hover:text-white transition-colors"
                >
                  Cost Estimator Engine
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('inquiries')}
                  className="hover:text-white transition-colors"
                >
                  Client Portal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('contact')}
                  className="hover:text-white transition-colors"
                >
                  Schedule Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Founders & Leadership */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase text-white tracking-wider font-mono">Founders</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span className="hover:text-slate-200 transition-colors">Aditya Gaikwad – Cloud Lead</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="hover:text-slate-200 transition-colors">Mayur Choudhary – Android Lead</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="hover:text-slate-200 transition-colors">Manish Mali – Backend Lead</span>
              </li>
            </ul>
          </div>

          {/* Tech Architecture Stack */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase text-white tracking-wider font-mono">Infrastructure</h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono">AWS EC2</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono">Docker</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono">React 18</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono">Express</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono">Nginx</span>
            </div>
          </div>
        </div>

        {/* SERVER ACTIVE STATUS - Dedicated Bottom Small Section */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white font-heading">Backend Node Status:</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
                  {isOnline ? 'SERVER ACTIVE' : 'CONNECTING...'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Production API microservices connected to solvespace.online cluster
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
            {serverHealth?.uptime && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800/80">
                <Activity className="w-3.5 h-3.5 text-indigo-400" />
                <span>Uptime: <strong className="text-white">{serverHealth.uptime}</strong></span>
              </div>
            )}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800/80">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>SLA: <strong className="text-white">99.98%</strong></span>
            </div>
            <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800/80">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>Host: <strong className="text-white">EC2 Linux</strong></span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} SolveSpace Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Founder-Led Engineering</span>
            <span>•</span>
            <span className="text-indigo-400">Production Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
