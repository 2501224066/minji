import request from "@/request";

export const order_list = function (status, page) {
    return request.get('/api/order/lists', {
        params: {
            status: status,
            page: page
        }
    })
}