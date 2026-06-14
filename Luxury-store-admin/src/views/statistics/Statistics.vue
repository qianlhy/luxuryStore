<template>
  <div class="statistics">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header><span>浏览数据统计</span></template>
          <el-table v-loading="loading" :data="browseData" border max-height="500">
            <el-table-column prop="productName" label="商品" />
            <el-table-column prop="browseCount" label="浏览次数" width="100" />
            <el-table-column prop="uniqueVisitors" label="独立访客" width="100" />
            <template #empty>
              <el-empty description="暂无浏览数据" />
            </template>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header><span>收藏数据统计</span></template>
          <el-table v-loading="loading" :data="collectData" border max-height="500">
            <el-table-column prop="productName" label="商品" />
            <el-table-column prop="collectCount" label="收藏数" width="100" />
            <el-table-column label="收藏用户" width="200">
              <template #default="{ row }">
                <el-tag v-for="u in (row.users || []).slice(0, 3)" :key="u.userId" size="small" style="margin: 2px">{{ u.nickname }}</el-tag>
              </template>
            </el-table-column>
            <template #empty>
              <el-empty description="暂无收藏数据" />
            </template>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBrowseStatistics, getCollectStatistics } from '@/api/statistics'

const browseData = ref([])
const collectData = ref([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const [browseRes, collectRes] = await Promise.all([getBrowseStatistics(), getCollectStatistics()])
    browseData.value = browseRes.data || []
    collectData.value = collectRes.data || []
  } catch (e) {
    browseData.value = []
    collectData.value = []
  } finally {
    loading.value = false
  }
})
</script>
