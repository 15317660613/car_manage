import request from '@/utils/http'

//新增
export function shareNewAdd(data) {
  return request({
    url: "/business/information ",
    method: "post",
    data
  })
};
// 修改
export function shareEdit(data){
  return request({
    url: "/business/information",
    method:"put",
    data
  })
}
//批量删除
export function shareDelete(data){
  return request({
    url: "/business/information",
    method: 'delete',
    data
  })
}
//详情
export function shareDetail(data) {
  return request({
    url: `/business/information/${data}`,
    method: "get",
  })
};
//列表
export function sharePage(data) {
  return request({
    url: "/business/information/page",
    method: "post",
    data
  })
};
// 审批角色待处理分页查询
export function sharePageUntreated(data) {
  return request({
    url: "/business/information/pageUntreated",
    method: "post",
    data
  })
};