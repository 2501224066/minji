import request from "@/request";

export const add_card = function (username, goods_id, expir_time, tel, num) {
    return request.post('/api/card/add', {
        username: username,
        goods_id: goods_id,
        expir_time: expir_time,
        tel: tel,
        num: num
    })
}