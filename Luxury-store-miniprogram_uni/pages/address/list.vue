<template>
    <!-- pages/address/list.wxml -->
    <view class="address-container">
        <!-- 加载中 -->
        <loading-state v-if="isLoading" />

        <!-- 地址为空提示 -->
        <view class="empty-address" v-else-if="isEmpty">
            <empty-state icon="address" text="暂无收货地址" sub-text="添加地址，购物更省心" />
        </view>

        <!-- 地址列表 -->
        <view class="address-list" v-else>
            <view class="address-item" @tap="selectAddress" :data-id="item.id" v-for="(item, index) in addressList" :key="index">
                <!-- 地址信息 -->

                <view class="address-info">
                    <view class="name-phone">
                        <text class="name">{{ item.name }}</text>
                        <text class="phone">{{ item.phone }}</text>
                        <text class="default-tag" v-if="item.isDefault">默认</text>
                    </view>
                    <view class="address-detail">{{ item.province }}{{ item.city }}{{ item.district }}{{ item.address }}</view>
                </view>

                <!-- 地址操作 -->

                <view class="address-actions">
                    <view class="action-btn" @tap.stop.prevent="setDefault" :data-id="item.id" v-if="!item.isDefault">
                        <text class="btn-text">设为默认</text>
                    </view>
                    <view class="action-btn" @tap.stop.prevent="editAddress" :data-id="item.id">
                        <image src="/static/images/icons/edit.png" class="action-icon"></image>
                        <text class="btn-text">编辑</text>
                    </view>
                    <view class="action-btn" @tap.stop.prevent="deleteAddress" :data-id="item.id">
                        <image src="/static/images/icons/delete.png" class="action-icon"></image>
                        <text class="btn-text">删除</text>
                    </view>
                </view>
            </view>
        </view>

        <!-- 底部按钮 -->
        <view class="footer">
            <button class="add-address-btn" @tap="addAddress">+ 新增收货地址</button>
        </view>
    </view>
</template>

<script>
// pages/address/list.js
const app = getApp();
const addressApi = require('../../api/address');
export default {
    data() {
        return {
            addressList: [],
            isEmpty: true,
            isLoading: true
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad(options) {
        this.getAddressList();
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getAddressList();
    },
    methods: {
        // 获取地址列表
        getAddressList: function () {
            this.setData({ isLoading: true });
            addressApi
                .getAddressList()
                .then((data) => {
                    const list = data || [];
                    this.setData({
                        addressList: list,
                        isEmpty: list.length === 0,
                        isLoading: false
                    });
                })
                .catch((err) => {
                    console.error('获取地址列表失败', err);
                    this.setData({
                        isLoading: false,
                        isEmpty: this.addressList.length === 0
                    });
                });
        },

        // 选择地址
        selectAddress: function (e) {
            const { id } = e.currentTarget.dataset;
            const address = this.addressList.find((item) => item.id === id);
            if (!address) {
                uni.showToast({ title: '地址不存在', icon: 'none' });
                return;
            }

            // 存储选中的地址
            uni.setStorageSync('selectedAddress', address);

            // 返回上一页
            uni.navigateBack();
        },

        // 编辑地址
        editAddress: function (e) {
            const { id } = e.currentTarget.dataset;
            uni.navigateTo({
                url: `/pages/address/edit?id=${id}`
            });
        },

        // 删除地址
        deleteAddress: function (e) {
            const { id } = e.currentTarget.dataset;
            uni.showModal({
                title: '提示',
                content: '确定要删除该地址吗？',
                success: (res) => {
                    if (res.confirm) {
                        addressApi
                            .deleteAddress(id)
                            .then(() => {
                                uni.showToast({
                                    title: '删除成功',
                                    icon: 'success'
                                });
                                this.getAddressList();
                            })
                            .catch((err) => {
                                console.error('删除失败', err);
                            });
                    }
                }
            });
        },

        // 添加新地址
        addAddress: function () {
            uni.navigateTo({
                url: '/pages/address/edit'
            });
        },

        // 设为默认地址
        setDefault: function (e) {
            const { id } = e.currentTarget.dataset;
            const address = this.addressList.find((item) => item.id === id);
            if (!address) return;
            addressApi
                .updateAddress({ ...address, isDefault: 1 })
                .then(() => {
                    uni.showToast({
                        title: '设置成功',
                        icon: 'success'
                    });
                    this.getAddressList();
                })
                .catch((err) => {
                    console.error('设置默认地址失败', err);
                });
        }
    }
};
</script>
<style>
/* pages/address/list.wxss */
.address-container {
    min-height: 100vh;
    background-color: #f7f7f7;
    padding-bottom: 120rpx;
}

/* 空地址提示 */
.empty-address {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 160rpx;
}

.empty-icon {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 30rpx;
}

.empty-text {
    color: #999;
    font-size: 28rpx;
}

/* 地址列表 */
.address-list {
    padding: 20rpx;
}

.address-item {
    background-color: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

/* 地址信息 */
.address-info {
    padding-bottom: 20rpx;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 20rpx;
}

.name-phone {
    display: flex;
    align-items: center;
    margin-bottom: 16rpx;
}

.name {
    font-size: 32rpx;
    font-weight: bold;
    margin-right: 20rpx;
}

.phone {
    font-size: 28rpx;
    color: #666;
}

.default-tag {
    font-size: 22rpx;
    color: #fff;
    background-color: var(--primary-color);
    padding: 4rpx 12rpx;
    border-radius: 4rpx;
    margin-left: 20rpx;
}

.address-detail {
    font-size: 28rpx;
    line-height: 1.5;
    color: #333;
}

/* 地址操作 */
.address-actions {
    display: flex;
    justify-content: flex-end;
}

.action-btn {
    display: flex;
    align-items: center;
    padding: 0 20rpx;
    height: 60rpx;
}

.action-icon {
    width: 32rpx;
    height: 32rpx;
    margin-right: 8rpx;
}

.btn-text {
    font-size: 26rpx;
    color: #666;
}

/* 底部按钮 */
.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 20rpx;
    box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.add-address-btn {
    background-color: var(--primary-color);
    color: #fff;
    font-size: 30rpx;
    border-radius: 40rpx;
}
</style>
