import React, { useState } from 'react';
import TextInput from '../../ui/text-input/TextInput';
import Button from '../../ui/button/Button';

type HeaderPropsType = {
  searchItem: string;
  setSearchItem: (searchItem: string) => void;
};

export default function SearchHeader({
  searchItem,
  setSearchItem,
}: HeaderPropsType) {
  const [inputValue, setInputValue] = useState(searchItem);
  const [prevSearchItem, setPrevSearchItem] = useState(searchItem);

  if (searchItem !== prevSearchItem) {
    setPrevSearchItem(searchItem);
    setInputValue(searchItem);
  }

  const handleSearch = () => {
    const cleanValue = inputValue.trim();
    setSearchItem(cleanValue);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 bg-foreground/80 rounded-3xl p-6 backdrop-blur-lg">
      <h1 className="text-background font-display text-4xl">
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
