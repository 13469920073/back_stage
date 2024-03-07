import request from '@/utils/request'
// 获取列表
export function getumslist(data) {
  return request({
    url: '/admin/auth/getumslist',
    method: 'post',
    data
  })
}
// 获取列表-编辑
export function updateums(token) {
  return request({
    url: '//admin/auth/updateums',
    method: 'get',
    params: { token }
  })
}
// 获取列表---删除
export function deleteums() {
  return request({
    url: '/admin/auth/deleteums',
    method: 'post'
  })
}

// 获取列表---新增
export function addums() {
  return request({
    url: '/admin/auth/addums',
    method: 'post'
  })
}
