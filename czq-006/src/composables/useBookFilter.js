/**
 * 图书筛选逻辑
 * 从 BookList 组件中抽离，保持组件只关注渲染
 */
import { ref, computed } from 'vue'
import { bookStore } from '../stores/bookStore.js'
import { CATEGORIES } from '../utils/constants.js'

export function useBookFilter() {
  const filterVillage = ref('')
  const filterStatus = ref('')
  const filterCategory = ref('')

  const filterOptions = {
    villages: bookStore.villages,
    categories: CATEGORIES
  }

  const filteredBooks = computed(() => {
    let list = bookStore.books.value
    if (filterVillage.value)  list = list.filter(b => b.village === filterVillage.value)
    if (filterStatus.value)   list = list.filter(b => b.status === filterStatus.value)
    if (filterCategory.value) list = list.filter(b => b.category === filterCategory.value)
    return list
  })

  function resetFilters() {
    filterVillage.value = ''
    filterStatus.value = ''
    filterCategory.value = ''
  }

  return {
    filterVillage,
    filterStatus,
    filterCategory,
    filterOptions,
    filteredBooks,
    resetFilters
  }
}
