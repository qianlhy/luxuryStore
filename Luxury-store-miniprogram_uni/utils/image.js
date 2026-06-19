/**
 * 图片地址工具
 * 真实图走服务器；首页内置演示图与无法加载的外链统一兜底到本地小占位图（已压缩，体积极小）
 */
const { BASE_URL } = require('./config');
const API_BASE = BASE_URL;
const SEED_BASE = API_BASE + '/uploads/seed';

// 本地兜底占位图（已压缩，打包进小程序，永远可加载，不影响主包体积）
const LOCAL_PLACEHOLDER = '/static/placeholder/placeholder.jpg';
const LOCAL_BANNER = '/static/placeholder/placeholder-banner.jpg';

/**
 * 首页内置演示图：直接用本地小占位图，保证不空白且不依赖服务器；
 * 真实运营图请通过后台上传，会写入服务器地址并经 resolveImage 正常显示。
 */
function seedImage(name) {
    if (name && name.indexOf('banner') !== -1) return LOCAL_BANNER;
    return LOCAL_PLACEHOLDER;
}

/** 将外链或相对路径转为可访问的完整地址；无效来源回退到本地占位图 */
function resolveImage(url) {
    if (!url) return LOCAL_PLACEHOLDER;
    if (url.startsWith('http://') || url.startsWith('https://')) {
        // 外链（unsplash/alicdn 等）小程序无法加载 → 本地占位图
        if (url.indexOf('unsplash.com') !== -1 || url.indexOf('alicdn.com') !== -1) {
            return LOCAL_PLACEHOLDER;
        }
        return url;
    }
    if (url.startsWith('/api/')) return API_BASE.replace('/api', '') + url;
    if (url.startsWith('/uploads/')) return API_BASE + url;
    if (url.startsWith('/static/')) return url;
    return url;
}

module.exports = {
    API_BASE,
    SEED_BASE,
    LOCAL_PLACEHOLDER,
    LOCAL_BANNER,
    seedImage,
    resolveImage
};
