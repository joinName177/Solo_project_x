import { ingredientMap } from '../../data/ingredients';
import RecipeSteps from './RecipeSteps';
import RecipeRating from './RecipeRating';

const DIFFICULTY_LABELS = {
  easy: '⭐ 简单',
  medium: '⭐⭐ 中等',
  hard: '⭐⭐⭐ 困难',
};

/**
 * 菜谱卡片 — 展示单道推荐菜谱的完整信息
 * 组合 RecipeSteps 和 RecipeRating 子组件
 */
export default function RecipeCard({ result, currentRating, onRate, onDelete }) {
  const { recipe, score, matched, missing, matchedOptional } = result;
  const isCustom = recipe.isCustom;
  const matchPercent = Math.round(score * 100);

  return (
    <div className={`recipe-card ${missing.length === 0 ? 'recipe-card--complete' : ''}`}>
      {/* 卡片头部 */}
      <div className="recipe-card-header">
        <div className="recipe-title-row">
          <h3 className="recipe-name">
            {isCustom && <span className="custom-badge">📝</span>}
            {recipe.name}
          </h3>
          {missing.length === 0 ? (
            <span className="badge badge--ready">✅ 可做</span>
          ) : (
            <span className="badge badge--incomplete">📋 需补食材</span>
          )}
        </div>
        <div className="recipe-meta">
          <span>{DIFFICULTY_LABELS[recipe.difficulty] || recipe.difficulty}</span>
          <span>⏱ {recipe.cookingTime}分钟</span>
          <span>📊 匹配度 {matchPercent}%</span>
        </div>
      </div>

      {/* 食材匹配标签 */}
      <div className="recipe-ingredients-info">
        <div className="ingredient-tags">
          {matched.map((id) => (
            <span key={id} className="tag tag--matched">
              {ingredientMap[id]?.emoji} {ingredientMap[id]?.name || id}
            </span>
          ))}
          {missing.map((id) => (
            <span key={id} className="tag tag--missing">
              ❌ {ingredientMap[id]?.emoji} {ingredientMap[id]?.name || id}
            </span>
          ))}
          {matchedOptional.map((id) => (
            <span key={id} className="tag tag--optional">
              ✨ {ingredientMap[id]?.emoji} {ingredientMap[id]?.name || id}
            </span>
          ))}
        </div>
      </div>

      {/* 小贴士 */}
      {recipe.tip && <p className="recipe-tip">💡 {recipe.tip}</p>}

      {/* 制作步骤 */}
      <RecipeSteps steps={recipe.steps} />

      {/* 评分 */}
      <RecipeRating
        recipeId={recipe.id}
        currentRating={currentRating}
        onRate={onRate}
      />

      {/* 删除自定义菜谱 */}
      {isCustom && (
        <button className="delete-recipe-btn" onClick={() => onDelete(recipe.id)}>
          🗑 删除此菜谱
        </button>
      )}
    </div>
  );
}
