/**
 * 应用入口文件
 *
 * 初始化 Vue 应用、路由和全局样式。
 * 所有模块通过 ES modules 按需加载。
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/global.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
