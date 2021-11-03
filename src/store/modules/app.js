// import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: false
  },
  tabs: {
    openTab: [],
    activeIndex: ''
  },
  planning: {
    extend: false,
    rightPanel: false
  },
  manage: {
    extend: false
  },
  // 高德web服务key
  amapKey: 'f598f196435d04778f65a24510c42132'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
  },
  ADD_TABS: (state, data) => {
    state.tabs.openTab.push(data)
  },
  DELETE_TABS: (state, route) => {
    let index = 0
    for (const goh of state.tabs.openTab) {
      if (goh.route === route) {
        break
      }
      index++
    }
    state.tabs.openTab.splice(index, 1)
  },
  SET_ACTIVE_INDEX: (state, index) => {
    state.tabs.activeIndex = index
  },
  TOGGLE_EXTEND_P: state => {
    state.planning.extend = !state.planning.extend
  },
  TOGGLE_EXTEND_M: state => {
    state.manage.extend = !state.manage.extend
  },
  RETRACT_RIGHT_PANEL: state => {
    state.planning.rightPanel = !state.planning.rightPanel
  }
}

const actions = {
  toggleSideBar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  add_tabs ({ commit }, data) {
    commit('ADD_TABS', data)
  },
  delete_tabs ({ commit }, route) {
    commit('DELETE_TABS', route)
  },
  set_active_index ({ commit }, index) {
    commit('SET_ACTIVE_INDEX', index)
  },
  toggleExtendP ({ commit }) {
    commit('TOGGLE_EXTEND_P')
  },
  toggleExtendM ({ commit }) {
    commit('TOGGLE_EXTEND_M')
  },
  retractRightPanel ({ commit }) {
    commit('RETRACT_RIGHT_PANEL')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
