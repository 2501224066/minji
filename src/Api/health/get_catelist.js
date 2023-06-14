// 获取分类下的文章
import request from "@/request";
export const get_catelist = function (category_ids, page) {
    return request.get('/api/article/listByCate', {
        params: {
            category_ids: category_ids,
            page: page
        }
    })
}