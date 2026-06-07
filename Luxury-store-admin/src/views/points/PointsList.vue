<template>
  <div class="points-list">
    <el-card>
      <div class="toolbar">
        <el-button type="primary" @click="showAdjust">手动调整积分</el-button>
        <el-input v-model="queryParams.userId" placeholder="用户ID" style="width: 200px" clearable @change="fetchData" />
      </div>
      <el-table :data="tableData" border style="margin-top: 20px">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="userName" label="用户" width="120" />
        <el-table-column prop="userPhone" label="手机号" width="140" />
        <el-table-column prop="points" label="变动积分" width="100">
          <template #default="{ row }">
            <span :style="{ color: row.points > 0 ? '#67C23A' : '#F56C6C' }">{{ row.points > 0 ? '+' : '' }}{{ row.points }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="余额" width="100" />
        <el-table-column prop="typeName" label="类型" width="120" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="createTime" label="时间" width="180" />
      </el-table>
      <el-pagination v-model:current-page="queryParams.current" :total="total" layout="total, prev, pager, next" @current-change="fetchData" style="margin-top: 20px" />
    </el-card>
    <el-dialog v-model="adjustVisible" title="手动调整积分" width="400px">
      <el-form :model="adjustForm" label-width="80px">
        <el-form-item label="用户ID"><el-input v-model="adjustForm.userId" /></el-form-item>
        <el-form-item label="积分变动"><el-input-number v-model="adjustForm.points" /></el-form-item>
        <el-form-item label="备注"><el-input v-model="adjustForm.remark" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="adjustVisible = false">取消</el-button>
        <el-button type="primary" @click="doAdjust">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getPointsPage, adjustPoints } from '@/api/points'

const tableData = ref([])
const total = ref(0)
const adjustVisible = ref(false)
const queryParams = reactive({ current: 1, size: 10, userId: '' })
const adjustForm = ref({ userId: '', points: 0, remark: '管理员调整' })

const fetchData = async () => {
  const params = { ...queryParams }
  if (!params.userId) delete params.userId
  const res = await getPointsPage(params)
  tableData.value = res.data.records
  total.value = res.data.total
}

const showAdjust = () => {
  adjustForm.value = { userId: '', points: 0, remark: '管理员调整' }
  adjustVisible.value = true
}

const doAdjust = async () => {
  await adjustPoints(adjustForm.value)
  ElMessage.success('调整成功')
  adjustVisible.value = false
  fetchData()
}

onMounted(fetchData)
</script>
