<template>
  <div class="brand-list">
    <el-card>
      <div class="toolbar">
        <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon> 添加品牌</el-button>
        <div class="toolbar-right">
          <el-input
            v-model="queryParams.name"
            placeholder="搜索品牌名称"
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
        <el-table-column prop="coverImage" label="封面" width="100">
          <template #default="{ row }">
            <el-image v-if="row.coverImage" :src="row.coverImage" style="width: 60px; height: 60px" fit="cover" />
            <span v-else class="no-image">无</span>
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
        <template #empty>
          <el-empty description="暂无品牌数据" />
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
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="品牌名称" prop="name"><el-input v-model="form.name" maxlength="30" /></el-form-item>
        <el-form-item label="封面图"><el-input v-model="form.coverImage" placeholder="图片URL" /></el-form-item>
        <el-form-item label="描述"><el-input v-model="form.description" type="textarea" maxlength="200" show-word-limit /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="form.sort" :min="0" /></el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBrandPage, addBrand, updateBrand, deleteBrand } from '@/api/brand'
import { useTablePage } from '@/composables/useTablePage'

const { tableData, total, loading, queryParams, fetchData, handleSearch } = useTablePage(getBrandPage, {
  defaultParams: { name: '' }
})

const dialogVisible = ref(false)
const dialogTitle = ref('添加品牌')
const submitLoading = ref(false)
const formRef = ref()
const form = ref({ name: '', coverImage: '', description: '', sort: 0, status: 1 })

const rules = {
  name: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }]
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

const handleSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return
    submitLoading.value = true
    try {
      if (form.value.id) {
        await updateBrand(form.value)
      } else {
        await addBrand(form.value)
      }
      ElMessage.success('操作成功')
      dialogVisible.value = false
      fetchData()
    } finally {
      submitLoading.value = false
    }
  })
}

const handleDelete = (row) => {
  ElMessageBox.confirm(`确定删除品牌「${row.name}」吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await deleteBrand(row.id)
      ElMessage.success('删除成功')
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
.no-image {
  color: #c0c4cc;
  font-size: 12px;
}
</style>
