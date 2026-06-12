<!--
  应用头部组件
  职责：展示标题、副标题，营造村口公告板的氛围
-->
<template>
  <header class="app-header">
    <div class="header-top">
      <div class="header-decoration">
        <span class="deco-nail">🔩</span>
      </div>
      <div class="header-content">
        <h1 class="header-title">
          <span class="title-icon">📋</span>
          村口零工板
        </h1>
        <p class="header-subtitle">
          农村闲置劳动力信息板 — 找人干活 · 我会干
        </p>
      </div>
      <div class="header-decoration">
        <span class="deco-nail">🔩</span>
      </div>
    </div>
    <div class="header-wood-grain"></div>
  </header>
</template>

<style scoped>
.app-header {
  background: linear-gradient(180deg, #8d6e63 0%, #6d4c41 100%);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  position: relative;
}
.header-top {
  display: flex;
  align-items: center;
  padding: 20px 28px 16px;
  gap: 16px;
}
.header-decoration {
  flex-shrink: 0;
}
.deco-nail {
  font-size: 22px;
  opacity: 0.7;
}
.header-content {
  flex: 1;
  text-align: center;
}
.header-title {
  margin: 0;
  font-size: 26px;
  font-weight: 900;
  color: #fff8e1;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
.title-icon {
  font-size: 28px;
}
.header-subtitle {
  margin: 6px 0 0;
  font-size: 14px;
  color: #d7ccc8;
  letter-spacing: 1px;
}
.header-wood-grain {
  height: 6px;
  background: repeating-linear-gradient(
    90deg,
    #5d4037 0px,
    #6d4c41 3px,
    #5d4037 6px
  );
}
</style>
