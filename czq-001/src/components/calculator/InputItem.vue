<!--
  InputItem - 单项投入编辑行
  显示投入项的名称、用量、单价和小计
-->
<template>
  <div class="input-item">
    <div class="input-item__header">
      <span class="input-item__icon">{{ item.categoryIcon }}</span>
      <span class="input-item__name">{{ item.categoryLabel }}</span>
      <button
        v-if="removable"
        class="input-item__remove"
        @click="$emit('remove')"
        title="移除此项"
      >✕</button>
    </div>
    <div class="input-item__controls">
      <div class="input-item__field">
        <label class="input-item__field-label">每亩用量</label>
        <NumberInput
          :modelValue="item.usage"
          @update:modelValue="(v) => $emit('update:usage', v)"
          :min="0"
          :step="0.1"
          :unit="item.unit"
        />
      </div>
      <div class="input-item__field">
        <label class="input-item__field-label">单价(元/{{ item.unit }})</label>
        <NumberInput
          :modelValue="item.price"
          @update:modelValue="(v) => $emit('update:price', v)"
          :min="0"
          :step="0.1"
          unit="元"
        />
      </div>
      <div class="input-item__subtotal">
        <label class="input-item__field-label">小计</label>
        <span class="input-item__subtotal-value">{{ formattedSubtotal }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import NumberInput from '../common/NumberInput.vue'
import { formatCurrency } from '../../utils/formatters.js'

const props = defineProps({
  item: { type: Object, required: true },
  area: { type: Number, default: 1 },
  removable: { type: Boolean, default: true },
})

defineEmits(['update:usage', 'update:price', 'remove'])

const formattedSubtotal = computed(() => {
  return formatCurrency((props.item.usage || 0) * (props.item.price || 0) * props.area)
})
</script>

<style scoped>
.input-item {
  padding: 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  background: #fafbfc;
  transition: border-color 0.2s;
}
.input-item:hover {
  border-color: #d0d5dd;
}
.input-item__header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.input-item__icon { font-size: 20px; }
.input-item__name {
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  flex: 1;
}
.input-item__remove {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: #fee2e2;
  color: #dc2626;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}
.input-item__remove:hover {
  background: #fecaca;
}
.input-item__controls {
  display: flex;
  gap: 20px;
  align-items: flex-end;
  flex-wrap: wrap;
}
.input-item__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.input-item__field-label {
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
}
.input-item__subtotal {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 120px;
}
.input-item__subtotal-value {
  font-size: 20px;
  font-weight: 700;
  color: #16a34a;
  padding: 8px 0;
}
</style>
