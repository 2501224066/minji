import request from "@/request";

export const address_list = function () {
    return request.get('/api/address/show')
}