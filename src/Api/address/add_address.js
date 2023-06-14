import request from "@/request";

export const add_address = function (address, province_id, city_id, area_id, consignee, phone, is_default, id) {
    return request.post('/api/address/save', {
        address,
        province_id,
        city_id,
        area_id,
        consignee,
        phone,
        is_default,
        id
    })
}