import React from 'react';
import SolarMagniferOutline from '~icons/solar/magnifer-outline';
type InputPropsType = {};

export default class SearchInput extends React.Component<InputPropsType> {
  constructor(props: InputPropsType) {
    super(props);
  }
  render() {
    return (
      <div className="flex flex-col gap-4 border border-foreground bg-foreground/10 rounded-3xl p-6 backdrop-blur-lg">
        <h1 className="text-text font-display text-center text-7xl">
          Search for anime
        </h1>
        <div className='relative h-8'>
            <SolarMagniferOutline className='absolute top-1/2 -translate-y-1/2 left-2 text-foreground/70' />
            <input
              className="w-full h-full pl-10 pr-2 rounded-lg bg-foreground/30 text-text focus:outline-none focus:ring-2 focus:ring-accent/60 placeholder:text-foreground"
              placeholder="Search for a character..."
            />
        </div>
      </div>
    );
  }
}
