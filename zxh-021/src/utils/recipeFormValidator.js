/**
 * 菜谱表单验证 — 纯函数，不依赖 React
 */

/**
 * 验证自定义菜谱表单数据
 * @param {{ name: string, ingredientIds: string[], stepsText: string }} form
 * @returns {{ valid: boolean, errors: Record<string, string> }}
 */
export function validateRecipeForm(form) {
  const errors = {};

  if (!form.name || !form.name.trim()) {
    errors.name = '请输入菜名';
  }

  if (!form.ingredientIds || form.ingredientIds.length === 0) {
    errors.ingredients = '请至少选择一种食材';
  }

  if (!form.stepsText || !form.stepsText.trim()) {
    errors.steps = '请输入制作步骤';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * 将表单数据转换为菜谱对象
 * @param {object} form - 原始表单数据
 * @returns {object} 标准化的菜谱对象
 */
export function formToRecipe(form) {
  const steps = (form.stepsText || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    name: form.name.trim(),
    ingredients: form.ingredientIds,
    optional: [],
    steps,
    category: '自定义',
    difficulty: form.difficulty || 'medium',
    cookingTime: Number(form.cookingTime) || 20,
    tip: form.tip?.trim() || undefined,
  };
}
