import request from "@/request";
export const get_info = function () {
    return request.get('api/user/info')
}