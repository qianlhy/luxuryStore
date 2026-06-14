<template>
    <view class="empty-state">
        <view class="empty-graphic">
            <view class="empty-bag"></view>
        </view>
        <view class="empty-text">{{ text }}</view>
        <view class="empty-subtext" v-if="subText">{{ subText }}</view>
        <view class="empty-action">
            <slot></slot>
        </view>
    </view>
</template>

<script>
export default {
    name: 'EmptyState',
    props: {
        // 图标语义（保留扩展位，当前统一为品牌购物袋插画）
        icon: {
            type: String,
            default: 'default'
        },
        text: {
            type: String,
            default: '暂无数据'
        },
        subText: {
            type: String,
            default: ''
        }
    }
};
</script>

<style scoped>
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 120rpx 40rpx;
}

.empty-graphic {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: rgba(197, 163, 106, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 36rpx;
}

.empty-bag {
    position: relative;
    width: 72rpx;
    height: 62rpx;
    border: 4rpx solid #d9c7a6;
    border-radius: 0 0 14rpx 14rpx;
    background-color: #fff;
}

.empty-bag::before {
    content: '';
    position: absolute;
    top: -26rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 38rpx;
    height: 38rpx;
    border: 4rpx solid #d9c7a6;
    border-bottom: none;
    border-radius: 22rpx 22rpx 0 0;
}

.empty-text {
    font-size: 28rpx;
    color: #999;
    margin-bottom: 8rpx;
}

.empty-subtext {
    font-size: 24rpx;
    color: #bbb;
    margin-bottom: 8rpx;
}

.empty-action {
    margin-top: 24rpx;
}
</style>
