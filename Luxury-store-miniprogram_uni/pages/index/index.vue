<template>
    <view>
        <view class="index-container">
            <!-- 顶部搜索 -->
            <view class="top-header">
                <view class="logo-area">
                    <text class="logo-text">名品汇</text>
                </view>
                <view class="search-input-box" @tap="onTapSearch">
                    <view class="search-icon"></view>
                    <text class="search-placeholder">请输入关键词</text>
                </view>
            </view>

            <!-- 分类Tab -->
            <scroll-view :scroll-x="true" class="nav-tabs">
                <view class="nav-tab active">首页</view>
                <view class="nav-tab" @tap="onTapCategory" :data-id="item.id" v-for="(item, index) in categories" :key="index">{{ item.name }}</view>
            </scroll-view>

            <!-- 轮播图 -->
            <swiper class="banner" :indicator-dots="true" :autoplay="true" interval="4000" duration="500" :circular="true" indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#C5A36A">
                <swiper-item v-for="(item, index) in banners" :key="index">
                    <image :src="item.image" mode="aspectFill" class="banner-image"></image>
                    <view class="banner-overlay">
                        <text class="banner-title">{{ item.title }}</text>
                        <text class="banner-sub">{{ item.subtitle }}</text>
                    </view>
                </swiper-item>
            </swiper>

            <!-- 品类入口 -->
            <view class="category-tiles">
                <view class="tile-item" @tap="onTapCategory" :data-id="item.id" v-for="(item, index) in categoryTiles" :key="index">
                    <image class="tile-img" :src="item.image" mode="aspectFill"></image>
                    <text class="tile-name">{{ item.name }}</text>
                </view>
            </view>

            <!-- 品牌展示 -->
            <view class="brand-section">
                <scroll-view :scroll-x="true" class="brand-scroll">
                    <view class="brand-circle" v-for="(item, index) in brands" :key="index" @tap="onTapCategory" :data-id="1">
                        <image class="brand-logo" :src="item.coverImage" mode="aspectFill"></image>
                        <text class="brand-name">{{ item.name }}</text>
                    </view>
                </scroll-view>
            </view>

            <!-- 商品区加载中 -->
            <loading-state v-if="loading" skeleton :count="3" />

            <!-- 商品区加载失败 -->
            <view class="section" v-else-if="loadError">
                <empty-state text="加载失败" sub-text="网络似乎开小差了">
                    <button class="retry-btn" @tap="loadProducts">点击重试</button>
                </empty-state>
            </view>

            <block v-else>
            <!-- 超值爆款 -->
            <view class="section" v-if="recommendProducts.length">
                <view class="section-header">
                    <text class="section-title">超值爆款</text>
                    <text class="section-sub">为您精选爆款</text>
                </view>
                <view class="hot-grid">
                    <view class="hot-card" @tap="onTapProduct" :data-id="item.id" v-for="(item, index) in recommendProducts" :key="index">
                        <image class="hot-img" :src="item.image" mode="aspectFill" lazy-load></image>
                        <view class="hot-info">
                            <text class="hot-name text-ellipsis">{{ item.name }}</text>
                            <text class="hot-price">¥{{ item.price }}</text>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 最近上新 -->
            <view class="section" v-if="newProducts.length">
                <view class="section-header">
                    <text class="section-title">最近上新</text>
                    <text class="section-more" @tap="onTapMore">去看看 ></text>
                </view>
                <view class="product-list">
                    <view class="product-item" @tap="onTapProduct" :data-id="item.id" v-for="(item, index) in newProducts" :key="index">
                        <image class="product-image" :src="item.image" mode="aspectFill" lazy-load></image>
                        <view class="product-info">
                            <text class="product-name text-ellipsis">{{ item.name }}</text>
                            <view class="product-price-box">
                                <text class="price">¥{{ item.price }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 商品区为空 -->
            <view class="section" v-if="!recommendProducts.length && !newProducts.length">
                <empty-state text="暂无商品" sub-text="敬请期待更多好物" />
            </view>
            </block>
        </view>

        <!-- 联系客服悬浮按钮 -->
        <view class="float-service" @tap="contactService">
            <text class="float-icon">🎧</text>
            <text class="float-text">联系客服</text>
        </view>

        <view class="toast-container" v-if="showToast">
            <view class="toast-content">
                <icon type="success" size="24"></icon>
                <text>已加入购物车</text>
            </view>
        </view>
    </view>
</template>

<script>
const app = getApp();
const eventBus = require('../../utils/eventBus');
const categoryApi = require('../../api/category');
const productApi = require('../../api/product');
const brandApi = require('../../api/brand');
const configApi = require('../../api/config');
const { seedImage, resolveImage } = require('../../utils/image');
export default {
    data() {
        return {
            banners: [
                { image: seedImage('banner1.jpg'), title: '夏日彩色包', subtitle: '多款亮色箱包, 夏日随心搭' },
                { image: seedImage('banner2.jpg'), title: '高奢珠宝', subtitle: '甄选国际大牌珠宝首饰' },
                { image: seedImage('banner3.jpg'), title: '腕表系列', subtitle: '瑞士名表 品质之选' }
            ],
            categories: [],
            brands: [],
            categoryTiles: [
                { id: 2, name: '首饰系列', image: seedImage('tile2.jpg') },
                { id: 3, name: '腕表系列', image: seedImage('tile3.jpg') },
                { id: 1, name: '箱包系列', image: seedImage('tile1.jpg') }
            ],
            recommendProducts: [],
            newProducts: [],
            loading: true,
            loadError: false,
            showToast: false,
            servicePhone: '400-888-9999'
        };
    },
    onLoad() {
        this.getCategories();
        this.getBrands();
        this.loadProducts();
        configApi.getValue('service_phone').then((phone) => {
            if (phone) this.setData({ servicePhone: phone });
        }).catch(() => {});
    },
    methods: {
        getCategories() {
            categoryApi
                .getCategoryList()
                .then((data) => {
                    this.setData({ categories: data || [] });
                })
                .catch((err) => {
                    console.error('获取分类失败', err);
                });
        },
        getBrands() {
            brandApi
                .getBrandList()
                .then((data) => {
                    const brands = (data || []).map((item) => ({
                        ...item,
                        coverImage: resolveImage(item.coverImage)
                    }));
                    this.setData({ brands });
                })
                .catch((err) => {
                    console.error('获取品牌失败', err);
                });
        },
        // 加载商品区（爆款 + 上新）
        loadProducts() {
            this.setData({ loading: true, loadError: false });
            Promise.all([productApi.getHotProducts(4), productApi.getNewProducts(6)])
                .then(([hot, news]) => {
                    const recommendProducts = (hot || []).map((item) => ({
                        ...item,
                        image: resolveImage(item.image)
                    }));
                    const newProducts = (news || []).map((item) => ({
                        ...item,
                        image: resolveImage(item.image)
                    }));
                    this.setData({ recommendProducts, newProducts, loading: false });
                })
                .catch((err) => {
                    console.error('获取商品失败', err);
                    this.setData({ loading: false, loadError: true });
                });
        },
        onTapSearch() {
            uni.navigateTo({ url: '/pages/search/search' });
        },
        onTapCategory(e) {
            const { id } = e.currentTarget.dataset;
            app.globalData.tempCategoryId = id;
            uni.switchTab({
                url: '/pages/category/category',
                success() {
                    setTimeout(() => {
                        eventBus.emit('switchCategory', { categoryId: id });
                    }, 100);
                }
            });
        },
        onTapProduct(e) {
            uni.navigateTo({ url: '/pages/product/detail?id=' + e.currentTarget.dataset.id });
        },
        onTapMore() {
            uni.switchTab({ url: '/pages/category/category' });
        },
        contactService() {
            uni.makePhoneCall({ phoneNumber: this.servicePhone });
        },
        onAddToCart(e) {
            const token = uni.getStorageSync('token');
            if (!token) {
                uni.showToast({ title: '请先登录', icon: 'none' });
                setTimeout(() => uni.navigateTo({ url: '/pages/login/login' }), 1500);
                return;
            }
            const cartApi = require('../../api/cart');
            cartApi.addToCart(e.currentTarget.dataset.id, 1).then(() => {
                this.setData({ showToast: true });
                setTimeout(() => this.setData({ showToast: false }), 1500);
            });
        }
    }
};
</script>

<style>
.index-container { padding-bottom: 30rpx; background: #F8F8F8; }
.top-header {
    display: flex;
    align-items: center;
    padding: 20rpx 30rpx;
    background: #fff;
}
.logo-text { font-size: 36rpx; font-weight: bold; color: #1A1A1A; margin-right: 20rpx; }
.search-input-box {
    flex: 1;
    background: #F5F5F5;
    border-radius: 36rpx;
    height: 64rpx;
    display: flex;
    align-items: center;
    padding: 0 24rpx;
}
.search-icon {
    width: 26rpx;
    height: 26rpx;
    border: 3rpx solid #999;
    border-radius: 50%;
    position: relative;
    margin-right: 14rpx;
    flex-shrink: 0;
}
.search-icon::after {
    content: '';
    position: absolute;
    width: 12rpx;
    height: 3rpx;
    background: #999;
    border-radius: 2rpx;
    transform: rotate(45deg);
    bottom: -3rpx;
    right: -7rpx;
}
.search-placeholder { color: #999; font-size: 26rpx; }
.nav-tabs { white-space: nowrap; padding: 16rpx 30rpx; background: #fff; }
.nav-tab {
    display: inline-block;
    padding: 10rpx 24rpx;
    font-size: 28rpx;
    color: #666;
    margin-right: 10rpx;
}
.nav-tab.active { color: #1A1A1A; font-weight: bold; border-bottom: 4rpx solid #C5A36A; }
.banner { width: 100%; height: 380rpx; position: relative; }
.banner-image { width: 100%; height: 100%; }
.banner-overlay {
    position: absolute;
    bottom: 60rpx;
    left: 40rpx;
}
.banner-title { color: #fff; font-size: 40rpx; font-weight: bold; display: block; text-shadow: 0 2rpx 8rpx rgba(0,0,0,0.3); }
.banner-sub { color: rgba(255,255,255,0.9); font-size: 24rpx; margin-top: 8rpx; display: block; }
.category-tiles { display: flex; padding: 20rpx; gap: 16rpx; }
.tile-item { flex: 1; position: relative; border-radius: 12rpx; overflow: hidden; height: 240rpx; }
.tile-img { width: 100%; height: 100%; }
.tile-name {
    position: absolute;
    bottom: 20rpx;
    left: 0; right: 0;
    text-align: center;
    color: #fff;
    font-size: 26rpx;
    font-weight: bold;
    text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.5);
}
.brand-section { padding: 20rpx 0; background: #fff; margin: 20rpx 0; }
.brand-scroll { white-space: nowrap; padding: 0 20rpx; }
.brand-circle {
    display: inline-block;
    width: 140rpx;
    text-align: center;
    margin-right: 20rpx;
}
.brand-logo { width: 100rpx; height: 100rpx; border-radius: 50%; background: #f5f5f5; }
.brand-name { font-size: 22rpx; color: #666; display: block; margin-top: 8rpx; }
.section { background: #fff; margin: 20rpx; padding: 30rpx; border-radius: 16rpx; }
.section-header { margin-bottom: 20rpx; }
.section-title { font-size: 32rpx; font-weight: bold; color: #1A1A1A; }
.section-sub { font-size: 22rpx; color: #999; margin-left: 16rpx; }
.section-more { float: right; font-size: 24rpx; color: #C5A36A; }
.hot-grid { display: flex; flex-wrap: wrap; gap: 16rpx; }
.hot-card { width: calc(50% - 8rpx); border-radius: 12rpx; overflow: hidden; background: #FAFAFA; }
.hot-img { width: 100%; height: 240rpx; }
.hot-info { padding: 16rpx; }
.hot-name { font-size: 24rpx; display: block; margin-bottom: 8rpx; }
.hot-price { font-size: 28rpx; color: #C5A36A; font-weight: bold; }
.product-list { margin-top: 10rpx; }
.product-item {
    display: flex;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #f5f5f5;
}
.product-image { width: 160rpx; height: 160rpx; border-radius: 12rpx; margin-right: 20rpx; }
.product-info { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.product-name { font-size: 28rpx; font-weight: bold; margin-bottom: 10rpx; }
.price { color: #C5A36A; font-weight: bold; font-size: 32rpx; }
.float-service {
    position: fixed;
    right: 20rpx;
    bottom: 200rpx;
    background: #fff;
    border-radius: 40rpx;
    padding: 16rpx 24rpx;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    z-index: 99;
}
.float-icon { font-size: 28rpx; margin-right: 8rpx; }
.float-text { font-size: 22rpx; color: #666; }
.toast-container {
    position: fixed;
    bottom: 200rpx;
    left: 0; right: 0;
    display: flex;
    justify-content: center;
    z-index: 999;
}
.toast-content {
    background: rgba(0,0,0,0.7);
    color: #fff;
    border-radius: 8rpx;
    padding: 16rpx 30rpx;
    display: flex;
    align-items: center;
    font-size: 28rpx;
}
.toast-content text { margin-left: 10rpx; }
.retry-btn {
    background-color: #C5A36A;
    color: #fff;
    font-size: 28rpx;
    padding: 0 48rpx;
    height: 72rpx;
    line-height: 72rpx;
    border-radius: 36rpx;
}
</style>
