// eslint-disable-next-line no-unused-vars
import { getToken, setToken, removeToken, setRefreshToken, removeRefreshToken } from '@/utils/auth'
// eslint-disable-next-line no-unused-vars
import router from '@/router'
// eslint-disable-next-line no-unused-vars
import { getUserInfo, login, logout } from '@/api/user'

const state = {
  token: getToken(),
  userInfo: {
    uuid: '',
    nickname: '',
    avatar: '',
    introductions: '',
    roles: []
  }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_UUID: (state, uuid) => {
    state.uuid = uuid
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 用户登录
  login ({ commit }, userInfo) {
    const { username, password, validateCode, uuid } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username,
        password: password,
        grant_type: 'captcha',
        uuid: uuid,
        validateCode: validateCode
      }).then(response => {
        const { access_token, refresh_token } = response.data
        const token = 'Bearer ' + access_token
        commit('SET_TOKEN', token)
        setToken(token)
        setRefreshToken(refresh_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 更新token
  refreshToken ({ commit }, refreshToken) {
    commit('SET_TOKEN', undefined)
    return new Promise((resolve, reject) => {
      login({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }).then(response => {
        const { access_token, refresh_token } = response.data
        const token = 'Bearer ' + access_token
        commit('SET_TOKEN', token)
        setToken(token)
        setRefreshToken(refresh_token)
        resolve(token)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取当前用户信息
  getUserInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject(new Error('Verification failed, please Login again.'))
        }

        const { roles, nickname, avatar } = data
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject(new Error('getUserInfo: roles must be a non-null array!'))
        }
        commit('SET_NICKNAME', nickname)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLES', roles)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户登出
  logout ({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        removeRefreshToken()

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 移除token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_PERMS', [])
      removeToken()
      removeRefreshToken()
      resolve()
    })
  },
  // 动态修改权限
  async changeRoles ({ commit, dispatch }, role) {}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
