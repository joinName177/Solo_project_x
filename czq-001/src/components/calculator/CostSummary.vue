<!--
  CostSummary - 成本汇总展示
  显示总成本、每亩成本、预估利润等关键指标
-->
<template>
  <div class="cost-summary">
    <div class="cost-summary__card cost-summary__card--cost">
      <div class="cost-summary__label">总成本</div>
      <div class="cost-summary__value cost-summary__value--cost">{{ formatCurrency(totalCost) }}</div>
      <div class="cost-summary__sub">每亩 {{ formatCurrency(costPerMu) }}</div>
    </div>
    <div class="cost-summary__card cost-summary__card--revenue">
      <div class="cost-summary__label">预估收入</div>
      <div class="cost-summary__value cost-summary__value--revenue">{{ formatCurrency(estimatedRevenue) }}</div>
      <div class="cost-summary__sub">产量 {{ formatNumber(estimatedYield) }} 公斤</div>
    </div>
    <div class="cost-summary__card" :class="profitCardClass">
      <div class="cost-summary__label">预估利润</div>
      <div class="cost-summary__value" :class="profitValueClass">{{ formatCurrency(estimatedProfit) }}</div>
      <div class="cost-summary__sub">投入产出比 {{ roi }}%</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatCurrency, formatNumber } from '../../utils/formatters.js'

const props = defineProps({
  totalCost: { type: Number, default: 0 },
  costPerMu: { type: Number, default: 0 },
  estimatedRevenue: { type: Number, default: 0 },
  estimatedYield: { type: Number, default: 0 },
  estimatedProfit: { type: Number, default: 0 },
  roi: { type: [Number, String], default: '0.0' },
})

const profitCardClass = computed(() =>
  props.estimatedProfit >= 0 ? 'cost-summary__card--profit' : 'cost-summary__card--loss'
)

const profitValueClass = computed(() =>
  props.estimatedProfit >= 0 ? 'cost-summary__value--profit' : 'cost-summary__value--loss'
)
</script>

<style scoped>
.cost-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
.cost-summary__card {
  padding: 24px;
  border-radius: 16px;
  text-align: center;
}
.cost-summary__card--cost {
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
}
.cost-summary__card--revenue {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
}
.cost-summary__card--profit {
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
}
.cost-summary__card--loss {
  background: linear-gradient(135deg, #fef2f2, #fee2e2);
}
.cost-summary__label {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  margin-bottom: 8px;
}
.cost-summary__value {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 4px;
}
.cost-summary__value--cost { color: #1d4ed8; }
.cost-summary__value--revenue { color: #b45309; }
.cost-summary__value--profit { color: #16a34a; }
.cost-summary__value--loss { color: #dc2626; }
.cost-summary__sub {
  font-size: 13px;
  color: #9ca3af;
}
</style>
