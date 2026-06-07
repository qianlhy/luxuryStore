const { get, post, del } = require('../utils/request');

module.exports = {
    getList() {
        return get('/footprint/list');
    },
    add(productId) {
        return post('/footprint', { productId });
    },
    remove(productId) {
        return del('/footprint', { productId });
    }
};
