import React from 'react';

/**
 * SolveSpace Geometric 'S' Monogram & Wordmark
 * Features sequential multi-segment SVG stroke reveal (800-1100ms),
 * subtle hover micro-interaction, and standalone icon mode.
 */
export default function LogoMonogram({
  size = 28,
  showWordmark = true,
  animated = true,
  className = '',
  wordmarkClassName = '',
  standalone = false
}) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 select-none group cursor-pointer ${className}`}
      aria-label="SolveSpace Technologies"
    >
      {/* Geometric 'S' Monogram Icon */}
      <div className="relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#171717] transition-colors duration-200"
        >
          {/* Segment 1: Upper horizontal bar & upper curve */}
          <path
            d="M24 8.5H11.5C9 8.5 7 10.5 7 13"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={animated ? 'logo-seg-1' : ''}
          />

          {/* Segment 2: Central diagonal connector & transition */}
          <path
            d="M7 13C7 15 8.5 16 11 16H21C23.5 16 25 17 25 19"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={animated ? 'logo-seg-2' : ''}
          />

          {/* Segment 3: Lower curve & bottom horizontal bar */}
          <path
            d="M25 19C25 21.5 23 23.5 20.5 23.5H8"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={animated ? 'logo-seg-3' : ''}
          />

          {/* Subtle architectural accent node */}
          <circle
            cx="24"
            cy="8.5"
            r="1.2"
            fill="currentColor"
            className={animated ? 'logo-seg-node' : ''}
          />
        </svg>
      </div>

      {/* SolveSpace Wordmark */}
      {showWordmark && !standalone && (
        <span
          className={`text-base sm:text-lg font-medium tracking-tight text-[#171717] font-heading ${
            animated ? 'logo-wordmark' : ''
          } ${wordmarkClassName}`}
        >
          SolveSpace
        </span>
      )}
    </div>
  );
}

