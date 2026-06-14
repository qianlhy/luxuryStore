/**
 * 图片地址工具
 * 微信小程序无法加载 unsplash 等外网图，统一走后端本地静态资源
 */
const { BASE_URL } = require('./config');
const API_BASE = BASE_URL;
const SEED_BASE = API_BASE + '/uploads/seed';

function seedImage(name) {
    return SEED_BASE + '/' + name;
}

/** 将外链或相对路径转为可访问的完整地址 */
function resolveImage(url) {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        // 替换无法访问的外链为本地种子图
        if (url.indexOf('unsplash.com') !== -1 || url.indexOf('alicdn.com') !== -1) {
            return seedImage('product1.jpg');
        }
        return url;
    }
    if (url.startsWith('/api/')) return API_BASE.replace('/api', '') + url;
    if (url.startsWith('/uploads/')) return API_BASE + url;
    return url;
}

module.exports = {
    API_BASE,
    SEED_BASE,
    seedImage,
    resolveImage
};
