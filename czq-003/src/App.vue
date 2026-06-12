<template>
  <div class="app">
    <!-- 头部 -->
    <header class="app-header">
      <div class="app-header__top">
        <h1 class="app-header__title">🏘️ 乡村红白喜事互助记录板</h1>
        <div class="app-header__user">
          <label class="user-label">👤 我的名字：</label>
          <input
            v-model="userName"
            type="text"
            placeholder="输入您的姓名"
            class="user-input"
          />
        </div>
      </div>
      <div class="app-header__actions">
        <button class="header-btn header-btn--primary" @click="showEventForm = true">
          ➕ 登记事件
        </button>
        <button class="header-btn header-btn--gift" @click="showGiftRef = true">
          💰 随礼行情
        </button>
        <ExportButton
          target-selector="#export-area"
          filename="村级互助记录"
          button-text="导出记录图片"
        />
        <button class="header-btn header-btn--archive" @click="showArchive = true">
          📦 归档记录
          <span v-if="archivedEvents.length" class="badge">{{ archivedEvents.length }}</span>
        </button>
      </div>
    </header>

    <!-- 导出区域（包裹所有可视内容） -->
    <main id="export-area" class="app-main">
      <EventList />
    </main>

    <!-- 底部说明 -->
    <footer class="app-footer">
      <p>💡 提示：点击"登记事件"记录红白喜事，其他村民可以认领帮忙事项。数据保存在本地浏览器。</p>
    </footer>

    <!-- 弹窗组件 -->
    <EventForm
      :visible="showEventForm"
      @submit="handleCreateEvent"
      @close="showEventForm = false"
    />
    <GiftReference
      :visible="showGiftRef"
      @close="showGiftRef = false"
    />
    <ArchivePanel
      :visible="showArchive"
      @close="showArchive = false"
      @restore="handleRestoreFromArchive"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useEvents } from './composables/useEvents.js'
import { useUser } from './composables/useUser.js'
import EventList from './components/EventList.vue'
import EventForm from './components/EventForm.vue'
import GiftReference from './components/GiftReference.vue'
import ExportButton from './components/ExportButton.vue'
import ArchivePanel from './components/ArchivePanel.vue'

const { createEvent, archivedEvents, unarchiveEvent } = useEvents()
const { userName } = useUser()

const showEventForm = ref(false)
const showGiftRef = ref(false)
const showArchive = ref(false)

function handleCreateEvent(eventData) {
  createEvent(eventData)
  showEventForm.value = false
}

function handleRestoreFromArchive(eventId) {
  unarchiveEvent(eventId)
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: #f5f0eb;
  display: flex;
  flex-direction: column;
}

/* ===== Header ===== */
.app-header {
  background: linear-gradient(135deg, #c0392b, #8b2635);
  color: #fff;
  padding: 20px 24px 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  position: sticky;
  top: 0;
  z-index: 50;
}
.app-header__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 14px;
}
.app-header__title {
  margin: 0;
  font-size: 24px;
  letter-spacing: 2px;
}
.app-header__user {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.15);
  padding: 6px 14px;
  border-radius: 20px;
}
.user-label {
  font-size: 14px;
  white-space: nowrap;
}
.user-input {
  padding: 4px 10px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
  width: 120px;
  background: rgba(255,255,255,0.9);
}
.app-header__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.header-btn {
  padding: 10px 18px;
  border: none;
  border-radius: 24px;
  font-size: 15px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.header-btn--primary {
  background: #fff;
  color: #c0392b;
}
.header-btn--primary:hover {
  background: #fde8e8;
}
.header-btn--gift {
  background: rgba(255,255,255,0.2);
  color: #ffd700;
  border: 1px solid rgba(255,215,0,0.4);
}
.header-btn--archive {
  background: rgba(255,255,255,0.2);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.3);
}
.badge {
  background: #ffd700;
  color: #8b2635;
  padding: 1px 7px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
}

/* ===== Main ===== */
.app-main {
  flex: 1;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  padding: 16px 16px 24px;
  box-sizing: border-box;
}

/* ===== Footer ===== */
.app-footer {
  background: #4a3728;
  color: #d0c5b5;
  text-align: center;
  padding: 14px 16px;
  font-size: 14px;
}
.app-footer p {
  margin: 0;
}

@media (max-width: 600px) {
  .app-header { padding: 14px 12px 12px; }
  .app-header__title { font-size: 18px; }
  .header-btn { padding: 8px 14px; font-size: 13px; }
  .app-main { padding: 10px; }
}
</style>
