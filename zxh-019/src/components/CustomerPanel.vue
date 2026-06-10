<template>
  <div class="customer-panel">
    <div class="customer-header">
      <div class="customer-avatar">{{ customer.name[0] }}</div>
      <div class="customer-info">
        <div class="customer-name">
          {{ customer.name }}
          <span v-if="customer.isRegular" class="regular-badge">熟客</span>
        </div>
        <div class="customer-special" v-if="customer.special">
          <span class="special-tag">{{ customer.special.label }}</span>
          <span class="special-desc">{{ customer.special.description }}</span>
        </div>
      </div>
    </div>

    <div class="order-section">
      <h3 class="order-title">购物清单</h3>
      <div class="order-items">
        <div v-for="(item, i) in items" :key="i" class="order-item">
          <span class="item-name">{{ item.name }}</span>
          <span class="item-qty">×{{ item.quantity }}{{ item.unit }}</span>
          <span class="item-price">¥{{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
      </div>
      <div class="order-total">
        <span class="total-label">合计</span>
        <span class="total-price">¥{{ totalPrice.toFixed(2) }}</span>
      </div>
    </div>

    <div class="payment-section">
      <div class="payment-info">
        <span class="payment-label">顾客支付</span>
        <span class="payment-amount">¥{{ payment }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  customer: { type: Object, required: true },
  items: { type: Array, required: true },
  totalPrice: { type: Number, required: true },
  payment: { type: Number, required: true },
})
</script>

<style scoped>
.customer-panel {
  background: #fff;
  border: 2px solid #d4c5a9;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
}

.customer-header {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px dashed #e0d5c5;
}

.customer-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff8a65, #ff7043);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #fff;
  font-weight: bold;
  flex-shrink: 0;
}

.customer-info {
  flex: 1;
  min-width: 0;
}

.customer-name {
  font-size: 16px;
  font-weight: bold;
  color: #4a3728;
  margin-bottom: 4px;
}

.regular-badge {
  display: inline-block;
  font-size: 10px;
  background: #ffd54f;
  color: #4a3728;
  padding: 1px 6px;
  border-radius: 8px;
  margin-left: 6px;
  vertical-align: middle;
  font-weight: normal;
}

.customer-special {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
}

.special-tag {
  font-size: 11px;
  background: #fff3e0;
  color: #e65100;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid #ffcc80;
  font-weight: 600;
}

.special-desc {
  font-size: 12px;
  color: #8B7355;
}

.order-section {
  margin-bottom: 12px;
}

.order-title {
  font-size: 14px;
  color: #8B7355;
  margin-bottom: 8px;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.order-item {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.item-name {
  flex: 1;
  color: #4a3728;
}

.item-qty {
  color: #8B7355;
  margin-right: 12px;
  font-size: 12px;
}

.item-price {
  font-weight: 600;
  color: #4a3728;
  min-width: 52px;
  text-align: right;
}

.order-total {
  display: flex;
  justify-content: space-between;
  padding-top: 8px;
  margin-top: 8px;
  border-top: 2px solid #4a3728;
}

.total-label {
  font-size: 16px;
  font-weight: bold;
  color: #4a3728;
}

.total-price {
  font-size: 20px;
  font-weight: bold;
  color: #c62828;
}

.payment-section {
  text-align: center;
  padding: 10px;
  background: #e8f5e9;
  border-radius: 8px;
}

.payment-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.payment-label {
  font-size: 14px;
  color: #4a3728;
}

.payment-amount {
  font-size: 24px;
  font-weight: bold;
  color: #2e7d32;
}
</style>
