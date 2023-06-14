// 获取首页推荐产品
import request from "@/request";

export const get_goods = function () {
    return request.get('/api/goods/active')
}