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
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

// 获取用户信息
export function getAdmininfo() {
  return request({
    url: '/admin/auth/admininfo',
    method: 'post'
  })
}

