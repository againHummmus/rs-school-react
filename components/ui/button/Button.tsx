import type { ButtonHTMLAttributes } from 'react';

export default function Button({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        className ??
        'cursor-pointer h-10 px-6 bg-accent-light border border-accent-light text-white rounded-lg hover:bg-accent-light/90 transition-all font-semibold disabled:opacity-40 disabled:pointer-events-none'
      }
    >
      {children}
    </button>
  );
}
