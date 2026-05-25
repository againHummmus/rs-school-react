import React from 'react';

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function Button({ onClick, children, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={
        className ??
        'cursor-pointer h-10 px-6 bg-accent-light border border-accent-light text-white rounded-lg hover:bg-accent-light/90 transition-all font-semibold'
      }
    >
      {children}
    </button>
  );
}
