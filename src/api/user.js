import service from '@/utils/request'

export function login (data) {
  return service({
    url: '/portal/login',
    method: 'post',
    params: data,
    headers: {
      Authorization: '' // 客户端信息加密摘要认证
    }
  })
}

export function refreshToken (token) {
  return service({
    url: '/portal/refreshToken',
    methods: 'post'
  })
}

export function getUserInfo (token) {
  return service({
    url: '/portal/info',
    methods: 'get',
    params: { token }
  })
}

export function logout () {
  return service({
    url: '/portal/logout',
    methods: 'post'
  })
}

// @Summary 获取验证码
// @Produce  application/json
// @Param data body {username:"string",password:"string"}
// @Router /base/captcha [post]
export const captcha = (data) => {
  return service({
    url: '/portal/captcha',
    method: 'post',
    data: data
  })
}
