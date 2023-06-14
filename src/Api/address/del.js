import request from "@/request";

export const del = function (id) {
    return request.get('/api/address/del', {
        params: {
            id
        }
    })
}