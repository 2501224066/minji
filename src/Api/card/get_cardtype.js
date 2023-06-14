import request from "@/request";

export const get_cardtype = function () {
    return request.get('/api/goods/card')
}