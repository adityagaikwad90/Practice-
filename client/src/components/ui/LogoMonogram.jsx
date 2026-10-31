import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * SolveSpace Signature Geometric 'S' Monogram & Wordmark
 * Built with Framer Motion SVG path animations:
 * 1. Individual geometric segment stroke reveal
 * 2. Precision segment connection
 * 3. Final consolidation into the solid brand mark
 * 4. Staggered SolveSpace wordmark entrance
 * 5. Organic spring-based hover micro-interactions
 */
export default function LogoMonogram({
  size = 28,
  showWordmark = true,
  animated = true,
  className = '',
  wordmarkClassName = '',
  standalone = false
}) {
  const shouldReduceMotion = useReducedMotion();

  const segmentVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (custom) => ({
      pathLength: 1,
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            pathLength: { delay: custom.delay, duration: 0.42, ease: [0.16, 1, 0.3, 1] },
            opacity: { delay: custom.delay, duration: 0.2 }
          }
    })
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { delay: 0.85, duration: 0.3, type: 'spring', stiffness: 400, damping: 25 }
    }
  };

  const wordmarkVariants = {
    hidden: { opacity: 0, x: -6 },
    visible: {
      opacity: 1,
      x: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { delay: 0.72, duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      className={`inline-flex items-center gap-2.5 select-none cursor-pointer group ${className}`}
      aria-label="SolveSpace Technologies"
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Geometric 'S' Monogram Icon */}
      <div className="relative flex items-center justify-center shrink-0">
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#171717]"
          initial={animated && !shouldReduceMotion ? 'hidden' : 'visible'}
          animate="visible"
        >
          {/* Segment 1: Upper horizontal bar & corner radius */}
          <motion.path
            d="M24 8.5H11.5C9 8.5 7 10.5 7 13"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={segmentVariants}
            custom={{ delay: 0.05 }}
          />

          {/* Segment 2: Central diagonal connector & transition */}
          <motion.path
            d="M7 13C7 15 8.5 16 11 16H21C23.5 16 25 17 25 19"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={segmentVariants}
            custom={{ delay: 0.32 }}
          />

          {/* Segment 3: Lower curve & bottom base bar */}
          <motion.path
            d="M25 19C25 21.5 23 23.5 20.5 23.5H8"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={segmentVariants}
            custom={{ delay: 0.58 }}
          />

          {/* Architectural engineering node */}
          <motion.circle
            cx="24"
            cy="8.5"
            r="1.2"
            fill="currentColor"
            variants={nodeVariants}
          />
        </motion.svg>
      </div>

      {/* SolveSpace Wordmark */}
      {showWordmark && !standalone && (
        <motion.span
          className={`text-base sm:text-lg font-medium tracking-tight text-[#171717] font-heading ${wordmarkClassName}`}
          initial={animated && !shouldReduceMotion ? 'hidden' : 'visible'}
          animate="visible"
          variants={wordmarkVariants}
        >
          SolveSpace
        </motion.span>
      )}
    </motion.div>
  );
}
