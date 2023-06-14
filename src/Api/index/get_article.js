import request from "@/request";
export const get_article = function () {
    return request.get('/api/article/active')
}