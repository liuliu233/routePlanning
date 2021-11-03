import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home,
    redirect: '/management',
    children: [
      {
        path: 'management',
        name: '首页',
        component: () => import('@/views/taskManage/index'),
        meta: { title: 'Management' }
      },
      {
        path: 'program',
        name: '航迹计算',
        component: () => import('@/views/planning/index'),
        meta: { title: 'Program' }
      },
      {
        path: 'arrangement',
        name: '任务安排',
        component: () => import('@/views/planning/taskarrangement'),
        meta: { title: 'Arrangement' }
      },
      {
        path: 'person',
        name: '个人信息',
        component: () => import('@/views/system/person'),
        meta: { title: 'Person' }
      },
      {
        path: 'user',
        name: '用户管理',
        component: () => import('@/views/system/user'),
        meta: { title: 'User' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/login/login.vue'),
    hidden: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
