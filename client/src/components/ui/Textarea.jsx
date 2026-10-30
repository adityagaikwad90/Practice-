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
        <label htmlFor={textareaId} className="block text-xs font-mono uppercase tracking-wider text-[#777777]">
          {label} {required && <span className="text-rose-600">*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        rows={rows}
        required={required}
        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm mono-input resize-none ${
          error ? 'border-rose-500' : ''
        } ${className}`}
        {...props}
      />

      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
      {helperText && !error && <p className="text-[11px] text-[#777777]">{helperText}</p>}
    </div>
  );
}
