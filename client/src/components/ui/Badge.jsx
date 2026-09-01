import React from 'react';

export default function Badge({
  children,
  variant = 'indigo', // indigo | emerald | sky | purple | amber | rose | neutral
  dot = false,
  className = '',
  size = 'md' // sm | md
}) {
  const variants = {
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    sky: 'bg-sky-50 text-sky-700 border-sky-200/80',
    purple: 'bg-purple-50 text-purple-700 border-purple-200/80',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/80',
    rose: 'bg-rose-50 text-rose-700 border-rose-200/80',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const dotColors = {
    indigo: 'bg-indigo-600',
    emerald: 'bg-emerald-600',
    sky: 'bg-sky-600',
    purple: 'bg-purple-600',
    amber: 'bg-amber-600',
    rose: 'bg-rose-600',
    neutral: 'bg-slate-500'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-[11px]'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-medium rounded-full border ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} animate-soft-pulse`} />
      )}
      <span>{children}</span>
    </span>
  );
}
