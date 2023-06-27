const mutations = {
  setName(state, data) {
    state.name = data
  },
  updatePermissionList: (state, payload) => {
    state.permissionList = payload
  },
  setRouterList(state, data) {
    state.routerList = data
  },
  updateRouterList: (state, payload) => {
    state.routerList = payload
  },
  setMents(state, data) {
    state.ments = data
  },
  updateMents: (state, payload) => {
    state.ments = payload
  }
}
export default mutations

