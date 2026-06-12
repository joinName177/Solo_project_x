import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import builtInRecipes from '../data/recipes';
import { getRecommendations, getMissingStats } from '../utils/recipeEngine';

/**
 * 菜谱数据管理 hook
 * 合并内置菜谱和自定义菜谱，管理自定义菜谱的 CRUD
 */
export function useRecipes(selectedIds, ratingWeights, emergencyMode) {
  const [customRecipes, setCustomRecipes] = useLocalStorage('fridge_custom_recipes', []);

  /** 合并所有菜谱 */
  const allRecipes = useMemo(
    () => [...builtInRecipes, ...customRecipes],
    [customRecipes]
  );

  /** 计算推荐结果 */
  const recommendations = useMemo(() => {
    if (selectedIds.size === 0) return [];
    return getRecommendations(allRecipes, selectedIds, ratingWeights, {
      emergencyMode,
      limit: 3,
    });
  }, [allRecipes, selectedIds, ratingWeights, emergencyMode]);

  /** 缺失食材统计 */
  const missingStats = useMemo(
    () => getMissingStats(recommendations),
    [recommendations]
  );

  /** 添加自定义菜谱 */
  const addCustomRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: `custom_${Date.now()}`,
      isCustom: true,
    };
    setCustomRecipes((prev) => [...prev, newRecipe]);
    return newRecipe;
  };

  /** 删除自定义菜谱 */
  const removeCustomRecipe = (recipeId) => {
    setCustomRecipes((prev) => prev.filter((r) => r.id !== recipeId));
  };

  return {
    allRecipes,
    customRecipes,
    recommendations,
    missingStats,
    addCustomRecipe,
    removeCustomRecipe,
  };
}
