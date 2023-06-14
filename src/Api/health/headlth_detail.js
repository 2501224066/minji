// 获取文章详情
import request from "@/request";
export const headlth_detail = function (id) {
    return request.get('/api/article/detail', {
        params: {
            id: id
        }
    })
}