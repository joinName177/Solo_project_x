<!--
  零工信息卡片组件
  职责：展示单条零工信息的完整内容，包含操作按钮
  依赖：Badge（类型标签）、ReputationBadge（信誉分）、外部 useReputation
-->
<template>
  <div class="gig-card" :class="{ 'gig-card--completed': gig.completed }">
    <!-- 左侧：类型指示条 -->
    <div class="card-indicator" :class="gig.type === 'demand' ? 'indicator-demand' : 'indicator-supply'"></div>

    <!-- 主体 -->
    <div class="card-main">
      <div class="card-top">
        <div class="card-headline">
          <Badge :variant="gig.type === 'demand' ? 'demand' : 'supply'" :icon="gig.type === 'demand' ? '🔍' : '💪'">
            {{ gig.type === 'demand' ? '找人干活' : '我会干' }}
          </Badge>
          <Badge :variant="wtVariant(gig.workType)" :icon="workTypeIcons[gig.workType]">
            {{ gig.workType }}
          </Badge>
          <span v-if="gig.completed" class="done-stamp">已完成</span>
        </div>
        <h3 class="card-title">{{ gig.title }}</h3>
      </div>

      <p v-if="gig.description" class="card-desc">{{ gig.description }}</p>

      <div class="card-meta">
        <span class="meta-item">📍 {{ gig.village }}</span>
        <span class="meta-item">📞 {{ gig.contact }}</span>
        <span class="meta-item" :title="formatFullDate(gig.createdAt)">🕐 {{ formatRelativeTime(gig.createdAt) }}</span>
      </div>

      <div class="card-actions">
        <ReputationBadge
          :score="reputationScore"
          :endorsed="alreadyEndorsed"
          :is-self="false"
          @endorse="$emit('endorse', gig.id)"
        />

        <div class="action-btns">
          <button class="action-btn" @click.stop="$emit('contact', gig)">
            📇 联系卡
          </button>
          <button
            :class="['action-btn', gig.completed ? 'btn-reopen' : 'btn-done']"
            @click.stop="$emit('toggleComplete', gig.id)"
          >
            {{ gig.completed ? '🔄 重开' : '✅ 完成' }}
          </button>
          <button class="action-btn btn-delete" @click.stop="$emit('delete', gig.id)">
            🗑
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Badge from '../common/Badge.vue'
import ReputationBadge from './ReputationBadge.vue'
import { WORK_TYPE_ICONS, WORK_TYPE_VARIANT } from '../../utils/constants.js'
import { formatRelativeTime, formatFullDate } from '../../utils/time.js'

const props = defineProps({
  gig: { type: Object, required: true },
  reputationScore: { type: Number, default: 0 },
  alreadyEndorsed: { type: Boolean, default: false },
})

defineEmits(['endorse', 'contact', 'toggleComplete', 'delete'])

const workTypeIcons = WORK_TYPE_ICONS

function wtVariant(wt) {
  return WORK_TYPE_VARIANT[wt] || 'default'
}
</script>

<style scoped>
.gig-card {
  display: flex;
  background: #fffef7;
  border: 2px solid #e8dcc8;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.2s;
  position: relative;
}
.gig-card:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border-color: #bcaaa4;
}
.gig-card--completed {
  opacity: 0.78;
}

/* 左侧彩色指示条 */
.card-indicator {
  width: 5px;
  flex-shrink: 0;
}
.indicator-demand {
  background: linear-gradient(180deg, #ff9800, #ffcc80);
}
.indicator-supply {
  background: linear-gradient(180deg, #4caf50, #a5d6a7);
}

/* 主体区域 */
.card-main {
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card-top {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.card-headline {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.done-stamp {
  display: inline-block;
  padding: 2px 10px;
  border: 1.5px solid #c62828;
  color: #c62828;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  transform: rotate(-3deg);
  margin-left: auto;
}
.card-title {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: #3e2723;
  line-height: 1.4;
}
.card-desc {
  margin: 0;
  font-size: 14px;
  color: #5d4037;
  line-height: 1.6;
  background: #faf7f0;
  padding: 10px 12px;
  border-radius: 6px;
  border-left: 3px solid #e8dcc8;
}
.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 13px;
  color: #8d6e63;
}
.meta-item {
  white-space: nowrap;
}

/* 底部操作区 */
.card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid #efebe9;
  flex-wrap: wrap;
  gap: 8px;
}
.action-btns {
  display: flex;
  gap: 6px;
}
.action-btn {
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 13px;
  border: 1px solid #d7ccc8;
  background: #fffef7;
  color: #5d4037;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.action-btn:hover {
  background: #efebe9;
  border-color: #8d6e63;
}
.btn-done {
  color: #2e7d32;
  border-color: #a5d6a7;
}
.btn-done:hover {
  background: #e8f5e9;
}
.btn-reopen {
  color: #ef6c00;
  border-color: #ffcc80;
}
.btn-reopen:hover {
  background: #fff3e0;
}
.btn-delete {
  padding: 5px 8px;
  color: #a1887f;
  border-color: transparent;
}
.btn-delete:hover {
  background: #fce4ec;
  color: #c62828;
  border-color: #ef9a9a;
}
</style>
