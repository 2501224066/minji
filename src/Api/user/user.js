import request from "@/request";
export const get_user = function () {
    return request.get('/api/user/info')
}