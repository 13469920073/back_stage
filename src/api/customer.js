import request from '@/utils/request'

// 获取客户列表
export function customerlist(data) {
  return request({
    url: '/customer/get/customerlist',
    method: 'post',
    data
  })
}
// 获取客户待审核列表
export function cusreviewinglist(data) {
  return request({
    url: '/customer/get/cusreviewinglist',
    method: 'post',
    data
  })
}
// 获取客户已审核列表
export function cusreviewedlist(data) {
  return request({
    url: '/customer/get/cusreviewedlist',
    method: 'post',
    data
  })
}

// 获取客户已审核列表----重置
export function updatecustomer(data) {
  return request({
    url: '/customer/update/updatecustomer',
    method: 'post',
    data
  })
}
// 获取账户待审核列表
export function accreviewedlist(data) {
  return request({
    url: '/customer/get/accreviewedlist',
    method: 'post',
    data
  })
}
// 获取账户待审核 -- 审核
export function updatecustomeracc(data) {
  return request({
    url: '/customer/update/updatecustomeracc',
    method: 'post',
    data
  })
}
// 获取账户已审核列表
export function accreviewinglist(data) {
  return request({
    url: '/customer/get/accreviewinglist',
    method: 'post',
    data
  })
}
