<!--
  应用根组件
  职责：
  - 初始化数据层（useGigs）
  - 协调各子组件：表单 → 筛选 → 列表
  - 管理全局交互：删除确认、联系卡片弹窗、信誉互评
-->
<template>
  <div class="app-container">
    <AppHeader />

    <main class="app-main">
      <!-- 发布表单 -->
      <section class="section-form">
        <h2 class="section-title">📝 发布信息</h2>
        <GigForm @submit="handleAddGig" />
      </section>

      <!-- 筛选栏 -->
      <section class="section-filter">
        <h2 class="section-title">🔍 筛选信息</h2>
        <GigFilter
          :selected-work-type="selectedWorkType"
          :selected-gig-type="selectedGigType"
          :show-active-only="showActiveOnly"
          @select-work-type="setWorkType"
          @select-gig-type="setGigType"
          @toggle-active-only="toggleActiveOnly"
          @reset="resetFilters"
        />
      </section>

      <!-- 零工列表 -->
      <section class="section-list">
        <GigList
          :gigs="filteredGigs"
          :active-count="activeCount"
          :has-filters="hasActiveFilters"
          :get-reputation-score="(id) => reputation.getScore(id)"
          :check-endorsed="(id) => checkEndorsed(id)"
          @endorse="handleEndorse"
          @contact="showContactCard"
          @toggle-complete="handleToggleComplete"
          @delete="handleDelete"
        />
      </section>
    </main>

    <AppFooter />

    <!-- 联系卡片弹窗 -->
    <Modal
      :visible="contactVisible"
      title="📇 联系卡片（可截图分享）"
      size="medium"
      @close="closeContact"
    >
      <template v-if="contactData">
        <ContactCard
          :gig="contactData"
          :reputation-score="reputation.getScore(contactData.id)"
        />
      </template>
      <template #footer>
        <button class="btn-close-modal" @click="closeContact">关闭</button>
      </template>
    </Modal>

    <!-- 删除确认弹窗 -->
    <Modal
      :visible="deleteVisible"
      title="确认删除"
      size="small"
      @close="closeDelete"
    >
      <p style="text-align:center;color:#5d4037;">确定要删除这条信息吗？操作不可恢复。</p>
      <template #footer>
        <button class="btn-cancel" @click="closeDelete">取消</button>
        <button class="btn-confirm-delete" @click="confirmDelete">确认删除</button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import GigForm from './components/gig/GigForm.vue'
import GigFilter from './components/gig/GigFilter.vue'
import GigList from './components/gig/GigList.vue'
import ContactCard from './components/gig/ContactCard.vue'
import Modal from './components/common/Modal.vue'
import { useGigs } from './composables/useGigs.js'
import { useReputation } from './composables/useReputation.js'
import { useFilter } from './composables/useFilter.js'
import { useModal } from './composables/useModal.js'

// ================================================================
// 数据层 — 零工 CRUD + 信誉系统
// ================================================================
const { gigs, activeCount, addGig, removeGig, toggleComplete, getGigById } = useGigs()
const reputation = useReputation()

// ================================================================
// 筛选层 — 筛选状态与逻辑
// ================================================================
const {
  selectedWorkType,
  selectedGigType,
  showActiveOnly,
  filteredGigs,
  setWorkType,
  setGigType,
  toggleActiveOnly,
  resetFilters,
} = useFilter(gigs)

/** 是否有任意筛选条件激活（响应式计算属性） */
const hasActiveFilters = computed(() =>
  selectedWorkType.value !== '' || selectedGigType.value !== '' || showActiveOnly.value
)

// ================================================================
// 弹窗层 — 联系卡片 & 删除确认
// ================================================================
const {
  visible: contactVisible,
  data: contactData,
  open: openContact,
  close: closeContact
} = useModal(null)

const {
  visible: deleteVisible,
  data: deleteData,
  open: openDelete,
  close: closeDelete
} = useModal(null)

function showContactCard(gig) {
  openContact(gig)
}

function handleDelete(gigId) {
  openDelete(gigId)
}

function confirmDelete() {
  if (deleteData.value) {
    removeGig(deleteData.value)
  }
  closeDelete()
}

// ================================================================
// 事件处理 — 发布 / 状态切换 / 信誉
// ================================================================
function handleAddGig(data) {
  addGig(data)
}

function handleToggleComplete(gigId) {
  toggleComplete(gigId)
}

function handleEndorse(gigId) {
  const gig = getGigById(gigId)
  if (!gig) return

  const result = reputation.endorse({
    giverId: 'user-' + Date.now().toString(36),
    receiverId: gigId,
    gigId,
  })

  if (!result.success) {
    alert(result.message)
  }
}

function checkEndorsed(_gigId) {
  // 简化实现：始终返回 false 允许多次互评
  return false
}
</script>

<style scoped>
.app-container {
  max-width: 760px;
  margin: 0 auto;
  padding: 20px 16px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.app-main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #4e342e;
  margin: 0 0 12px;
  padding-left: 8px;
  border-left: 4px solid #8d6e63;
}

/* 弹窗按钮 */
.btn-close-modal {
  padding: 8px 24px;
  background: #5d4037;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-close-modal:hover {
  background: #4e342e;
}
.btn-cancel {
  padding: 8px 20px;
  background: #fffef7;
  color: #5d4037;
  border: 1px solid #d7ccc8;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}
.btn-cancel:hover {
  background: #efebe9;
}
.btn-confirm-delete {
  padding: 8px 20px;
  background: #c62828;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-confirm-delete:hover {
  background: #b71c1c;
}
</style>
