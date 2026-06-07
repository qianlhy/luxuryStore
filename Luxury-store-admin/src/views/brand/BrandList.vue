<template>
  <div class="brand-list">
    <el-card>
      <div class="toolbar">
        <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon> 添加品牌</el-button>
        <el-input v-model="queryParams.name" placeholder="搜索品牌" style="width: 300px" clearable @change="fetchData" />
      </div>
      <el-table :data="tableData" border style="margin-top: 20px">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="coverImage" label="封面" width="100">
          <template #default="{ row }">
            <el-image :src="row.coverImage" style="width: 60px; height: 60px" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="品牌名称" />
        <el-table-column prop="description" label="描述" show-overflow-tooltip />
        <el-table-column prop="sort" label="排序" width="80" />
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
      <el-pagination v-model:current-page="queryParams.current" v-model:page-size="queryParams.size" :total="total" layout="total, prev, pager, next" @current-change="fetchData" style="margin-top: 20px" />
    </el-card>
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="品牌名称"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="封面图"><el-input v-model="form.coverImage" placeholder="图片URL" /></el-form-item>
        <el-form-item label="描述"><el-input v-model="form.description" type="textarea" /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="form.sort" :min="0" /></el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBrandPage, addBrand, updateBrand, deleteBrand } from '@/api/brand'

const tableData = ref([])
const total = ref(0)
const dialogVisible = ref(false)
const dialogTitle = ref('添加品牌')
const queryParams = reactive({ current: 1, size: 10, name: '' })
const form = ref({ name: '', coverImage: '', description: '', sort: 0, status: 1 })

const fetchData = async () => {
  const res = await getBrandPage(queryParams)
  tableData.value = res.data.records
  total.value = res.data.total
}

const handleAdd = () => {
  dialogTitle.value = '添加品牌'
  form.value = { name: '', coverImage: '', description: '', sort: 0, status: 1 }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑品牌'
  form.value = { ...row }
  dialogVisible.value = true
}

const handleSubmit = async () => {
  if (form.value.id) {
    await updateBrand(form.value)
  } else {
    await addBrand(form.value)
  }
  ElMessage.success('操作成功')
  dialogVisible.value = false
  fetchData()
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定删除该品牌？').then(async () => {
    await deleteBrand(row.id)
    ElMessage.success('删除成功')
    fetchData()
  })
}

onMounted(fetchData)
</script>
