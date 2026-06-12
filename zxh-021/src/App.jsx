import { useState, useCallback } from 'react';
import Header from './components/Header/Header';
import FridgePanel from './components/FridgePanel/FridgePanel';
import EmergencyMode from './components/EmergencyMode/EmergencyMode';
import RecipePanel from './components/RecipePanel/RecipePanel';
import CustomRecipeForm from './components/CustomRecipeForm/CustomRecipeForm';
import FridgePlan from './components/FridgePlan/FridgePlan';
import { useRecipes } from './hooks/useRecipes';
import { useRatings } from './hooks/useRatings';
import './App.css';

export default function App() {
  // ---- 状态 ----
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);

  // ---- 自定义 Hooks ----
  const { ratings, rateRecipe, getRatingWeights } = useRatings();
  const {
    customRecipes,
    recommendations,
    missingStats,
    addCustomRecipe,
    removeCustomRecipe,
  } = useRecipes(selectedIds, getRatingWeights(), emergencyMode);

  // ---- 事件处理 ----
  const toggleIngredient = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const toggleEmergency = useCallback(() => {
    setEmergencyMode((prev) => !prev);
  }, []);

  const handleAddRecipe = useCallback(
    (recipe) => {
      addCustomRecipe(recipe);
      setShowCustomForm(false);
    },
    [addCustomRecipe]
  );

  return (
    <div className="app">
      <Header />

      <div className="app-layout">
        {/* 左侧：冰箱面板 */}
        <aside className="app-sidebar">
          <FridgePanel
            selectedIds={selectedIds}
            onToggle={toggleIngredient}
            onClearAll={clearAll}
          />

          {/* 救命模式 */}
          <div className="emergency-wrap">
            <EmergencyMode
              isEmergency={emergencyMode}
              onToggle={toggleEmergency}
            />
          </div>

          {/* 操作按钮 */}
          <div className="sidebar-actions">
            <button
              className="action-btn action-btn--add"
              onClick={() => setShowCustomForm(true)}
            >
              📝 上传自定义菜谱
            </button>
            <span className="custom-count">
              自定义菜谱：{customRecipes.length} 道
            </span>
          </div>
        </aside>

        {/* 右侧：推荐结果 */}
        <main className="app-main">
          <RecipePanel
            recommendations={recommendations}
            missingStats={missingStats}
            ratings={ratings}
            onRate={rateRecipe}
            onDeleteRecipe={removeCustomRecipe}
          />

          {/* 生成清冰箱计划图片 */}
          <FridgePlan
            recommendations={recommendations}
            selectedIds={selectedIds}
          />
        </main>
      </div>

      {/* 自定义菜谱弹窗 */}
      {showCustomForm && (
        <CustomRecipeForm
          onSubmit={handleAddRecipe}
          onCancel={() => setShowCustomForm(false)}
        />
      )}
    </div>
  );
}
