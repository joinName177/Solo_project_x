/**
 * 积分计算工具
 * 集中管理积分规则，避免散落在组件中
 */
import { POINTS_RULES } from './constants.js'

export function calcSharePoints(count) {
  return count * POINTS_RULES.SHARE_BOOK
}

export function calcBorrowPoints(count) {
  return count * POINTS_RULES.BORROW_BOOK
}

export function calcReviewPoints(count) {
  return count * POINTS_RULES.WRITE_REVIEW
}

export function calcTotalPoints(user) {
  if (!user) return 0
  return calcSharePoints(user.booksShared || 0)
       + calcBorrowPoints(user.booksBorrowed || 0)
       + calcReviewPoints(user.reviewsWritten || 0)
}
