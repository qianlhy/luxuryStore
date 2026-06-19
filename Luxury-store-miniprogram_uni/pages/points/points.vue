<template>
    <view class="points-container">
        <view class="points-header">
            <text class="points-label">当前积分</text>
            <text class="points-value">{{ balance }}</text>
            <text class="points-tip">下单获赠积分，积分兑换更优惠</text>
        </view>
        <view class="points-list">
            <view class="list-title">积分明细</view>
            <loading-state v-if="loading" />
            <empty-state v-else-if="logs.length === 0" text="暂无积分记录" sub-text="下单即可获赠积分" />
            <block v-else>
            <view class="log-item" v-for="(item, index) in logs" :key="index">
                <view class="log-left">
                    <text class="log-remark">{{ item.remark || getTypeName(item.type) }}</text>
                    <text class="log-time">{{ item.createTime }}</text>
                </view>
                <text :class="'log-points ' + (item.points > 0 ? 'plus' : 'minus')">
                    {{ item.points > 0 ? '+' : '' }}{{ item.points }}
                </text>
            </view>
            </block>
        </view>
    </view>
</template>

<script>
const pointsApi = require('../../api/points');
export default {
    data() {
        return {
            balance: 0,
            logs: [],
            loading: true
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
            this.setData({ loading: true });
            pointsApi
                .getBalance()
                .then((data) => {
                    this.setData({ balance: data || 0 });
                })
                .catch((err) => {
                    console.error('获取积分余额失败', err);
                });
            pointsApi
                .getLogs()
                .then((data) => {
                    this.setData({ logs: data || [], loading: false });
                })
                .catch((err) => {
                    console.error('获取积分明细失败', err);
                    this.setData({ loading: false });
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
.points-container { min-height: 100vh; background: #FBF7F9; }
.points-header {
    background: linear-gradient(135deg, #F79AC0, #E14C82);
    padding: 60rpx 40rpx;
    text-align: center;
    border-radius: 0 0 30rpx 30rpx;
    box-shadow: 0 12rpx 30rpx rgba(225, 76, 130, 0.25);
}
.points-label { color: rgba(255,255,255,0.85); font-size: 26rpx; display: block; }
.points-value { color: #fff; font-size: 80rpx; font-weight: bold; display: block; margin: 20rpx 0; }
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
.log-points.plus { color: #E14C82; }
.log-points.minus { color: #999; }
.empty { text-align: center; padding: 60rpx; color: #999; }
</style>
