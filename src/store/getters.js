const getters = {
  token: state => state.user.token,
  menu: state => state.user.menu,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
}
export default getters
