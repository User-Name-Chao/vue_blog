const mutations = {
  setName(state, data) {
    state.name = data
  },
  updatePermissionList: (state, payload) => {
    state.permissionList = payload
  }
}
export default mutations

