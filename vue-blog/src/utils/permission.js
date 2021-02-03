
/**

 * 判断是否拥有权限

 * @param {Array<string>} permissions - 要判断的权限列表

 */

function includePermission (permissions = []) {

  // 这里要判断的权限没有设置的话，就等于不需要权限，直接返回 true

  if (!permissions.length) return true

  const permissionList = this.$store.state.permissionList

  return !!permissions.find(permission => permissionList.includes(permission))

}
