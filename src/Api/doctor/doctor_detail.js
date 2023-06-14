import request from "@/request";

export const doctor_detail = function (id) {
    return request.get('/api/docter/detail', {
        params: {
            id: id
        }
    })
}