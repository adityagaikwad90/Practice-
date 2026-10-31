import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, Cpu, Layers, CheckCircle2 } from 'lucide-react';

const STAGES = [
  {
    id: 'idea',
    step: '01',
    label: 'IDEA',
    title: 'A singular technical hypothesis.',
    description: 'Every breakthrough digital product begins as a single coordinate of inquiry. We deconstruct product hypotheses down to first engineering principles.',
    tag: 'ORIGIN POINT',
    coords: 'POINT(0, 0, 0)'
  },
  {
    id: 'architecture',
    step: '02',
    label: 'ARCHITECTURE',
    title: 'Topological systems blueprint.',
    description: 'The point expands into interconnected nodes. We author system diagrams, cloud boundaries, database schemas, and API contracts before authoring code.',
    tag: 'TOPOLOGY MAPPED',
    coords: '8 NODES • 12 EDGES'
  },
  {
    id: 'engineering',
    step: '03',
    label: 'ENGINEERING',
    title: 'Production-grade structural assembly.',
    description: 'Abstract schemas crystallize into typed, tested software. Containerized microservices, native Kotlin Jetpack Compose interfaces, and zero-downtime CI/CD pipelines.',
    tag: 'COMPILED & TESTED',
    coords: 'ISOMETRIC CHASSIS'
  },
  {
    id: 'product',
    step: '04',
    label: 'PRODUCT',
    title: 'Shipped to production.',
    description: 'The wireframe resolves into a resilient, high-speed digital product operating live on AWS, Google Cloud, Google Play, and enterprise browsers.',
    tag: 'PRODUCTION READY',
    coords: 'ONLINE 99.98% SLA'
  }
];

export default function IdeaToProductMotion({ onSelectStage }) {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: '-10% 0px -10% 0px' });
  const shouldReduceMotion = useReducedMotion();

  const currentStage = STAGES[activeStageIndex];

  // Auto-progress stages when in view if user hasn't manually interacted for a bit
  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % STAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isInView, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className="border border-[#E7E7E7] bg-white rounded-xl overflow-hidden p-6 sm:p-10 transition-all duration-300"
    >
      {/* Top Header & Stage Stepper */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E7E7E7] pb-8">
        <div>
          <span className="eyebrow-minimal block mb-1">TRANSFORMATION PIPELINE</span>
          <h3 className="text-xl sm:text-2xl font-normal text-[#171717] font-heading">
            Idea to Production.
          </h3>
        </div>

        {/* Stage Navigation Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F7F6F2] border border-[#E7E7E7] rounded-lg">
          {STAGES.map((stage, idx) => {
            const isCurrent = activeStageIndex === idx;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStageIndex(idx)}
                className={`relative px-3 sm:px-4 py-1.5 text-xs font-mono rounded-md transition-all duration-200 cursor-pointer ${
                  isCurrent ? 'text-white' : 'text-[#777777] hover:text-[#171717]'
                }`}
              >
                {isCurrent && (
                  <motion.div
                    layoutId="activeStagePill"
                    className="absolute inset-0 bg-[#171717] rounded-md"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="text-[10px] opacity-70">0{idx + 1}</span>
                  <span>{stage.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8">
        {/* Left Column: Stage Editorial Description */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[11px] font-mono bg-[#F7F6F2] border border-[#E7E7E7] text-[#171717] rounded">
                  STAGE {currentStage.step}
                </span>
                <span className="text-xs font-mono text-[#777777]">
                  {currentStage.tag}
                </span>
              </div>

              <h4 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#171717] font-heading leading-snug">
                {currentStage.title}
              </h4>

              <p className="text-sm sm:text-base text-[#777777] leading-relaxed">
                {currentStage.description}
              </p>

              <div className="pt-2">
                <div className="text-xs font-mono text-[#777777] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#171717] animate-pulse" />
                  <span>Telemetry: {currentStage.coords}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Step progression buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setActiveStageIndex((prev) => (prev > 0 ? prev - 1 : STAGES.length - 1))}
              className="px-3 py-1.5 text-xs font-mono border border-[#E7E7E7] rounded hover:border-[#171717] text-[#777777] hover:text-[#171717] transition-colors cursor-pointer"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={() => setActiveStageIndex((prev) => (prev + 1) % STAGES.length)}
              className="px-3 py-1.5 text-xs font-mono bg-[#171717] text-white rounded hover:bg-[#2A2A2A] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Next Stage</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Column: Visual Transformation Canvas */}
        <div className="lg:col-span-7 bg-[#F7F6F2] border border-[#E7E7E7] rounded-lg p-6 sm:p-10 min-h-[340px] flex items-center justify-center relative overflow-hidden select-none">
          {/* Subtle technical background grid */}
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: 'radial-gradient(#171717 0.75px, transparent 0.75px)',
              backgroundSize: '20px 20px'
            }}
          />

          <AnimatePresence mode="wait">
            {/* STAGE 1: IDEA — Point with Concentric Waves */}
            {currentStage.id === 'idea' && (
              <motion.div
                key="stage-idea"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center"
              >
                <div className="w-4 h-4 bg-[#171717] rounded-full relative z-10 shadow-sm" />
                <motion.div
                  className="absolute w-16 h-16 border border-[#171717]/40 rounded-full"
                  animate={shouldReduceMotion ? {} : { scale: [1, 1.8, 2.2], opacity: [0.8, 0.3, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.div
                  className="absolute w-28 h-28 border border-[#171717]/20 rounded-full"
                  animate={shouldReduceMotion ? {} : { scale: [1, 1.6, 2], opacity: [0.6, 0.2, 0] }}
                  transition={{ duration: 2.2, delay: 0.5, repeat: Infinity, ease: 'easeOut' }}
                />
                <div className="absolute top-10 font-mono text-[10px] text-[#777777] tracking-wider uppercase">
                  Coordinate [0, 0]
                </div>
              </motion.div>
            )}

            {/* STAGE 2: ARCHITECTURE — Connected Topological Network */}
            {currentStage.id === 'architecture' && (
              <motion.div
                key="stage-arch"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-[340px] aspect-[4/3] flex items-center justify-center"
              >
                <svg viewBox="0 0 320 220" className="w-full h-full text-[#171717]">
                  {/* Connecting Vectors */}
                  <motion.line
                    x1="60"
                    y1="60"
                    x2="160"
                    y2="40"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.line
                    x1="160"
                    y1="40"
                    x2="260"
                    y2="80"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  />
                  <motion.line
                    x1="160"
                    y1="40"
                    x2="160"
                    y2="140"
                    stroke="currentColor"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                  <motion.line
                    x1="60"
                    y1="60"
                    x2="90"
                    y2="160"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                  />
                  <motion.line
                    x1="90"
                    y1="160"
                    x2="160"
                    y2="140"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  />
                  <motion.line
                    x1="160"
                    y1="140"
                    x2="240"
                    y2="170"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                  />
                  <motion.line
                    x1="260"
                    y1="80"
                    x2="240"
                    y2="170"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  />

                  {/* Architecture Nodes */}
                  {[
                    { cx: 60, cy: 60, label: 'Client' },
                    { cx: 160, cy: 40, label: 'Gateway' },
                    { cx: 260, cy: 80, label: 'S3/Auth' },
                    { cx: 160, cy: 140, label: 'API Core' },
                    { cx: 90, cy: 160, label: 'Cache' },
                    { cx: 240, cy: 170, label: 'Database' }
                  ].map((node, nIdx) => (
                    <g key={nIdx}>
                      <motion.circle
                        cx={node.cx}
                        cy={node.cy}
                        r="6"
                        fill="white"
                        stroke="#171717"
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 * nIdx, type: 'spring' }}
                      />
                      <text
                        x={node.cx}
                        y={node.cy - 10}
                        textAnchor="middle"
                        fontSize="9"
                        fontFamily="monospace"
                        fill="#777777"
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </motion.div>
            )}

            {/* STAGE 3: ENGINEERING — Isometric Chassis Wireframe */}
            {currentStage.id === 'engineering' && (
              <motion.div
                key="stage-eng"
                initial={{ opacity: 0, rotateX: 10 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-[320px] aspect-[4/3] flex items-center justify-center"
              >
                <svg viewBox="0 0 300 200" className="w-full h-full text-[#171717]">
                  {/* Isometric Cuboid Chassis */}
                  {/* Top Face */}
                  <motion.polygon
                    points="150,30 230,70 150,110 70,70"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7 }}
                  />
                  {/* Left Face */}
                  <motion.polygon
                    points="70,70 150,110 150,180 70,140"
                    fill="rgba(0,0,0,0.03)"
                    stroke="currentColor"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                  />
                  {/* Right Face */}
                  <motion.polygon
                    points="230,70 150,110 150,180 230,140"
                    fill="rgba(0,0,0,0.06)"
                    stroke="currentColor"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, delay: 0.25 }}
                  />

                  {/* Internal Layer Slices */}
                  <motion.line
                    x1="70"
                    y1="105"
                    x2="150"
                    y2="145"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <motion.line
                    x1="230"
                    y1="105"
                    x2="150"
                    y2="145"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />

                  {/* Corner Accent Points */}
                  <circle cx="150" cy="30" r="3" fill="currentColor" />
                  <circle cx="230" cy="70" r="3" fill="currentColor" />
                  <circle cx="70" cy="70" r="3" fill="currentColor" />
                  <circle cx="150" cy="110" r="3.5" fill="currentColor" />
                  <circle cx="150" cy="180" r="3" fill="currentColor" />

                  <text
                    x="150"
                    y="72"
                    textAnchor="middle"
                    fontSize="9"
                    fontFamily="monospace"
                    fill="#171717"
                  >
                    CONTAINER CHASSIS
                  </text>
                </svg>
              </motion.div>
            )}

            {/* STAGE 4: PRODUCT — Polished Metallic Core with Live Status */}
            {currentStage.id === 'product' && (
              <motion.div
                key="stage-prod"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center justify-center space-y-4"
              >
                {/* Polished Chrome Diamond/Hexagon with Specular Highlight */}
                <div className="relative w-28 h-28 bg-white border border-[#171717] rounded-2xl shadow-xl flex items-center justify-center group overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-[#171717] via-[#4A4A4A] to-[#E7E7E7] opacity-90"
                    style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                  />
                  <div
                    className="absolute inset-1 bg-gradient-to-br from-white via-[#E7E7E7] to-[#B5B5B5]"
                    style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                  />
                  <div className="relative z-10 text-[#171717] font-heading font-medium text-lg">
                    S
                  </div>
                  {/* Subtle specular glint */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent -skew-x-12"
                    animate={shouldReduceMotion ? {} : { x: ['-120%', '120%'] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>

                <div className="flex items-center gap-2 px-3 py-1 bg-white border border-[#E7E7E7] rounded-full text-xs font-mono text-[#171717] shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>PRODUCTION STATUS: OPERATIONAL</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

