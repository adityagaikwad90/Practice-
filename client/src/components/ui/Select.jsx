import React from 'react';

export default function Select({
  label,
  options = [],
  error,
  helperText,
  className = '',
  required = false,
  id,
  children,
  ...props
}) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold uppercase tracking-wider text-slate-700 font-mono">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          required={required}
          className={`w-full px-4 py-3 text-xs sm:text-sm rounded-xl light-input bg-white appearance-none cursor-pointer pr-10 ${
            error ? 'border-rose-400 focus:border-rose-500' : ''
          } ${className}`}
          {...props}
        >
          {options.length > 0
            ? options.map(opt => (
                <option key={opt.value} value={opt.value} className="bg-white text-slate-900">
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
      {helperText && !error && <p className="text-[11px] text-slate-500">{helperText}</p>}
    </div>
  );
}
