import request from '@/utils/http'

//新增
export function trainNewAdd(data) {
  return request({
    url: "/business/train",
    method: "post",
    data
  })
};
//列表
export function trainPage(data) {
  return request({
    url: "/business/train/page",
    method: "post",
    data
  })
};
//详情
export function trainDetail(data) {
  return request({
    url: `/business/train/${data}`,
    method: "get",
  })
};
// 修改
export function trainEdit(data){
  return request({
    url: "/business/train",
    method:"put",
    data
  })
}
//删除
export function trainDelete(data){
  return request({
    url: "/business/train",
    method: 'delete',
    data
  })
}
// 审批角色待处理分页查询
export function trainPageUntreated(data) {
  return request({
    url: "/business/train/pageUntreated",
    method: "post",
    data
  })
};