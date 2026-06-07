import request from './request'

export function getSalesPage(params) {
  return request({ url: '/sales/page', method: 'get', params })
}

export function getSalesList() {
  return request({ url: '/sales/list', method: 'get' })
}

export function addSales(data) {
  return request({ url: '/sales', method: 'post', data })
}

export function updateSales(data) {
  return request({ url: '/sales', method: 'put', data })
}

export function deleteSales(id) {
  return request({ url: `/sales/${id}`, method: 'delete' })
}
