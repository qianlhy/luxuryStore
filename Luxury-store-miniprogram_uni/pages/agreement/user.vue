<template>
    <view class="agreement-page">
        <view class="agreement-title">用户服务协议</view>
        <view class="agreement-update">更新日期：2026年01月01日</view>

        <view class="agreement-section">
            <view class="section-title">一、总则</view>
            <view class="section-text">欢迎使用名品汇商城（以下简称“本平台”）。本协议是您与本平台之间就使用本平台服务所订立的协议。在使用本平台服务前，请您仔细阅读本协议的全部内容。一旦您注册、登录或使用本平台服务，即视为您已阅读并同意本协议的全部条款。</view>
        </view>

        <view class="agreement-section">
            <view class="section-title">二、账号注册与使用</view>
            <view class="section-text">1. 您应使用真实、准确、有效的信息进行注册，并妥善保管账号及密码。</view>
            <view class="section-text">2. 您的账号仅限本人使用，因账号泄露或被盗用造成的损失由您自行承担。</view>
            <view class="section-text">3. 您承诺不利用本平台从事任何违反法律法规或损害他人合法权益的行为。</view>
        </view>

        <view class="agreement-section">
            <view class="section-title">三、商品与订单</view>
            <view class="section-text">1. 平台展示的商品信息、价格等以您下单时页面显示的内容为准。</view>
            <view class="section-text">2. 您提交订单并完成支付后，订单方为成立；平台将按约定为您提供商品及配送服务。</view>
            <view class="section-text">3. 如遇商品缺货、价格标注错误等情形，平台有权取消订单并退还您已支付的款项。</view>
        </view>

        <view class="agreement-section">
            <view class="section-title">四、知识产权</view>
            <view class="section-text">本平台所包含的文字、图片、商标、页面设计等内容的知识产权均归本平台或相关权利人所有，未经授权不得擅自使用。</view>
        </view>

        <view class="agreement-section">
            <view class="section-title">五、协议的修改</view>
            <view class="section-text">本平台有权根据业务发展需要适时修改本协议，修改后的协议将在平台公布。若您继续使用本平台服务，即视为接受修改后的协议。</view>
        </view>

        <view class="agreement-footer">如对本协议有任何疑问，请通过平台客服与我们联系。</view>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style>
.agreement-page {
    min-height: 100vh;
    background-color: #fff;
    padding: 40rpx 30rpx 80rpx;
}
.agreement-title {
    font-size: 40rpx;
    font-weight: bold;
    color: #1a1a1a;
    text-align: center;
}
.agreement-update {
    font-size: 24rpx;
    color: #999;
    text-align: center;
    margin: 16rpx 0 40rpx;
}
.agreement-section {
    margin-bottom: 36rpx;
}
.section-title {
    font-size: 30rpx;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 16rpx;
}
.section-text {
    font-size: 27rpx;
    color: #555;
    line-height: 1.8;
    margin-bottom: 10rpx;
}
.agreement-footer {
    margin-top: 40rpx;
    font-size: 26rpx;
    color: #999;
    line-height: 1.8;
}
</style>
