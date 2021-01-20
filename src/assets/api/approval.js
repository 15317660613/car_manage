import request from '@/utils/http'

//审批通过
export function approvalAdopt(data) {
  return request({
    url: "/business/approval/approvalAdopt",
    method: "post",
    data
  })
};
//审批拒绝
export function approvalRefuse(data) {
  return request({
    url: "/business/approval/approvalRefuse",
    method: "post",
    data
  })
};
//发布-最后审批通过
export function approvalRelease(data) {
  return request({
    url: "/business/approval/approvalRelease",
    method: "post",
    data
  })
};
//代办数量
export function approvalPage(current,limit) {
  return request({
    url: `/business/approval/page/${current}/${limit}`,
    method: "post",
  })
};
//分页查询
export function approvalPageApproval(current,limit) {
  return request({
    url: `/business/approval/pageApproval/${current}/${limit}`,
    method: "post",
  })
};
//提交审批
export function approvalSubmitApproval(data) {
  return request({
    url: "/business/approval/submitApproval",
    method: "post",
    data
  })
};