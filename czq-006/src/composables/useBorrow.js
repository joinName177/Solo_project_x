/**
 * 借阅/归还流程
 * 封装借阅模态框状态和操作，视图只需绑定事件
 */
import { ref } from 'vue'
import { bookStore } from '../stores/bookStore.js'

export function useBorrow() {
  const showBorrow = ref(false)
  const selectedBook = ref(null)
  const message = ref('')
  const msgType = ref('success')

  function openBorrow(book) {
    selectedBook.value = book
    showBorrow.value = true
  }

  function closeBorrow() {
    showBorrow.value = false
    selectedBook.value = null
  }

  function doBorrow(form) {
    if (!form.donor || !form.expectedReturnDate || !form.bookId) return false
    const ok = bookStore.borrowBook(form.bookId, form.donor, form.expectedReturnDate)
    if (ok) {
      showMsg('✅ 借阅成功！请按时归还哦~', 'success')
    }
    closeBorrow()
    return ok
  }

  function doReturn(book) {
    const ok = bookStore.returnBook(book.id)
    if (ok) {
      showMsg('✅ 归还成功！感谢按时归还~', 'success')
    }
    return ok
  }

  function showMsg(text, type) {
    message.value = text
    msgType.value = type
    setTimeout(() => { message.value = '' }, 3000)
  }

  const borrowedBooks = bookStore.booksByStatus('已借出')

  return {
    showBorrow,
    selectedBook,
    message,
    msgType,
    openBorrow,
    closeBorrow,
    doBorrow,
    doReturn,
    borrowedBooks
  }
}
