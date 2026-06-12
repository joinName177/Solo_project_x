<template>
  <div class="app-wrapper">
    <AppHeader
      :current-tab="currentTab"
      @tab-change="currentTab = $event"
    />
    <main class="app-main">
      <div class="catalog-cabinet">
        <HomeView      v-if="currentTab === 'home'"      @tab-change="currentTab = $event" />
        <AddBookView   v-else-if="currentTab === 'add'"   @tab-change="currentTab = $event" />
        <BorrowView    v-else-if="currentTab === 'borrow'" />
        <StatsView     v-else-if="currentTab === 'stats'" />
        <LeaderboardView v-else-if="currentTab === 'stars'" />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import HomeView from './views/HomeView.vue'
import AddBookView from './views/AddBookView.vue'
import BorrowView from './views/BorrowView.vue'
import StatsView from './views/StatsView.vue'
import LeaderboardView from './views/LeaderboardView.vue'

const currentTab = ref('home')
</script>
