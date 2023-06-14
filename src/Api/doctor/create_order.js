import request from "@/request";

export const make_order = function (username, tel, buy_type, docter_id) {
    return request.post('/api/docter/createOrder', {
        username,
        tel,
        buy_type,
        docter_id
    })
}