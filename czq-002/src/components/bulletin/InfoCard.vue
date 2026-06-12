<template>
  <div class="info-card" :class="{ completed: item.status === 'completed', demand: item.type === 'demand' }">
    <div class="card-header">
      <span class="card-type-badge" :class="item.type">
        {{ item.type === 'supply' ? '📋 出租' : '🔍 求租' }}
      </span>
      <span class="card-machine">{{ machineLabel }}</span>
      <span v-if="item.status === 'completed'" class="card-done-tag">✅ 已完成</span>
    </div>

    <div class="card-body">
      <div class="card-row">
        <span class="card-label">品牌型号</span>
        <span class="card-value">{{ item.brandModel }}</span>
      </div>

      <div class="card-row" v-if="item.type === 'supply'">
        <span class="card-label">日租金</span>
        <span class="card-value price">{{ item.dailyRent }} 元/天</span>
      </div>

      <div class="card-row" v-if="item.type === 'demand'">
        <span class="card-label">使用日期</span>
        <span class="card-value">{{ item.useDate }}</span>
      </div>

      <div class="card-row" v-if="item.type === 'demand' && item.expectedRent">
        <span class="card-label">期望租金</span>
        <span class="card-value price">{{ item.expectedRent }} 元/天</span>
      </div>

      <div class="card-row">
        <span class="card-label">所在村庄</span>
        <span class="card-value village">📍 {{ item.village }}</span>
      </div>

      <div class="card-row" v-if="item.contact">
        <span class="card-label">联系方式</span>
        <span class="card-value contact">📞 {{ item.contact }}</span>
      </div>

      <div class="card-row card-time">
        <span class="card-label">发布时间</span>
        <span class="card-value">{{ formattedDate }}</span>
      </div>
    </div>

    <div class="card-actions" v-if="item.status === 'active'">
      <button class="btn-complete" @click="$emit('complete', item.id)">✅ 标记已完成</button>
      <button class="btn-card-action" @click="$emit('contact', item)">📇 联系卡片</button>
      <button class="btn-delete" @click="$emit('delete', item.id)">🗑 删除</button>
    </div>
    <div class="card-actions" v-else>
      <button class="btn-reactivate" @click="$emit('reactivate', item.id)">🔄 重新激活</button>
      <button class="btn-card-action" @click="$emit('contact', item)">📇 联系卡片</button>
      <button class="btn-delete" @click="$emit('delete', item.id)">🗑 删除</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { MACHINE_TYPES } from '../../core/constants.js'

const props = defineProps({
  item: { type: Object, required: true }
})

defineEmits(['complete', 'delete', 'contact', 'reactivate'])

const machineLabel = computed(() => {
  const found = MACHINE_TYPES.find(m => m.value === props.item.machineType)
  return found ? found.label : props.item.machineType
})

const formattedDate = computed(() => {
  if (!props.item.createdAt) return ''
  const d = new Date(props.item.createdAt)
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
})
</script>

<style scoped>
.info-card {
  background: #fffef5;
  border: 2px solid #d4a574;
  border-radius: 8px;
  padding: 16px 20px;
  transition: all 0.2s;
}

.info-card.demand {
  border-left: 5px solid #1976d2;
}

.info-card.completed {
  opacity: 0.55;
  background: #f5f5f5;
  border-color: #ccc;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.card-type-badge {
  padding: 3px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: bold;
}

.card-type-badge.supply {
  background: #e8f5e9;
  color: #2e7d32;
}

.card-type-badge.demand {
  background: #e3f2fd;
  color: #1565c0;
}

.card-machine {
  font-size: 19px;
  font-weight: bold;
  color: #5c3317;
}

.card-done-tag {
  font-size: 14px;
  color: #2e7d32;
  font-weight: bold;
  margin-left: auto;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-row {
  display: flex;
  gap: 8px;
  align-items: baseline;
}

.card-label {
  font-size: 14px;
  color: #999;
  min-width: 70px;
  flex-shrink: 0;
}

.card-value {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.card-value.price {
  color: #d32f2f;
  font-weight: bold;
  font-size: 18px;
}

.card-value.village {
  color: #1565c0;
}

.card-value.contact {
  color: #6a1b9a;
}

.card-time {
  margin-top: 4px;
  font-size: 13px;
}

.card-actions {
  display: flex;
  gap: 8px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px dashed #d4a574;
  flex-wrap: wrap;
}

.btn-complete {
  padding: 7px 16px;
  font-size: 14px;
  background: #2e7d32;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.btn-complete:hover {
  background: #3e9142;
}

.btn-reactivate {
  padding: 7px 16px;
  font-size: 14px;
  background: #e65100;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.btn-card-action {
  padding: 7px 16px;
  font-size: 14px;
  background: #1565c0;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-delete {
  padding: 7px 16px;
  font-size: 14px;
  background: #c62828;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-left: auto;
}

.btn-delete:hover {
  background: #d32f2f;
}
</style>
