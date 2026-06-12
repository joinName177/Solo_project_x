<!--
  联系卡片组件（模态框内容）
  职责：生成一条零工信息的联系卡片，方便截图分享
  包含工作信息、联系方式、发布时间等
-->
<template>
  <div class="contact-card" ref="cardRef">
    <div class="card-header">
      <span class="card-stamp" :class="gig.completed ? 'stamp-done' : 'stamp-active'">
        {{ gig.completed ? '已完成' : '进行中' }}
      </span>
      <h2 class="card-title">{{ gig.title }}</h2>
    </div>

    <div class="card-tags">
      <Badge :variant="gig.type === 'demand' ? 'demand' : 'supply'" :icon="gig.type === 'demand' ? '🔍' : '💪'">
        {{ gig.type === 'demand' ? '找人干活' : '我会干' }}
      </Badge>
      <Badge :variant="wtVariant(gig.workType)" :icon="workTypeIcons[gig.workType]">
        {{ gig.workType }}
      </Badge>
    </div>

    <div class="card-body">
      <p class="card-desc">{{ gig.description }}</p>
    </div>

    <div class="card-info">
      <div class="info-row">
        <span class="info-icon">📍</span>
        <span class="info-text">{{ gig.village }}</span>
      </div>
      <div class="info-row">
        <span class="info-icon">📞</span>
        <span class="info-text info-contact">{{ gig.contact }}</span>
      </div>
      <div class="info-row">
        <span class="info-icon">🕐</span>
        <span class="info-text">{{ formatFullDate(gig.createdAt) }}</span>
      </div>
      <div class="info-row">
        <span class="info-icon">⭐</span>
        <span class="info-text">信誉分：{{ reputationScore }}</span>
      </div>
    </div>

    <div class="card-footer">
      <span class="card-brand">📋 村口零工板</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Badge from '../common/Badge.vue'
import { WORK_TYPE_ICONS, WORK_TYPE_VARIANT } from '../../utils/constants.js'
import { formatFullDate } from '../../utils/time.js'

const props = defineProps({
  gig: { type: Object, required: true },
  reputationScore: { type: Number, default: 0 },
})

const workTypeIcons = WORK_TYPE_ICONS

function wtVariant(wt) {
  return WORK_TYPE_VARIANT[wt] || 'default'
}

const cardRef = ref(null)

defineExpose({ cardRef })
</script>

<style scoped>
.contact-card {
  background: linear-gradient(135deg, #fffef7 0%, #fff8e1 100%);
  border: 3px solid #e8dcc8;
  border-radius: 12px;
  padding: 24px;
  position: relative;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}
.card-header {
  text-align: center;
  margin-bottom: 16px;
  position: relative;
}
.card-stamp {
  display: inline-block;
  padding: 4px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  border: 2px solid;
  transform: rotate(-6deg);
  margin-bottom: 10px;
}
.stamp-active {
  color: #2e7d32;
  border-color: #2e7d32;
  background: rgba(46,125,50,0.06);
}
.stamp-done {
  color: #c62828;
  border-color: #c62828;
  background: rgba(198,40,40,0.06);
}
.card-title {
  margin: 0;
  font-size: 22px;
  color: #3e2723;
  font-weight: 800;
}
.card-tags {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
}
.card-body {
  background: #fffef7;
  border: 1px dashed #d7ccc8;
  border-radius: 8px;
  padding: 14px;
  margin-bottom: 16px;
}
.card-desc {
  margin: 0;
  font-size: 15px;
  color: #4e342e;
  line-height: 1.7;
}
.card-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  color: #5d4037;
}
.info-icon {
  font-size: 16px;
  flex-shrink: 0;
}
.info-contact {
  font-weight: 700;
  color: #bf360c;
  font-size: 17px;
  letter-spacing: 0.5px;
}
.card-footer {
  margin-top: 20px;
  text-align: center;
  padding-top: 14px;
  border-top: 1px solid #e8dcc8;
}
.card-brand {
  font-size: 13px;
  color: #a1887f;
  font-weight: 600;
}
</style>
