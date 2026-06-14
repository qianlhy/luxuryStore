/**
 * 网络请求工具
 */

const { BASE_URL } = require('./config');

// 登录页路径，401 时统一跳转
const LOGIN_PAGE = '/pages/login/login';
// 标记是否已在处理登录失效，避免重复跳转/提示
let isHandlingAuthError = false;

/**
 * 统一处理登录失效
 */
function handleAuthError() {
    uni.removeStorageSync('token');
    uni.removeStorageSync('userInfo');
    uni.setStorageSync('isLoggedIn', false);

    if (isHandlingAuthError) {
        return;
    }
    isHandlingAuthError = true;

    uni.showToast({
        title: '登录已过期，请重新登录',
        icon: 'none'
    });

    setTimeout(() => {
        // 当前页若已是登录页则不跳转
        const pages = getCurrentPages();
        const current = pages.length ? pages[pages.length - 1].route : '';
        if (current && current.indexOf('pages/login/login') === -1) {
            uni.navigateTo({ url: LOGIN_PAGE });
        }
        isHandlingAuthError = false;
    }, 1200);
}

/**
 * 发送HTTP请求
 */
function request(options) {
    return new Promise((resolve, reject) => {
        const token = uni.getStorageSync('token') || '';
        uni.request({
            url: BASE_URL + options.url,
            method: options.method || 'GET',
            data: options.data || {},
            header: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            success: (res) => {
                if (res.statusCode === 200) {
                    if (res.data.code === 200) {
                        resolve(res.data.data);
                    } else if (res.data.code === 401) {
                        // 业务层返回登录失效
                        handleAuthError();
                        reject(new Error('登录已过期'));
                    } else {
                        if (!options.silent) {
                            uni.showToast({
                                title: res.data.message || '请求失败',
                                icon: 'none'
                            });
                        }
                        reject(new Error(res.data.message || '请求失败'));
                    }
                } else if (res.statusCode === 401) {
                    handleAuthError();
                    reject(new Error('登录已过期'));
                } else {
                    if (!options.silent) {
                        uni.showToast({
                            title: '网络错误',
                            icon: 'none'
                        });
                    }
                    reject(new Error('网络错误'));
                }
            },
            fail: (err) => {
                if (!options.silent) {
                    uni.showToast({
                        title: '网络连接失败',
                        icon: 'none'
                    });
                }
                reject(err);
            }
        });
    });
}

/**
 * GET请求
 */
function get(url, data) {
    return request({
        url: url,
        method: 'GET',
        data: data
    });
}

/**
 * POST请求
 */
function post(url, data) {
    return request({
        url: url,
        method: 'POST',
        data: data
    });
}

/**
 * PUT请求
 */
function put(url, data) {
    return request({
        url: url,
        method: 'PUT',
        data: data
    });
}

/**
 * DELETE请求
 */
function del(url, params) {
    // 将参数拼接到URL中
    if (params) {
        const queryString = Object.keys(params)
            .map((key) => `${key}=${params[key]}`)
            .join('&');
        url = url + (url.includes('?') ? '&' : '?') + queryString;
    }
    return request({
        url: url,
        method: 'DELETE'
    });
}
module.exports = {
    request,
    get,
    post,
    put,
    del
};
