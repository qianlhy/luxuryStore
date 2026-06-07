<template>
  <div class="statistics">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header><span>浏览数据统计</span></template>
          <el-table :data="browseData" border max-height="500">
            <el-table-column prop="productName" label="商品" />
            <el-table-column prop="browseCount" label="浏览次数" width="100" />
            <el-table-column prop="uniqueVisitors" label="独立访客" width="100" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header><span>收藏数据统计</span></template>
          <el-table :data="collectData" border max-height="500">
            <el-table-column prop="productName" label="商品" />
            <el-table-column prop="collectCount" label="收藏数" width="100" />
            <el-table-column label="收藏用户" width="200">
              <template #default="{ row }">
                <el-tag v-for="u in (row.users || []).slice(0, 3)" :key="u.userId" size="small" style="margin: 2px">{{ u.nickname }}</el-tag>
              </template>
            </el-table-column>
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

onMounted(async () => {
  const browseRes = await getBrowseStatistics()
  const collectRes = await getCollectStatistics()
  browseData.value = browseRes.data
  collectData.value = collectRes.data
})
</script>
