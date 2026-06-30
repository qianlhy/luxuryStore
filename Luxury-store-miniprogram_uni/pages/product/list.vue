<template>
    <view class="list-page">
        <loading-state v-if="loading" skeleton :count="4" />

        <view class="error-box" v-else-if="loadError">
            <empty-state text="加载失败" sub-text="网络似乎开小差了">
                <button class="retry-btn" @tap="loadData">点击重试</button>
            </empty-state>
        </view>

        <view class="empty-box" v-else-if="!products.length">
            <empty-state text="暂无商品" sub-text="敬请期待更多好物" />
        </view>

        <view class="grid" v-else>
            <view class="card" @tap="onTapProduct" :data-id="item.id" v-for="(item, index) in products" :key="index">
                <image class="card-img" :src="item.image" mode="aspectFill" lazy-load></image>
                <view class="card-info">
                    <text class="card-name text-ellipsis">{{ item.name }}</text>
                    <text class="card-price">¥{{ item.price }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
const productApi = require('../../api/product');
const { resolveImage } = require('../../utils/image');
export default {
    data() {
        return {
            type: 'hot',
            products: [],
            loading: true,
            loadError: false
        };
    },
    onLoad(options) {
        const type = options.type === 'new' ? 'new' : 'hot';
        const title = options.title ? decodeURIComponent(options.title) : (type === 'new' ? '最近上新' : '爆款推荐');
        uni.setNavigationBarTitle({ title });
        this.setData({ type });
        this.loadData();
    },
    onPullDownRefresh() {
        this.loadData(() => uni.stopPullDownRefresh());
    },
    methods: {
        loadData(done) {
            this.setData({ loading: true, loadError: false });
            const req = this.type === 'new' ? productApi.getNewProducts(20) : productApi.getHotProducts(20);
            req.then((data) => {
                const products = (data || []).map((item) => ({
                    ...item,
                    image: resolveImage(item.image)
                }));
                this.setData({ products, loading: false });
                if (done) done();
            }).catch((err) => {
                console.error('加载列表失败', err);
                this.setData({ loading: false, loadError: true });
                if (done) done();
            });
        },
        onTapProduct(e) {
            uni.navigateTo({ url: '/pages/product/detail?id=' + e.currentTarget.dataset.id });
        }
    }
};
</script>

<style>
.list-page { padding: 20rpx; min-height: 100vh; box-sizing: border-box; }
.grid { display: flex; flex-wrap: wrap; justify-content: space-between; }
.card { width: 48.5%; margin-bottom: 20rpx; background: #fff; border-radius: 16rpx; overflow: hidden; }
.card-img { width: 100%; height: 340rpx; background: #f5f5f5; }
.card-info { padding: 16rpx 20rpx 22rpx; }
.card-name { font-size: 26rpx; color: #333; display: block; margin-bottom: 10rpx; }
.card-price { font-size: 30rpx; color: #E14C82; font-weight: bold; }
.retry-btn {
    background-color: #E14C82;
    color: #fff;
    font-size: 28rpx;
    padding: 0 48rpx;
    height: 72rpx;
    line-height: 72rpx;
    border-radius: 36rpx;
}
</style>
