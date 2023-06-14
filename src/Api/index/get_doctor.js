// 首页医师推荐
import request from "@/request";

export const get_doctor = function () {
    return request.get('/api/docter/active')
}