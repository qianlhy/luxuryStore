<template>
  <div class="user-list">
    <el-card>
      <div class="toolbar">
        <div></div>
        <div class="toolbar-right">
          <el-input
            v-model="queryParams.keyword"
            placeholder="搜索昵称/手机号"
            style="width: 240px"
            clearable
            @keyup.enter="handleSearch"
            @clear="handleSearch"
          />
          <el-button type="primary" @click="handleSearch"><el-icon><Search /></el-icon> 搜索</el-button>
        </div>
      </div>
      <el-table v-loading="loading" :data="tableData" border style="margin-top: 20px">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="avatar" label="头像" width="100">
          <template #default="{ row }">
            <el-avatar :src="row.avatar" v-if="row.avatar" />
            <el-avatar v-else>{{ row.nickname ? row.nickname[0] : '用' }}</el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="gender" label="性别" width="80">
          <template #default="{ row }">
            <span>{{ getGenderText(row.gender) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '正常' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" width="180" />
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button
              :type="row.status === 1 ? 'danger' : 'success'"
              text
              @click="toggleStatus(row)"
            >{{ row.status === 1 ? '禁用' : '启用' }}</el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="暂无用户数据" />
        </template>
      </el-table>

      <el-pagination
        v-model:current-page="queryParams.current"
        v-model:page-size="queryParams.size"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSearch"
        @current-change="fetchData"
        style="margin-top: 20px"
      />
    </el-card>
  </div>
</template>

<script setup>
import { getUserPage, updateUserStatus } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useTablePage } from '@/composables/useTablePage'

const { tableData, total, loading, queryParams, fetchData, handleSearch } = useTablePage(getUserPage, {
  defaultParams: { keyword: '' }
})

const getGenderText = (gender) => {
  const map = { 0: '未知', 1: '男', 2: '女' }
  return map[gender] || '未知'
}

const toggleStatus = (row) => {
  const nextStatus = row.status === 1 ? 0 : 1
  const action = nextStatus === 1 ? '启用' : '禁用'
  ElMessageBox.confirm(`确定${action}用户「${row.nickname || row.phone}」吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await updateUserStatus(row.id, nextStatus)
      ElMessage.success(`${action}成功`)
      fetchData()
    })
    .catch(() => {})
}
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.toolbar-right {
  display: flex;
  gap: 10px;
}
</style>
