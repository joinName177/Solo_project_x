<template>
  <form class="book-form" @submit.prevent="handleSubmit">
    <h2 class="form-title">{{ mode === 'add' ? '📝 登记共享图书' : '📖 借阅图书' }}</h2>

    <div class="form-grid">
      <div class="form-field">
        <label>📚 书名 <span class="required">*</span></label>
        <input v-model="form.title" placeholder="如：农业病虫害防治手册" required />
      </div>

      <div class="form-field">
        <label>🤝 {{ mode === 'add' ? '捐赠人' : '借阅人' }} <span class="required">*</span></label>
        <input v-model="form.donor" placeholder="姓名" required />
      </div>

      <template v-if="mode === 'add'">
        <div class="form-field">
          <label>📂 分类 <span class="required">*</span></label>
          <select v-model="form.category" required>
            <option value="" disabled>请选择</option>
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div class="form-field">
          <label>📍 存放位置 <span class="required">*</span></label>
          <input v-model="form.location" placeholder="如：村委会书架第三层" required />
        </div>
        <div class="form-field">
          <label>🏘️ 村庄</label>
          <select v-model="form.village">
            <option v-for="v in villages" :key="v" :value="v">{{ v }}</option>
          </select>
        </div>
      </template>

      <template v-if="mode === 'borrow'">
        <div class="form-field">
          <label>📅 预计归还日期 <span class="required">*</span></label>
          <input type="date" v-model="form.expectedReturnDate" required
            :min="today" />
        </div>
        <div class="form-field">
          <label>📚 待借图书</label>
          <select v-model="form.bookId" required>
            <option value="" disabled>请选择</option>
            <option v-for="b in availableBooks" :key="b.id" :value="b.id">
              《{{ b.title }}》 — {{ b.village }}（{{ b.location }}）
            </option>
          </select>
        </div>
      </template>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn-submit">{{ mode === 'add' ? '📥 登记入库' : '📖 确认借阅' }}</button>
      <button type="button" class="btn-cancel" @click="$emit('cancel')">取消</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { CATEGORIES } from '../../utils/constants.js'
import { bookStore } from '../../stores/bookStore.js'

const props = defineProps({
  mode: { type: String, default: 'add' }, // 'add' | 'borrow'
  bookId: { type: String, default: '' }
})

const emit = defineEmits(['submit', 'cancel'])

const categories = CATEGORIES
const villages = bookStore.villages
const availableBooks = bookStore.booksByStatus('可借阅')

const today = new Date().toISOString().split('T')[0]

const form = reactive({
  title: '',
  donor: '',
  category: '',
  location: '',
  village: bookStore.villages.value[0] || '',
  expectedReturnDate: '',
  bookId: props.bookId
})

function handleSubmit() {
  emit('submit', { ...form })
  // 重置表单
  Object.keys(form).forEach(k => { form[k] = '' })
  form.village = bookStore.villages.value[0] || ''
  form.bookId = ''
}
</script>

<style scoped>
.book-form {
  background: #fef9f2;
  border: 3px solid #d4b896;
  border-radius: 16px;
  padding: 1.5rem 2rem;
  max-width: 600px;
  margin: 1rem auto;
  box-shadow: 3px 4px 12px rgba(139,90,43,.2);
}
.form-title { text-align: center; color: #4A2C0A; font-family: "KaiTi","楷体",serif; margin: 0 0 1rem; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-field { display: flex; flex-direction: column; gap: 0.3rem; }
.form-field label { font-weight: bold; color: #5D3A1A; font-size: 0.9rem; }
.required { color: #d32f2f; }
.form-field input,
.form-field select {
  padding: 0.5rem 0.7rem; border: 2px solid #d4b896; border-radius: 8px;
  background: #fffbf5; font-size: 0.9rem; color: #4A2C0A;
  transition: border-color .2s;
}
.form-field input:focus,
.form-field select:focus { outline: none; border-color: #8B5E3C; }

.form-actions { display: flex; gap: 0.8rem; justify-content: center; margin-top: 1.5rem; }
.btn-submit {
  background: #556B2F; color: #fff; border: none; border-radius: 8px;
  padding: 0.6rem 1.5rem; font-size: 1rem; cursor: pointer; transition: background .2s;
}
.btn-submit:hover { background: #6B8E23; }
.btn-cancel {
  background: transparent; color: #8B5E3C; border: 2px solid #8B5E3C;
  border-radius: 8px; padding: 0.5rem 1.5rem; cursor: pointer; transition: all .2s;
}
.btn-cancel:hover { background: #f5e6d3; }
</style>
