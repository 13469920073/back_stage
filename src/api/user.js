import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/auth/menulist',
    method: 'get',
    params: { }
  })
}

export function logout() {
  return request({
    url: '/admin/auth/logout',
    method: 'get'
  })
}

// 获取用户信息
export function getAdmininfo() {
  return request({
    url: '/admin/auth/admininfo',
    method: 'get'
  })
}

// k线图表涨跌
export function getratebody() {
  return request({
    url: '/financial/get/ratebody',
    method: 'get'
  })
}
// k线启用
export function ratechange() {
  return request({
    url: '/financial/open/ratechange',
    method: 'get'
  })
}

// k线停止涨跌
export function redisache(data) {
  return request({
    url: '/financial/close/redisache?key=' + 'RateChange',
    method: 'get'
  })
}

