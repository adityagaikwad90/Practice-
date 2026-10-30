import React from 'react';

export default function Button({
  children,
  variant = 'primary', // primary | secondary | outline | ghost | danger
  size = 'md', // sm | md | lg
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles =
    'group inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#171717] focus:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 select-none';

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 rounded-[5px]',
    md: 'px-4 py-2 text-xs sm:text-sm gap-2 rounded-md',
    lg: 'px-6 py-2.5 text-sm sm:text-base gap-2.5 rounded-md'
  };

  const variants = {
    primary: 'btn-primary-mono cursor-pointer',
    secondary: 'btn-secondary-mono cursor-pointer',
    outline:
      'bg-transparent border border-[#171717] text-[#171717] hover:bg-[#F7F6F2] cursor-pointer',
    ghost: 'bg-transparent text-[#777777] hover:text-[#171717] hover:bg-[#F7F6F2] cursor-pointer',
    danger:
      'bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 cursor-pointer'
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-0.5 mr-2 h-3.5 w-3.5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : Icon && iconPosition === 'left' ? (
        <Icon className="w-3.5 h-3.5 shrink-0" />
      ) : null}

      <span>{children}</span>

      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </button>
  );
}
