import React, { useEffect, useState } from 'react';
import Button from './ui/Button';
import TextInput from './ui/TextInput';

type HeaderPropsType = {
  searchItem: string;
  setSearchItem: (searchItem: string) => void;
};

export default function SearchHeader({
  searchItem,
  setSearchItem,
}: HeaderPropsType) {
  const [inputValue, setInputValue] = useState(searchItem);

  useEffect(() => {
    setInputValue(searchItem);
  }, [searchItem]);

  const handleSearch = () => {
    const cleanValue = inputValue.trim();
    setSearchItem(cleanValue);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 border border-foreground bg-foreground/10 rounded-3xl p-6 backdrop-blur-lg">
      <h1 className="text-text font-display text-4xl">
        Search for anime!
      </h1>

      <div className="flex gap-2 items-center">
        <TextInput
          value={inputValue}
          onChange={onChangeInput}
          placeholder="Search for a character..."
        />

        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
}
