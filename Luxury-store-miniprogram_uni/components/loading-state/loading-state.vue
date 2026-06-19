<template>
    <!-- 骨架屏模式 -->
    <view class="skeleton" v-if="skeleton">
        <view class="skeleton-card" v-for="n in count" :key="n">
            <view class="skeleton-img"></view>
            <view class="skeleton-lines">
                <view class="skeleton-line w80"></view>
                <view class="skeleton-line w50"></view>
                <view class="skeleton-line w30"></view>
            </view>
        </view>
    </view>

    <!-- 普通加载中 -->
    <view class="loading-state" v-else>
        <view class="loading-spinner"></view>
        <text class="loading-text">{{ text }}</text>
    </view>
</template>

<script>
export default {
    name: 'LoadingState',
    props: {
        text: {
            type: String,
            default: '加载中...'
        },
        // 是否使用骨架屏
        skeleton: {
            type: Boolean,
            default: false
        },
        // 骨架屏卡片数量
        count: {
            type: Number,
            default: 4
        }
    }
};
</script>

<style scoped>
.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 120rpx 0;
}

.loading-spinner {
    width: 64rpx;
    height: 64rpx;
    border: 6rpx solid #F7E0E8;
    border-top-color: #E14C82;
    border-radius: 50%;
    animation: ls-spin 0.8s linear infinite;
}

.loading-text {
    margin-top: 20rpx;
    font-size: 26rpx;
    color: #999;
}

@keyframes ls-spin {
    to {
        transform: rotate(360deg);
    }
}

/* 骨架屏 */
.skeleton {
    padding: 20rpx;
}

.skeleton-card {
    display: flex;
    background-color: #fff;
    border-radius: 12rpx;
    padding: 20rpx;
    margin-bottom: 20rpx;
}

.skeleton-img {
    width: 160rpx;
    height: 160rpx;
    border-radius: 8rpx;
    background: linear-gradient(90deg, #f2f2f2 25%, #e9e9e9 37%, #f2f2f2 63%);
    background-size: 400% 100%;
    animation: ls-shine 1.4s ease infinite;
}

.skeleton-lines {
    flex: 1;
    padding-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.skeleton-line {
    height: 28rpx;
    border-radius: 6rpx;
    margin-bottom: 20rpx;
    background: linear-gradient(90deg, #f2f2f2 25%, #e9e9e9 37%, #f2f2f2 63%);
    background-size: 400% 100%;
    animation: ls-shine 1.4s ease infinite;
}

.skeleton-line.w80 {
    width: 80%;
}
.skeleton-line.w50 {
    width: 50%;
}
.skeleton-line.w30 {
    width: 30%;
}

@keyframes ls-shine {
    0% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0 50%;
    }
}
</style>
