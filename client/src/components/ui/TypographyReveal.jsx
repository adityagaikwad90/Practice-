import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * Editorial Headline Line-by-Line Clipping Reveal
 * Masks each line of typography with overflow-hidden and executes
 * a silky upward entrance without layout displacement.
 */
export default function TypographyReveal({
  lines = [],
  as: Component = 'h1',
  className = '',
  delay = 0.1,
  stagger = 0.14
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-5% 0px' });
  const shouldReduceMotion = useReducedMotion();

  const lineVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: (idx) => ({
      y: '0%',
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 0.82,
            delay: delay + idx * stagger,
            ease: [0.16, 1, 0.3, 1]
          }
    })
  };

  return (
    <Component ref={containerRef} className={className}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden py-0.5">
          <motion.span
            className="block"
            custom={idx}
            initial="hidden"
            animate={isInView || shouldReduceMotion ? 'visible' : 'hidden'}
            variants={lineVariants}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

