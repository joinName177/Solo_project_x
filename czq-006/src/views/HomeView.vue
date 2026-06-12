<template>
  <div class="home-view">
    <div class="view-header">
      <h2>📋 图书总览</h2>
      <button class="btn-add" @click="$emit('tab-change', 'add')">+ 登记图书</button>
    </div>

    <BookList
      @borrow="openBorrow"
      @return="doReturn"
      @review="openReview"
      @export-text="exportText()"
      @export-img="exportImage('.book-grid', '乡村图书清单')"
    />

    <!-- 借阅弹窗 -->
    <Modal v-if="showBorrow" title="📖 借阅图书" @close="closeBorrow">
      <BookForm
        mode="borrow"
        :book-id="selectedBook?.id"
        @submit="doBorrow"
        @cancel="closeBorrow"
      />
    </Modal>

    <!-- 书评弹窗 -->
    <Modal v-if="showReview" title="💬 写读后感" @close="closeReview">
      <div class="review-form">
        <p class="review-book">《{{ selectedBook?.title }}》</p>
        <input v-model="reviewUser" placeholder="你的姓名" class="review-input" />
        <textarea v-model="reviewContent" placeholder="分享你的读后感或推荐理由..." rows="4" class="review-textarea"></textarea>
        <div class="review-actions">
          <button class="btn-submit" @click="doReview" :disabled="!reviewUser || !reviewContent">提交书评</button>
          <button class="btn-cancel" @click="closeReview">取消</button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import BookList from '../components/book/BookList.vue'
import BookForm from '../components/book/BookForm.vue'
import Modal from '../components/common/Modal.vue'
import { useBorrow } from '../composables/useBorrow.js'
import { useReview } from '../composables/useReview.js'
import { useExport } from '../composables/useExport.js'

defineEmits(['tab-change'])

const { showBorrow, selectedBook, openBorrow, closeBorrow, doBorrow, doReturn } = useBorrow()
const { showReview, reviewUser, reviewContent, openReview, closeReview, doReview } = useReview()
const { exportText, exportImage } = useExport()
</script>

<style scoped>
.home-view { display: flex; flex-direction: column; gap: 1rem; }
.view-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; }
.view-header h2 { margin: 0; color: #4A2C0A; font-family: "KaiTi","楷体",serif; }
.btn-add {
  background: #556B2F; color: #fff; border: none; border-radius: 8px;
  padding: 0.5rem 1.2rem; font-size: 0.95rem; cursor: pointer; transition: background .2s;
}
.btn-add:hover { background: #6B8E23; }

.review-form { display: flex; flex-direction: column; gap: 0.8rem; }
.review-book { font-weight: bold; color: #4A2C0A; margin: 0; }
.review-input, .review-textarea {
  padding: 0.5rem 0.7rem; border: 2px solid #d4b896; border-radius: 8px;
  background: #fffbf5; font-size: 0.9rem; color: #4A2C0A; font-family: inherit;
}
.review-input:focus, .review-textarea:focus { outline: none; border-color: #8B5E3C; }
.review-textarea { resize: vertical; }
.review-actions { display: flex; gap: 0.5rem; justify-content: flex-end; }
.btn-submit, .btn-cancel { padding: 0.5rem 1.2rem; border-radius: 8px; cursor: pointer; border: none; font-size: 0.9rem; }
.btn-submit { background: #556B2F; color: #fff; }
.btn-submit:hover { background: #6B8E23; }
.btn-submit:disabled { opacity: .5; cursor: not-allowed; }
.btn-cancel { background: transparent; color: #8B5E3C; border: 2px solid #8B5E3C; }
.btn-cancel:hover { background: #f5e6d3; }
</style>
