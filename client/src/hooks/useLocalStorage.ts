import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setStoreState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      if (item) {
        return JSON.parse(item);
      }
    } catch (e) {
      console.error(e);
    }

    return initialValue;
  });

  const setState = (value: T) => {
    try {
      setStoreState(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }

    if (value === initialValue && !value) {
      localStorage.removeItem(key);
    }
  };

  return [state, setState] as const;
}
