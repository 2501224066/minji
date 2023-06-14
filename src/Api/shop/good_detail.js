import request from "@/request";
export const get_detail = function (id) {
    return request.get('/api/goods/detail', {
        params: {
            id
        }
    })
}