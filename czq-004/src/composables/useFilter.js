/**
 * 筛选逻辑 composable
 *
 * 职责：
 * - 管理当前筛选状态（工作类型、零工类型、完成状态）
 * - 提供筛选后的结果
 * - 解耦筛选状态与展示逻辑
 */
import { reactive, computed, toRefs } from 'vue'

const state = reactive({
  /** 选中的工作类型（空字符串 = 全部） */
  selectedWorkType: '',
  /** 选中的零工类型（空字符串 = 全部） */
  selectedGigType: '',
  /** 是否只显示进行中的 */
  showActiveOnly: false,
})

/**
 * @param {import('vue').Ref<Array>} gigsRef - 零工列表的响应式引用
 */
export function useFilter(gigsRef) {
  const { selectedWorkType, selectedGigType, showActiveOnly } = toRefs(state)

  /** 筛选后的零工列表 */
  const filteredGigs = computed(() => {
    let result = gigsRef.value

    if (selectedWorkType.value) {
      result = result.filter((g) => g.workType === selectedWorkType.value)
    }

    if (selectedGigType.value) {
      result = result.filter((g) => g.type === selectedGigType.value)
    }

    if (showActiveOnly.value) {
      result = result.filter((g) => !g.completed)
    }

    // 按发布时间倒序
    return [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  })

  function setWorkType(type) {
    state.selectedWorkType = state.selectedWorkType === type ? '' : type
  }

  function setGigType(type) {
    state.selectedGigType = state.selectedGigType === type ? '' : type
  }

  function toggleActiveOnly() {
    state.showActiveOnly = !state.showActiveOnly
  }

  function resetFilters() {
    state.selectedWorkType = ''
    state.selectedGigType = ''
    state.showActiveOnly = false
  }

  return {
    // 状态
    selectedWorkType,
    selectedGigType,
    showActiveOnly,
    // 计算属性
    filteredGigs,
    // 方法
    setWorkType,
    setGigType,
    toggleActiveOnly,
    resetFilters,
  }
}
