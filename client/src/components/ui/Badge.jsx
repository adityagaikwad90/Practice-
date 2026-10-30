import React from 'react';

export default function Badge({
  children,
  variant = 'neutral',
  dot = false,
  className = '',
  size = 'md' // sm | md
}) {
  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[#171717] bg-[#F7F6F2] border border-[#E7E7E7] rounded-[4px] ${sizes[size]} ${className}`}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
      )}
      <span>{children}</span>
    </span>
  );
}