import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Server, Globe, Smartphone, Database, Shield, HardDrive, Cpu, Cloud } from 'lucide-react';

/**
 * SolveSpace Animated Engineering Architecture Blueprint
 * Interactive SVG system diagram showing connected Cloud, Backend,
 * Database, Web, and Mobile components with scroll-animated telemetry paths.
 */
export default function EngineeringBlueprint() {
  const containerRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'center center']
  });

  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const nodes = [
    {
      id: 'web',
      name: 'Web Platform',
      spec: 'React 18 • Next.js • Tailwind',
      tier: 'Client Tier',
      icon: Globe,
      x: 100,
      y: 60
    },
    {
      id: 'mobile',
      name: 'Native Android',
      spec: 'Kotlin • Jetpack Compose • MVVM',
      tier: 'Client Tier',
      icon: Smartphone,
      x: 100,
      y: 190
    },
    {
      id: 'gateway',
      name: 'Nginx & Gateway',
      spec: 'HTTP/2 • SSL/TLS • Rate Limiting',
      tier: 'Edge Layer',
      icon: Shield,
      x: 320,
      y: 125
    },
    {
      id: 'backend',
      name: 'API Cluster',
      spec: 'Node.js Express • Docker Microservices',
      tier: 'Services Layer',
      icon: Server,
      x: 540,
      y: 125
    },
    {
      id: 'db',
      name: 'PostgreSQL DB',
      spec: 'Relational Schema • ACID Compliant',
      tier: 'Data Layer',
      icon: Database,
      x: 760,
      y: 50
    },
    {
      id: 's3',
      name: 'AWS S3 Cloud',
      spec: 'Encrypted Asset & Resume Storage',
      tier: 'Cloud Storage',
      icon: Cloud,
      x: 760,
      y: 125
    },
    {
      id: 'cache',
      name: 'Redis Cache',
      spec: 'In-Memory Key/Value Sub-ms Latency',
      tier: 'Cache Layer',
      icon: HardDrive,
      x: 760,
      y: 200
    }
  ];

  return (
    <div
      ref={containerRef}
      className="border border-[#E7E7E7] bg-white rounded-xl p-6 sm:p-10 space-y-6 select-none"
    >
      {/* Blueprint Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E7E7] pb-6">
        <div>
          <span className="eyebrow-minimal block mb-1">SYSTEM TOPOLOGY</span>
          <h3 className="text-xl sm:text-2xl font-normal text-[#171717] font-heading">
            Production Architecture Blueprint
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#777777]">
          <span className="w-2 h-2 rounded-full bg-[#171717] animate-pulse" />
          <span>Telemetry: Scroll to inspect live connections</span>
        </div>
      </div>

      {/* SVG Canvas & Node Overlay */}
      <div className="relative w-full overflow-x-auto">
        <div className="min-w-[780px] h-[280px] relative">
          {/* Subtle Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.35] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #E7E7E7 1px, transparent 1px), linear-gradient(to bottom, #E7E7E7 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />

          {/* Connected SVG Vector Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 880 260">
            {/* Web -> Gateway */}
            <motion.path
              d="M 190 75 C 240 75, 260 135, 305 135"
              fill="none"
              stroke="#171717"
              strokeWidth="1.5"
              style={{ pathLength: shouldReduceMotion ? 1 : pathProgress }}
            />
            {/* Mobile -> Gateway */}
            <motion.path
              d="M 190 205 C 240 205, 260 145, 305 145"
              fill="none"
              stroke="#171717"
              strokeWidth="1.5"
              style={{ pathLength: shouldReduceMotion ? 1 : pathProgress }}
            />
            {/* Gateway -> API Core */}
            <motion.path
              d="M 430 140 L 525 140"
              fill="none"
              stroke="#171717"
              strokeWidth="2"
              strokeDasharray="4 3"
              style={{ pathLength: shouldReduceMotion ? 1 : pathProgress }}
            />
            {/* API Core -> DB */}
            <motion.path
              d="M 645 135 C 685 135, 700 65, 745 65"
              fill="none"
              stroke="#171717"
              strokeWidth="1.5"
              style={{ pathLength: shouldReduceMotion ? 1 : pathProgress }}
            />
            {/* API Core -> S3 */}
            <motion.path
              d="M 645 140 L 745 140"
              fill="none"
              stroke="#171717"
              strokeWidth="1.5"
              style={{ pathLength: shouldReduceMotion ? 1 : pathProgress }}
            />
            {/* API Core -> Redis */}
            <motion.path
              d="M 645 145 C 685 145, 700 215, 745 215"
              fill="none"
              stroke="#171717"
              strokeWidth="1.5"
              style={{ pathLength: shouldReduceMotion ? 1 : pathProgress }}
            />
          </svg>

          {/* Interactive Topology Nodes */}
          {nodes.map((node) => {
            const Icon = node.icon;
            const isHovered = activeNode === node.id;
            return (
              <motion.div
                key={node.id}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                  isHovered
                    ? 'bg-[#171717] text-white border-[#171717] shadow-lg z-20 scale-105'
                    : 'bg-white text-[#171717] border-[#E7E7E7] hover:border-[#171717] shadow-xs z-10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-1.5 rounded ${
                      isHovered ? 'bg-white/10 text-white' : 'bg-[#F7F6F2] text-[#171717]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-medium font-heading">
                      {node.name}
                    </span>
                    <span
                      className={`block text-[10px] font-mono ${
                        isHovered ? 'text-neutral-300' : 'text-[#777777]'
                      }`}
                    >
                      {node.tier}
                    </span>
                  </div>
                </div>

                {/* Popover specification preview */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 p-2 bg-[#171717] text-white text-[11px] font-mono rounded shadow-xl pointer-events-none z-30 text-center"
                  >
                    {node.spec}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Blueprint Specs Footer */}
      <div className="pt-2 border-t border-[#E7E7E7] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#777777]">
        <div className="flex items-center gap-3">
          <span>AWS EC2 • Nginx SSL • Express • React • Compose</span>
        </div>
        <div className="text-[11px] text-[#171717] font-medium">
          Zero-Downtime CI/CD Verified
        </div>
      </div>
    </div>
  );
}

