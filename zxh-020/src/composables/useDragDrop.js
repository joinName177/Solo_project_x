/**
 * 拖拽逻辑
 * 使用 Pointer Events 实现跨平台拖拽
 * 支持拖拽移动和点击选择两种操作模式
 */
import { ref, computed } from 'vue'

export function useDragDrop(options = {}) {
  const { gameBoardRef, onDrop } = options

  const draggingBikeId = ref(null)
  const dragOffset = ref({ x: 0, y: 0 })
  const dragPosition = ref({ x: 0, y: 0 })
  const isDragging = ref(false)
  const selectedBikeId = ref(null) // 点击选择模式

  const dragStyle = computed(() => {
    if (!isDragging.value) return { display: 'none' }
    return {
      left: `${dragPosition.value.x}px`,
      top: `${dragPosition.value.y}px`,
    }
  })

  /**
   * 获取元素相对于游戏面板的坐标
   */
  function getRelativePosition(clientX, clientY) {
    if (!gameBoardRef?.value) return { x: clientX, y: clientY }
    const rect = gameBoardRef.value.getBoundingClientRect()
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  /**
   * 开始拖拽
   */
  function startDrag(bikeId, event) {
    event.preventDefault()
    const pointerEvent = event.type.includes('touch') ? event.touches?.[0] || event : event
    const rel = getRelativePosition(pointerEvent.clientX, pointerEvent.clientY)

    draggingBikeId.value = bikeId
    selectedBikeId.value = null
    isDragging.value = true
    dragOffset.value = { x: 20, y: 20 } // 手指/鼠标偏移到单车中心
    dragPosition.value = {
      x: rel.x - dragOffset.value.x,
      y: rel.y - dragOffset.value.y,
    }
  }

  /**
   * 拖拽移动中
   */
  function onDragMove(event) {
    if (!isDragging.value) return
    event.preventDefault()
    const pointerEvent = event.type.includes('touch') ? event.touches?.[0] || event : event
    const rel = getRelativePosition(pointerEvent.clientX, pointerEvent.clientY)
    dragPosition.value = {
      x: rel.x - dragOffset.value.x,
      y: rel.y - dragOffset.value.y,
    }
  }

  /**
   * 结束拖拽
   */
  function endDrag(event) {
    if (!isDragging.value) return
    event.preventDefault()

    const pointerEvent = event.type.includes('touch')
      ? event.changedTouches?.[0] || event
      : event
    const rel = getRelativePosition(pointerEvent.clientX, pointerEvent.clientY)

    const bikeId = draggingBikeId.value
    const dropX = rel.x
    const dropY = rel.y

    isDragging.value = false
    draggingBikeId.value = null

    if (onDrop && bikeId) {
      onDrop(bikeId, dropX, dropY)
    }
  }

  /**
   * 点击选择模式：点击单车选中，再点击目标位置放置
   */
  function selectBike(bikeId) {
    if (isDragging.value) return
    if (selectedBikeId.value === bikeId) {
      selectedBikeId.value = null // 取消选择
    } else {
      selectedBikeId.value = bikeId
    }
  }

  /**
   * 点击游戏面板放置选中的单车
   */
  function clickToPlace(event) {
    if (!selectedBikeId.value) return
    const rel = getRelativePosition(event.clientX, event.clientY)
    const bikeId = selectedBikeId.value
    selectedBikeId.value = null

    if (onDrop && bikeId) {
      onDrop(bikeId, rel.x, rel.y)
    }
  }

  function cancelDrag() {
    isDragging.value = false
    draggingBikeId.value = null
    selectedBikeId.value = null
  }

  return {
    draggingBikeId,
    dragPosition,
    isDragging,
    dragStyle,
    selectedBikeId,
    startDrag,
    onDragMove,
    endDrag,
    selectBike,
    clickToPlace,
    cancelDrag,
  }
}
