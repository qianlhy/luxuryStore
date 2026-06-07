<template>
  <div class="share-list">
    <el-card>
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="userName" label="分享用户" width="120" />
        <el-table-column prop="shareTypeName" label="分享类型" width="120" />
        <el-table-column prop="productNames" label="分享商品" show-overflow-tooltip />
        <el-table-column prop="totalPrice" label="总价" width="120">
          <template #default="{ row }"><span style="color: #C5A36A">¥{{ row.totalPrice }}</span></template>
        </el-table-column>
        <el-table-column prop="viewCount" label="查看次数" width="100" />
        <el-table-column prop="shareCode" label="分享码" width="160" />
        <el-table-column prop="createTime" label="分享时间" width="180" />
      </el-table>
      <el-pagination v-model:current-page="queryParams.current" :total="total" layout="total, prev, pager, next" @current-change="fetchData" style="margin-top: 20px" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getSharePage } from '@/api/share'

const tableData = ref([])
const total = ref(0)
const queryParams = reactive({ current: 1, size: 10 })

const fetchData = async () => {
  const res = await getSharePage(queryParams)
  tableData.value = res.data.records
  total.value = res.data.total
}

onMounted(fetchData)
</script>
