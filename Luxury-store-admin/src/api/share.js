import request from './request'

export function getSharePage(params) {
  return request({ url: '/share/page', method: 'get', params })
}
