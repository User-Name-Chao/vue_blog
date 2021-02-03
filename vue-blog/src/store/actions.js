const actions = {
  setName({
            commit
          }, data) {
    commit('setName', data)
  },
  getPermissionList: async ({ state, commit }) => {
    // 这里是为了防止重复获取
    if (state.permissionList.length) return
    // 发送请求方法省略
    const list = await api.getPermissionList()
    commit( updatePermissionList , list)
  }

}
export default actions
