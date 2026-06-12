<template>
  <div class="book-list-container">
    <!-- 筛选栏 -->
    <div class="list-toolbar">
      <div class="toolbar-left">
        <select v-model="filterVillage" class="filter-select">
          <option value="">🏘️ 全部村庄</option>
          <option v-for="v in filterOptions.villages.value" :key="v" :value="v">{{ v }}</option>
        </select>
        <select v-model="filterStatus" class="filter-select">
          <option value="">📋 全部状态</option>
          <option value="可借阅">✅ 可借阅</option>
          <option value="已借出">📖 已借出</option>
        </select>
        <select v-model="filterCategory" class="filter-select">
          <option value="">📂 全部分类</option>
          <option v-for="c in filterOptions.categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
      <div class="toolbar-right">
        <span class="result-count">共 {{ filteredBooks.length }} 本</span>
        <button class="btn-export-text" @click="$emit('export-text')">📄 导出文本</button>
        <button class="btn-export-img" @click="$emit('export-img')">🖼️ 导出图片</button>
      </div>
    </div>

    <!-- 图书网格 -->
    <div v-if="filteredBooks.length" class="book-grid">
      <BookCard
        v-for="book in filteredBooks"
        :key="book.id"
        :book="book"
        @borrow="$emit('borrow', book)"
        @return="$emit('return', book)"
        @review="$emit('review', book)"
        @delete="handleDelete(book)"
      />
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">📭</div>
      <p>还没有图书，快来登记第一本吧！</p>
    </div>

    <!-- 确认删除对话框 -->
    <ConfirmDialog
      v-if="showDeleteConfirm"
      message="确定要删除这本图书吗？此操作不可撤销。"
      @confirm="confirmDelete"
      @cancel="showDeleteConfirm = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BookCard from './BookCard.vue'
import ConfirmDialog from '../common/ConfirmDialog.vue'
import { bookStore } from '../../stores/bookStore.js'
import { useBookFilter } from '../../composables/useBookFilter.js'

defineEmits(['borrow', 'return', 'review', 'export-text', 'export-img'])

const { filterVillage, filterStatus, filterCategory, filterOptions, filteredBooks } = useBookFilter()

// 删除确认流程
const showDeleteConfirm = ref(false)
const pendingDeleteBook = ref(null)

function handleDelete(book) {
  pendingDeleteBook.value = book
  showDeleteConfirm.value = true
}

function confirmDelete() {
  if (pendingDeleteBook.value) {
    bookStore.deleteBook(pendingDeleteBook.value.id)
  }
  showDeleteConfirm.value = false
  pendingDeleteBook.value = null
}
</script>

<style scoped>
.book-list-container { display: flex; flex-direction: column; gap: 1rem; }

.list-toolbar {
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 0.5rem;
  background: #faf3eb; padding: 0.8rem 1rem; border-radius: 12px;
  border: 1px solid #d4b896;
}
.toolbar-left, .toolbar-right { display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; }
.filter-select {
  padding: 0.4rem 0.7rem; border: 2px solid #d4b896; border-radius: 8px;
  background: #fff; color: #5D3A1A; font-size: 0.85rem; cursor: pointer;
}
.result-count { color: #8B5E3C; font-weight: bold; font-size: 0.9rem; }

.btn-export-text, .btn-export-img {
  padding: 0.4rem 0.8rem; border: none; border-radius: 8px; cursor: pointer;
  font-size: 0.85rem; transition: all .2s;
}
.btn-export-text { background: #8B5E3C; color: #fff; }
.btn-export-text:hover { background: #A0522D; }
.btn-export-img  { background: #CD853F; color: #fff; }
.btn-export-img:hover  { background: #DAA520; }

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
}

.empty-state { text-align: center; padding: 3rem 1rem; color: #8B5E3C; }
.empty-icon { font-size: 3rem; margin-bottom: 0.5rem; }
</style>
