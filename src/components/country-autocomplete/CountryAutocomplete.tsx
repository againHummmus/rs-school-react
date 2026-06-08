import { useState, useRef, useEffect } from 'react';

interface CountryAutocompleteProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  countries: string[];
}

const inputClass =
  'w-full bg-background/5 border border-background/10 rounded-lg px-3 py-2 text-background outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors';

export function CountryAutocomplete({
  id,
  value,
  onChange,
  onBlur,
  countries,
}: CountryAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [prevValue, setPrevValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync query when the confirmed value changes from outside (React getDerivedStateFromProps pattern)
  if (value !== prevValue) {
    setPrevValue(value);
    setQuery(value);
  }

  const filtered = (
    query
      ? countries.filter((c) => c.toLowerCase().startsWith(query.toLowerCase()))
      : countries
  ).slice(0, 10);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <input
        id={id}
        type="text"
        value={query}
        autoComplete="off"
        placeholder="Type to search..."
        className={inputClass}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange('');
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          setOpen(false);
          onBlur?.();
        }}
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-20 w-full mt-1 max-h-52 overflow-y-auto bg-foreground border border-background/10 rounded-lg shadow-xl">
          {filtered.map((country) => (
            <li
              key={country}
              className="px-3 py-2 text-background text-sm cursor-pointer hover:bg-accent hover:text-foreground transition-colors"
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(country);
                setQuery(country);
                setOpen(false);
              }}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
