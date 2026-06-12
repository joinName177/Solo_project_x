/**
 * localStorage 存储服务
 * 职责：所有数据的持久化读写，封装序列化/反序列化逻辑
 */
const STORAGE_KEYS = {
  PET_DATA: 'pet_translator_data',
};

/** 生成唯一 ID */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** 从 localStorage 读取所有宠物数据 */
function loadAllPetData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PET_DATA);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/** 保存全部宠物数据到 localStorage */
function saveAllPetData(dataList) {
  try {
    localStorage.setItem(STORAGE_KEYS.PET_DATA, JSON.stringify(dataList));
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      console.error('localStorage 空间不足');
    }
    return false;
  }
}

/** 新增一条宠物翻译记录 */
function addPetEntry(entry) {
  const data = loadAllPetData();
  const newEntry = {
    ...entry,
    id: generateId(),
    likes: 0,
    timestamp: Date.now(),
  };
  data.unshift(newEntry);
  saveAllPetData(data);
  return newEntry;
}

/** 更新指定记录 */
function updatePetEntry(id, updates) {
  const data = loadAllPetData();
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) return null;
  data[index] = { ...data[index], ...updates };
  saveAllPetData(data);
  return data[index];
}

/** 删除指定记录 */
function deletePetEntry(id) {
  const data = loadAllPetData();
  const filtered = data.filter((item) => item.id !== id);
  saveAllPetData(filtered);
}

/** 点赞 */
function toggleLike(id) {
  const data = loadAllPetData();
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) return null;
  data[index].likes = (data[index].likes || 0) + 1;
  saveAllPetData(data);
  return data[index];
}

/** 导出全部数据为 JSON 字符串 */
function exportAllData() {
  const data = loadAllPetData();
  return JSON.stringify(data, null, 2);
}

/** 获取存储使用情况 */
function getStorageInfo() {
  const data = loadAllPetData();
  let usedBytes = 0;
  try {
    usedBytes = new Blob([JSON.stringify(data)]).size;
  } catch { /* ignore */ }
  const totalBytes = 5 * 1024 * 1024; // 约 5MB localStorage 上限
  return {
    count: data.length,
    usedBytes,
    totalBytes,
    usagePercent: ((usedBytes / totalBytes) * 100).toFixed(2),
  };
}

export {
  loadAllPetData,
  saveAllPetData,
  addPetEntry,
  updatePetEntry,
  deletePetEntry,
  toggleLike,
  exportAllData,
  getStorageInfo,
  generateId,
};
