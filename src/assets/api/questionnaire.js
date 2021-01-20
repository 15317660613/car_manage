import request from '@/utils/http'

//新增
export function questionnaireNewAdd(data) {
  return request({
    url: "/business/questionnaire",
    method: "post",
    data
  })
};
//列表
export function questionnairePage(data) {
  return request({
    url: "/business/questionnaire/page",
    method: "post",
    data
  })
};
//详情
export function questionnaireDetail(data) {
  return request({
    url: `/business/questionnaire/${data}`,
    method: "get",
  })
};
// 修改
export function questionnaireEdit(data){
  return request({
    url: "/business/questionnaire",
    method:"put",
    data
  })
}
//删除
export function questionnaireDelete(ids){
  return request({
    url: `/business/questionnaire/${ids}`,
    method: 'delete'
  })
}