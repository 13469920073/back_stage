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
export function updateums(data) {
  return request({
    url: '/admin/auth/updateums',
    method: 'put',
    data
  })
}
// 获取列表---删除
export function deleteums(data) {
  return request({
    url: '/admin/auth/deleteums',
    method: 'delete',
    data
  })
}

// 获取列表---新增
export function addums(data) {
  return request({
    url: '/admin/auth/addums',
    method: 'post',
    data
  })
}
