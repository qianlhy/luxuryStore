import App from './App';

// 全局mixins，用于实现setData等功能，请勿删除！';
import zpMixins from '@/uni_modules/zp-mixins/index.js';

// 全局图片地址处理：外链/缺失图统一兜底为本地品牌占位图
const { resolveImage } = require('@/utils/image');
const imageMixin = {
    methods: {
        imgUrl(url) {
            return resolveImage(url);
        }
    }
};

// #ifndef VUE3
import Vue from 'vue';

Vue.use(zpMixins);
Vue.mixin(imageMixin);

Vue.config.productionTip = false;
App.mpType = 'app';
const app = new Vue({
    ...App
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue';
export function createApp() {
    const app = createSSRApp(App);
    app.mixin(zpMixins);
    app.mixin(imageMixin);
    return {
        app
    };
}
// #endif
