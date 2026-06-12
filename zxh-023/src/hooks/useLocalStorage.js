import { useState, useCallback } from 'react';

/**
 * 通用 localStorage 读写 Hook
 * 封装 JSON 序列化，提供与 useState 类似的 API
 */
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      try {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch { /* quota exceeded */ }
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
}

export default useLocalStorage;
