import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoMonogram from '../ui/LogoMonogram';

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'services', label: 'Services' },
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'careers', label: 'Careers' }
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-300 px-6 sm:px-10 ${
          scrolled
            ? 'bg-white/95 border-[#E7E7E7] py-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.03)]'
            : 'bg-white/80 border-[#E7E7E7] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: SolveSpace Signature Geometric S Monogram + Wordmark */}
          <div
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer select-none"
          >
            <LogoMonogram size={28} animated={true} />
          </div>

          {/* Right: Minimal Navigation Links + Contact Button */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-7 text-xs sm:text-sm font-normal">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveTab(link.id)}
                    className={`transition-colors duration-200 cursor-pointer py-1 relative ${
                      isActive
                        ? 'text-[#171717] font-medium'
                        : 'text-[#777777] hover:text-[#171717]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#171717]"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('contact')}
              className="btn-primary-mono px-4 py-2 text-xs sm:text-sm cursor-pointer"
            >
              Contact
            </motion.button>
          </div>

          {/* Mobile Menu Button with standalone S / hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#171717] hover:bg-[#F7F6F2] rounded cursor-pointer transition-colors active:scale-95"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown with smooth entrance */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden pt-4 pb-3 border-t border-[#E7E7E7] mt-3 space-y-2 text-sm overflow-hidden"
            >
              <button
                onClick={() => {
                  setActiveTab('home');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-[#777777] hover:text-[#171717] transition-colors"
              >
                Home
              </button>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 transition-colors ${
                    activeTab === link.id ? 'text-[#171717] font-medium' : 'text-[#777777] hover:text-[#171717]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full btn-primary-mono py-2.5 text-center text-xs"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

