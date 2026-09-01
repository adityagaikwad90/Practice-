import React from 'react';
import { Zap } from 'lucide-react';
import Badge from '../ui/Badge';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 px-4 sm:px-6 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab && setActiveTab('home')}>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-sm shadow-sm">
              <Zap className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="font-bold text-base text-slate-900 tracking-tight font-heading">SolveSpace Technologies</span>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed">
            Full-service digital engineering startup specializing in Web Development, Android App Development, Cloud Architecture, and Promotional Media.
          </p>
          <div className="text-xs font-mono text-indigo-700 flex items-center gap-2">
            <span>Domain:</span>
            <Badge variant="indigo" size="sm">solvespace.online</Badge>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase text-slate-900 tracking-wider font-mono">Founders & Leadership</h4>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              <span>Aditya Gaikwad – Cloud Solution Provider</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Mayur Choudhary – Android Developer</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
              <span>Manish Mali – Backend Developer</span>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase text-slate-900 tracking-wider font-mono">Tech Architecture</h4>
          <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
            <Badge variant="neutral">React 18</Badge>
            <Badge variant="neutral">Tailwind CSS v4</Badge>
            <Badge variant="neutral">Node / Express</Badge>
            <Badge variant="neutral">Docker</Badge>
            <Badge variant="neutral">Nginx EC2</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <div>© {new Date().getFullYear()} SolveSpace Technologies. All rights reserved.</div>
        <div className="font-mono text-[11px]">Deploy Status: Operational • AWS EC2 Node</div>
      </div>
    </footer>
  );
}
