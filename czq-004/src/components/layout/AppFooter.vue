<!--
  应用底部组件
  职责：展示版权信息、数据说明
-->
<template>
  <footer class="app-footer">
    <div class="footer-wood-grain"></div>
    <div class="footer-content">
      <p class="footer-text">
        📋 村口零工板 — 数据存储在您的浏览器中，不会上传到任何服务器
      </p>
      <p class="footer-text">
        邻里互助 · 信用为本 · 勤劳致富
      </p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: 32px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.footer-wood-grain {
  height: 6px;
  background: repeating-linear-gradient(
    90deg,
    #5d4037 0px,
    #6d4c41 3px,
    #5d4037 6px
  );
}
.footer-content {
  background: #efebe9;
  padding: 18px 24px;
  text-align: center;
}
.footer-text {
  margin: 4px 0;
  font-size: 13px;
  color: #8d6e63;
  letter-spacing: 0.5px;
}
</style>
