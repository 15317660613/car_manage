import { login } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import router, { resetRouter } from '@/router'
import store from '@/store'

const state = {
  token: '',
  name: '',
  menu: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  }
}

const actions = {
  // user login
  login({ commit }, appToken) {
    return new Promise((resolve, reject) => {
      login(appToken).then(response => {
        const { data } = response
        commit('SET_NAME', data.usname)
        commit('SET_MENU', data.menuVOList)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roleEOList, roleIdList } = data

        // roles must be a non-empty array
        if (!roleEOList || roleEOList.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roleIdList)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_NAME', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_NAME', [])
      // removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
