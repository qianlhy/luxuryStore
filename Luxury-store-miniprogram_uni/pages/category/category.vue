<template>
    <view class="category-page">
        <!-- 搜索栏 -->
        <view class="search-bar">
            <view class="search-box" @tap="goSearch">
                <view class="search-icon"></view>
                <text class="search-placeholder">请搜索您想要的商品</text>
            </view>
        </view>

        <view class="category-container">
            <!-- 左侧分类 -->
            <view class="category-sidebar">
                <scroll-view :scroll-y="true" class="sidebar-scroll">
                    <view
                        :class="'category-item ' + (currentCategory && currentCategory.id === item.id ? 'active' : '')"
                        @tap="switchCategory"
                        :data-id="item.id"
                        v-for="(item, index) in categories"
                        :key="index"
                    >{{ item.name }}</view>
                </scroll-view>
            </view>

            <!-- 右侧内容 -->
            <view class="category-content">
                <!-- 子分类Tab -->
                <scroll-view :scroll-x="true" class="sub-tabs" v-if="subCategories.length > 0">
                    <view
                        :class="'sub-tab ' + (currentSubCategory === item.id ? 'active' : '')"
                        @tap="switchSubCategory"
                        :data-id="item.id"
                        v-for="(item, index) in subCategories"
                        :key="index"
                    >{{ item.name }}</view>
                </scroll-view>

                <scroll-view :scroll-y="true" class="product-scroll">
                    <loading-state v-if="productsLoading" />
                    <view class="no-data" v-else-if="products.length === 0">
                        <empty-state text="该分类暂无商品" sub-text="看看其他分类吧" />
                    </view>
                    <block v-else>
                    <view class="product-item" @tap="onTapProduct" :data-id="item.id" v-for="(item, index) in products" :key="index">
                        <image class="product-image" :src="imgUrl(item.image)" mode="aspectFill" lazy-load></image>
                        <view class="product-info">
                            <text class="product-name">{{ item.name }}</text>
                            <text class="product-price">¥{{ item.price }}</text>
                        </view>
                    </view>
                    </block>
                </scroll-view>
            </view>
        </view>

        <!-- 底部浮动栏 -->
        <view class="float-bar">
            <view class="float-cart" @tap="goCart">
                <text class="cart-emoji">🛒</text>
            </view>
            <text class="float-total">总计: ¥{{ cartTotal }}</text>
            <view class="float-share" @tap="shareCart">分享</view>
        </view>
    </view>
</template>

<script>
const app = getApp();
const eventBus = require('../../utils/eventBus');
const categoryApi = require('../../api/category');
const productApi = require('../../api/product');
const subCategoryApi = require('../../api/subCategory');
export default {
    data() {
        return {
            categories: [],
            subCategories: [],
            products: [],
            currentCategory: null,
            currentSubCategory: null,
            productsLoading: false,
            cartTotal: '0'
        };
    },
    onLoad() {
        this.getCategories();
        eventBus.on('switchCategory', this.handleSwitchCategory);
    },
    onShow() {
        if (app.globalData.tempCategoryId) {
            const categoryId = app.globalData.tempCategoryId;
            const category = this.categories.find((item) => item.id === categoryId);
            if (category) {
                this.setData({ currentCategory: category });
                this.loadSubCategories(categoryId);
            }
            app.globalData.tempCategoryId = null;
        } else if (this.currentCategory) {
            this.loadProducts();
        }
    },
    onUnload() {
        eventBus.off('switchCategory', this.handleSwitchCategory);
    },
    methods: {
        getCategories() {
            categoryApi
                .getCategoryList()
                .then((categories) => {
                    if (categories && categories.length > 0) {
                        this.setData({ categories, currentCategory: categories[0] });
                        this.loadSubCategories(categories[0].id);
                    }
                })
                .catch((err) => {
                    console.error('获取分类失败', err);
                });
        },
        loadSubCategories(categoryId) {
            subCategoryApi.getSubCategoryList(categoryId).then((data) => {
                const subs = data || [];
                this.setData({
                    subCategories: subs,
                    currentSubCategory: subs.length > 0 ? subs[0].id : null
                });
                this.loadProducts();
            }).catch(() => {
                this.setData({ subCategories: [], currentSubCategory: null });
                this.loadProducts();
            });
        },
        loadProducts() {
            if (!this.currentCategory) return;
            this.setData({ productsLoading: true });
            const subId = this.currentSubCategory;
            productApi
                .getProductsBySubCategory(this.currentCategory.id, subId)
                .then((data) => {
                    this.setData({ products: data || [], productsLoading: false });
                })
                .catch(() => {
                    productApi
                        .getProductsByCategory(this.currentCategory.id)
                        .then((data) => {
                            this.setData({ products: data || [], productsLoading: false });
                        })
                        .catch((err) => {
                            console.error('获取分类商品失败', err);
                            this.setData({ products: [], productsLoading: false });
                        });
                });
        },
        switchCategory(e) {
            const categoryId = e.currentTarget.dataset.id;
            const category = this.categories.find((item) => item.id === categoryId);
            if (category) {
                this.setData({ currentCategory: category });
                this.loadSubCategories(categoryId);
            }
        },
        switchSubCategory(e) {
            this.setData({ currentSubCategory: e.currentTarget.dataset.id });
            this.loadProducts();
        },
        onTapProduct(e) {
            uni.navigateTo({ url: '/pages/product/detail?id=' + e.currentTarget.dataset.id });
        },
        goSearch() {
            uni.navigateTo({ url: '/pages/search/search' });
        },
        goCart() {
            uni.switchTab({ url: '/pages/cart/cart' });
        },
        shareCart() {
            uni.switchTab({ url: '/pages/cart/cart' });
        },
        handleSwitchCategory(data) {
            if (data && data.categoryId) {
                const category = this.categories.find((item) => item.id === data.categoryId);
                if (category) {
                    this.setData({ currentCategory: category });
                    this.loadSubCategories(data.categoryId);
                }
            }
        }
    }
};
</script>

<style>
.category-page { height: 100vh; display: flex; flex-direction: column; background: #F8F8F8; }
.search-bar { padding: 16rpx 30rpx; background: #fff; }
.search-box {
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
.category-container { flex: 1; display: flex; overflow: hidden; padding-bottom: 100rpx; }
.category-sidebar { width: 180rpx; background: #F5F5F5; flex-shrink: 0; }
.sidebar-scroll { height: 100%; }
.category-item {
    padding: 30rpx 16rpx;
    text-align: center;
    font-size: 26rpx;
    color: #666;
    position: relative;
}
.category-item.active {
    background: #fff;
    color: #E14C82;
    font-weight: bold;
}
.category-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 30rpx;
    bottom: 30rpx;
    width: 6rpx;
    background: #E14C82;
}
.category-content { flex: 1; display: flex; flex-direction: column; background: #fff; }
.sub-tabs { white-space: nowrap; padding: 16rpx 20rpx; border-bottom: 1rpx solid #f5f5f5; }
.sub-tab {
    display: inline-block;
    padding: 8rpx 24rpx;
    font-size: 24rpx;
    color: #666;
    margin-right: 12rpx;
    border-radius: 30rpx;
    border: 1rpx solid #eee;
}
.sub-tab.active { color: #E14C82; border-color: #E14C82; }
.product-scroll { flex: 1; height: 0; }
.product-item {
    display: flex;
    padding: 24rpx 20rpx;
    border-bottom: 1rpx solid #f5f5f5;
}
.product-image { width: 180rpx; height: 180rpx; border-radius: 12rpx; margin-right: 20rpx; }
.product-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.product-name { font-size: 26rpx; line-height: 1.5; color: #333; }
.product-price { font-size: 32rpx; color: #E14C82; font-weight: bold; text-align: right; }
.no-data { text-align: center; padding: 100rpx; color: #999; }
.float-bar {
    position: fixed;
    bottom: 100rpx;
    left: 20rpx;
    right: 20rpx;
    height: 80rpx;
    background: #fff;
    border-radius: 40rpx;
    display: flex;
    align-items: center;
    padding: 0 20rpx;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.1);
    z-index: 99;
}
.float-cart {
    width: 60rpx;
    height: 60rpx;
    background: #E14C82;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16rpx;
}
.cart-emoji { font-size: 28rpx; }
.float-total { flex: 1; font-size: 26rpx; color: #333; }
.float-share {
    background: #F5F5F5;
    padding: 12rpx 30rpx;
    border-radius: 30rpx;
    font-size: 26rpx;
    color: #666;
}
</style>
