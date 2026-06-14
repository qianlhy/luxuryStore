<template>
  <div class="points-list">
    <el-card>
      <div class="toolbar">
        <el-button type="primary" @click="showAdjust">手动调整积分</el-button>
        <div class="toolbar-right">
          <el-input
            v-model="queryParams.userId"
            placeholder="按用户ID筛选"
            style="width: 200px"
            clearable
            @keyup.enter="handleSearch"
            @clear="handleSearch"
          />
          <el-button type="primary" @click="handleSearch"><el-icon><Search /></el-icon> 搜索</el-button>
        </div>
      </div>
      <el-table v-loading="loading" :data="tableData" border style="margin-top: 20px">
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
        <template #empty>
          <el-empty description="暂无积分记录" />
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
    <el-dialog v-model="adjustVisible" title="手动调整积分" width="400px">
      <el-form ref="adjustRef" :model="adjustForm" :rules="rules" label-width="80px">
        <el-form-item label="用户ID" prop="userId"><el-input v-model="adjustForm.userId" /></el-form-item>
        <el-form-item label="积分变动" prop="points"><el-input-number v-model="adjustForm.points" /></el-form-item>
        <el-form-item label="备注"><el-input v-model="adjustForm.remark" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="adjustVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="doAdjust">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getPointsPage, adjustPoints } from '@/api/points'
import { useTablePage } from '@/composables/useTablePage'

const { tableData, total, loading, queryParams, fetchData, handleSearch } = useTablePage(getPointsPage, {
  defaultParams: { userId: '' }
})

const adjustVisible = ref(false)
const submitLoading = ref(false)
const adjustRef = ref()
const adjustForm = ref({ userId: '', points: 0, remark: '管理员调整' })

const rules = {
  userId: [{ required: true, message: '请输入用户ID', trigger: 'blur' }],
  points: [
    { required: true, message: '请输入积分变动值', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (!value || value === 0) callback(new Error('积分变动值不能为 0'))
        else callback()
      },
      trigger: 'blur'
    }
  ]
}

const showAdjust = () => {
  adjustForm.value = { userId: '', points: 0, remark: '管理员调整' }
  adjustVisible.value = true
}

const doAdjust = () => {
  adjustRef.value.validate((valid) => {
    if (!valid) return
    const { userId, points } = adjustForm.value
    ElMessageBox.confirm(`确认为用户 ${userId} 调整 ${points > 0 ? '+' : ''}${points} 积分吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        submitLoading.value = true
        try {
          await adjustPoints(adjustForm.value)
          ElMessage.success('调整成功')
          adjustVisible.value = false
          fetchData()
        } finally {
          submitLoading.value = false
        }
      })
      .catch(() => {})
  })
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
