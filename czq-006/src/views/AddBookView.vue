<template>
  <div class="add-book-view">
    <div class="view-header">
      <h2>📝 登记共享图书</h2>
      <button class="btn-back" @click="$emit('tab-change', 'home')">← 返回总览</button>
    </div>

    <BookForm
      mode="add"
      @submit="handleAdd"
      @cancel="$emit('tab-change', 'home')"
    />

    <div v-if="justAdded" class="add-success">
      ✅ 《{{ justAdded.title }}》已成功登记入库！感谢 {{ justAdded.donor }} 的分享！
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BookForm from '../components/book/BookForm.vue'
import { bookStore } from '../stores/bookStore.js'

defineEmits(['tab-change'])

const justAdded = ref(null)

function handleAdd(form) {
  if (!form.title || !form.donor || !form.category || !form.location) return
  const book = bookStore.addBook(form)
  justAdded.value = book
  setTimeout(() => { justAdded.value = null }, 4000)
}
</script>

<style scoped>
.add-book-view { display: flex; flex-direction: column; gap: 1rem; }
.view-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; }
.view-header h2 { margin: 0; color: #4A2C0A; font-family: "KaiTi","楷体",serif; }
.btn-back {
  background: transparent; color: #8B5E3C; border: 2px solid #8B5E3C;
  border-radius: 8px; padding: 0.4rem 1rem; cursor: pointer; transition: all .2s;
}
.btn-back:hover { background: #f5e6d3; }

.add-success {
  text-align: center; background: #e8f5e9; color: #2e7d32;
  padding: 1rem; border-radius: 12px; border: 2px solid #a5d6a7;
  font-weight: bold; animation: fadeIn .3s ease;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } }
</style>
