import { useEffect, useState } from 'react';

function useLocalStorage(key: string, initialValue: string = '') {
  const [value, setValue] = useState(
    localStorage.getItem(key) ?? initialValue
  );

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
