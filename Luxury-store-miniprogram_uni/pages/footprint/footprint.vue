<template>
    <view class="footprint-container">
        <loading-state v-if="loading" />
        <empty-state v-else-if="list.length === 0" text="暂无浏览足迹" sub-text="快去挑选心仪好物吧" />
        <block v-else>
        <view class="foot-item" v-for="(item, index) in list" :key="index" @tap="goDetail" :data-id="item.productId">
            <image class="foot-img" :src="imgUrl(item.image)" mode="aspectFill" lazy-load></image>
            <view class="foot-info">
                <text class="foot-name">{{ item.name }}</text>
                <text class="foot-price">¥{{ item.price }}</text>
                <text class="foot-time">{{ item.browseTime }}</text>
            </view>
            <view class="foot-delete" @tap.stop="removeItem" :data-id="item.productId">删除</view>
        </view>
        </block>
    </view>
</template>

<script>
const footprintApi = require('../../api/footprint');
export default {
    data() {
        return { list: [], loading: true };
    },
    onShow() {
        this.loadList();
    },
    methods: {
        loadList() {
            const token = uni.getStorageSync('token');
            if (!token) {
                uni.navigateTo({ url: '/pages/login/login' });
                return;
            }
            this.setData({ loading: true });
            footprintApi
                .getList()
                .then((data) => {
                    this.setData({ list: data || [], loading: false });
                })
                .catch((err) => {
                    console.error('获取足迹失败', err);
                    this.setData({ loading: false });
                });
        },
        goDetail(e) {
            uni.navigateTo({ url: '/pages/product/detail?id=' + e.currentTarget.dataset.id });
        },
        removeItem(e) {
            const productId = e.currentTarget.dataset.id;
            footprintApi.remove(productId).then(() => {
                this.loadList();
            });
        }
    }
};
</script>

<style>
.footprint-container { min-height: 100vh; background: #F8F8F8; }
.foot-item {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 24rpx 30rpx;
    border-bottom: 1rpx solid #f5f5f5;
}
.foot-img { width: 160rpx; height: 160rpx; border-radius: 12rpx; margin-right: 20rpx; }
.foot-info { flex: 1; }
.foot-name { font-size: 28rpx; font-weight: bold; display: block; margin-bottom: 10rpx; }
.foot-price { font-size: 30rpx; color: #E14C82; font-weight: bold; display: block; }
.foot-time { font-size: 22rpx; color: #999; margin-top: 8rpx; display: block; }
.foot-delete { font-size: 24rpx; color: #999; padding: 10rpx; }
.empty { text-align: center; padding: 100rpx; color: #999; }
</style>
