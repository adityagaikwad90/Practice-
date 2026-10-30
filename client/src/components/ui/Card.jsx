import React from 'react';

export function Card({ children, className = '', hover = false, padding = 'p-6 sm:p-8', ...props }) {
  return (
    <div
      className={`mono-card rounded-lg ${hover ? 'mono-card-hover' : ''} ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`flex flex-col space-y-1 pb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={`text-lg sm:text-xl font-medium tracking-tight text-[#171717] font-heading ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = '' }) {
  return <p className={`text-xs sm:text-sm text-[#777777] font-normal leading-relaxed ${className}`}>{children}</p>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`pt-2 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`pt-6 border-t border-[#E7E7E7] flex items-center justify-between ${className}`}>{children}</div>;
}

export default Card;
