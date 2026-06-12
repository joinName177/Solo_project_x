/**
 * 书评流程
 * 封装书评模态框状态、表单、提交逻辑
 */
import { ref } from 'vue'
import { bookStore } from '../stores/bookStore.js'

export function useReview() {
  const showReview = ref(false)
  const selectedBook = ref(null)
  const reviewUser = ref('')
  const reviewContent = ref('')

  function openReview(book) {
    selectedBook.value = book
    reviewUser.value = ''
    reviewContent.value = ''
    showReview.value = true
  }

  function closeReview() {
    showReview.value = false
    selectedBook.value = null
  }

  function doReview() {
    if (!reviewUser.value || !reviewContent.value || !selectedBook.value) return false
    const ok = bookStore.addReview(selectedBook.value.id, reviewUser.value, reviewContent.value)
    if (ok) {
      closeReview()
    }
    return ok
  }

  return {
    showReview,
    selectedBook,
    reviewUser,
    reviewContent,
    openReview,
    closeReview,
    doReview
  }
}
