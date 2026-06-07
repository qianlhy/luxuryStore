import request from './request'

export function getBrandPage(params) {
  return request({ url: '/brand/page', method: 'get', params })
}

export function getBrandList() {
  return request({ url: '/brand/list', method: 'get' })
}

export function addBrand(data) {
  return request({ url: '/brand', method: 'post', data })
}

export function updateBrand(data) {
  return request({ url: '/brand', method: 'put', data })
}

export function deleteBrand(id) {
  return request({ url: `/brand/${id}`, method: 'delete' })
}
