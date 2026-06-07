<template>
    <view class="user-container">
        <!-- 用户信息头部 -->
        <view class="user-header">
            <view class="header-top">
                <view class="user-info-row" v-if="isLogin" @tap="goToSettings">
                    <text class="user-nickname">{{ userInfo.nickName || userInfo.nickname || '微信用户' }}</text>
                    <text class="settings-icon">⚙</text>
                </view>
                <view class="user-info-row" v-else @tap="goToLogin">
                    <text class="login-text">登录/注册</text>
                    <text class="settings-icon">⚙</text>
                </view>
            </view>
            <view class="points-card" @tap="goToPoints">
                <view class="points-left">
                    <text class="points-tip">下单获赠积分，积分兑换更优惠</text>
                </view>
                <view class="points-right">
                    <text class="points-num">{{ points }}</text>
                    <text class="points-label">我的积分</text>
                </view>
            </view>
        </view>

        <!-- 未登录提示 -->
        <view class="login-prompt" v-if="!isLogin">
            <image class="login-icon" src="/static/images/icons/default-avatar.png" mode="aspectFit"></image>
            <text class="login-prompt-text">暂未登录</text>
            <view class="login-outline-btn" @tap="goToLogin">去登录</view>
        </view>

        <!-- 快捷入口 -->
        <view class="quick-links" v-if="isLogin">
            <view class="quick-item" @tap="navigateTo" data-url="/pages/points/points">
                <text class="quick-icon">📋</text>
                <text>权益列表</text>
            </view>
            <view class="quick-item" @tap="navigateTo" data-url="/pages/collection/collection">
                <text class="quick-icon">⭐</text>
                <text>收藏</text>
            </view>
            <view class="quick-item" @tap="navigateTo" data-url="/pages/footprint/footprint">
                <text class="quick-icon">👣</text>
                <text>足迹</text>
            </view>
        </view>

        <!-- 订单信息 -->
        <view class="order-section" v-if="isLogin">
            <view class="section-header" @tap="viewAllOrders">
                <text class="section-title">我的订单</text>
                <text class="section-more">全部订单 ></text>
            </view>
            <view class="order-types">
                <view class="order-type" @tap="viewOrdersByStatus" data-status="待付款">
                    <text class="order-emoji">💳</text>
                    <text>待付款</text>
                    <view class="order-badge" v-if="orderStats.unpaid > 0">{{ orderStats.unpaid }}</view>
                </view>
                <view class="order-type" @tap="viewOrdersByStatus" data-status="待发货">
                    <text class="order-emoji">📦</text>
                    <text>待发货</text>
                </view>
                <view class="order-type" @tap="viewOrdersByStatus" data-status="待收货">
                    <text class="order-emoji">🚚</text>
                    <text>待收货</text>
                </view>
                <view class="order-type" @tap="viewOrdersByStatus" data-status="已完成">
                    <text class="order-emoji">✅</text>
                    <text>已完成</text>
                </view>
            </view>
        </view>

        <!-- 工具与服务 -->
        <view class="features">
            <text class="features-title">工具与服务</text>
            <view class="feature-item" @tap="navigateTo" data-url="/pages/share/list">
                <text class="feature-emoji">🔗</text>
                <text>分享记录</text>
                <text class="arrow">></text>
            </view>
            <view class="feature-item" @tap="navigateTo" data-url="/pages/address/list">
                <text class="feature-emoji">📍</text>
                <text>收货地址</text>
                <text class="arrow">></text>
            </view>
            <view class="feature-item" @tap="contactService">
                <text class="feature-emoji">🎧</text>
                <text>联系客服</text>
                <text class="arrow">></text>
            </view>
            <view class="feature-item" @tap="navigateTo" data-url="/pages/settings/settings">
                <text class="feature-emoji">⚙</text>
                <text>设置中心</text>
                <text class="arrow">></text>
            </view>
            <view class="feature-item" v-if="isLogin" @tap="logout">
                <text class="feature-emoji">🚪</text>
                <text>退出登录</text>
                <text class="arrow">></text>
            </view>
        </view>

        <view class="version-info">
            <text>名品汇商城 v2.0.0</text>
        </view>
    </view>
</template>

<script>
const orderApi = require('../../api/order');
const pointsApi = require('../../api/points');
const configApi = require('../../api/config');
export default {
    data() {
        return {
            userInfo: null,
            isLogin: false,
            points: 0,
            orderStats: { unpaid: 0, unshipped: 0, shipped: 0, completed: 0 },
            servicePhone: '400-888-9999'
        };
    },
    onShow() {
        this.checkLoginStatus();
        this.getOrderStats();
        this.getPoints();
        configApi.getValue('service_phone').then((phone) => {
            if (phone) this.setData({ servicePhone: phone });
        }).catch(() => {});
    },
    methods: {
        checkLoginStatus() {
            const token = uni.getStorageSync('token');
            const userInfo = uni.getStorageSync('userInfo');
            this.setData({ userInfo, isLogin: !!token });
        },
        getPoints() {
            const token = uni.getStorageSync('token');
            if (!token) return;
            pointsApi.getBalance().then((data) => {
                this.setData({ points: data || 0 });
            }).catch(() => {});
        },
        getOrderStats() {
            const token = uni.getStorageSync('token');
            if (!token) return;
            orderApi.getOrderStatistics().then((data) => {
                this.setData({ orderStats: data });
            }).catch(() => {});
        },
        goToLogin() {
            uni.navigateTo({ url: '/pages/login/login' });
        },
        goToPoints() {
            if (!this.isLogin) { this.goToLogin(); return; }
            uni.navigateTo({ url: '/pages/points/points' });
        },
        goToSettings() {
            uni.navigateTo({ url: '/pages/settings/settings' });
        },
        logout() {
            uni.showModal({
                title: '提示',
                content: '确定要退出登录吗？',
                success: (res) => {
                    if (res.confirm) {
                        uni.removeStorageSync('token');
                        uni.removeStorageSync('userInfo');
                        this.setData({ userInfo: null, isLogin: false, points: 0 });
                        uni.showToast({ title: '已退出登录', icon: 'success' });
                    }
                }
            });
        },
        viewAllOrders() {
            if (!this.isLogin) { this.goToLogin(); return; }
            uni.navigateTo({ url: '/pages/order/list' });
        },
        viewOrdersByStatus(e) {
            if (!this.isLogin) { this.goToLogin(); return; }
            uni.navigateTo({ url: '/pages/order/list?status=' + e.currentTarget.dataset.status });
        },
        navigateTo(e) {
            if (!this.isLogin) { this.goToLogin(); return; }
            uni.navigateTo({ url: e.currentTarget.dataset.url });
        },
        contactService() {
            uni.makePhoneCall({ phoneNumber: this.servicePhone });
        }
    }
};
</script>

<style>
.user-container { min-height: 100vh; background: #F8F8F8; }
.user-header { background: #fff; padding: 40rpx 30rpx 0; }
.header-top { margin-bottom: 20rpx; }
.user-info-row { display: flex; justify-content: space-between; align-items: center; }
.user-nickname, .login-text { font-size: 36rpx; font-weight: bold; color: #1A1A1A; }
.settings-icon { font-size: 36rpx; color: #999; }
.points-card {
    background: #1A1A1A;
    border-radius: 16rpx 16rpx 0 0;
    padding: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.points-tip { color: rgba(255,255,255,0.6); font-size: 22rpx; }
.points-right { text-align: right; }
.points-num { color: #fff; font-size: 56rpx; font-weight: bold; display: block; }
.points-label { color: rgba(255,255,255,0.6); font-size: 22rpx; }
.login-prompt {
    background: #fff;
    margin: 30rpx;
    border-radius: 16rpx;
    padding: 60rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.login-icon { width: 120rpx; height: 120rpx; margin-bottom: 20rpx; opacity: 0.5; }
.login-prompt-text { font-size: 28rpx; color: #999; margin-bottom: 30rpx; }
.login-outline-btn {
    border: 2rpx solid #C5A36A;
    color: #C5A36A;
    padding: 16rpx 60rpx;
    border-radius: 40rpx;
    font-size: 28rpx;
}
.quick-links {
    display: flex;
    background: #fff;
    margin: 20rpx 30rpx;
    border-radius: 16rpx;
    padding: 30rpx 0;
}
.quick-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24rpx;
    color: #666;
}
.quick-icon { font-size: 40rpx; margin-bottom: 10rpx; }
.order-section {
    background: #fff;
    margin: 0 30rpx 20rpx;
    border-radius: 16rpx;
    padding: 30rpx;
}
.section-header { display: flex; justify-content: space-between; margin-bottom: 30rpx; }
.section-title { font-size: 30rpx; font-weight: bold; }
.section-more { font-size: 24rpx; color: #999; }
.order-types { display: flex; justify-content: space-around; }
.order-type {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 22rpx;
    color: #666;
    position: relative;
}
.order-emoji { font-size: 40rpx; margin-bottom: 8rpx; }
.order-badge {
    position: absolute;
    top: -10rpx;
    right: -10rpx;
    background: #C5A36A;
    color: #fff;
    font-size: 20rpx;
    min-width: 32rpx;
    height: 32rpx;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.features {
    background: #fff;
    margin: 0 30rpx 20rpx;
    border-radius: 16rpx;
    padding: 30rpx;
}
.features-title { font-size: 30rpx; font-weight: bold; display: block; margin-bottom: 20rpx; }
.feature-item {
    display: flex;
    align-items: center;
    padding: 24rpx 0;
    border-bottom: 1rpx solid #f5f5f5;
    font-size: 28rpx;
}
.feature-item:last-child { border-bottom: none; }
.feature-emoji { font-size: 32rpx; margin-right: 20rpx; }
.feature-item .arrow { margin-left: auto; color: #ccc; }
.version-info { text-align: center; padding: 40rpx; color: #ccc; font-size: 22rpx; }
</style>
