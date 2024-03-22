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
// 获取客户拒绝审核列表  ----审核
export function updatecustoutlay(data) {
  return request({
    url: '/financial/update/updatecustoutlay',
    method: 'PUT',
    data
  })
}

// 获取客户入金审核 --
export function updatecustincome(data) {
  return request({
    url: '/financial/update/updatecustincome',
    method: 'PUT',
    data
  })
}
// 代理用户代充金额 --
export function insertincomebyadmin(data) {
  return request({
    url: '/financial/insert/insertincomebyadmin',
    method: 'POST',
    data
  })
}
// 获取客户拒绝审核列表
export function rejectcustoutlaylist(data) {
  return request({
    url: '/financial/get/rejectcustoutlaylist',
    method: 'post',
    data
  })
}
