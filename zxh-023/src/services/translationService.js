/**
 * 翻译服务
 * 职责：组合 memeLibrary 和 storageService，提供业务操作
 */
import {
  getRandomText,
  getRandomFunnyText,
  getMemeEmoji,
  getRandomPetType,
  getRandomEmotion,
} from './memeLibrary';
import { addPetEntry, loadAllPetData, toggleLike, deletePetEntry } from './storageService';

/**
 * 生成一条标准翻译
 * @param {string} petType - 'cat' | 'dog'
 * @param {string} emotion - 情绪 key
 * @returns 翻译结果对象
 */
function generateTranslation(petType, emotion) {
  const text = getRandomText(petType, emotion);
  const emoji = getMemeEmoji(petType, emotion);
  return { petType, emotion, translationText: text, memeEmoji: emoji };
}

/**
 * 生成一条随机翻译（无厘头模式）
 * @returns 翻译结果对象
 */
function generateRandomTranslation() {
  const petType = getRandomPetType();
  const emotion = getRandomEmotion();
  const text = getRandomFunnyText();
  const emoji = getMemeEmoji(petType, emotion);
  return { petType, emotion, translationText: text, memeEmoji: emoji, isRandom: true };
}

/**
 * 创建用户上传的宠物翻译
 * @param {object} params
 * @returns 创建的记录
 */
function createUserTranslation({ petType, emotion, customText, petPhoto, petName }) {
  const emoji = getMemeEmoji(petType, emotion);
  return addPetEntry({
    petType,
    emotion,
    translationText: customText || getRandomText(petType, emotion),
    memeEmoji: emoji,
    petPhoto: petPhoto || null,
    petName: petName || '未命名',
    isUserUpload: true,
  });
}

/**
 * 保存翻译结果到历史
 */
function saveTranslationToHistory(translation) {
  return addPetEntry({
    ...translation,
    isUserUpload: false,
  });
}

/** 获取所有历史记录 */
function getHistory() {
  return loadAllPetData();
}

/** 获取画廊数据（仅用户上传的） */
function getGallery() {
  return loadAllPetData().filter((item) => item.isUserUpload);
}

/** 点赞 */
function likeTranslation(id) {
  return toggleLike(id);
}

/** 删除记录 */
function removeTranslation(id) {
  deletePetEntry(id);
}

export {
  generateTranslation,
  generateRandomTranslation,
  createUserTranslation,
  saveTranslationToHistory,
  getHistory,
  getGallery,
  likeTranslation,
  removeTranslation,
};
