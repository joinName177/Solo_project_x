<template>
  <button
    class="big-btn"
    :class="[`big-btn--${variant}`, { 'big-btn--loading': loading, 'big-btn--block': block }]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="big-btn__spinner"></span>
    <slot v-else />
  </button>
</template>

<script setup>
/**
 * 大按钮组件 - 适合户外操作
 * 最小高度56px，适合戴手套或在移动中点击
 */
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: v => ['primary', 'secondary', 'accent', 'danger', 'outline'].includes(v)
  },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  block: { type: Boolean, default: false }
})

const emit = defineEmits(['click'])
function handleClick(e) { emit('click', e) }
</script>

<style scoped>
.big-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  min-height: var(--btn-min-height);
  padding: var(--space-md) var(--space-xl);
  font-size: var(--btn-font-size);
  font-weight: 700;
  border-radius: var(--btn-border-radius);
  border: 2px solid transparent;
  transition: all 0.2s;
  user-select: none;
  white-space: nowrap;
}

.big-btn--block { display: flex; width: 100%; }

/* 主按钮 - 土棕色 */
.big-btn--primary {
  background: var(--color-soil);
  color: #FFF;
  box-shadow: var(--shadow-md);
}
.big-btn--primary:active { background: var(--color-soil-dark); transform: scale(0.97); }

/* 次要按钮 - 浅土色 */
.big-btn--secondary {
  background: var(--color-soil-light);
  color: #FFF;
}
.big-btn--secondary:active { background: var(--color-soil); transform: scale(0.97); }

/* 强调按钮 - 田野绿 */
.big-btn--accent {
  background: var(--color-green-field);
  color: #FFF;
  box-shadow: var(--shadow-md);
}
.big-btn--accent:active { background: var(--color-green-dark); transform: scale(0.97); }

/* 警告按钮 - 锈色 */
.big-btn--danger {
  background: var(--color-rust);
  color: #FFF;
}
.big-btn--danger:active { opacity: 0.8; transform: scale(0.97); }

/* 描边按钮 */
.big-btn--outline {
  background: transparent;
  border-color: var(--color-soil);
  color: var(--color-soil);
}
.big-btn--outline:active { background: var(--color-soil); color: #FFF; }

/* 禁用状态 */
.big-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

/* 加载中的点状动画 */
.big-btn--loading { pointer-events: none; }
.big-btn__spinner {
  width: 20px; height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: #FFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
