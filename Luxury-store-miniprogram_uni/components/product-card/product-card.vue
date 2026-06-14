<template>
    <view class="product-card" @tap="onClick">
        <view class="product-image-wrap">
            <image class="product-image" :src="product.image" mode="aspectFill" lazy-load></image>
            <view class="product-tag" v-if="tag">{{ tag }}</view>
        </view>
        <view class="product-body">
            <view class="product-name">{{ product.name }}</view>
            <view class="product-price-row">
                <view class="price-box">
                    <text class="price-symbol">¥</text>
                    <text class="price-value">{{ product.price }}</text>
                    <text class="price-original" v-if="product.originalPrice">¥{{ product.originalPrice }}</text>
                </view>
                <text class="product-sales" v-if="showSales && product.sales != null">已售{{ product.sales }}</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            default: () => ({})
        },
        tag: {
            type: String,
            default: ''
        },
        showSales: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        onClick() {
            this.$emit('click', this.product);
        }
    }
};
</script>

<style scoped>
.product-card {
    background-color: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.product-image-wrap {
    position: relative;
    width: 100%;
    height: 320rpx;
    background-color: #f7f7f7;
}

.product-image {
    width: 100%;
    height: 100%;
}

.product-tag {
    position: absolute;
    top: 12rpx;
    left: 12rpx;
    background: linear-gradient(135deg, #D4AF37, #C5A36A);
    color: #fff;
    font-size: 20rpx;
    padding: 4rpx 12rpx;
    border-radius: 8rpx;
}

.product-body {
    padding: 16rpx 20rpx 20rpx;
}

.product-name {
    font-size: 28rpx;
    color: #333;
    line-height: 1.4;
    height: 78rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.product-price-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-top: 12rpx;
}

.price-box {
    display: flex;
    align-items: baseline;
}

.price-symbol {
    font-size: 24rpx;
    color: #C5A36A;
    font-weight: bold;
}

.price-value {
    font-size: 34rpx;
    color: #C5A36A;
    font-weight: bold;
}

.price-original {
    font-size: 22rpx;
    color: #bbb;
    text-decoration: line-through;
    margin-left: 10rpx;
}

.product-sales {
    font-size: 22rpx;
    color: #999;
}
</style>
