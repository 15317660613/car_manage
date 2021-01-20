import request from '@/utils/http'

//根据文件地址删除文件
export function fileDelete(data){
  return request({
    url: "/upload/delFile",
    method: 'delete',
    data
  })
}
//资讯上传文件
export function fileInformationFile(data) {
  return request({
    url: "/upload/informationFile",
    method: "post",
    data
  })
};
//问卷上传文件
export function fileQuestionnaireFile(data) {
  return request({
    url: "/upload/questionnaireFile",
    method: "post",
    data
  })
};
//课程上传文件
export function fileTrainFile(data) {
  return request({
    url: "/upload/trainFile",
    method: "post",
    data
  })
};