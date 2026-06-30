<template>
  <div class="page-config" v-loading="pageLoading">
    <el-tabs v-model="activeTab">
      <!-- 首页配置 -->
      <el-tab-pane label="首页配置" name="home">
        <el-card>
          <el-form label-width="120px" style="max-width: 720px">
            <el-form-item label="热搜词">
              <el-input v-model="home.hotKeywords" placeholder="多个关键词用英文逗号分隔，如：LV,香奈儿,劳力士" />
              <div class="tip">小程序首页搜索框轮播展示</div>
            </el-form-item>
            <el-form-item label="捡漏文案">
              <el-input v-model="home.bargainText" placeholder="如：每周六中午14点上新" />
            </el-form-item>
            <el-form-item label="门店地址">
              <el-input v-model="home.storeAddress" type="textarea" :rows="2" placeholder="门店详细地址" />
            </el-form-item>
            <el-form-item label="爆款推荐图">
              <ImageUpload v-model="home.hotImage" />
            </el-form-item>
            <el-form-item label="门店地址图">
              <ImageUpload v-model="home.storeImage" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="saving" @click="saveHome">保存首页配置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <!-- 回收页配置 -->
      <el-tab-pane label="回收页配置" name="recycle">
        <el-card>
          <el-form label-width="120px">
            <el-form-item label="顶部Banner">
              <ImageUpload v-model="recycle.banner" />
            </el-form-item>
            <el-form-item label="管家二维码">
              <ImageUpload v-model="recycleQrcode" />
              <div class="tip">小程序“联系回收管家”弹窗展示</div>
            </el-form-item>
            <el-form-item label="回收热线">
              <el-input v-model="servicePhone" placeholder="客服/回收热线" style="max-width: 360px" />
            </el-form-item>

            <el-divider content-position="left">词条轮播</el-divider>
            <div v-for="(t, i) in recycle.tickers" :key="'t' + i" class="row">
              <el-input v-model="t.text" placeholder="成交动态，如：张** 卖出了 LV 手提包" style="flex: 1" />
              <el-input v-model="t.date" placeholder="日期 06-03" style="width: 120px" />
              <el-button type="danger" text @click="recycle.tickers.splice(i, 1)">删除</el-button>
            </div>
            <el-button size="small" @click="recycle.tickers.push({ text: '', date: '' })">+ 添加词条</el-button>

            <el-divider content-position="left">专业服务团队（建议3项）</el-divider>
            <div v-for="(m, i) in recycle.team" :key="'m' + i" class="row">
              <el-input v-model="m.icon" placeholder="图标(emoji)" style="width: 100px" />
              <el-input v-model="m.title" placeholder="标题" style="width: 180px" />
              <el-input v-model="m.desc" placeholder="描述" style="flex: 1" />
              <el-button type="danger" text @click="recycle.team.splice(i, 1)">删除</el-button>
            </div>
            <el-button size="small" @click="recycle.team.push({ icon: '', title: '', desc: '' })">+ 添加</el-button>

            <el-divider content-position="left">扫码加管家文案</el-divider>
            <div class="row">
              <el-input v-model="recycle.guardian.title" placeholder="标题，如：扫码加管家 回收价更高" style="flex: 1" />
            </div>
            <div class="row">
              <el-input v-model="recycle.guardian.desc" placeholder="副标题，如：长按图片识别二维码" style="flex: 1" />
            </div>

            <el-divider content-position="left">回收流程</el-divider>
            <div v-for="(s, i) in recycle.recycleSteps" :key="'rs' + i" class="row">
              <el-input v-model="recycle.recycleSteps[i]" placeholder="步骤名称" style="width: 260px" />
              <el-button type="danger" text @click="recycle.recycleSteps.splice(i, 1)">删除</el-button>
            </div>
            <el-button size="small" @click="recycle.recycleSteps.push('')">+ 添加步骤</el-button>

            <el-divider content-position="left">寄售流程</el-divider>
            <div v-for="(s, i) in recycle.consignSteps" :key="'cs' + i" class="row">
              <el-input v-model="recycle.consignSteps[i]" placeholder="步骤名称" style="width: 260px" />
              <el-button type="danger" text @click="recycle.consignSteps.splice(i, 1)">删除</el-button>
            </div>
            <el-button size="small" @click="recycle.consignSteps.push('')">+ 添加步骤</el-button>

            <el-divider content-position="left">85折兜底服务说明</el-divider>
            <el-input v-model="recycle.guaranteeText" type="textarea" :rows="4" placeholder="兜底服务说明" />

            <el-divider content-position="left">回收服务指南 FAQ</el-divider>
            <div v-for="(f, i) in recycle.faqs" :key="'f' + i" class="faq-row">
              <el-input v-model="f.q" placeholder="问题" />
              <el-input v-model="f.a" type="textarea" :rows="2" placeholder="回答" />
              <el-button type="danger" text @click="recycle.faqs.splice(i, 1)">删除该问答</el-button>
              <el-divider />
            </div>
            <el-button size="small" @click="recycle.faqs.push({ q: '', a: '' })">+ 添加问答</el-button>

            <el-divider content-position="left">用户评价</el-divider>
            <div v-for="(r, i) in recycle.reviews" :key="'r' + i" class="row">
              <el-input v-model="r.name" placeholder="昵称 Sie***" style="width: 140px" />
              <el-input v-model="r.region" placeholder="地区 北京" style="width: 120px" />
              <el-input v-model="r.content" placeholder="评价内容" style="flex: 1" />
              <el-button type="danger" text @click="recycle.reviews.splice(i, 1)">删除</el-button>
            </div>
            <el-button size="small" @click="recycle.reviews.push({ name: '', region: '', content: '' })">+ 添加评价</el-button>

            <el-form-item style="margin-top: 24px">
              <el-button type="primary" :loading="saving" @click="saveRecycle">保存回收页配置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, h } from 'vue'
import { ElMessage, ElUpload, ElIcon } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { getAllConfig, setConfigValue } from '@/api/config'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const pageLoading = ref(false)
const saving = ref(false)
const activeTab = ref('home')

const servicePhone = ref('')
const recycleQrcode = ref('')

const home = reactive({
  hotKeywords: '',
  bargainText: '',
  storeAddress: '',
  hotImage: '',
  storeImage: ''
})

const recycle = reactive({
  banner: '',
  tickers: [],
  team: [],
  guardian: { title: '', desc: '' },
  recycleSteps: [],
  consignSteps: [],
  guaranteeText: '',
  faqs: [],
  reviews: []
})

// 简易图片上传组件（局部）
const ImageUpload = {
  props: { modelValue: String },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const action = '/api/file/upload'
    const headers = { Authorization: userStore.token }
    const onSuccess = (res) => {
      if (res.code === 200) {
        emit('update:modelValue', res.data.url)
        ElMessage.success('上传成功')
      } else {
        ElMessage.error(res.message || '上传失败')
      }
    }
    return () =>
      h(
        ElUpload,
        {
          action,
          headers,
          showFileList: false,
          onSuccess,
          class: 'pc-uploader'
        },
        {
          default: () =>
            props.modelValue
              ? h('img', { src: props.modelValue, class: 'pc-preview' })
              : h(ElIcon, { class: 'pc-icon' }, { default: () => h(Plus) })
        }
      )
  }
}

const loadConfig = async () => {
  pageLoading.value = true
  try {
    const res = await getAllConfig()
    const cfg = res.data || {}
    home.hotKeywords = cfg.hot_keywords || ''
    home.bargainText = cfg.bargain_text || ''
    home.storeAddress = cfg.store_address || ''
    home.hotImage = cfg.home_hot_image || ''
    home.storeImage = cfg.home_store_image || ''
    servicePhone.value = cfg.service_phone || ''
    recycleQrcode.value = cfg.recycle_qrcode || ''
    let parsed = {}
    if (cfg.recycle_config) {
      try { parsed = JSON.parse(cfg.recycle_config) || {} } catch (e) { parsed = {} }
    }
    recycle.banner = parsed.banner || ''
    recycle.tickers = parsed.tickers || []
    recycle.team = parsed.team || []
    recycle.guardian = Object.assign({ title: '', desc: '' }, parsed.guardian || {})
    recycle.recycleSteps = parsed.recycleSteps || []
    recycle.consignSteps = parsed.consignSteps || []
    recycle.guaranteeText = parsed.guaranteeText || ''
    recycle.faqs = parsed.faqs || []
    recycle.reviews = parsed.reviews || []
  } finally {
    pageLoading.value = false
  }
}

const saveHome = async () => {
  saving.value = true
  try {
    await setConfigValue({ key: 'hot_keywords', value: home.hotKeywords, remark: '首页热搜词' })
    await setConfigValue({ key: 'bargain_text', value: home.bargainText, remark: '首页捡漏文案' })
    await setConfigValue({ key: 'store_address', value: home.storeAddress, remark: '门店地址' })
    await setConfigValue({ key: 'home_hot_image', value: home.hotImage, remark: '首页爆款推荐入口图' })
    await setConfigValue({ key: 'home_store_image', value: home.storeImage, remark: '首页门店地址入口图' })
    ElMessage.success('保存成功')
  } finally {
    saving.value = false
  }
}

const saveRecycle = async () => {
  saving.value = true
  try {
    const json = JSON.stringify({
      banner: recycle.banner,
      tickers: recycle.tickers,
      team: recycle.team,
      guardian: recycle.guardian,
      recycleSteps: recycle.recycleSteps,
      consignSteps: recycle.consignSteps,
      guaranteeText: recycle.guaranteeText,
      faqs: recycle.faqs,
      reviews: recycle.reviews
    })
    await setConfigValue({ key: 'recycle_config', value: json, remark: '回收页配置JSON' })
    await setConfigValue({ key: 'recycle_qrcode', value: recycleQrcode.value, remark: '回收管家二维码' })
    await setConfigValue({ key: 'service_phone', value: servicePhone.value, remark: '客服电话' })
    ElMessage.success('保存成功')
  } finally {
    saving.value = false
  }
}

onMounted(loadConfig)
</script>

<style scoped>
.row {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}
.faq-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 6px;
}
.tip {
  color: #999;
  font-size: 12px;
  margin-top: 4px;
}
.page-config :deep(.pc-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
}
.page-config :deep(.pc-preview) {
  width: 120px;
  height: 120px;
  object-fit: cover;
}
.page-config :deep(.pc-icon) {
  font-size: 28px;
  color: #8c939d;
}
</style>
