import request from "@/request";
export const shop_cate = function () {
    return request.get('/api/goods/cate')
}