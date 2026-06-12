import { ingredients, ingredientsByCategory, CATEGORIES } from '../../data/ingredients';
import IngredientSticker from './IngredientSticker';
import './FridgePanel.css';

export default function FridgePanel({ selectedIds, onToggle, onClearAll }) {
  const selectedCount = selectedIds.size;

  return (
    <div className="fridge-panel">
      <div className="fridge-panel-header">
        <h2 className="fridge-title">🧊 我的冰箱</h2>
        <div className="fridge-actions">
          <span className="selected-count">
            已选 <strong>{selectedCount}</strong> 种食材
          </span>
          {selectedCount > 0 && (
            <button className="clear-btn" onClick={onClearAll}>
              清空
            </button>
          )}
        </div>
      </div>

      <div className="fridge-door">
        {Object.entries(CATEGORIES).map(([key, label]) => {
          const items = ingredientsByCategory[key];
          if (!items) return null;
          return (
            <div key={key} className="ingredient-category">
              <h3 className="category-label">{label}</h3>
              <div className="stickers-grid">
                {items.map((ing) => (
                  <IngredientSticker
                    key={ing.id}
                    ingredient={ing}
                    isSelected={selectedIds.has(ing.id)}
                    onToggle={onToggle}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
