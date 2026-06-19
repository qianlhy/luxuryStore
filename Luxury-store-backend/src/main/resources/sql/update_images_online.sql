-- 将演示数据的图片地址统一改为线上服务器地址
-- 适用：已部署到 https://baibaiyeye.com.cn 的环境
-- 前置：把 uploads/seed 下的种子图上传到服务器 /www/wwwroot/backend/uploads/seed/
USE luxury_store;

-- 分类图标
UPDATE t_category SET icon = 'https://baibaiyeye.com.cn/api/uploads/seed/tile1.jpg'    WHERE id = 1;
UPDATE t_category SET icon = 'https://baibaiyeye.com.cn/api/uploads/seed/tile2.jpg'    WHERE id = 2;
UPDATE t_category SET icon = 'https://baibaiyeye.com.cn/api/uploads/seed/tile3.jpg'    WHERE id = 3;
UPDATE t_category SET icon = 'https://baibaiyeye.com.cn/api/uploads/seed/product5.jpg' WHERE id = 4;

-- 品牌封面
UPDATE t_brand SET cover_image = 'https://baibaiyeye.com.cn/api/uploads/seed/brand1.jpg' WHERE id = 1;
UPDATE t_brand SET cover_image = 'https://baibaiyeye.com.cn/api/uploads/seed/brand2.jpg' WHERE id = 2;
UPDATE t_brand SET cover_image = 'https://baibaiyeye.com.cn/api/uploads/seed/brand3.jpg' WHERE id = 3;
UPDATE t_brand SET cover_image = 'https://baibaiyeye.com.cn/api/uploads/seed/brand4.jpg' WHERE id = 4;
UPDATE t_brand SET cover_image = 'https://baibaiyeye.com.cn/api/uploads/seed/brand5.jpg' WHERE id = 5;
UPDATE t_brand SET cover_image = 'https://baibaiyeye.com.cn/api/uploads/seed/brand6.jpg' WHERE id = 6;

-- 商品主图 + 轮播图
UPDATE t_product SET image = 'https://baibaiyeye.com.cn/api/uploads/seed/product1.jpg', images = 'https://baibaiyeye.com.cn/api/uploads/seed/product1.jpg' WHERE id = 1;
UPDATE t_product SET image = 'https://baibaiyeye.com.cn/api/uploads/seed/product2.jpg', images = 'https://baibaiyeye.com.cn/api/uploads/seed/product2.jpg' WHERE id = 2;
UPDATE t_product SET image = 'https://baibaiyeye.com.cn/api/uploads/seed/product3.jpg', images = 'https://baibaiyeye.com.cn/api/uploads/seed/product3.jpg' WHERE id = 3;
UPDATE t_product SET image = 'https://baibaiyeye.com.cn/api/uploads/seed/product4.jpg', images = 'https://baibaiyeye.com.cn/api/uploads/seed/product4.jpg' WHERE id = 4;
UPDATE t_product SET image = 'https://baibaiyeye.com.cn/api/uploads/seed/product5.jpg', images = 'https://baibaiyeye.com.cn/api/uploads/seed/product5.jpg' WHERE id = 5;
UPDATE t_product SET image = 'https://baibaiyeye.com.cn/api/uploads/seed/product6.jpg', images = 'https://baibaiyeye.com.cn/api/uploads/seed/product6.jpg' WHERE id = 6;
UPDATE t_product SET image = 'https://baibaiyeye.com.cn/api/uploads/seed/product7.jpg', images = 'https://baibaiyeye.com.cn/api/uploads/seed/product7.jpg' WHERE id = 7;
UPDATE t_product SET image = 'https://baibaiyeye.com.cn/api/uploads/seed/product8.jpg', images = 'https://baibaiyeye.com.cn/api/uploads/seed/product8.jpg' WHERE id = 8;

-- 轮播图banner（如果有独立banner表可按需补充；本项目首页banner为前端内置）
