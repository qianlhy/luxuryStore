import request from './request'

/**
 * 获取全部系统配置
 */
export const getAllConfig = () => {
  return request.get('/config')
}

/**
 * 根据 key 获取配置值
 */
export const getConfigValue = (key) => {
  return request.get(`/config/${key}`)
}

/**
 * 保存配置（key/value/remark）
 */
export const setConfigValue = (data) => {
  return request.post('/config', data)
}
