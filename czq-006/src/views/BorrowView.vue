<template>
  <div class="borrow-view">
    <div class="view-header">
      <h2>📖 借阅管理</h2>
    </div>

    <!-- Tab 切换 -->
    <div class="borrow-tabs">
      <button :class="['tab-btn', { active: mode === 'borrow' }]" @click="mode = 'borrow'">
        📖 借阅图书
      </button>
      <button :class="['tab-btn', { active: mode === 'return' }]" @click="mode = 'return'">
        ↩️ 归还图书
      </button>
    </div>

    <!-- 借阅表单 -->
    <div v-if="mode === 'borrow'">
      <BookForm mode="borrow" @submit="doBorrow" @cancel="() => {}" />
    </div>

    <!-- 归还列表 -->
    <div v-else class="return-list">
      <h3>当前借出图书</h3>
      <div v-if="borrowedBooks.length" class="return-grid">
        <div v-for="book in borrowedBooks" :key="book.id" class="return-card">
          <div class="return-info">
            <strong>《{{ book.title }}》</strong>
            <span>借阅人：{{ book.borrower }}</span>
            <span>借阅日期：{{ book.borrowDate }}</span>
            <span :class="{ overdue: isOverdue(book) }">预计归还：{{ book.expectedReturnDate }}</span>
          </div>
          <button class="btn-return" @click="doReturn(book)">↩️ 归还</button>
        </div>
      </div>
      <div v-else class="empty-state">
        <p>📭 暂无借出图书</p>
      </div>
    </div>

    <div v-if="message" :class="['action-msg', msgType]">{{ message }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BookForm from '../components/book/BookForm.vue'
import { useBorrow } from '../composables/useBorrow.js'

const mode = ref('borrow')

const { message, msgType, doBorrow, doReturn, borrowedBooks } = useBorrow()

function isOverdue(book) {
  return book.expectedReturnDate && new Date(book.expectedReturnDate) < new Date()
}
</script>

<style scoped>
.borrow-view { display: flex; flex-direction: column; gap: 1rem; }
.view-header h2 { margin: 0; color: #4A2C0A; font-family: "KaiTi","楷体",serif; }

.borrow-tabs { display: flex; gap: 0.5rem; }
.tab-btn {
  padding: 0.5rem 1.2rem; border: 2px solid #d4b896; border-radius: 10px;
  background: #fef9f2; color: #5D3A1A; cursor: pointer; font-size: 0.95rem;
  transition: all .2s;
}
.tab-btn.active { background: #556B2F; color: #fff; border-color: #556B2F; }

.return-list h3 { color: #4A2C0A; font-family: "KaiTi","楷体",serif; }
.return-grid { display: flex; flex-direction: column; gap: 0.8rem; }
.return-card {
  display: flex; justify-content: space-between; align-items: center;
  background: #fef9f2; border: 2px solid #d4b896; border-radius: 12px;
  padding: 0.8rem 1.2rem; gap: 1rem;
}
.return-info { display: flex; flex-direction: column; gap: 0.15rem; font-size: 0.88rem; color: #6B4226; }
.return-info strong { color: #4A2C0A; font-size: 1rem; }
.overdue { color: #d32f2f; font-weight: bold; }
.btn-return {
  background: #CD853F; color: #fff; border: none; border-radius: 8px;
  padding: 0.5rem 1rem; cursor: pointer; transition: background .2s; white-space: nowrap;
}
.btn-return:hover { background: #DAA520; }

.empty-state { text-align: center; padding: 2rem; color: #8B5E3C; }

.action-msg {
  text-align: center; padding: 0.8rem; border-radius: 10px; font-weight: bold;
  animation: fadeIn .3s ease;
}
.action-msg.success { background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } }
</style>
