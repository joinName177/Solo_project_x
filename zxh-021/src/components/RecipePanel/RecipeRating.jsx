const RATING_OPTIONS = [
  { key: 'yummy', emoji: '😋', label: '好吃' },
  { key: 'ok', emoji: '😐', label: '一般' },
  { key: 'dark', emoji: '🤢', label: '黑暗料理' },
];

/**
 * 菜谱评分组件
 */
export default function RecipeRating({ recipeId, currentRating, onRate }) {
  return (
    <div className="recipe-rating">
      <span className="rating-label">评价这道菜：</span>
      <div className="rating-buttons">
        {RATING_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            className={`rating-btn ${currentRating === opt.key ? 'rating-btn--active' : ''}`}
            onClick={() => onRate(recipeId, opt.key)}
            title={opt.label}
          >
            {opt.emoji} {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
