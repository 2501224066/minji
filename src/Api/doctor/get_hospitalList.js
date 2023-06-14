import request from "@/request";

export const get_hospitalList = function () {
    return request.get('/api/docter/hospitalList')
}