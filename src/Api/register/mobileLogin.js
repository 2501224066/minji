import request from "@/request";
export const mobileLogin = function (code, phone) {
    return request.post('/api/user/mobileLogin', {
        code,
        phone
    })
}