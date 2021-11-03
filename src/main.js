import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  const user = JSON.parse(sessionStorage.getItem('user'))
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
