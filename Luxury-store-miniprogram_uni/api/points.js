const { get } = require('../utils/request');

module.exports = {
    getBalance() {
        return get('/points/balance');
    },
    getLogs() {
        return get('/points/logs');
    }
};
