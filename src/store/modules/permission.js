import {constantRoutes} from '@/router'
import Layout from '@/layout'
import routeMap from '@/utils/components.js';

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(menuVOList) {
  const res = []
  menuVOList.forEach(menu => {
    res.push(routeMap[menu.menuId - 1]);
  })
  return res
}

const state = {
  routes: constantRoutes,
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({commit}, userMenuList) {
    return new Promise(resolve => {
      let accessedRoutes
      accessedRoutes = filterAsyncRoutes(userMenuList)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
