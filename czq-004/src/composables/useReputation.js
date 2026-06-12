/**
 * 信誉系统 composable
 *
 * 职责：
 * - 管理信誉分的读写（localStorage 持久化）
 * - 提供"互点靠谱"功能：同一对供需双方只能互评一次
 * - 返回指定零工关联的所有靠谱记录
 */
import { reactive, computed } from 'vue'
import { read, write } from '../utils/storage.js'
import { STORAGE_KEYS } from '../utils/constants.js'

/** @typedef {{ giverId: string, receiverId: string, gigId: string, timestamp: string }} ReputationRecord */

const state = reactive({
  /** @type {ReputationRecord[]} */
  records: read(STORAGE_KEYS.REPUTATION, []),
})

function persist() {
  write(STORAGE_KEYS.REPUTATION, state.records)
}

/**
 * 获取某条零工信息发布者的信誉分
 * 计算方式：所有与该发布者相关的"靠谱"记录数
 * @param {string} gigId - 零工 ID（用零工 ID 代表发布者）
 */
export function useReputation() {
  /** 所有靠谱记录 */
  const records = computed(() => state.records)

  /**
   * 获取指定零工的信誉分
   * @param {string} gigId
   * @returns {number}
   */
  function getScore(gigId) {
    return state.records.filter((r) => r.receiverId === gigId).length
  }

  /**
   * 为一条零工信息增加靠谱分
   * @param {{ giverId: string, receiverId: string, gigId: string }} params
   * @returns {{ success: boolean, message: string }}
   */
  function endorse({ giverId, receiverId, gigId }) {
    // 不允许给自己点靠谱
    if (giverId === receiverId) {
      return { success: false, message: '不能给自己点靠谱哦' }
    }

    // 检查是否已经点过（同一对供需双方 + 同一零工）
    const alreadyEndorsed = state.records.some(
      (r) => r.giverId === giverId && r.receiverId === receiverId && r.gigId === gigId,
    )
    if (alreadyEndorsed) {
      return { success: false, message: '你已经给这条信息点过靠谱了' }
    }

    state.records.push({
      giverId,
      receiverId,
      gigId,
      timestamp: new Date().toISOString(),
    })
    persist()
    return { success: true, message: '靠谱+1！' }
  }

  return {
    records,
    getScore,
    endorse,
  }
}
