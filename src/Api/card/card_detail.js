import request from "@/request";

export const card_detail = function (id) {
    return request.get('/api/card/info', {
        params: {
            id: id
        }
    })
}