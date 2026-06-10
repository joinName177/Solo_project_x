<template>
  <div class="app">
    <GameContainer />
  </div>
</template>

<script setup>
import GameContainer from './components/GameContainer.vue'
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  overflow: hidden;
}

body {
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  background: #0D1B2A;
  color: #F5E6CC;
  user-select: none;
  -webkit-user-select: none;
}

.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
