import request from './request'

export function getBrowseStatistics() {
  return request({ url: '/statistics/browse', method: 'get' })
}

export function getCollectStatistics() {
  return request({ url: '/statistics/collect', method: 'get' })
}
