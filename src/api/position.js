import request from '@/utils/request'
// 获取持仓列表
export function custholdlist(data) {
  return request({
    url: '/positions/get/custholdlist',
    method: 'post',
    data
  })
}

// 结算列表
export function custcheckoutlist(data) {
  return request({
    url: '/positions/get/custcheckoutlist',
    method: 'post',
    data
  })
}

// 强制平仓
export function checkoutbymanual(data) {
  return request({
    url: '/positions/member/checkoutbymanual?id=' + data,
    method: 'get'
  })
}

