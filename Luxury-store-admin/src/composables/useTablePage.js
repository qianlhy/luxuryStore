import { ref, reactive } from 'vue'

/**
 * 列表页通用逻辑：统一管理 加载状态 / 分页 / 查询参数 / 数据获取
 *
 * @param {Function} fetchApi 返回 Promise 的接口方法，接收查询参数
 * @param {Object} options
 * @param {Object} options.defaultParams 额外的默认查询参数（除 current/size 外）
 * @param {Boolean} options.immediate 是否在调用时立即加载，默认 true
 * @param {Number} options.size 每页条数，默认 10
 */
export function useTablePage(fetchApi, options = {}) {
  const { defaultParams = {}, immediate = true, size = 10 } = options

  const tableData = ref([])
  const total = ref(0)
  const loading = ref(false)
  const queryParams = reactive({ current: 1, size, ...defaultParams })

  const fetchData = async () => {
    loading.value = true
    try {
      // 拷贝并剔除空查询条件
      const params = { ...queryParams }
      Object.keys(params).forEach((key) => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
          if (key !== 'current' && key !== 'size') delete params[key]
        }
      })
      const res = await fetchApi(params)
      const data = res && res.data ? res.data : {}
      if (Array.isArray(data)) {
        tableData.value = data
        total.value = data.length
      } else {
        tableData.value = data.records || []
        total.value = data.total != null ? data.total : tableData.value.length
      }
    } catch (e) {
      // 全局拦截器已提示错误，这里仅重置数据，避免界面残留旧状态
      tableData.value = []
      total.value = 0
    } finally {
      loading.value = false
    }
  }

  // 触发搜索（回到第一页）
  const handleSearch = () => {
    queryParams.current = 1
    fetchData()
  }

  // 重置查询条件
  const handleReset = (resetParams = {}) => {
    Object.keys(queryParams).forEach((key) => {
      if (key !== 'current' && key !== 'size') queryParams[key] = ''
    })
    Object.assign(queryParams, resetParams)
    queryParams.current = 1
    fetchData()
  }

  if (immediate) fetchData()

  return { tableData, total, loading, queryParams, fetchData, handleSearch, handleReset }
}
