/**
 * 路由配置模块
 *
 * 定义应用的页面路由映射。
 * 使用 Vue Router 4 进行客户端导航。
 */

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/analyzer',
    name: 'analyzer',
    component: () => import('@/views/AnalyzerView.vue'),
    meta: { title: '病害识别' }
  },
  {
    path: '/diary',
    name: 'diary',
    component: () => import('@/views/DiaryView.vue'),
    meta: { title: '农田日记' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// 页面标题更新
router.afterEach((to) => {
  document.title = to.meta.title
    ? `${to.meta.title} - 农作物病害识别助手`
    : '农作物病害识别助手'
})

export default router
