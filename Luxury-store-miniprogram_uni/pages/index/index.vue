<template>
    <view>
        <view class="index-container">
            <!-- 顶部搜索 -->
            <view class="top-header">
                <view class="logo-area">
                    <view class="brand-badge">BY</view>
                    <text class="logo-text">白白叶叶</text>
                </view>
                <view class="search-input-box" @tap="onTapSearch">
                    <view class="search-icon"></view>
                    <swiper class="search-swiper" :vertical="true" :autoplay="true" :circular="true" :interval="2500" :duration="400" v-if="hotKeywords.length">
                        <swiper-item v-for="(kw, i) in hotKeywords" :key="i">
                            <text class="search-placeholder">{{ kw }}</text>
                        </swiper-item>
                    </swiper>
                    <text class="search-placeholder" v-else>请输入关键词</text>
                </view>
            </view>

            <!-- 背书条 -->
            <view class="endorse-bar">
                <view class="endorse-item">
                    <text class="endorse-icon">🛡️</text>
                    <text class="endorse-text">正品保障</text>
                </view>
                <view class="endorse-divider"></view>
                <view class="endorse-item">
                    <text class="endorse-icon">🔍</text>
                    <text class="endorse-text">中检鉴定</text>
                </view>
                <view class="endorse-divider"></view>
                <view class="endorse-item">
                    <text class="endorse-icon">💎</text>
                    <text class="endorse-text">假一赔三</text>
                </view>
            </view>

            <!-- 轮播图 -->
            <swiper class="banner" :indicator-dots="true" :autoplay="true" interval="4000" duration="500" :circular="true" indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#E14C82">
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

            <!-- 捡漏促销条 -->
            <view class="bargain-bar" @tap="onTapBargain">
                <view class="bargain-left">
                    <text class="bargain-icon">🔥</text>
                    <view class="bargain-texts">
                        <text class="bargain-title">捡漏专区</text>
                        <text class="bargain-sub">{{ bargainText }}</text>
                    </view>
                </view>
                <text class="bargain-more">查看更多 ›</text>
            </view>

            <!-- 爆款推荐 / 门店地址 入口 -->
            <view class="entry-tiles">
                <view class="entry-tile" @tap="onTapHotList">
                    <image class="entry-tile-img" :src="hotTileImage" mode="aspectFill"></image>
                    <view class="entry-tile-mask">
                        <text class="entry-tile-title">爆款推荐</text>
                        <text class="entry-tile-arrow">好价精选 ›</text>
                    </view>
                </view>
                <view class="entry-tile" @tap="onTapStore">
                    <image class="entry-tile-img" :src="storeTileImage" mode="aspectFill"></image>
                    <view class="entry-tile-mask">
                        <text class="entry-tile-title">门店地址</text>
                        <text class="entry-tile-arrow">到店选购 ›</text>
                    </view>
                </view>
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
            <view class="section" v-if="!newProducts.length">
                <empty-state text="暂无商品" sub-text="敬请期待更多好物" />
            </view>
            </block>

            <!-- 门店地址弹窗 -->
            <view class="store-mask" v-if="showStorePopup" @tap="closeStore">
                <view class="store-popup" @tap.stop>
                    <view class="store-close" @tap="closeStore">×</view>
                    <text class="store-title">门店地址</text>
                    <text class="store-address">{{ storeAddress }}</text>
                    <view class="store-copy-btn" @tap="copyAddress">复制地址</view>
                </view>
            </view>
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
            brands: [],
            categoryTiles: [
                { id: 2, name: '首饰系列', image: seedImage('tile2.jpg') },
                { id: 3, name: '腕表系列', image: seedImage('tile3.jpg') },
                { id: 1, name: '箱包系列', image: seedImage('tile1.jpg') }
            ],
            newProducts: [],
            loading: true,
            loadError: false,
            showToast: false,
            servicePhone: '400-888-9999',
            hotKeywords: ['LV 经典老花', '香奈儿 链条包', '劳力士 腕表', '爱马仕 丝巾'],
            bargainText: '每周六中午14点上新',
            storeAddress: '上海市静安区南京西路1266号恒隆广场',
            hotTileImage: seedImage('tile1.jpg'),
            storeTileImage: seedImage('tile2.jpg'),
            showStorePopup: false
        };
    },
    onLoad() {
        this.getBrands();
        this.loadProducts();
        this.loadPageConfig();
    },
    methods: {
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
        // 加载最近上新
        loadProducts() {
            this.setData({ loading: true, loadError: false });
            productApi.getNewProducts(6)
                .then((news) => {
                    const newProducts = (news || []).map((item) => ({
                        ...item,
                        image: resolveImage(item.image)
                    }));
                    this.setData({ newProducts, loading: false });
                })
                .catch((err) => {
                    console.error('获取商品失败', err);
                    this.setData({ loading: false, loadError: true });
                });
        },
        // 读取首页运营配置（热搜词/捡漏文案/门店地址/入口图）
        loadPageConfig() {
            configApi.getAll().then((cfg) => {
                cfg = cfg || {};
                const patch = {};
                if (cfg.service_phone) patch.servicePhone = cfg.service_phone;
                if (cfg.hot_keywords) {
                    const kws = cfg.hot_keywords.split(',').map((s) => s.trim()).filter(Boolean);
                    if (kws.length) patch.hotKeywords = kws;
                }
                if (cfg.bargain_text) patch.bargainText = cfg.bargain_text;
                if (cfg.store_address) patch.storeAddress = cfg.store_address;
                if (cfg.home_hot_image) patch.hotTileImage = resolveImage(cfg.home_hot_image);
                if (cfg.home_store_image) patch.storeTileImage = resolveImage(cfg.home_store_image);
                this.setData(patch);
            }).catch(() => {});
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
        onTapBargain() {
            uni.navigateTo({ url: '/pages/product/list?type=new&title=' + encodeURIComponent('捡漏专区') });
        },
        onTapHotList() {
            uni.navigateTo({ url: '/pages/product/list?type=hot&title=' + encodeURIComponent('爆款推荐') });
        },
        onTapStore() {
            this.setData({ showStorePopup: true });
        },
        closeStore() {
            this.setData({ showStorePopup: false });
        },
        copyAddress() {
            uni.setClipboardData({
                data: this.storeAddress,
                success: () => uni.showToast({ title: '地址已复制', icon: 'none' })
            });
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
.index-container { padding-bottom: 30rpx; background: #FBF7F9; }
.top-header {
    display: flex;
    align-items: center;
    padding: 20rpx 30rpx;
    background: #fff;
}
.logo-area { display: flex; align-items: center; margin-right: 20rpx; }
.brand-badge {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 30rpx;
    font-weight: bold;
    color: #fff;
    background: linear-gradient(135deg, #F79AC0, #E14C82);
    border-radius: 12rpx;
    padding: 4rpx 14rpx;
    margin-right: 12rpx;
    letter-spacing: 2rpx;
}
.logo-text { font-size: 34rpx; font-weight: bold; color: #2B2024; }
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
.search-swiper { flex: 1; height: 40rpx; }
.search-swiper .search-placeholder { line-height: 40rpx; }
.endorse-bar {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #fff;
    padding: 16rpx 30rpx;
    border-top: 1rpx solid #F7ECF1;
}
.endorse-item { display: flex; align-items: center; }
.endorse-icon { font-size: 26rpx; margin-right: 8rpx; }
.endorse-text { font-size: 24rpx; color: #8a6d5f; }
.endorse-divider { width: 1rpx; height: 24rpx; background: #EADfE4; }
.banner { width: 100%; height: 1000rpx; position: relative; }
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
.section-more { float: right; font-size: 24rpx; color: #E14C82; }
.bargain-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20rpx;
    padding: 24rpx 28rpx;
    border-radius: 16rpx;
    background: linear-gradient(135deg, #FFF1F6, #FCE3EC);
}
.bargain-left { display: flex; align-items: center; }
.bargain-icon { font-size: 44rpx; margin-right: 16rpx; }
.bargain-texts { display: flex; flex-direction: column; }
.bargain-title { font-size: 30rpx; font-weight: bold; color: #C9275F; }
.bargain-sub { font-size: 22rpx; color: #B96A86; margin-top: 4rpx; }
.bargain-more { font-size: 24rpx; color: #C9275F; }
.entry-tiles { display: flex; justify-content: space-between; margin: 0 20rpx 20rpx; }
.entry-tile {
    width: 48.5%;
    height: 220rpx;
    position: relative;
    border-radius: 16rpx;
    overflow: hidden;
}
.entry-tile-img { width: 100%; height: 100%; }
.entry-tile-mask {
    position: absolute;
    left: 0; right: 0; bottom: 0;
    padding: 20rpx;
    background: linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0));
    display: flex;
    flex-direction: column;
}
.entry-tile-title { color: #fff; font-size: 30rpx; font-weight: bold; text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.4); }
.entry-tile-arrow { color: rgba(255,255,255,0.92); font-size: 22rpx; margin-top: 4rpx; }
.product-list { margin-top: 10rpx; }
.product-item {
    display: flex;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #f5f5f5;
}
.product-image { width: 160rpx; height: 160rpx; border-radius: 12rpx; margin-right: 20rpx; }
.product-info { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.product-name { font-size: 28rpx; font-weight: bold; margin-bottom: 10rpx; }
.price { color: #E14C82; font-weight: bold; font-size: 32rpx; }
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
    background-color: #E14C82;
    color: #fff;
    font-size: 28rpx;
    padding: 0 48rpx;
    height: 72rpx;
    line-height: 72rpx;
    border-radius: 36rpx;
}
.store-mask {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}
.store-popup {
    width: 580rpx;
    background: #fff;
    border-radius: 24rpx;
    padding: 50rpx 40rpx 40rpx;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.store-close {
    position: absolute;
    top: 16rpx;
    right: 28rpx;
    font-size: 48rpx;
    color: #bbb;
    line-height: 1;
}
.store-title { font-size: 34rpx; font-weight: bold; color: #1A1A1A; }
.store-address { font-size: 28rpx; color: #555; line-height: 1.6; text-align: center; margin: 30rpx 0; }
.store-copy-btn {
    width: 100%;
    background: linear-gradient(135deg, #F79AC0, #E14C82);
    color: #fff;
    text-align: center;
    padding: 22rpx;
    border-radius: 40rpx;
    font-size: 30rpx;
}
</style>
