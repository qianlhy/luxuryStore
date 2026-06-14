/**
 * 全局环境配置
 * 通过修改 ENV 切换开发/生产环境，避免在多处硬编码后端地址
 */

// 当前环境：'dev' | 'prod'
const ENV = 'dev';

const CONFIG = {
    dev: {
        // 后端接口地址（含 /api 前缀）
        BASE_URL: 'http://localhost:8080/api'
    },
    prod: {
        // 上线前请替换为正式域名，并使用 https
        BASE_URL: 'https://your-domain.com/api'
    }
};

const current = CONFIG[ENV] || CONFIG.dev;

// 接口基础地址
const BASE_URL = current.BASE_URL;
// 静态资源/上传文件基础地址（去掉 /api 后缀）
const STATIC_BASE = BASE_URL.replace(/\/api$/, '');

module.exports = {
    ENV,
    BASE_URL,
    STATIC_BASE
};
