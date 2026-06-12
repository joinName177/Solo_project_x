<!--
  CalculatorPanel - 计算器主面板
  组装 CropSelector + AreaInput + InputItem[] + CostSummary
-->
<template>
  <div class="calculator-panel" :id="panelId">
    <!-- 方案名称 -->
    <div class="calculator-panel__title-row">
      <input
        class="plan-name-input"
        v-model="state.planName"
        placeholder="方案名称"
        maxlength="20"
      />
    </div>

    <!-- 作物选择 -->
    <CropSelector v-model="state.cropKey" />

    <!-- 面积输入 -->
    <AreaInput v-model="state.area" />

    <!-- 投入项列表 -->
    <div class="calculator-panel__section">
      <div class="section-header">
        <h3>📋 投入明细</h3>
        <button class="btn-add" @click="addCustomItem">+ 添加自定义项</button>
      </div>
      <TransitionGroup name="item-list" tag="div" class="items-list">
        <InputItem
          v-for="(item, index) in state.items"
          :key="item.categoryKey"
          :item="item"
          :area="state.area"
          :removable="state.items.length > 1"
          @update:usage="(v) => updateItem(index, 'usage', v)"
          @update:price="(v) => updateItem(index, 'price', v)"
          @remove="removeItem(index)"
        />
      </TransitionGroup>
    </div>

    <!-- 产量/售价自定义 -->
    <div class="calculator-panel__section yield-section">
      <h3>📈 产出预估</h3>
      <div class="yield-controls">
        <div class="yield-field">
          <label>每亩产量(公斤)</label>
          <NumberInput
            :modelValue="state.customYield ?? cropYield.yield"
            @update:modelValue="(v) => state.customYield = v"
            :min="0" :step="10"
          />
          <button v-if="state.customYield != null" class="btn-reset-inline" @click="state.customYield = null">重置</button>
        </div>
        <div class="yield-field">
          <label>每公斤售价(元)</label>
          <NumberInput
            :modelValue="state.customYieldPrice ?? cropYield.yieldPrice"
            @update:modelValue="(v) => state.customYieldPrice = v"
            :min="0" :step="0.1"
          />
          <button v-if="state.customYieldPrice != null" class="btn-reset-inline" @click="state.customYieldPrice = null">重置</button>
        </div>
      </div>
    </div>

    <!-- 成本汇总 -->
    <CostSummary
      :totalCost="totalCost"
      :costPerMu="costPerMu"
      :estimatedRevenue="estimatedRevenue"
      :estimatedYield="estimatedYield"
      :estimatedProfit="estimatedProfit"
      :roi="roi"
    />

    <!-- 操作按钮 -->
    <div class="calculator-panel__actions">
      <ExportButtons
        @export-excel="$emit('export-excel')"
        @export-pdf="$emit('export-pdf')"
      />
      <div class="action-right">
        <button class="btn-action btn-reset" @click="resetToDefaults">🔄 重置默认</button>
        <button class="btn-action btn-save" @click="$emit('save')">💾 保存档案</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CropSelector from './CropSelector.vue'
import AreaInput from './AreaInput.vue'
import InputItem from './InputItem.vue'
import CostSummary from './CostSummary.vue'
import NumberInput from '../common/NumberInput.vue'
import ExportButtons from '../common/ExportButtons.vue'

const props = defineProps({
  calculator: { type: Object, required: true },
  panelId: { type: String, default: 'calc-panel' },
})

defineEmits(['export-excel', 'export-pdf', 'save'])

// 解构 calculator 的属性
const {
  state, itemCosts, totalCost, costPerMu,
  estimatedYield, estimatedRevenue, estimatedProfit, roi,
  cropYield,
  updateItem, addCustomItem, removeItem, resetToDefaults,
} = props.calculator
</script>

<style scoped>
.calculator-panel {
  background: #fff;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.calculator-panel__title-row {
  text-align: center;
}
.plan-name-input {
  border: none;
  border-bottom: 2px dashed #d0d5dd;
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  padding: 6px 12px;
  outline: none;
  color: #1a1a1a;
  background: transparent;
  width: 240px;
  transition: border-color 0.2s;
}
.plan-name-input:focus {
  border-bottom-color: #16a34a;
}
.calculator-panel__section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.section-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}
.btn-add {
  padding: 6px 14px;
  border: 1.5px dashed #86efac;
  border-radius: 8px;
  background: #f0fdf4;
  color: #16a34a;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-add:hover {
  background: #dcfce7;
  border-style: solid;
}
.items-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.item-list-enter-active,
.item-list-leave-active {
  transition: all 0.3s ease;
}
.item-list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.item-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.yield-section h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 12px 0;
}
.yield-controls {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}
.yield-field {
  display: flex;
  align-items: center;
  gap: 8px;
}
.yield-field label {
  font-size: 13px;
  color: #6b7280;
  min-width: 110px;
}
.btn-reset-inline {
  padding: 4px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #f9fafb;
  font-size: 12px;
  color: #6b7280;
  cursor: pointer;
}
.btn-reset-inline:hover {
  background: #f3f4f6;
  color: #374151;
}

.calculator-panel__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
}
.action-right {
  display: flex;
  gap: 8px;
}
.btn-action {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-reset {
  background: #f3f4f6;
  color: #6b7280;
}
.btn-reset:hover {
  background: #e5e7eb;
  color: #374151;
}
.btn-save {
  background: #16a34a;
  color: #fff;
}
.btn-save:hover {
  background: #15803d;
}
</style>
