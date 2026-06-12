<template>
  <div class="app">
    <!-- 顶部导航 -->
    <AppHeader
      :active-tab="activeTab"
      :tabs="navTabs"
      @update:active-tab="activeTab = $event"
    />

    <!-- 主内容区 -->
    <main class="main-content">
      <div class="container">
        <!-- ========== 服务墙（首页） ========== -->
        <section v-show="activeTab === 'board'" class="board-page">
          <!-- 操作栏 -->
          <div class="board-actions">
            <button class="btn btn-primary btn-lg" @click="showForm = true">
              🧑‍🔧 我要入驻
            </button>
            <button class="btn btn-outline btn-lg" @click="activeTab = 'leaderboard'">
              🏆 查看排行榜
            </button>
          </div>

          <!-- 筛选栏 -->
          <FilterBar
            :craft-type="filters.craftType.value"
            :village="filters.village.value"
            :keyword="filters.keyword.value"
            :show-available-only="filters.showAvailableOnly.value"
            :result-count="filters.resultCount.value"
            @update:craft-type="filters.craftType.value = $event"
            @update:village="filters.village.value = $event"
            @update:keyword="filters.keyword.value = $event"
            @update:show-available-only="filters.showAvailableOnly.value = $event"
            @reset="filters.resetFilters()"
          />

          <!-- 手艺人卡片网格 -->
          <div v-if="filters.filteredList.value.length > 0" class="card-grid">
            <CraftsmanCard
              v-for="c in filters.filteredList.value"
              :key="c.id"
              :craftsman="c"
              @click="openDetail"
            />
          </div>
          <div v-else class="empty-state">
            <p class="empty-icon">📭</p>
            <p>{{ craftsmen.craftsmen.value.length === 0 ? '还没有手艺人入驻，快来成为第一位吧！' : '没有找到匹配的手艺人' }}</p>
            <button v-if="craftsmen.craftsmen.value.length === 0" class="btn btn-primary" @click="showForm = true">
              成为第一位入驻手艺人
            </button>
          </div>
        </section>

        <!-- ========== 排行榜页 ========== -->
        <section v-show="activeTab === 'leaderboard'" class="leaderboard-page">
          <LeaderBoard
            :composite-ranking="leaderboard.compositeRanking.value"
            :orders-ranking="leaderboard.ordersRanking.value"
            :rating-ranking="leaderboard.ratingRanking.value"
            @select="openDetail"
          />
        </section>
      </div>
    </main>

    <!-- ========== 弹窗 ========== -->

    <!-- 入驻表单 -->
    <CraftsmanForm
      v-model="showForm"
      @submit="handleFormSubmit"
    />

    <!-- 详情弹窗 -->
    <CraftsmanDetail
      v-model="showDetail"
      :craftsman="selectedCraftsman"
      @toggle-status="handleToggleStatus"
      @complete-order="handleCompleteOrder"
      @rate="handleRateClick"
      @delete="handleDeleteClick"
    />

    <!-- 评价表单 -->
    <RatingForm
      v-model="showRating"
      :craftsman-name="selectedCraftsman?.name || ''"
      @submit="handleRatingSubmit"
    />

    <!-- 删除确认 -->
    <ConfirmDialog
      v-model="showDeleteConfirm"
      title="删除确认"
      message="确定要删除这位手艺人吗？此操作不可恢复。"
      confirm-text="确认删除"
      confirm-class="btn-danger"
      @confirm="handleDeleteConfirm"
      @cancel="pendingDeleteId = null"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 布局组件
import AppHeader from './components/layout/AppHeader.vue'

// 业务组件
import CraftsmanCard from './components/craftsman/CraftsmanCard.vue'
import CraftsmanForm from './components/craftsman/CraftsmanForm.vue'
import CraftsmanDetail from './components/craftsman/CraftsmanDetail.vue'
import FilterBar from './components/filter/FilterBar.vue'
import RatingForm from './components/rating/RatingForm.vue'
import LeaderBoard from './components/leaderboard/LeaderBoard.vue'
import ConfirmDialog from './components/common/ConfirmDialog.vue'

// 数据层
import { useCraftsmen } from './composables/useCraftsmen'
import { useFilters } from './composables/useFilters'
import { useRatings } from './composables/useRatings'
import { useLeaderboard } from './composables/useLeaderboard'

// ==================== 数据层初始化 ====================
const craftsmen = useCraftsmen()
const filters = useFilters(craftsmen.craftsmen)
const ratings = useRatings(
  (id) => craftsmen.getById(id),
  (id, updates) => craftsmen.updateCraftsman(id, updates)
)
const leaderboard = useLeaderboard(craftsmen.craftsmen)

// ==================== UI 状态 ====================
const activeTab = ref('board')
const showForm = ref(false)
const showDetail = ref(false)
const showRating = ref(false)
const showDeleteConfirm = ref(false)
const selectedCraftsman = ref(null)
const pendingDeleteId = ref(null)

const navTabs = computed(() => [
  { key: 'board', label: '服务墙', icon: '📋', count: craftsmen.availableList.value.length },
  { key: 'leaderboard', label: '排行榜', icon: '🏆' }
])

// ==================== 事件处理 ====================

/** 打开详情 */
function openDetail(id) {
  selectedCraftsman.value = craftsmen.getById(id) || null
  if (selectedCraftsman.value) {
    showDetail.value = true
  }
}

/** 处理入驻表单提交 */
function handleFormSubmit(formData) {
  craftsmen.addCraftsman(formData)
}

/** 切换手艺人状态 */
function handleToggleStatus(id) {
  craftsmen.toggleStatus(id)
  // 更新详情中的引用
  selectedCraftsman.value = craftsmen.getById(id) || null
}

/** 完成一单 */
function handleCompleteOrder(id) {
  craftsmen.incrementOrderCount(id)
  selectedCraftsman.value = craftsmen.getById(id) || null
}

/** 打开评价弹窗 */
function handleRateClick(id) {
  selectedCraftsman.value = craftsmen.getById(id) || null
  if (selectedCraftsman.value) {
    showRating.value = true
  }
}

/** 提交评价 */
function handleRatingSubmit(ratingData) {
  if (selectedCraftsman.value) {
    ratings.addRating(selectedCraftsman.value.id, ratingData)
    selectedCraftsman.value = craftsmen.getById(selectedCraftsman.value.id) || null
  }
}

/** 删除确认 */
function handleDeleteClick(id) {
  pendingDeleteId.value = id
  showDeleteConfirm.value = true
}

function handleDeleteConfirm() {
  if (pendingDeleteId.value) {
    craftsmen.removeCraftsman(pendingDeleteId.value)
    pendingDeleteId.value = null
    showDetail.value = false
  }
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1;
  padding: 1.25rem;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* 服务墙操作栏 */
.board-actions {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

/* 卡片网格 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

/* 排行榜页 */
.leaderboard-page {
  max-width: 700px;
  margin: 0 auto;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #8d6e63;
}
.empty-icon {
  font-size: 4rem;
  margin: 0 0 0.5rem;
}
.empty-state p {
  margin: 0.5rem 0;
  font-size: 1rem;
}
</style>
