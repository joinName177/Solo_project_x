/**
 * 价格计算工具
 * 职责：价格比较、环比计算等纯函数
 */

/**
 * 计算某日价格相对于前一天/前一周的涨跌
 * @param {Array} records - 全部价格记录（按日期升序）
 * @param {string} cropName - 目标作物名
 * @returns {{ yesterday: object | null, lastWeek: object | null }}
 */
export function calcComparison(records, cropName) {
  const filtered = records
    .filter(r => r.cropName === cropName)
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  if (filtered.length < 2) {
    return { yesterday: null, lastWeek: null }
  }

  const latest = filtered[filtered.length - 1]
  const yesterday = findClosest(filtered, latest, 1)
  const lastWeek = findClosest(filtered, latest, 7)

  return {
    yesterday: yesterday ? buildDiff(latest, yesterday, '较昨日') : null,
    lastWeek: lastWeek ? buildDiff(latest, lastWeek, '较上周') : null,
  }
}

function findClosest(sortedRecords, target, dayDiff) {
  const targetDate = new Date(target.date)
  targetDate.setDate(targetDate.getDate() - dayDiff)
  const targetStr = targetDate.toISOString().slice(0, 10)

  let closest = null
  for (let i = sortedRecords.length - 1; i >= 0; i--) {
    const d = sortedRecords[i].date
    if (d <= targetStr && d !== target.date) {
      if (!closest || d > closest.date) {
        closest = sortedRecords[i]
      }
    }
  }
  return closest
}

function buildDiff(current, previous, label) {
  const diff = current.price - previous.price
  const percent = previous.price !== 0
    ? ((diff / previous.price) * 100).toFixed(1)
    : '0.0'

  return {
    label,
    diff: Math.round(diff * 100) / 100,
    percent: parseFloat(percent),
    direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'same',
  }
}

/**
 * 获取最近30天的价格数据（用于图表）
 * @param {Array} records
 * @param {string} cropName
 * @param {string} location - 可选，按地点筛选
 * @returns {Array<{date: string, price: number}>}
 */
export function getPriceTrend30Days(records, cropName, location = null) {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const cutoff = thirtyDaysAgo.toISOString().slice(0, 10)

  return records
    .filter(r => {
      if (r.cropName !== cropName) return false
      if (r.date < cutoff) return false
      if (location && r.location !== location) return false
      return true
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(r => ({ date: r.date, price: r.price }))
}

/**
 * 检查是否有价格达到或超过目标价
 * @param {Array} recentRecords - 最近的记录
 * @param {Object} targetPrices - { cropName: targetPrice }
 * @returns {Array<{cropName: string, price: number, target: number}>}
 */
export function checkTargetAlerts(recentRecords, targetPrices) {
  const alerts = []
  const seen = new Set()

  for (const r of recentRecords) {
    const key = r.cropName
    if (seen.has(key)) continue
    const target = targetPrices[key]
    if (target !== undefined && target !== null && r.price >= target) {
      seen.add(key)
      alerts.push({ cropName: r.cropName, price: r.price, target })
    }
  }
  return alerts
}
