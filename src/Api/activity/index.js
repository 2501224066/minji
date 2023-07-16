import request from "@/request";

export const activity_set = function (data) {
    return request.post('/api/report/set', data)
}

export const report_info = function (data) {
    return request.post('/api/report/report_info', data)
}

export const report_my = function (data) {
    return request.get('/api/report/my', data)
}

export const report_lists = function (data) {
    return request.get('/api/report/lists', data)
}

export const report_audit = function (data) {
    return request.post('/api/report/audit', data)
}

export const expert_advice = function (data) {
    return request.post('/api/report/expert_advice', data)
}

export const color_doppler_set = function (data) {
  return request.post('/api/report/color_doppler_set', data)
}

export const get_info = function (data) {
  return request.post('/api/report/get_info', data)
}

export const get_expier_list = function (data) {
  return request.post('/api/report/get_expier_list', data)
}

export const is_expire = function (data) {
  return request.post('/api/report/is_expire', data)
}

export const active_list = function (data) {
  return request.post('/api/report/active_list', data)
}

export const upload = function (data) {
  return request.post('/api/user/upload', data)
}

export const userEdit = function (data) {
  return request.post('/api/user/edit', data)
}

export const agentUser = function (data) {
  return request.post('/api/agent/user', data)
}

export const agentHaibao = function (data) {
  return request.get('/api/agent/haibao', data)
}

export const agentSpread = function (data) {
  return request.get('/api/agent/spread', data)
}

export const agentSpreadOrder = function (data) {
  return request.get('/api/agent/spread_order', data)
}

export const agentCommission = function (data) {
  return request.get('/api/agent/commission', data)
}

export const agentTx = function (data) {
  return request.post('/api/agent/withdrawal_apply', data)
}

export const agentTxLog = function (data) {
  return request.get('/api/agent/withdrawal_records', data)
}

export const cardGifts = function (data) {
  return request.post('/api/card/gifts', data)
}

export const cardGiftsLog = function (data) {
  return request.get('/api/card/gifts_log', data)
}

export const cardList = function (data) {
  return request.get('/api/card/goods_list', data)
}
