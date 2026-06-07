const { get } = require('../utils/request');

module.exports = {
    getSubCategoryList(categoryId) {
        return get('/sub-category/list/' + categoryId);
    }
};
