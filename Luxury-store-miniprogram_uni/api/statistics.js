const { post } = require('../utils/request');

module.exports = {
    recordBrowse(productId, userId, visitorId) {
        let url = '/statistics/browse/' + productId;
        const params = [];
        if (userId) params.push('userId=' + userId);
        if (visitorId) params.push('visitorId=' + visitorId);
        if (params.length) url += '?' + params.join('&');
        return post(url);
    }
};
