import request from "@/request";

export const card_list = function (status) {
    return request.get('/api/card/show', {
        params: {
            status: status
        }
    })
}