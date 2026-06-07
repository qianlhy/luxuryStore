const { get } = require('../utils/request');

module.exports = {
    getBrandList() {
        return get('/brand/list');
    }
};
