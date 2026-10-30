import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import LogoMonogram from '../ui/LogoMonogram';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="border-t border-[#E7E7E7] bg-white text-[#777777] pt-16 pb-12 px-6 sm:px-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div
              onClick={() => {
                setActiveTab && setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer inline-block"
            >
              <LogoMonogram size={24} animated={false} />
            </div>
            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
              Digital engineering studio building production cloud, web, and mobile systems for ambitious businesses.
            </p>
            <div className="text-xs font-mono">
              <a
                href="mailto:aditya@solvespace.online"
                className="text-[#171717] hover:underline"
              >
                aditya@solvespace.online
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <span className="eyebrow-minimal block">NAVIGATION</span>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('services')}
                  className="hover:text-[#171717] transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('work')}
                  className="hover:text-[#171717] transition-colors cursor-pointer"
                >
                  Work
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('about')}
                  className="hover:text-[#171717] transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('careers')}
                  className="hover:text-[#171717] transition-colors cursor-pointer"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('estimator')}
                  className="hover:text-[#171717] transition-colors cursor-pointer"
                >
                  Cost Estimator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('contact')}
                  className="hover:text-[#171717] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <span className="eyebrow-minimal block">SERVICES</span>
            <ul className="space-y-2 text-xs sm:text-sm text-[#777777]">
              <li>Cloud Infrastructure & DevOps</li>
              <li>Web Platform Development</li>
              <li>Android Application Engineering</li>
              <li>Backend Systems & APIs</li>
            </ul>
          </div>

          {/* Secondary Links & Portal */}
          <div className="space-y-3">
            <span className="eyebrow-minimal block">CONNECT & ACCESS</span>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveTab('inquiries')}
                  className="hover:text-[#171717] transition-colors cursor-pointer text-[#171717] font-medium"
                >
                  Client Portal
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/adityagaikwad90"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#171717] transition-colors inline-flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://solvespace.online"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#171717] transition-colors inline-flex items-center gap-1"
                >
                  <span>solvespace.online</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E7E7E7] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#777777]">
          <div>
            © {new Date().getFullYear()} SolveSpace Technologies. All rights reserved.
          </div>
          <div className="font-mono text-[11px]">
            Pune, India • Digital Engineering Studio
          </div>
        </div>
      </div>
    </footer>
  );
}
