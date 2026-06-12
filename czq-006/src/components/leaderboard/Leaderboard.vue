<template>
  <div class="leaderboard">
    <div class="leaderboard-header">
      <h2>⭐ 乡村阅读之星</h2>
      <div class="village-filter">
        <select v-model="selectedVillage" class="village-select">
          <option value="">全部村庄</option>
          <option v-for="v in villages" :key="v" :value="v">{{ v }}</option>
        </select>
      </div>
    </div>

    <!-- 前三名光荣榜 -->
    <div v-if="top3.length" class="podium">
      <div v-for="(user, i) in top3" :key="user.id"
        :class="['podium-item', `rank-${i + 1}`]">
        <div class="podium-rank">{{ ['🥇', '🥈', '🥉'][i] }}</div>
        <div class="podium-name">{{ user.name }}</div>
        <div class="podium-village">🏘️ {{ user.village }}</div>
        <div class="podium-points">{{ user.points }} 积分</div>
      </div>
    </div>

    <!-- 完整榜单 -->
    <div class="full-list">
      <div
        v-for="(user, i) in fullList"
        :key="user.id"
        class="list-row"
      >
        <span class="list-rank">#{{ i + 1 }}</span>
        <span class="list-name">{{ user.name }}</span>
        <span class="list-village">🏘️ {{ user.village }}</span>
        <span class="list-detail">
          📚{{ user.booksShared }} 🤝{{ user.booksBorrowed }} ✍️{{ user.reviewsWritten }}
        </span>
        <span class="list-points">{{ user.points }}分</span>
      </div>
    </div>

    <div v-if="!fullList.length" class="empty-state">
      <div class="empty-icon">📭</div>
      <p>还没有阅读之星，快去登记图书和借阅吧！</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { bookStore } from '../../stores/bookStore.js'

const villages = bookStore.villages
const selectedVillage = ref('')

const list = computed(() => bookStore.leaderboard(selectedVillage.value).value)

const top3 = computed(() => list.value.slice(0, 3))
const fullList = computed(() => list.value)
</script>

<style scoped>
.leaderboard { display: flex; flex-direction: column; gap: 1.5rem; }

.leaderboard-header {
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 0.5rem;
}
.leaderboard-header h2 {
  margin: 0; color: #4A2C0A; font-family: "KaiTi","楷体",serif;
}
.village-select {
  padding: 0.4rem 0.8rem; border: 2px solid #d4b896; border-radius: 8px;
  background: #fff; color: #5D3A1A; font-size: 0.9rem;
}

/* --- 光荣榜 --- */
.podium { display: flex; justify-content: center; align-items: flex-end; gap: 1.5rem; flex-wrap: wrap; }
.podium-item {
  text-align: center; padding: 1.2rem 1.5rem;
  border-radius: 16px; min-width: 160px;
  border: 2px solid #d4b896; background: #fef9f2;
  box-shadow: 2px 3px 10px rgba(139,90,43,.15);
  transition: transform .2s;
}
.podium-item:hover { transform: translateY(-4px); }
.podium-item.rank-1 { order: 2; background: linear-gradient(180deg, #fff9c4 0%, #fef9f2 100%); border-color: #FFD700; padding: 1.8rem 2rem; }
.podium-item.rank-2 { order: 1; }
.podium-item.rank-3 { order: 3; }
.podium-rank { font-size: 2.2rem; }
.podium-name { font-weight: bold; font-size: 1.1rem; color: #4A2C0A; margin: 0.3rem 0; }
.podium-village { font-size: 0.85rem; color: #8B5E3C; }
.podium-points { font-size: 1.2rem; color: #CD853F; font-weight: bold; margin-top: 0.4rem; }

/* --- 完整榜单 --- */
.full-list {
  background: #fef9f2; border: 2px solid #d4b896; border-radius: 14px;
  overflow: hidden;
}
.list-row {
  display: grid; grid-template-columns: 3rem 1fr 7rem 9rem 4rem;
  align-items: center; padding: 0.7rem 1rem; gap: 0.5rem;
  border-bottom: 1px solid #e8d5c4; font-size: 0.9rem;
}
.list-row:last-child { border-bottom: none; }
.list-rank { font-weight: bold; color: #CD853F; }
.list-name { color: #4A2C0A; font-weight: bold; }
.list-village { color: #8B5E3C; font-size: 0.82rem; }
.list-detail { color: #6B4226; font-size: 0.82rem; }
.list-points { color: #CD853F; font-weight: bold; text-align: right; }

.empty-state { text-align: center; padding: 3rem 1rem; color: #8B5E3C; }
.empty-icon { font-size: 3rem; margin-bottom: 0.5rem; }
</style>
