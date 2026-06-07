const { get, post } = require('../utils/request');

module.exports = {
    createShare(data) {
        return post('/share', data);
    },
    getMyShares() {
        return get('/share/my');
    },
    getByCode(shareCode) {
        return get('/share/code/' + shareCode);
    }
};
