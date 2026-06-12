/**
 * 通用弹窗管理 composable
 *
 * 职责：
 * - 管理弹窗的显示/隐藏状态
 * - 管理弹窗关联的数据载荷
 * - 提供统一的 open / close / toggle 接口
 *
 * 解耦：将弹窗状态从组件中抽离，组件只需消费 useModal 实例
 */
import { reactive, toRefs } from 'vue'

/**
 * 创建一个弹窗状态管理器
 * @param {*} initialData - 弹窗数据初始值
 * @returns {{ visible, data, open, close, toggle }}
 */
export function useModal(initialData = null) {
  const state = reactive({
    visible: false,
    data: initialData,
  })

  function open(data = null) {
    state.visible = true
    if (data !== null) {
      state.data = data
    }
  }

  function close() {
    state.visible = false
    // 延迟清空数据，避免关闭动画期间数据消失
    setTimeout(() => {
      state.data = initialData
    }, 200)
  }

  function toggle() {
    state.visible = !state.visible
  }

  return {
    ...toRefs(state),
    open,
    close,
    toggle,
  }
}
