import React from 'react';

export function Card({ children, className = '', hover = true, padding = 'p-6 sm:p-8', ...props }) {
  return (
    <div
      className={`light-card rounded-2xl ${hover ? 'light-card-hover' : ''} ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`flex flex-col space-y-1.5 pb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={`text-xl sm:text-2xl font-bold tracking-tight text-slate-900 ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = '' }) {
  return <p className={`text-xs sm:text-sm text-slate-600 font-normal leading-relaxed ${className}`}>{children}</p>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`pt-2 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`pt-6 border-t border-slate-100 flex items-center justify-between ${className}`}>{children}</div>;
}

export default Card;
