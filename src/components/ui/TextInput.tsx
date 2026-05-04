import React from 'react';
import SolarMagniferOutline from '~icons/solar/magnifer-outline';

type TextInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default class TextInput extends React.Component<TextInputProps> {
  render() {
    const { value, onChange, placeholder } = this.props;
    return (
      <div className="relative h-10 flex grow">
        <SolarMagniferOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-foreground/70" />
        <input
          value={value}
          onChange={onChange}
          className="w-full h-full pl-10 pr-2 rounded-lg bg-foreground/30 text-text focus:outline-none focus:ring-2 focus:ring-accent/60 placeholder:text-foreground"
          placeholder={placeholder}
        />
      </div>
    );
  }
}
