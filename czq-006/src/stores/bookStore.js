/**
 * 图书漂流核心数据存储
 * 采用 reactive 响应式状态 + localStorage 持久化
 * 所有数据操作集中在此模块，组件不直接操作 storage
 */
import { reactive, computed, watch } from 'vue'
import { storage } from '../utils/storage.js'
import { BOOK_STATUS, POINTS_RULES } from '../utils/constants.js'

// ---------- 状态初始化 ----------
const state = reactive({
  books: storage.getBooks(),
  users: storage.getUsers(),
  villages: storage.getVillages()
})

// ---------- 自动持久化 ----------
watch(() => state.books, (v) => storage.saveBooks(v), { deep: true })
watch(() => state.users, (v) => storage.saveUsers(v), { deep: true })
watch(() => state.villages, (v) => storage.saveVillages(v), { deep: true })

// ---------- 工具函数 ----------
let _nextBookId = Date.now()
let _nextUserId = Date.now() + 1
function uid() { return String(_nextBookId++) }
function uuid() { return String(_nextUserId++) }

function ensureUser(name, village) {
  let user = state.users.find(u => u.name === name)
  if (!user) {
    user = {
      id: uuid(),
      name,
      village: village || '',
      booksShared: 0,
      booksBorrowed: 0,
      reviewsWritten: 0
    }
    state.users.push(user)
  }
  return user
}

// ---------- 图书操作 ----------
export const bookStore = {
  // -- 查询 --
  books: computed(() => state.books),

  booksByVillage(village) {
    return computed(() =>
      village ? state.books.filter(b => b.village === village) : state.books
    )
  },

  booksByStatus(status) {
    return computed(() => state.books.filter(b => b.status === status))
  },

  getBookById(id) {
    return state.books.find(b => b.id === id)
  },

  // -- 新增图书 --
  addBook({ title, donor, category, location, village }) {
    const book = {
      id: uid(),
      title: title.trim(),
      donor: donor.trim(),
      category,
      location: location.trim(),
      village: village || state.villages[0] || '',
      status: BOOK_STATUS.AVAILABLE,
      borrower: null,
      borrowDate: null,
      expectedReturnDate: null,
      reviews: [],
      createdAt: new Date().toISOString()
    }
    state.books.unshift(book)

    const user = ensureUser(donor, book.village)
    user.booksShared++
    if (!user.village) user.village = book.village

    return book
  },

  // -- 借阅 --
  borrowBook(bookId, borrowerName, expectedReturnDate) {
    const book = state.books.find(b => b.id === bookId)
    if (!book || book.status !== BOOK_STATUS.AVAILABLE) return false

    book.status = BOOK_STATUS.BORROWED
    book.borrower = borrowerName.trim()
    book.borrowDate = new Date().toISOString().split('T')[0]
    book.expectedReturnDate = expectedReturnDate

    const user = ensureUser(borrowerName, book.village)
    user.booksBorrowed++
    if (!user.village) user.village = book.village

    return true
  },

  // -- 归还 --
  returnBook(bookId) {
    const book = state.books.find(b => b.id === bookId)
    if (!book || book.status !== BOOK_STATUS.BORROWED) return false

    book.status = BOOK_STATUS.AVAILABLE
    book.borrower = null
    book.borrowDate = null
    book.expectedReturnDate = null
    return true
  },

  // -- 删除图书 --
  deleteBook(bookId) {
    const idx = state.books.findIndex(b => b.id === bookId)
    if (idx === -1) return false
    state.books.splice(idx, 1)
    return true
  },

  // -- 书评 --
  addReview(bookId, userName, content) {
    const book = state.books.find(b => b.id === bookId)
    if (!book) return false

    book.reviews.push({
      user: userName.trim(),
      content: content.trim(),
      date: new Date().toISOString().split('T')[0]
    })

    const user = ensureUser(userName, book.village)
    user.reviewsWritten++
    if (!user.village) user.village = book.village

    return true
  },

  // -- 村庄管理 --
  villages: computed(() => state.villages),

  addVillage(name) {
    const trimmed = name.trim()
    if (trimmed && !state.villages.includes(trimmed)) {
      state.villages.push(trimmed)
      return true
    }
    return false
  },

  // -- 统计 --
  statsByVillage(village) {
    return computed(() => {
      const books = village
        ? state.books.filter(b => b.village === village)
        : state.books

      const categoryCount = {}
      books.forEach(b => {
        categoryCount[b.category] = (categoryCount[b.category] || 0) + 1
      })

      const total = books.length
      const available = books.filter(b => b.status === BOOK_STATUS.AVAILABLE).length
      const borrowed = total - available

      return { total, available, borrowed, categoryCount }
    })
  },

  // -- 阅读之星 --
  leaderboard(village) {
    return computed(() => {
      let list = village
        ? state.users.filter(u => u.village === village)
        : [...state.users]

      return list
        .map(u => {
          const points = u.booksShared * POINTS_RULES.SHARE_BOOK
                       + u.booksBorrowed * POINTS_RULES.BORROW_BOOK
                       + u.reviewsWritten * POINTS_RULES.WRITE_REVIEW
          return { ...u, points }
        })
        .filter(u => u.points > 0)
        .sort((a, b) => b.points - a.points)
    })
  }
}
