import request from '@/utils/request'

//获取所有参数
export function getAllParams(url) {
    return request({
        url: url,
        method: 'get'
    })
}

//消费者特征查询车搜人
export function getData(data) {
    return request({
        url: `/sys/consumerCharacteristics/analyse`,
        method: 'get',
        params: data
    })
}