<template>
  <div class="rain-overlay" v-if="active">
    <div v-for="n in 30" :key="n" class="raindrop" :style="rainStyle(n)"></div>
  </div>
</template>

<script setup>
defineProps({
  active: { type: Boolean, default: false },
})

function rainStyle(n) {
  const seed = n * 137.5
  const left = ((seed * 7.3) % 100)
  const delay = ((seed * 0.13) % 2).toFixed(2)
  const duration = (0.5 + (seed * 0.017) % 0.5).toFixed(2)
  const opacity = (0.2 + (seed * 0.005) % 0.3).toFixed(2)
  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    opacity: Number(opacity),
  }
}
</script>

<style scoped>
.rain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 50;
  overflow: hidden;
}

.raindrop {
  position: absolute;
  top: -10px;
  width: 1.5px;
  height: 16px;
  background: linear-gradient(180deg, transparent, rgba(100, 181, 246, 0.6));
  animation: rain-fall linear infinite;
}

@keyframes rain-fall {
  0% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(100vh);
  }
}
</style>
