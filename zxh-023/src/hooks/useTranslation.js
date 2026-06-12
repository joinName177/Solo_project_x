import { useState, useCallback } from 'react';
import {
  generateTranslation,
  generateRandomTranslation,
  createUserTranslation,
  saveTranslationToHistory,
  likeTranslation,
  removeTranslation,
} from '../services/translationService';

/**
 * 翻译操作 Hook
 * 封装所有翻译相关业务操作的调用和状态管理
 */
function useTranslation(onDataChange) {
  const [currentTranslation, setCurrentTranslation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const translate = useCallback(
    (petType, emotion) => {
      setIsLoading(true);
      // 模拟翻译"思考"延迟，增加趣味性
      setTimeout(() => {
        const result = generateTranslation(petType, emotion);
        setCurrentTranslation(result);
        setIsLoading(false);
      }, 400);
    },
    [],
  );

  const randomTranslate = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      const result = generateRandomTranslation();
      setCurrentTranslation(result);
      setIsLoading(false);
    }, 500);
  }, []);

  const saveCurrent = useCallback(() => {
    if (!currentTranslation) return null;
    const entry = saveTranslationToHistory(currentTranslation);
    onDataChange?.();
    return entry;
  }, [currentTranslation, onDataChange]);

  const uploadTranslation = useCallback(
    (params) => {
      const entry = createUserTranslation(params);
      onDataChange?.();
      return entry;
    },
    [onDataChange],
  );

  const like = useCallback(
    (id) => {
      likeTranslation(id);
      onDataChange?.();
    },
    [onDataChange],
  );

  const remove = useCallback(
    (id) => {
      removeTranslation(id);
      onDataChange?.();
    },
    [onDataChange],
  );

  return {
    currentTranslation,
    isLoading,
    translate,
    randomTranslate,
    saveCurrent,
    uploadTranslation,
    like,
    remove,
    setCurrentTranslation,
  };
}

export default useTranslation;
