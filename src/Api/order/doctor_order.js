 import request from "@/request";

export const doctor_order = function (status, page) {
    return request.get('/api/docter/orderLists', {
        params: {
            status: status,
            page: page
        }
    })
}