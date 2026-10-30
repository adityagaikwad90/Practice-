import React from 'react';

export default function StatCard({ label, value, subtitle }) {
  return (
    <div className="mono-card p-5 rounded-lg flex flex-col justify-between space-y-2">
      <span className="text-[11px] font-mono uppercase tracking-wider text-[#777777]">{label}</span>
      <div>
        <div className="text-2xl sm:text-3xl font-medium tracking-tight text-[#171717] font-heading">{value}</div>
        {subtitle && (
          <p className="text-xs text-[#777777] mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
