<template>
  <div class="share-list">
    <el-card>
      <el-table v-loading="loading" :data="tableData" border>
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
        <template #empty>
          <el-empty description="暂无分享记录" />
        </template>
      </el-table>
      <el-pagination
        v-model:current-page="queryParams.current"
        v-model:page-size="queryParams.size"
        :total="total"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="fetchData"
        @size-change="handleSearch"
        style="margin-top: 20px"
      />
    </el-card>
  </div>
</template>

<script setup>
import { getSharePage } from '@/api/share'
import { useTablePage } from '@/composables/useTablePage'

const { tableData, total, loading, queryParams, fetchData, handleSearch } = useTablePage(getSharePage)
</script>
