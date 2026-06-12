<template>
  <div
    ref="boardRef"
    class="game-board"
    :class="sceneClass"
    @pointermove="dragDrop.onDragMove"
    @pointerup="dragDrop.endDrag"
    @pointerleave="dragDrop.endDrag"
    @click="dragDrop.clickToPlace"
  >
    <!-- 场景背景层 -->
    <div class="board-background">
      <!-- 道路 -->
      <div class="road road-main"></div>
      <div class="road road-cross"></div>

      <!-- 人行道 -->
      <div class="sidewalk sidewalk-top"></div>
      <div class="sidewalk sidewalk-bottom"></div>

      <!-- 建筑物装饰 -->
      <div
        v-for="b in buildings"
        :key="b.id"
        class="building"
        :style="{ left: b.x + 'px', top: b.y + 'px', width: b.w + 'px', height: b.h + 'px' }"
      >
        <div class="building-label">{{ b.label }}</div>
      </div>

      <!-- 地标 -->
      <div
        v-if="scene.landmark"
        class="landmark"
        :style="{ left: scene.landmark.x + 'px', top: scene.landmark.y + 'px' }"
      >
        {{ scene.landmark.icon }} {{ scene.landmark.label }}
      </div>
    </div>

    <!-- 特殊区域（盲道、绿化带） -->
    <SpecialZone
      v-for="zone in scene.specialZones"
      :key="zone.id"
      :zone="zone"
    />

    <!-- 停车框 -->
    <ParkingZone
      v-for="zone in scene.parkingZones"
      :key="zone.id"
      :zone="zone"
      :parked-count="getParkedCount(zone.id)"
    />

    <!-- 单车列表 -->
    <BikeItem
      v-for="bike in activeBikes"
      :key="bike.id"
      :bike="bike"
      :is-selected="dragDrop.selectedBikeId.value === bike.id"
      :is-dragging="dragDrop.draggingBikeId.value === bike.id"
      @drag-start="dragDrop.startDrag"
      @click-select="dragDrop.selectBike"
    />

    <!-- 拖拽中的浮动单车 -->
    <div
      v-if="dragDrop.isDragging.value"
      class="dragging-ghost"
      :style="dragDrop.dragStyle.value"
    >
      <svg viewBox="0 0 40 40" class="ghost-svg">
        <circle cx="20" cy="20" r="14" :fill="draggingBikeColor" stroke="#333" stroke-width="1.5" opacity="0.8" />
        <circle cx="16" cy="26" r="5" fill="none" stroke="#333" stroke-width="2" />
        <circle cx="24" cy="26" r="5" fill="none" stroke="#333" stroke-width="2" />
      </svg>
    </div>

    <!-- 选中提示 -->
    <div v-if="dragDrop.selectedBikeId.value" class="select-hint">
      👆 请点击游戏画面中你想放置单车的位置
    </div>

    <!-- 浮动消息 -->
    <TransitionGroup name="msg" tag="div" class="message-layer">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="float-message"
        :class="msg.type"
      >
        {{ msg.text }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import BikeItem from './BikeItem.vue'
import ParkingZone from './ParkingZone.vue'
import SpecialZone from './SpecialZone.vue'
import { useDragDrop } from '../../composables/useDragDrop.js'

const props = defineProps({
  scene: { type: Object, required: true },
  bikes: { type: Array, required: true },
  messages: { type: Array, default: () => [] },
})

const emit = defineEmits(['place-bike'])

const boardRef = ref(null)

const dragDrop = useDragDrop({
  gameBoardRef: boardRef,
  onDrop(bikeId, x, y) {
    emit('place-bike', bikeId, x, y)
  },
})

// 当前拖拽中单车的颜色
const draggingBikeColor = computed(() => {
  if (!dragDrop.draggingBikeId.value) return '#2196f3'
  const bike = props.bikes.find((b) => b.id === dragDrop.draggingBikeId.value)
  return bike?.color === 'yellow' ? '#ffc107' : '#2196f3'
})

// 未摆放的单车
const activeBikes = computed(() =>
  props.bikes.filter((b) => {
    // 拖拽中的单车在原位置隐藏
    if (b.id === dragDrop.draggingBikeId.value) return false
    return true
  })
)

// 场景CSS类名
const sceneClass = computed(() => `scene-${props.scene.id}`)

// 从场景配置中获取建筑数据（纯数据驱动）
const buildings = computed(() => props.scene.buildings || [])

function getParkedCount(zoneId) {
  return props.bikes.filter((b) => b.placed && b.placedInZone === zoneId).length
}
</script>

<style scoped>
.game-board {
  position: relative;
  width: 900px;
  height: 600px;
  border-radius: 16px;
  overflow: hidden;
  cursor: crosshair;
  background: #7a8a7a;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
}

/* ===== 背景层 ===== */
.board-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.road {
  position: absolute;
  background: #555;
}

.road-main {
  top: 150px;
  left: 0;
  right: 0;
  height: 250px;
  background: linear-gradient(180deg, #4a4a4a, #555, #4a4a4a);
}

.road-cross {
  top: 0;
  left: 400px;
  width: 100px;
  height: 100%;
  background: linear-gradient(90deg, #4a4a4a, #555, #4a4a4a);
}

/* 道路标线 */
.road-main::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    #fff 0px,
    #fff 20px,
    transparent 20px,
    transparent 40px
  );
}

.sidewalk {
  position: absolute;
  left: 0;
  right: 0;
  height: 20px;
  background: #c0b8a8;
}

.sidewalk-top { top: 140px; }
.sidewalk-bottom { top: 390px; }

.building {
  position: absolute;
  background: #6b7b8d;
  border-radius: 4px 4px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #5a6a7a;
  box-shadow: inset 0 10px 20px rgba(255, 255, 255, 0.05);
}

.building-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: bold;
  transform: rotate(-90deg);
  white-space: nowrap;
}

.landmark {
  position: absolute;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 4px 10px;
  border-radius: 10px;
  pointer-events: none;
}

/* ===== 拖拽幽灵 ===== */
.dragging-ghost {
  position: absolute;
  width: 44px;
  height: 44px;
  z-index: 100;
  pointer-events: none;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5));
  transform: translate(-50%, -50%);
}

.ghost-svg {
  width: 100%;
  height: 100%;
}

/* ===== 选中提示 ===== */
.select-hint {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.75);
  color: #ffd54f;
  font-size: 14px;
  padding: 8px 20px;
  border-radius: 20px;
  z-index: 200;
  animation: pulseHint 1.5s ease-in-out infinite;
}

/* ===== 浮动消息 ===== */
.message-layer {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 300;
  display: flex;
  flex-direction: column;
  gap: 6px;
  pointer-events: none;
}

.float-message {
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.float-message.success { background: rgba(76, 175, 80, 0.9); }
.float-message.error { background: rgba(244, 67, 54, 0.9); }
.float-message.warning { background: rgba(255, 152, 0, 0.9); }
.float-message.info { background: rgba(33, 150, 243, 0.9); }

.msg-enter-active { transition: all 0.3s ease; }
.msg-leave-active { transition: all 0.5s ease; }
.msg-enter-from { opacity: 0; transform: translateY(-20px); }
.msg-leave-to { opacity: 0; transform: translateY(-10px); }

@keyframes pulseHint {
  0%, 100% { opacity: 0.85; }
  50% { opacity: 1; }
}
</style>
