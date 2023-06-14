import request from "@/request";

export const doctor_list = function (page, keywords, price_range, city_code, hospital_id, section_id) {
    return request.get('/api/docter/lists', {
        params: {
            page: page,
            keywords: keywords,
            price_range: price_range,
            city_code: city_code,
            hospital_id: hospital_id,
            section_id: section_id
        }
    })
}