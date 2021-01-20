import request from '@/utils/http'

//登录
export function login(data) {
  return request({
    url: "/sys/staff/login",
    method: "post",
    data
  })
}

//验证码
export function staffCaptcha() {
  return request({
    url: "/sys/staff/captcha",
    method: "get",
  })
}