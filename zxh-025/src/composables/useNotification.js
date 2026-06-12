/**
 * 通知提醒 composable
 * 职责：目标价红点通知的状态管理
 */
import { ref, watch } from 'vue'
import { checkTargetAlerts } from '../utils/calculator.js'

export function useNotification(records, targetPrices) {
  const hasAlerts = ref(false)
  const alertList = ref([])

  function refresh() {
    // 只检查最近7天的新记录
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const cutoff = sevenDaysAgo.toISOString().slice(0, 10)

    const recent = records.value.filter(r => r.date >= cutoff)
    const alerts = checkTargetAlerts(recent, targetPrices.value)
    alertList.value = alerts
    hasAlerts.value = alerts.length > 0
  }

  // 数据变化时自动检查
  watch([records, targetPrices], refresh, { deep: true, immediate: true })

  function clearAlerts() {
    hasAlerts.value = false
    alertList.value = []
  }

  return { hasAlerts, alertList, refresh, clearAlerts }
}
