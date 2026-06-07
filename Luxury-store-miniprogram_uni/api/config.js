const { get } = require('../utils/request');

module.exports = {
    getAll() {
        return get('/config');
    },
    getValue(key) {
        return get('/config/' + key);
    }
};
