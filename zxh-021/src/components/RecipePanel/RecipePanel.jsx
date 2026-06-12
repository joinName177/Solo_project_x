import RecipeCard from './RecipeCard';
import './RecipePanel.css';

/**
 * 推荐结果面板
 * 展示推荐菜谱列表、缺失食材统计
 */
export default function RecipePanel({
  recommendations,
  missingStats,
  ratings,
  onRate,
  onDeleteRecipe,
}) {
  if (recommendations.length === 0) {
    return (
      <div className="recipe-panel">
        <div className="recipe-empty">
          <span className="recipe-empty-icon">🍳</span>
          <p>选一些食材，看看能做什么好吃的吧！</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-panel">
      <h2 className="recipe-panel-title">🍽️ 推荐菜谱</h2>

      {/* 缺失食材统计 */}
      {missingStats.length > 0 && (
        <div className="missing-stats">
          <span className="missing-stats-label">🛒 建议补充：</span>
          {missingStats.map((item) => (
            <span key={item.id} className="missing-item">
              {item.emoji} {item.name}
            </span>
          ))}
        </div>
      )}

      {/* 推荐菜谱列表 */}
      <div className="recipe-list">
        {recommendations.map((result) => (
          <RecipeCard
            key={result.recipe.id}
            result={result}
            currentRating={ratings[result.recipe.id] || null}
            onRate={onRate}
            onDelete={onDeleteRecipe}
          />
        ))}
      </div>
    </div>
  );
}
