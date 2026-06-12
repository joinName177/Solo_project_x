import { useRef, useCallback } from 'react';
import { renderFridgePlan, downloadPlanImage } from '../../utils/canvasRenderer';
import './FridgePlan.css';

/**
 * "今日清冰箱计划" 图片生成组件
 * 将 Canvas 渲染逻辑委托给纯函数 canvasRenderer
 */
export default function FridgePlan({ recommendations, selectedIds }) {
  const canvasRef = useRef(null);

  const generateImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderFridgePlan(canvas, { recommendations, selectedIds });
    downloadPlanImage(canvas);
  }, [recommendations, selectedIds]);

  if (recommendations.length === 0) return null;

  return (
    <div className="fridge-plan">
      <button className="plan-btn" onClick={generateImage}>
        🖼️ 生成今日清冰箱计划
      </button>
      <p className="plan-hint">生成一张可爱的图片，包含推荐菜谱和步骤摘要</p>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
