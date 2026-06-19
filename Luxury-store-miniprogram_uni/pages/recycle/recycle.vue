<template>
    <view class="recycle-container">
        <!-- 顶部Banner -->
        <view class="banner-section">
            <image class="banner-img" :src="bannerImage" mode="aspectFill"></image>
            <view class="ticker-bar">
                <text class="ticker-text">张** 卖出了LV手提包，收入 ￥***</text>
                <text class="ticker-date">06-03</text>
            </view>
        </view>

        <!-- 服务亮点 -->
        <view class="service-bar">
            <view class="service-item">
                <text class="service-icon">👤</text>
                <text>专属客服</text>
            </view>
            <view class="service-item">
                <text class="service-icon">⚡</text>
                <text>极速变现</text>
            </view>
            <view class="service-item">
                <text class="service-icon">🛡</text>
                <text>全程保障</text>
            </view>
        </view>

        <!-- 扫码加管家 -->
        <view class="qrcode-section">
            <view class="qrcode-box">
                <image class="qrcode-img" src="/static/images/icons/service.png" mode="aspectFit"></image>
            </view>
            <view class="qrcode-info">
                <text class="qrcode-title">扫码加管家 回收价更高</text>
                <text class="qrcode-desc">长按图片识别二维码</text>
            </view>
        </view>

        <!-- 品牌分类 -->
        <view class="brand-grid">
            <view class="brand-item" v-for="(item, index) in brands" :key="index" @tap="contactRecycle">
                <image class="brand-img" :src="item.coverImage" mode="aspectFill"></image>
                <view class="brand-label">{{ item.name }}</view>
            </view>
        </view>

        <!-- 联系客服 -->
        <view class="contact-btn" @tap="contactRecycle">
            <text>联系回收管家</text>
        </view>
    </view>
</template>

<script>
const brandApi = require('../../api/brand');
const configApi = require('../../api/config');
const { seedImage, resolveImage } = require('../../utils/image');
export default {
    data() {
        return {
            bannerImage: seedImage('banner1.jpg'),
            brands: [],
            servicePhone: '400-888-9999'
        };
    },
    onLoad() {
        this.loadBrands();
        this.loadConfig();
    },
    methods: {
        loadBrands() {
            brandApi.getBrandList().then((data) => {
                const brands = (data || []).map((item) => ({
                    ...item,
                    coverImage: resolveImage(item.coverImage)
                }));
                this.setData({ brands });
            }).catch(() => {});
        },
        loadConfig() {
            configApi.getValue('service_phone').then((phone) => {
                if (phone) this.setData({ servicePhone: phone });
            }).catch(() => {});
        },
        contactRecycle() {
            uni.makePhoneCall({ phoneNumber: this.servicePhone });
        }
    }
};
</script>

<style>
.recycle-container {
    min-height: 100vh;
    background-color: #FBF7F9;
    padding-bottom: 40rpx;
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
    background: rgba(255,255,255,0.9);
    border-radius: 40rpx;
    padding: 16rpx 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.ticker-text { font-size: 24rpx; color: #333; }
.ticker-date { font-size: 22rpx; color: #999; }
.service-bar {
    display: flex;
    justify-content: space-around;
    padding: 30rpx;
    background: #FFF1F6;
}
.service-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24rpx;
    color: #C9275F;
}
.service-icon { font-size: 36rpx; margin-bottom: 8rpx; }
.qrcode-section {
    display: flex;
    align-items: center;
    background: #fff;
    margin: 20rpx 30rpx;
    padding: 40rpx;
    border-radius: 16rpx;
}
.qrcode-box {
    width: 200rpx;
    height: 200rpx;
    margin-right: 30rpx;
}
.qrcode-img { width: 100%; height: 100%; }
.qrcode-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #1A1A1A;
    display: block;
    margin-bottom: 16rpx;
}
.qrcode-desc { font-size: 24rpx; color: #999; }
.brand-grid {
    display: flex;
    flex-wrap: wrap;
    padding: 20rpx 20rpx 0;
}
.brand-item {
    width: 33.33%;
    padding: 10rpx;
    box-sizing: border-box;
}
.brand-img {
    width: 100%;
    height: 200rpx;
    border-radius: 8rpx 8rpx 0 0;
}
.brand-label {
    background: linear-gradient(135deg, #F79AC0, #E14C82);
    color: #fff;
    text-align: center;
    font-size: 22rpx;
    padding: 10rpx 0;
    border-radius: 0 0 8rpx 8rpx;
    letter-spacing: 2rpx;
}
.contact-btn {
    margin: 40rpx 60rpx;
    background: var(--primary-color);
    color: #fff;
    text-align: center;
    padding: 24rpx;
    border-radius: 40rpx;
    font-size: 30rpx;
}
</style>
