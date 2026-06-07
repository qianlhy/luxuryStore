<template>
    <view class="points-container">
        <view class="points-header">
            <text class="points-label">当前积分</text>
            <text class="points-value">{{ balance }}</text>
            <text class="points-tip">下单获赠积分，积分兑换更优惠</text>
        </view>
        <view class="points-list">
            <view class="list-title">积分明细</view>
            <view class="empty" v-if="logs.length === 0">
                <text>暂无积分记录</text>
            </view>
            <view class="log-item" v-for="(item, index) in logs" :key="index">
                <view class="log-left">
                    <text class="log-remark">{{ item.remark || getTypeName(item.type) }}</text>
                    <text class="log-time">{{ item.createTime }}</text>
                </view>
                <text :class="'log-points ' + (item.points > 0 ? 'plus' : 'minus')">
                    {{ item.points > 0 ? '+' : '' }}{{ item.points }}
                </text>
            </view>
        </view>
    </view>
</template>

<script>
const pointsApi = require('../../api/points');
export default {
    data() {
        return {
            balance: 0,
            logs: []
        };
    },
    onShow() {
        this.loadData();
    },
    methods: {
        loadData() {
            const token = uni.getStorageSync('token');
            if (!token) {
                uni.navigateTo({ url: '/pages/login/login' });
                return;
            }
            pointsApi.getBalance().then((data) => {
                this.setData({ balance: data || 0 });
            });
            pointsApi.getLogs().then((data) => {
                this.setData({ logs: data || [] });
            });
        },
        getTypeName(type) {
            const map = { 1: '下单获赠', 2: '兑换消费', 3: '管理员调整' };
            return map[type] || '积分变动';
        }
    }
};
</script>

<style>
.points-container { min-height: 100vh; background: #F8F8F8; }
.points-header {
    background: #1A1A1A;
    padding: 60rpx 40rpx;
    text-align: center;
    border-radius: 0 0 30rpx 30rpx;
}
.points-label { color: rgba(255,255,255,0.7); font-size: 26rpx; display: block; }
.points-value { color: #C5A36A; font-size: 80rpx; font-weight: bold; display: block; margin: 20rpx 0; }
.points-tip { color: rgba(255,255,255,0.5); font-size: 22rpx; }
.points-list {
    margin: 30rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
}
.list-title { font-size: 30rpx; font-weight: bold; margin-bottom: 20rpx; }
.log-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 0;
    border-bottom: 1rpx solid #f5f5f5;
}
.log-remark { font-size: 28rpx; color: #333; display: block; }
.log-time { font-size: 22rpx; color: #999; margin-top: 8rpx; display: block; }
.log-points { font-size: 32rpx; font-weight: bold; }
.log-points.plus { color: #C5A36A; }
.log-points.minus { color: #999; }
.empty { text-align: center; padding: 60rpx; color: #999; }
</style>
