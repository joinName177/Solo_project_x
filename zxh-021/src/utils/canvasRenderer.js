/**
 * Canvas 渲染工具 — 纯函数，不依赖 React
 * 负责将"清冰箱计划"数据渲染到 Canvas 上
 */
import { ingredientMap } from '../data/ingredients';

/**
 * 在 Canvas 上渲染清冰箱计划
 * @param {HTMLCanvasElement} canvas
 * @param {{ recommendations: Array, selectedIds: Set }} data
 */
export function renderFridgePlan(canvas, { recommendations, selectedIds }) {
  const ctx = canvas.getContext('2d');
  const width = 800;
  const cardHeight = 140;
  const height = 600 + recommendations.length * cardHeight;
  canvas.width = width;
  canvas.height = height;

  drawBackground(ctx, width, height);
  drawHeader(ctx, width);
  drawIngredients(ctx, width, selectedIds);
  drawDivider(ctx, width);
  drawRecipes(ctx, recommendations, width);
  drawFooter(ctx, width, height);
}

/** 触发图片下载 */
export function downloadPlanImage(canvas) {
  const today = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const link = document.createElement('a');
  link.download = `清冰箱计划_${today}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// ---- 内部绘制函数 ----

function drawBackground(ctx, width, height) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#e3f2fd');
  gradient.addColorStop(0.5, '#fff9c4');
  gradient.addColorStop(1, '#e8f5e9');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = '#b0bec5';
  ctx.lineWidth = 6;
  ctx.roundRect(12, 12, width - 24, height - 24, 20);
  ctx.stroke();
}

function drawHeader(ctx, width) {
  ctx.fillStyle = '#263238';
  ctx.font = 'bold 36px "Noto Sans SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🧊 今日清冰箱计划', width / 2, 70);

  const today = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
  ctx.fillStyle = '#607d8b';
  ctx.font = '18px "Noto Sans SC", "Microsoft YaHei", sans-serif';
  ctx.fillText(today, width / 2, 105);
}

function drawIngredients(ctx, width, selectedIds) {
  const selectedIngs = Array.from(selectedIds)
    .map((id) => ingredientMap[id])
    .filter(Boolean);
  if (selectedIngs.length === 0) return;

  ctx.fillStyle = '#546e7a';
  ctx.font = '16px "Noto Sans SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  const text = '冰箱存货：' + selectedIngs.map((i) => `${i.emoji}${i.name}`).join('  ');
  ctx.fillText(truncateText(ctx, text, width - 80), 40, 145);
}

function drawDivider(ctx, width) {
  ctx.strokeStyle = '#cfd8dc';
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 4]);
  ctx.beginPath();
  ctx.moveTo(40, 165);
  ctx.lineTo(width - 40, 165);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawRecipes(ctx, recommendations, width) {
  let y = 195;
  recommendations.forEach(({ recipe, matched, missing }, index) => {
    ctx.textAlign = 'left';

    // 菜名
    ctx.fillStyle = '#37474f';
    ctx.font = 'bold 22px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(`🍽 ${index + 1}. ${recipe.name}`, 40, y);
    y += 30;

    // 已有食材
    const matchedNames = matched
      .map((id) => `${ingredientMap[id]?.emoji || ''}${ingredientMap[id]?.name || id}`)
      .join('、');
    ctx.font = '15px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#2e7d32';
    ctx.fillText(`✅ 已有：${matchedNames}`, 60, y);
    y += 24;

    // 缺失食材
    if (missing.length > 0) {
      const missingNames = missing
        .map((id) => `${ingredientMap[id]?.emoji || ''}${ingredientMap[id]?.name || id}`)
        .join('、');
      ctx.fillStyle = '#bf360c';
      ctx.fillText(`🛒 需买：${missingNames}`, 60, y);
      y += 24;
    }

    // 步骤摘要
    ctx.fillStyle = '#546e7a';
    ctx.font = '13px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    const stepsSummary = recipe.steps.slice(0, 3).join(' → ');
    ctx.fillText(`📝 ${stepsSummary}…`, 60, y);
    y += 42;
  });
}

function drawFooter(ctx, width, height) {
  ctx.fillStyle = '#90a4ae';
  ctx.font = '14px "Noto Sans SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('— 冰箱剩菜侦探 · 拒绝浪费 · 好好吃饭 —', width / 2, height - 30);
}

function truncateText(ctx, text, maxWidth) {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let truncated = text;
  while (ctx.measureText(truncated + '…').width > maxWidth && truncated.length > 1) {
    truncated = truncated.slice(0, -1);
  }
  return truncated + '…';
}
