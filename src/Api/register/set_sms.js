import request from "@/request";
export const set_sms = function (phone) {
    return request.get('/api/user/sms', {
        params: {
            phone
        }
    })
}