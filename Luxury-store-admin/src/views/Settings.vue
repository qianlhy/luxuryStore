<template>
  <div class="settings" v-loading="pageLoading">
    <el-card>
      <template #header>
        <span>基础配置</span>
      </template>
      <el-form :model="baseForm" label-width="120px">
        <el-form-item label="客服电话">
          <el-input v-model="baseForm.servicePhone" placeholder="请输入客服电话，如 400-888-9999" style="max-width: 360px" />
          <div class="form-tip">小程序“联系客服”将拨打该号码</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="saving" @click="saveBaseConfig">保存配置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 20px">
      <template #header>
        <span>订单通知配置</span>
      </template>
      <el-form :model="orderForm" label-width="120px">
        <el-form-item label="通知开关">
          <el-switch v-model="orderForm.enabled" />
        </el-form-item>
        <el-form-item label="语音播报">
          <el-switch v-model="orderForm.voiceEnabled" />
        </el-form-item>
        <el-form-item label="播报文本">
          <el-input v-model="orderForm.voiceText" placeholder="请输入语音播报文本" style="max-width: 360px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="saving" @click="saveOrderConfig">保存配置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 20px">
      <template #header>
        <span>系统信息（只读）</span>
      </template>
      <el-alert
        type="info"
        :closable="false"
        show-icon
        title="以下为部署级配置，需在后端 application.yml 中修改后重启生效，无法在线编辑。"
        style="margin-bottom: 16px"
      />
      <el-descriptions :column="1" border>
        <el-descriptions-item label="微信小程序">AppID / AppSecret 在 application.yml 的 wechat 节点配置</el-descriptions-item>
        <el-descriptions-item label="文件上传">上传路径与大小限制在 application.yml 的 file 节点配置</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getAllConfig, setConfigValue } from '@/api/config'

const pageLoading = ref(false)
const saving = ref(false)

const baseForm = ref({
  servicePhone: ''
})

const orderForm = ref({
  enabled: true,
  voiceEnabled: true,
  voiceText: '您有新的订单，请及时处理'
})

const loadConfig = async () => {
  pageLoading.value = true
  try {
    const res = await getAllConfig()
    const cfg = res.data || {}
    baseForm.value.servicePhone = cfg.service_phone || ''
    if (cfg.order_notify_enabled != null) orderForm.value.enabled = cfg.order_notify_enabled === 'true'
    if (cfg.order_notify_voice_enabled != null) orderForm.value.voiceEnabled = cfg.order_notify_voice_enabled === 'true'
    if (cfg.order_notify_voice_text) orderForm.value.voiceText = cfg.order_notify_voice_text
  } catch (e) {
    // 全局拦截器已提示
  } finally {
    pageLoading.value = false
  }
}

const saveBaseConfig = async () => {
  saving.value = true
  try {
    await setConfigValue({ key: 'service_phone', value: baseForm.value.servicePhone, remark: '客服电话' })
    ElMessage.success('保存成功')
  } finally {
    saving.value = false
  }
}

const saveOrderConfig = async () => {
  saving.value = true
  try {
    await setConfigValue({ key: 'order_notify_enabled', value: String(orderForm.value.enabled), remark: '订单通知开关' })
    await setConfigValue({ key: 'order_notify_voice_enabled', value: String(orderForm.value.voiceEnabled), remark: '订单语音播报开关' })
    await setConfigValue({ key: 'order_notify_voice_text', value: orderForm.value.voiceText, remark: '订单语音播报文本' })
    ElMessage.success('保存成功')
  } finally {
    saving.value = false
  }
}

onMounted(loadConfig)
</script>

<style scoped>
.el-card {
  max-width: 800px;
}
.form-tip {
  color: #999;
  font-size: 12px;
  margin-top: 4px;
}
</style>
