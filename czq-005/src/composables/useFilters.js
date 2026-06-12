import { ref, computed } from 'vue'
import { filterCraftsmen, sortByAvailability } from '../utils/helpers'

/**
 * 筛选逻辑封装
 * 独立管理筛选状态和筛选结果，与手艺人数据解耦
 *
 * @param {import('vue').Ref<Array>} craftsmenRef - 手艺人列表的响应式引用
 */
export function useFilters(craftsmenRef) {
  // ========== 筛选状态 ==========
  const craftType = ref('')
  const village = ref('')
  const keyword = ref('')
  const showAvailableOnly = ref(false)

  // ========== 筛选结果 ==========
  const filteredList = computed(() => {
    let result = craftsmenRef.value

    // 应用多维度筛选
    result = filterCraftsmen(result, {
      craftType: craftType.value,
      village: village.value,
      keyword: keyword.value
    })

    // 仅显示可接单
    if (showAvailableOnly.value) {
      result = result.filter((c) => c.status === 'available')
    }

    // 可接单优先排序
    return sortByAvailability(result)
  })

  /** 筛选结果数量 */
  const resultCount = computed(() => filteredList.value.length)

  // ========== 操作方法 ==========

  /**
   * 重置所有筛选条件
   */
  function resetFilters() {
    craftType.value = ''
    village.value = ''
    keyword.value = ''
    showAvailableOnly.value = false
  }

  /**
   * 设置筛选条件（批量）
   * @param {Object} filters
   */
  function setFilters(filters) {
    if (filters.craftType !== undefined) craftType.value = filters.craftType
    if (filters.village !== undefined) village.value = filters.village
    if (filters.keyword !== undefined) keyword.value = filters.keyword
    if (filters.showAvailableOnly !== undefined) showAvailableOnly.value = filters.showAvailableOnly
  }

  return {
    // 状态
    craftType,
    village,
    keyword,
    showAvailableOnly,
    // 结果
    filteredList,
    resultCount,
    // 操作
    resetFilters,
    setFilters
  }
}
