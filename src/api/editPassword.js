import request from '@/utils/request'

// 重置新密码
export function changepwd(data) {
  return request({
    url: '/admin/auth/changepwd',
    method: 'post',
    data
  })
}
