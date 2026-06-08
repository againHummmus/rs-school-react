import React from 'react';
import SolarMagniferOutline from '~icons/solar/magnifer-outline';

type TextInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function TextInput({
  value,
  onChange,
  onKeyDown,
  placeholder,
}: TextInputProps) {
  return (
    <div className="relative h-10 flex grow">
      <SolarMagniferOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-accent-light" />
      <input
        type="search"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="w-full h-full border border-accent-light/50 pl-10 pr-2 rounded-lg bg-foreground text-background focus:outline-none focus:ring focus:ring-accent-light placeholder:text-foreground"
        placeholder={placeholder}
      />
    </div>
  );
}
