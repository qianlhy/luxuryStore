const { get } = require('../utils/request');

module.exports = {
    getSalesList() {
        return get('/sales/list');
    }
};
