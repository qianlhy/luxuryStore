<template>
    <view class="share-container">
        <loading-state v-if="loading" />
        <empty-state v-else-if="list.length === 0" text="暂无分享记录" sub-text="在购物车分享好物给好友吧" />
        <block v-else>
        <view class="share-item" v-for="(item, index) in list" :key="index">
            <view class="share-header">
                <text class="share-type">{{ item.shareTypeName }}</text>
                <text class="share-time">{{ item.createTime }}</text>
            </view>
            <view class="share-products">{{ item.productNames }}</view>
            <view class="share-footer">
                <text class="share-price">合计 ¥{{ item.totalPrice }}</text>
                <text class="share-views">查看 {{ item.viewCount }} 次</text>
            </view>
        </view>
        </block>
    </view>
</template>

<script>
const shareApi = require('../../api/share');
export default {
    data() {
        return { list: [], loading: true };
    },
    onShow() {
        const token = uni.getStorageSync('token');
        if (!token) {
            uni.navigateTo({ url: '/pages/login/login' });
            return;
        }
        this.setData({ loading: true });
        shareApi
            .getMyShares()
            .then((data) => {
                this.setData({ list: data || [], loading: false });
            })
            .catch((err) => {
                console.error('获取分享记录失败', err);
                this.setData({ loading: false });
            });
    }
};
</script>

<style>
.share-container { min-height: 100vh; background: #F8F8F8; padding: 20rpx; }
.share-item {
    background: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
}
.share-header { display: flex; justify-content: space-between; margin-bottom: 16rpx; }
.share-type { font-size: 28rpx; font-weight: bold; color: #C5A36A; }
.share-time { font-size: 22rpx; color: #999; }
.share-products { font-size: 26rpx; color: #666; line-height: 1.5; margin-bottom: 16rpx; }
.share-footer { display: flex; justify-content: space-between; }
.share-price { font-size: 30rpx; font-weight: bold; color: #C5A36A; }
.share-views { font-size: 22rpx; color: #999; }
.empty { text-align: center; padding: 100rpx; color: #999; }
</style>
