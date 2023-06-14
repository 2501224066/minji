import request from "@/request";
export const good_order = function (goods_id, address_id, num) {
    return request.post('/api/order/createOrder', {
        goods_id,
        address_id,
        num
    })
}