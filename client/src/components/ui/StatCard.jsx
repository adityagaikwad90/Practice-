import React from 'react';

export default function StatCard({
  label,
  value,
  icon: Icon,
  color = 'text-indigo-600',
  bgColor = 'bg-indigo-50 border-indigo-100',
  subtitle
}) {
  return (
    <div className="light-card p-6 rounded-2xl light-card-hover flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">{label}</span>
        {Icon && (
          <div className={`p-2.5 rounded-xl border ${bgColor}`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
        )}
      </div>

      <div>
        <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">{value}</div>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-1 font-normal">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
