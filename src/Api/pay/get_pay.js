import request from "@/request";

export const get_pay = function (order_no, type) {
    return request.post('/api/wechat/unifiedOrder', {
        order_no,
        type
    })
}