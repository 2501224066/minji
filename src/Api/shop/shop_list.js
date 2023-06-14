import request from "@/request";

export const shop_list = function (category_id) {
    return request.get('/api/goods/lists', {
        params: {
            category_id: category_id
        }
    })
}