import { useState } from 'react';
import { ingredients } from '../../data/ingredients';
import { validateRecipeForm, formToRecipe } from '../../utils/recipeFormValidator';
import './CustomRecipeForm.css';

const INITIAL_FORM = {
  name: '',
  ingredientIds: [],
  stepsText: '',
  difficulty: 'medium',
  cookingTime: 20,
  tip: '',
};

export default function CustomRecipeForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const toggleIngredient = (id) => {
    setForm((prev) => ({
      ...prev,
      ingredientIds: prev.ingredientIds.includes(id)
        ? prev.ingredientIds.filter((i) => i !== id)
        : [...prev.ingredientIds, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, errors: errs } = validateRecipeForm(form);
    if (!valid) {
      setErrors(errs);
      return;
    }
    onSubmit(formToRecipe(form));
    setForm(INITIAL_FORM);
  };

  return (
    <div className="custom-recipe-overlay">
      <div className="custom-recipe-form">
        <h3 className="form-title">📝 上传自定义菜谱</h3>

        <form onSubmit={handleSubmit}>
          {/* 菜名 */}
          <div className="form-group">
            <label className="form-label">菜名 *</label>
            <input
              type="text"
              className={`form-input ${errors.name ? 'form-input--error' : ''}`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="例如：妈妈的秘制红烧肉"
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          {/* 选择食材 */}
          <div className="form-group">
            <label className="form-label">所需食材 *</label>
            <div className="form-ingredients-grid">
              {ingredients.map((ing) => (
                <button
                  key={ing.id}
                  type="button"
                  className={`form-ing-tag ${form.ingredientIds.includes(ing.id) ? 'form-ing-tag--selected' : ''}`}
                  onClick={() => toggleIngredient(ing.id)}
                >
                  {ing.emoji} {ing.name}
                </button>
              ))}
            </div>
            {errors.ingredients && (
              <span className="form-error">{errors.ingredients}</span>
            )}
          </div>

          {/* 难度和烹饪时间 */}
          <div className="form-row">
            <div className="form-group form-group--half">
              <label className="form-label">难度</label>
              <select
                className="form-input"
                value={form.difficulty}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
              >
                <option value="easy">⭐ 简单</option>
                <option value="medium">⭐⭐ 中等</option>
                <option value="hard">⭐⭐⭐ 困难</option>
              </select>
            </div>
            <div className="form-group form-group--half">
              <label className="form-label">烹饪时间（分钟）</label>
              <input
                type="number"
                className="form-input"
                value={form.cookingTime}
                onChange={(e) =>
                  setForm({ ...form, cookingTime: e.target.value })
                }
                min={1}
                max={300}
              />
            </div>
          </div>

          {/* 制作步骤 */}
          <div className="form-group">
            <label className="form-label">制作步骤 *（每行一步）</label>
            <textarea
              className={`form-textarea ${errors.steps ? 'form-input--error' : ''}`}
              value={form.stepsText}
              onChange={(e) => setForm({ ...form, stepsText: e.target.value })}
              placeholder={'1. 准备食材\n2. 热锅烧油\n3. ...'}
              rows={5}
            />
            {errors.steps && <span className="form-error">{errors.steps}</span>}
          </div>

          {/* 小贴士 */}
          <div className="form-group">
            <label className="form-label">小贴士（可选）</label>
            <input
              type="text"
              className="form-input"
              value={form.tip}
              onChange={(e) => setForm({ ...form, tip: e.target.value })}
              placeholder="有什么独门秘诀？"
            />
          </div>

          {/* 按钮 */}
          <div className="form-buttons">
            <button type="submit" className="btn btn--primary">
              ✅ 添加菜谱
            </button>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onCancel}
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
