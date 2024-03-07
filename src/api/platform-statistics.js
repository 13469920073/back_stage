import request from '@/utils/request'
// 获取代理统计列表 ---- 用户
export function custstatisticslist(data) {
  return request({
    url: '/platform/get/custstatisticslist',
    method: 'post',
    data
  })
}

// 获取代理统计
export function adminstatisticslist(data) {
  return request({
    url: '/platform/get/adminstatisticslist',
    method: 'post',
    data
  })
}
