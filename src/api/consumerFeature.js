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

//消费者特征查询人搜车
export function getData1(data) {
    return request({
        url: `/sys/consumerCharacteristics/analyse/people`,
        method: 'get',
        params: data
    })
}

//消费者口碑查询
export function getOpinionData(data) {
    return request({
        url: `/sys/consumerReputatian/analyse`,
        method: 'get',
        params: data
    })
}

//汽车产品竞争圈查询
export function getCompleteData(data) {
    return request({
        url: `/sys/vehicleCompetition`,
        method: 'get',
        params: data
    })
}

//汽车产品声量查询
export function getVolumeData(data) {
    return request({
        url: `/sys/vehicleVolume/analyse`,
        method: 'get',
        params: data
    })
}

//汽车美誉度查询
export function getReputationData(data) {
    return request({
        url: `/sys/vehicleReputation/analyse`,
        method: 'get',
        params: data
    })
}

//购买关注因素查询
export function getPurchaseFocusData(data) {
    return request({
        url: `/sys/purchaseFocusPurchase/analyse`,
        method: 'get',
        params: data
    })
}

//购买决策因素查询
export function getPurchaseFocusData1(data) {
    return request({
        url: `/sys/purchaseFocusFocus/analyse`,
        method: 'get',
        params: data
    })
}

//获取首页地址
export function getImg() {
    return request({
        url: `/common/images`,
        method: 'get'
    })
}



