import request from './request'

export function getPointsPage(params) {
  return request({ url: '/points/page', method: 'get', params })
}

export function adjustPoints(data) {
  return request({ url: '/points/adjust', method: 'post', data })
}
