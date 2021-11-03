
const AccessTokenKey = 'Access-Token'
const RefershTokenKey = 'Refresh-Token'

// 设置accesstoken
export const setToken = (newToken) => {
  localStorage.setItem(AccessTokenKey, JSON.stringify(newToken))
}

// 获取accesstoken
export const getToken = () => {
  return JSON.parse(localStorage.getItem(AccessTokenKey))
}

// 删除accesstoken
export const removeToken = () => {
  localStorage.removeItem(AccessTokenKey)
}

// 设置refreshtoken
export const setRefreshToken = (newToken) => {
  localStorage.setItem(RefershTokenKey, JSON.stringify(newToken))
}

// 获取refreshtoken
export const getRefreshToken = () => {
  return JSON.parse(localStorage.getItem(RefershTokenKey))
}

// 删除refreshtoken
export const removeRefreshToken = () => {
  localStorage.removeItem(RefershTokenKey)
}

// 清除所有localStorage的方法是 clea
