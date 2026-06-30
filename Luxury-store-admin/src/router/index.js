import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/layouts/MainLayout.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('@/views/Dashboard.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/category',
          name: 'Category',
          component: () => import('@/views/category/CategoryList.vue'),
          meta: { title: '分类管理' }
        },
        {
          path: '/product',
          name: 'Product',
          component: () => import('@/views/product/ProductList.vue'),
          meta: { title: '商品管理' }
        },
        {
          path: '/order',
          name: 'Order',
          component: () => import('@/views/order/OrderList.vue'),
          meta: { title: '订单管理' }
        },
        {
          path: '/order/:id',
          name: 'OrderDetail',
          component: () => import('@/views/order/OrderDetail.vue'),
          meta: { title: '订单详情' }
        },
        {
          path: '/user',
          name: 'User',
          component: () => import('@/views/user/UserList.vue'),
          meta: { title: '用户管理' }
        },
        {
          path: '/brand',
          name: 'Brand',
          component: () => import('@/views/brand/BrandList.vue'),
          meta: { title: '品牌管理' }
        },
        {
          path: '/statistics',
          name: 'Statistics',
          component: () => import('@/views/statistics/Statistics.vue'),
          meta: { title: '数据统计' }
        },
        {
          path: '/share',
          name: 'Share',
          component: () => import('@/views/share/ShareList.vue'),
          meta: { title: '分享线索' }
        },
        {
          path: '/points',
          name: 'Points',
          component: () => import('@/views/points/PointsList.vue'),
          meta: { title: '积分管理' }
        },
        {
          path: '/sales',
          name: 'Sales',
          component: () => import('@/views/sales/SalesList.vue'),
          meta: { title: '销售配置' }
        },
        {
          path: '/page-config',
          name: 'PageConfig',
          component: () => import('@/views/config/PageConfig.vue'),
          meta: { title: '页面配置' }
        },
        {
          path: '/settings',
          name: 'Settings',
          component: () => import('@/views/Settings.vue'),
          meta: { title: '系统设置' }
        }
      ]
    }
  ]
})

const APP_TITLE = '名品汇商城管理系统'

router.afterEach((to) => {
  const pageTitle = to.meta.title
  document.title = pageTitle ? `${pageTitle} - ${APP_TITLE}` : APP_TITLE
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  if (to.path === '/login') {
    // 如果已登录，跳转到首页
    if (userStore.token) {
      next('/')
    } else {
      next()
    }
  } else {
    // 其他页面需要登录
    if (userStore.token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router

