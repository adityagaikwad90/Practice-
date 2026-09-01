import React from 'react';

export default function Textarea({
  label,
  error,
  helperText,
  className = '',
  required = false,
  rows = 4,
  id,
  ...props
}) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-xs font-semibold uppercase tracking-wider text-slate-700 font-mono">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        rows={rows}
        required={required}
        className={`w-full px-4 py-3 text-xs sm:text-sm rounded-xl light-input placeholder-slate-400 resize-none ${
          error ? 'border-rose-400 focus:border-rose-500' : ''
        } ${className}`}
        {...props}
      />

      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
      {helperText && !error && <p className="text-[11px] text-slate-500">{helperText}</p>}
    </div>
  );
}
