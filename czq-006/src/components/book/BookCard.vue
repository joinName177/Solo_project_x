<template>
  <div :class="['book-card', { borrowed: book.status === '已借出' }]">
    <div class="card-header">
      <span class="card-category" :style="{ background: categoryColor }">
        {{ book.category }}
      </span>
      <span :class="['card-status', book.status === '可借阅' ? 'available' : 'borrowed']">
        {{ book.status }}
      </span>
    </div>

    <h3 class="card-title">《{{ book.title }}》</h3>

    <div class="card-meta">
      <div class="meta-row"><span class="meta-label">🤝 捐赠人</span><span>{{ book.donor }}</span></div>
      <div class="meta-row"><span class="meta-label">📍 存放位置</span><span>{{ book.location }}</span></div>
      <div class="meta-row"><span class="meta-label">🏘️ 村庄</span><span>{{ book.village }}</span></div>
      <div v-if="book.borrower" class="meta-row">
        <span class="meta-label">👤 借阅人</span><span>{{ book.borrower }}</span>
      </div>
      <div v-if="book.expectedReturnDate" class="meta-row">
        <span class="meta-label">📅 预计归还</span>
        <span :class="{ overdue: isOverdue }">{{ book.expectedReturnDate }}</span>
      </div>
    </div>

    <!-- 书评区域 -->
    <div v-if="book.reviews.length" class="card-reviews">
      <div class="reviews-title">💬 读后感 / 推荐语</div>
      <div v-for="(r, i) in book.reviews.slice(-3)" :key="i" class="review-item">
        <strong>{{ r.user }}</strong>（{{ r.date }}）：{{ r.content }}
      </div>
    </div>

    <div class="card-actions">
      <button
        v-if="book.status === '可借阅'"
        class="btn btn-borrow"
        @click="$emit('borrow', book)"
      >借阅</button>
      <button
        v-if="book.status === '已借出'"
        class="btn btn-return"
        @click="$emit('return', book)"
      >归还</button>
      <button class="btn btn-review" @click="$emit('review', book)">写书评</button>
      <button class="btn btn-delete" @click="$emit('delete', book)">🗑</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CATEGORY_COLORS } from '../../utils/constants.js'

const props = defineProps({
  book: { type: Object, required: true }
})

defineEmits(['borrow', 'return', 'review', 'delete'])

const categoryColor = computed(() => CATEGORY_COLORS[props.book.category] || CATEGORY_COLORS['其他'])

const isOverdue = computed(() => {
  if (!props.book.expectedReturnDate) return false
  return new Date(props.book.expectedReturnDate) < new Date()
})
</script>

<style scoped>
.book-card {
  background: #fef9f2;
  border: 2px solid #d4b896;
  border-radius: 12px;
  padding: 1rem 1.2rem;
  box-shadow: 2px 3px 8px rgba(139,90,43,.15);
  transition: transform .2s, box-shadow .2s;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.book-card:hover { transform: translateY(-2px); box-shadow: 2px 5px 14px rgba(139,90,43,.25); }
.book-card.borrowed { opacity: .85; border-color: #c0a080; }

.card-header { display: flex; justify-content: space-between; align-items: center; }
.card-category {
  color: #fff; padding: 0.2rem 0.7rem; border-radius: 20px;
  font-size: 0.8rem; font-weight: bold;
}
.card-status { font-size: 0.85rem; font-weight: bold; padding: 0.15rem 0.6rem; border-radius: 10px; }
.card-status.available { background: #e8f5e9; color: #2e7d32; }
.card-status.borrowed  { background: #fbe9e7; color: #bf360c; }

.card-title { font-size: 1.15rem; color: #4A2C0A; margin: 0; font-family: "KaiTi","楷体",serif; }

.card-meta { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.85rem; color: #6B4226; }
.meta-row { display: flex; gap: 0.4rem; }
.meta-label { color: #8B5E3C; min-width: 5.5rem; }
.overdue { color: #d32f2f; font-weight: bold; }

.card-reviews {
  background: #fff8e7; border-radius: 8px; padding: 0.6rem 0.8rem;
  border-left: 3px solid #CD853F; font-size: 0.82rem;
}
.reviews-title { font-weight: bold; color: #8B5E3C; margin-bottom: 0.3rem; }
.review-item { color: #5D3A1A; margin-top: 0.2rem; }

.card-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: auto; padding-top: 0.3rem; }
.btn {
  border: none; border-radius: 6px; padding: 0.35rem 0.8rem;
  cursor: pointer; font-size: 0.85rem; transition: all .2s;
}
.btn-borrow { background: #556B2F; color: #fff; }
.btn-borrow:hover { background: #6B8E23; }
.btn-return { background: #CD853F; color: #fff; }
.btn-return:hover { background: #DAA520; }
.btn-review { background: #8B5E3C; color: #fff; }
.btn-review:hover { background: #A0522D; }
.btn-delete { background: transparent; color: #999; font-size: 1rem; padding: 0.2rem 0.5rem; }
.btn-delete:hover { color: #d32f2f; background: #fbe9e7; }
</style>
