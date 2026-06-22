import type { InputHTMLAttributes } from 'react';
import SearchIcon from '../icons/SearchIcon';

export default function TextInput({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative h-10 flex grow">
      <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-2 text-accent-light" />
      <input
        type="search"
        {...props}
        className={`w-full h-full border border-accent-light/50 pl-10 pr-2 rounded-lg bg-foreground text-background focus:outline-none focus:ring focus:ring-accent-light placeholder:text-foreground ${className}`}
      />
    </div>
  );
}
