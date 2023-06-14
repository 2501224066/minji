import request from "@/request";

export const doctor_select = function () {
    return request.get('/api/section/lists')
}