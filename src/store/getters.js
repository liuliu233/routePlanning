const getters = {
  sidebar: state => state.app.sidebar,
  tabs: state => state.app.tabs,
  amapKey: state => state.app.amapKey,
  access_token: state => state.user.access_token,
  refresh_token: state => state.user.refresh_token,
  userInfo: state => state.user.userInfo,
  planning: state => state.app.planning,
  projectInfo: state => state.app.projectInfo,
  manage: state => state.app.manage
}

export default getters
