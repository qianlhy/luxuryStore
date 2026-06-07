<template>
  <div class="sales-list">
    <el-card>
      <div class="toolbar">
        <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon> 添加销售</el-button>
      </div>
      <el-table :data="tableData" border style="margin-top: 20px">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="wechat" label="微信号" />
        <el-table-column prop="userId" label="绑定用户ID" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">{{ row.status === 1 ? '启用' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button type="primary" text @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" text @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="400px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="姓名"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="手机号"><el-input v-model="form.phone" /></el-form-item>
        <el-form-item label="微信号"><el-input v-model="form.wechat" /></el-form-item>
        <el-form-item label="绑定用户ID"><el-input v-model="form.userId" /></el-form-item>
        <el-form-item label="状态"><el-switch v-model="form.status" :active-value="1" :inactive-value="0" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getSalesPage, addSales, updateSales, deleteSales } from '@/api/sales'

const tableData = ref([])
const dialogVisible = ref(false)
const dialogTitle = ref('添加销售')
const form = ref({ name: '', phone: '', wechat: '', userId: null, status: 1 })

const fetchData = async () => {
  const res = await getSalesPage({ current: 1, size: 100 })
  tableData.value = res.data.records
}

const handleAdd = () => {
  dialogTitle.value = '添加销售'
  form.value = { name: '', phone: '', wechat: '', userId: null, status: 1 }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑销售'
  form.value = { ...row }
  dialogVisible.value = true
}

const handleSubmit = async () => {
  if (form.value.id) await updateSales(form.value)
  else await addSales(form.value)
  ElMessage.success('操作成功')
  dialogVisible.value = false
  fetchData()
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定删除？').then(async () => {
    await deleteSales(row.id)
    ElMessage.success('删除成功')
    fetchData()
  })
}

onMounted(fetchData)
</script>
