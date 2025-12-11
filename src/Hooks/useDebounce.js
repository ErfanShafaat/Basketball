import { useState, useEffect } from "react";

export function useDebounce(value, delay = 2000) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer); 
  }, [value, delay]);

  return debouncedValue;
}
