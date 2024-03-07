import request from '@/utils/request'
// 获取客户入金列表
export function custincomelist(data) {
  return request({
    url: '/financial/get/custincomelist',
    method: 'post',
    data
  })
}
// 获取客户入金审核列表
export function incomereviewinglist(data) {
  return request({
    url: '/financial/get/incomereviewinglist',
    method: 'post',
    data
  })
}
// 获取客户入金审核列表 --拒绝
export function rejectincomelist(data) {
  return request({
    url: '/financial/get/rejectincomelist',
    method: 'post',
    data
  })
}

// 获取客户出金审核列表
export function custoutlaylist(data) {
  return request({
    url: '/financial/get/custoutlaylist',
    method: 'post',
    data
  })
}

// 获取客户拒绝出金审核列表  ---拒绝
export function custoutlayreviewinglist(data) {
  return request({
    url: '/financial/get/custoutlayreviewinglist',
    method: 'post',
    data
  })
}
