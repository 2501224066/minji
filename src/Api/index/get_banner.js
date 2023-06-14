// 轮播图
import request from "@/request";

export const get_banner = function () {
    return request.get('/api/banner')
}