import { useState, useCallback } from 'react';

/**
 * localStorage 持久化 hook
 * @param {string} key - 存储键名
 * @param {*} initialValue - 初始值
 * @returns {[*, function, function]} [value, setValue, removeValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`读取 localStorage[${key}] 失败:`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const nextValue = typeof value === 'function' ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        } catch (error) {
          console.warn(`写入 localStorage[${key}] 失败:`, error);
        }
        return nextValue;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`删除 localStorage[${key}] 失败:`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
