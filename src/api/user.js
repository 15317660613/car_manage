import request from '@/utils/request'
//登录
export function login(token) {
    return request({
        url: `/auth/${token}`,
        method: 'get'
    })
}
