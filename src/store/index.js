import Vue from 'vue'
import Vuex from 'vuex'
import getters from '@/store/getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store

// export default new Vuex.Store({
//   state: {
//     opened: false,
//     tabs: {
//       openTab: [],
//       activeIndex: ''
//     }
//   },
//   mutations: {
//     TOGGLE_SIDEBAR: state => {
//       state.opened = !state.opened
//     },
//     SHOW_MAPPING: state => {
//       state.uploadFiles.showMapping = !state.uploadFiles.showMapping
//     },
//     EXTEND_MAPPING: state => {
//       state.uploadFiles.extendMapping = !state.uploadFiles.extendMapping
//     },
//     ADD_TABS: (state, data) => {
//       state.tabs.openTab.push(data)
//     },
//     DELETE_TABS: (state, route) => {
//       let index = 0
//       for (const goh of state.tabs.openTab) {
//         if (goh.route === route) {
//           break
//         }
//         index++
//       }
//       state.tabs.openTab.splice(index, 1)
//     },
//     SET_ACTIVE_INDEX: (state, index) => {
//       state.tabs.activeIndex = index
//     }
//   },
//   actions: {
//     toggleSideBar ({ commit }) {
//       commit('TOGGLE_SIDEBAR')
//     },
//     showMapping ({ commit }) {
//       commit('SHOW_MAPPING')
//     },
//     extendMapping ({ commit }) {
//       commit('EXTEND_MAPPING')
//     },
//     add_tabs ({ commit }, data) {
//       commit('ADD_TABS', data)
//     },
//     delete_tabs ({ commit }, route) {
//       commit('DELETE_TABS', route)
//     },
//     set_active_index ({ commit }, index) {
//       commit('SET_ACTIVE_INDEX', index)
//     }
//   },
//   modules: {
//   }
// })
