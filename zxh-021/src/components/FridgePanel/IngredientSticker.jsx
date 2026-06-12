/**
 * 单个食材贴纸组件
 * 展示为可点击的磁性贴纸风格
 */
export default function IngredientSticker({ ingredient, isSelected, onToggle }) {
  return (
    <button
      className={`sticker ${isSelected ? 'sticker--selected' : ''}`}
      onClick={() => onToggle(ingredient.id)}
      title={ingredient.name}
      aria-pressed={isSelected}
    >
      <span className="sticker-emoji">{ingredient.emoji}</span>
      <span className="sticker-name">{ingredient.name}</span>
    </button>
  );
}
