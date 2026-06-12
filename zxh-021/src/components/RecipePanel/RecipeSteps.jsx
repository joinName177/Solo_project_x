import { useState } from 'react';

/**
 * 可折叠的菜谱步骤展示
 */
export default function RecipeSteps({ steps }) {
  const [showSteps, setShowSteps] = useState(false);

  if (!steps || steps.length === 0) return null;

  return (
    <div className="recipe-steps-wrapper">
      <button
        className="toggle-steps-btn"
        onClick={() => setShowSteps(!showSteps)}
      >
        {showSteps ? '🔼 收起步骤' : '🔽 查看制作步骤'}
      </button>
      {showSteps && (
        <ol className="recipe-steps">
          {steps.map((step, i) => (
            <li key={i} className="step-item">{step}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
