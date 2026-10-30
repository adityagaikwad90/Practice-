import React from 'react';

export default function Input({
  label,
  error,
  icon: Icon,
  helperText,
  className = '',
  required = false,
  id,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-mono uppercase tracking-wider text-[#777777]">
          {label} {required && <span className="text-rose-600">*</span>}
        </label>
      )}

      <div className="relative rounded-md overflow-hidden">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#777777]">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={inputId}
          required={required}
          className={`w-full px-3.5 py-2.5 text-xs sm:text-sm mono-input ${
            Icon ? 'pl-9' : ''
          } ${error ? 'border-rose-500' : ''} ${className}`}
          {...props}
        />
      </div>

      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
      {helperText && !error && <p className="text-[11px] text-[#777777]">{helperText}</p>}
    </div>
  );
}
