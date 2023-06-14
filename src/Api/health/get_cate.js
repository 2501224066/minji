// 获取文章分类
import request from "@/request";
export const get_cate = function () {
    return request.get('/api/article/cate')
}