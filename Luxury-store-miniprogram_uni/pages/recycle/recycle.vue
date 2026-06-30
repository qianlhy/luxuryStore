<template>
    <view class="recycle-container">
        <!-- 顶部Banner + 词条轮播 -->
        <view class="banner-section">
            <image class="banner-img" :src="cfg.banner" mode="aspectFill"></image>
            <swiper class="ticker-bar" :vertical="true" :autoplay="true" :circular="true" :interval="3000" :duration="500" v-if="cfg.tickers.length">
                <swiper-item v-for="(item, index) in cfg.tickers" :key="index">
                    <view class="ticker-row">
                        <text class="ticker-text">{{ item.text }}</text>
                        <text class="ticker-date">{{ item.date }}</text>
                    </view>
                </swiper-item>
            </swiper>
        </view>

        <!-- 专业服务团队 -->
        <view class="team-section">
            <text class="block-title">专业服务团队</text>
            <view class="team-grid">
                <view class="team-item" v-for="(item, index) in cfg.team" :key="index">
                    <text class="team-icon">{{ item.icon }}</text>
                    <text class="team-title">{{ item.title }}</text>
                    <text class="team-desc">{{ item.desc }}</text>
                </view>
            </view>
        </view>

        <!-- 扫码加管家 -->
        <view class="qrcode-section" @tap="openContact">
            <view class="qrcode-box">
                <image v-if="qrcode" class="qrcode-img" :src="qrcode" mode="aspectFit" show-menu-by-longpress></image>
                <image v-else class="qrcode-img" src="/static/images/icons/service.png" mode="aspectFit"></image>
            </view>
            <view class="qrcode-info">
                <text class="qrcode-title">{{ cfg.guardian.title }}</text>
                <text class="qrcode-desc">{{ cfg.guardian.desc }}</text>
            </view>
        </view>

        <!-- 回收 / 寄售 流程 -->
        <view class="flow-section">
            <view class="flow-tabs">
                <text :class="'flow-tab ' + (flowTab === 'recycle' ? 'active' : '')" @tap="switchFlow" data-tab="recycle">回收流程</text>
                <text :class="'flow-tab ' + (flowTab === 'consign' ? 'active' : '')" @tap="switchFlow" data-tab="consign">寄售流程</text>
            </view>
            <view class="flow-steps">
                <view class="flow-step" v-for="(step, index) in currentSteps" :key="index">
                    <view class="flow-dot">{{ index + 1 }}</view>
                    <text class="flow-step-name">{{ step }}</text>
                    <view class="flow-line" v-if="index < currentSteps.length - 1"></view>
                </view>
            </view>
        </view>

        <!-- 85折兜底服务 -->
        <view class="guarantee-section" v-if="cfg.guaranteeText">
            <text class="block-title">85折兜底服务</text>
            <text class="guarantee-text">{{ cfg.guaranteeText }}</text>
        </view>

        <!-- 回收服务指南 FAQ -->
        <view class="faq-section" v-if="cfg.faqs.length">
            <text class="block-title">回收服务指南</text>
            <view class="faq-item" v-for="(item, index) in cfg.faqs" :key="index" @tap="toggleFaq" :data-index="index">
                <view class="faq-q">
                    <text class="faq-q-mark">Q</text>
                    <text class="faq-q-text">{{ item.q }}</text>
                    <text class="faq-arrow">{{ openFaq === index ? '−' : '+' }}</text>
                </view>
                <text class="faq-a" v-if="openFaq === index">{{ item.a }}</text>
            </view>
        </view>

        <!-- 回收用户评价 -->
        <view class="review-section" v-if="cfg.reviews.length">
            <text class="block-title">回收用户评价</text>
            <view class="review-item" v-for="(item, index) in cfg.reviews" :key="index">
                <view class="review-head">
                    <text class="review-name">{{ item.name }}</text>
                    <text class="review-region">{{ item.region }}</text>
                </view>
                <text class="review-content">{{ item.content }}</text>
            </view>
        </view>

        <!-- 联系回收管家 -->
        <view class="contact-btn" @tap="openContact">
            <text>联系回收管家</text>
        </view>

        <!-- 联系管家弹窗 -->
        <view class="contact-mask" v-if="showContact" @tap="closeContact">
            <view class="contact-popup" @tap.stop>
                <view class="popup-close" @tap="closeContact">×</view>
                <text class="popup-title">联系回收管家</text>
                <text class="popup-sub">长按二维码添加管家 · 评估回收价更高</text>
                <view class="popup-qr-box">
                    <image v-if="qrcode" class="popup-qr" :src="qrcode" mode="aspectFit" show-menu-by-longpress></image>
                    <view v-else class="popup-qr-empty">
                        <text class="popup-qr-empty-icon">🎧</text>
                        <text class="popup-qr-empty-text">暂未配置二维码</text>
                    </view>
                </view>
                <view class="popup-phone-row">
                    <text class="popup-phone-label">回收热线</text>
                    <text class="popup-phone-num">{{ servicePhone }}</text>
                </view>
                <view class="popup-call-btn" @tap="callPhone">拨打电话</view>
            </view>
        </view>
    </view>
</template>

<script>
const configApi = require('../../api/config');
const { seedImage, resolveImage } = require('../../utils/image');

const DEFAULT_CONFIG = {
    banner: seedImage('banner1.jpg'),
    tickers: [
        { text: '张** 卖出了 LV 手提包，收入 ￥***', date: '06-03' },
        { text: '李** 寄售了 香奈儿 链条包，成交 ￥***', date: '06-05' },
        { text: '王** 回收了 劳力士 腕表，到账 ￥***', date: '06-08' }
    ],
    team: [
        { icon: '🧑‍🔬', title: '资深鉴定师', desc: '一对一服务，在线快速了解您的产品价值' },
        { icon: '💼', title: '省心省力', desc: '售前0服务费，全程托管0费心，坐等收钱' },
        { icon: '⚡', title: '快速见真伪', desc: '线上出价格交易成功，24小时极速到账' }
    ],
    guardian: { title: '扫码加管家 回收价更高', desc: '长按图片识别二维码' },
    recycleSteps: ['咨询预约', '快递邮寄', '审核打款', '极速到账'],
    consignSteps: ['咨询预约', '上架寄售', '成交结算', '货款到账'],
    guaranteeText: '在白白叶叶抖音、微信、门店购买的订单，一年内85折兜底回收。\n例：售价8000元的包包，在购买日期一年内联系回收，8000×0.85=6800元。\n包包当前市场行情价低于6800，我们将启动85折兜底；高于6800元，将依照实际市场价格回收。',
    faqs: [
        { q: '回收/寄售完成后货款打到哪里？', a: '货款会打到您的钱包内，可随时申请提现，提现24小时内到账，请务必确保登记时提供的账号信息准确。' },
        { q: '估价完成后一定会交易成功吗？', a: '因图片拍摄可能存在差异，收到货品后会进行实物质检并提供最终报价，实际交易以您的最终确认为准。' },
        { q: '你们收到货后多久可以给我结果？', a: '快递签收后两个工作日内会有客服专员致电或短信告知质检结果，若低于预估价可退回商品，运费由我司承担。' },
        { q: '为什么全新正品回收价格这么低？', a: '回收价格根据该商品当下二手市场行情给出，可作参考；不选择回收也可选择寄售，寄售价格相对较高。' }
    ],
    reviews: [
        { name: 'Sie***', region: '北京', content: '整个回收过程非常顺利，估价合理，打款迅速。' },
        { name: 'Lin***', region: '上海', content: '鉴定师很专业，沟通耐心，会推荐给朋友。' }
    ]
};

export default {
    data() {
        return {
            cfg: DEFAULT_CONFIG,
            qrcode: '',
            servicePhone: '400-888-9999',
            flowTab: 'recycle',
            openFaq: -1,
            showContact: false
        };
    },
    computed: {
        currentSteps() {
            return this.flowTab === 'recycle' ? (this.cfg.recycleSteps || []) : (this.cfg.consignSteps || []);
        }
    },
    onLoad() {
        this.loadConfig();
    },
    methods: {
        loadConfig() {
            configApi.getAll().then((map) => {
                map = map || {};
                let parsed = {};
                if (map.recycle_config) {
                    try {
                        parsed = JSON.parse(map.recycle_config) || {};
                    } catch (e) {
                        parsed = {};
                    }
                }
                const cfg = Object.assign({}, DEFAULT_CONFIG, parsed);
                cfg.guardian = Object.assign({}, DEFAULT_CONFIG.guardian, parsed.guardian || {});
                if (cfg.banner) cfg.banner = resolveImage(cfg.banner);
                this.setData({
                    cfg,
                    servicePhone: map.service_phone || this.servicePhone,
                    qrcode: map.recycle_qrcode ? resolveImage(map.recycle_qrcode) : (parsed.guardian && parsed.guardian.qrcode ? resolveImage(parsed.guardian.qrcode) : '')
                });
            }).catch(() => {});
        },
        switchFlow(e) {
            this.setData({ flowTab: e.currentTarget.dataset.tab });
        },
        toggleFaq(e) {
            const index = e.currentTarget.dataset.index;
            this.setData({ openFaq: this.openFaq === index ? -1 : index });
        },
        openContact() {
            this.setData({ showContact: true });
        },
        closeContact() {
            this.setData({ showContact: false });
        },
        callPhone() {
            uni.makePhoneCall({ phoneNumber: this.servicePhone });
        }
    }
};
</script>

<style>
.recycle-container {
    min-height: 100vh;
    background-color: #FBF7F9;
    padding-bottom: 60rpx;
}
.banner-section {
    position: relative;
    height: 400rpx;
}
.banner-img {
    width: 100%;
    height: 100%;
}
.ticker-bar {
    position: absolute;
    bottom: 30rpx;
    left: 30rpx;
    right: 30rpx;
    height: 60rpx;
    background: rgba(255,255,255,0.92);
    border-radius: 40rpx;
}
.ticker-row {
    height: 60rpx;
    padding: 0 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.ticker-text { font-size: 24rpx; color: #333; }
.ticker-date { font-size: 22rpx; color: #999; }
.block-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #1A1A1A;
    display: block;
    margin-bottom: 24rpx;
}
.team-section {
    background: #fff;
    margin: 20rpx 30rpx;
    padding: 36rpx 30rpx;
    border-radius: 16rpx;
}
.team-grid { display: flex; justify-content: space-between; }
.team-item {
    width: 31%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
.team-icon { font-size: 48rpx; }
.team-title { font-size: 26rpx; font-weight: bold; color: #333; margin: 12rpx 0 8rpx; }
.team-desc { font-size: 20rpx; color: #999; line-height: 1.4; }
.qrcode-section {
    display: flex;
    align-items: center;
    background: #fff;
    margin: 0 30rpx 20rpx;
    padding: 36rpx;
    border-radius: 16rpx;
}
.qrcode-box {
    width: 180rpx;
    height: 180rpx;
    margin-right: 30rpx;
    flex-shrink: 0;
}
.qrcode-img { width: 100%; height: 100%; }
.qrcode-title {
    font-size: 30rpx;
    font-weight: bold;
    color: #1A1A1A;
    display: block;
    margin-bottom: 16rpx;
}
.qrcode-desc { font-size: 24rpx; color: #999; }
.flow-section {
    background: #fff;
    margin: 0 30rpx 20rpx;
    padding: 36rpx 30rpx;
    border-radius: 16rpx;
}
.flow-tabs {
    display: flex;
    border-bottom: 1rpx solid #f0e6eb;
    margin-bottom: 36rpx;
}
.flow-tab {
    font-size: 30rpx;
    color: #888;
    padding: 0 10rpx 18rpx;
    margin-right: 50rpx;
}
.flow-tab.active {
    color: #C9275F;
    font-weight: bold;
    border-bottom: 4rpx solid #E14C82;
}
.flow-steps {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.flow-step {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}
.flow-dot {
    width: 56rpx;
    height: 56rpx;
    border-radius: 50%;
    background: linear-gradient(135deg, #F79AC0, #E14C82);
    color: #fff;
    font-size: 26rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
}
.flow-step-name { font-size: 22rpx; color: #555; margin-top: 14rpx; }
.flow-line {
    position: absolute;
    top: 28rpx;
    left: 50%;
    width: 100%;
    height: 2rpx;
    background: #F2D5E0;
    z-index: 1;
}
.guarantee-section {
    background: #fff;
    margin: 0 30rpx 20rpx;
    padding: 36rpx 30rpx;
    border-radius: 16rpx;
}
.guarantee-text {
    font-size: 24rpx;
    color: #666;
    line-height: 1.7;
    white-space: pre-line;
}
.faq-section {
    background: #fff;
    margin: 0 30rpx 20rpx;
    padding: 36rpx 30rpx;
    border-radius: 16rpx;
}
.faq-item {
    border-bottom: 1rpx solid #f5f0f2;
    padding: 24rpx 0;
}
.faq-item:last-child { border-bottom: none; }
.faq-q { display: flex; align-items: center; }
.faq-q-mark {
    width: 36rpx;
    height: 36rpx;
    border-radius: 8rpx;
    background: #FBE3EC;
    color: #C9275F;
    font-size: 22rpx;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16rpx;
    flex-shrink: 0;
}
.faq-q-text { flex: 1; font-size: 28rpx; color: #333; }
.faq-arrow { font-size: 34rpx; color: #bbb; margin-left: 16rpx; }
.faq-a {
    font-size: 24rpx;
    color: #888;
    line-height: 1.6;
    margin-top: 16rpx;
    padding-left: 52rpx;
}
.review-section {
    background: #fff;
    margin: 0 30rpx 20rpx;
    padding: 36rpx 30rpx;
    border-radius: 16rpx;
}
.review-item {
    border-bottom: 1rpx solid #f5f0f2;
    padding: 20rpx 0;
}
.review-item:last-child { border-bottom: none; }
.review-head { display: flex; align-items: baseline; margin-bottom: 10rpx; }
.review-name { font-size: 26rpx; font-weight: bold; color: #333; margin-right: 16rpx; }
.review-region { font-size: 22rpx; color: #999; }
.review-content { font-size: 24rpx; color: #666; line-height: 1.5; }
.contact-btn {
    margin: 30rpx 60rpx 10rpx;
    background: linear-gradient(135deg, #F79AC0, #E14C82);
    color: #fff;
    text-align: center;
    padding: 26rpx;
    border-radius: 44rpx;
    font-size: 30rpx;
}
.contact-mask {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}
.contact-popup {
    width: 580rpx;
    background: #fff;
    border-radius: 24rpx;
    padding: 50rpx 40rpx 40rpx;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.popup-close {
    position: absolute;
    top: 16rpx;
    right: 28rpx;
    font-size: 48rpx;
    color: #bbb;
    line-height: 1;
}
.popup-title { font-size: 34rpx; font-weight: bold; color: #1A1A1A; }
.popup-sub { font-size: 24rpx; color: #999; margin-top: 14rpx; text-align: center; }
.popup-qr-box {
    width: 360rpx;
    height: 360rpx;
    margin: 36rpx 0;
    border-radius: 16rpx;
    background: #FBF7F9;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.popup-qr { width: 100%; height: 100%; }
.popup-qr-empty { display: flex; flex-direction: column; align-items: center; }
.popup-qr-empty-icon { font-size: 80rpx; }
.popup-qr-empty-text { font-size: 24rpx; color: #bbb; margin-top: 16rpx; }
.popup-phone-row {
    display: flex;
    align-items: baseline;
    margin-bottom: 30rpx;
}
.popup-phone-label { font-size: 26rpx; color: #666; margin-right: 16rpx; }
.popup-phone-num { font-size: 36rpx; font-weight: bold; color: #E14C82; letter-spacing: 1rpx; }
.popup-call-btn {
    width: 100%;
    background: linear-gradient(135deg, #F79AC0, #E14C82);
    color: #fff;
    text-align: center;
    padding: 22rpx;
    border-radius: 40rpx;
    font-size: 30rpx;
}
</style>
