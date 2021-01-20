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
export function trainDelete(ids){
  return request({
    url: `/business/train/${ids}`,
    method: 'delete'
  })
}