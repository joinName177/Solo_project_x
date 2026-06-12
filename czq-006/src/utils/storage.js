/**
 * localStorage 封装层
 * 统一管理序列化/反序列化，提供类型安全的读写接口
 */

const STORAGE_KEYS = {
  BOOKS: 'village_books',
  USERS: 'village_users',
  VILLAGES: 'village_list'
}

function read(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export const storage = {
  getBooks() {
    return read(STORAGE_KEYS.BOOKS, [])
  },

  saveBooks(books) {
    return write(STORAGE_KEYS.BOOKS, books)
  },

  getUsers() {
    return read(STORAGE_KEYS.USERS, [])
  },

  saveUsers(users) {
    return write(STORAGE_KEYS.USERS, users)
  },

  getVillages() {
    return read(STORAGE_KEYS.VILLAGES, ['向阳村', '桃花村', '柳树村'])
  },

  saveVillages(villages) {
    return write(STORAGE_KEYS.VILLAGES, villages)
  }
}
