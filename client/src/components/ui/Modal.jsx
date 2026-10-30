import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-2xl'
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Subtle Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className={`relative w-full ${maxWidth} bg-white rounded-lg border border-[#E7E7E7] p-6 sm:p-8 shadow-xl z-10 space-y-6 text-[#171717]`}>
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            {title && <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[#171717] font-heading">{title}</h3>}
            {subtitle && <p className="text-xs text-[#777777] mt-1">{subtitle}</p>}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-[#777777] hover:text-[#171717] hover:bg-[#F7F6F2] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}
