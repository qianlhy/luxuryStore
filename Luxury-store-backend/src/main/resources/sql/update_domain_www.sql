-- ============================================================
-- 域名切换：baibaiyeye.com.cn  →  www.baibaiyeye.com.cn
-- 原因：SSL 证书签发的是 www.baibaiyeye.com.cn，微信真机会校验证书，
--       不带 www 的地址证书不匹配会请求失败、图片加载不出。
-- 说明：只匹配 'https://baibaiyeye.com.cn' 前缀，已是 www 的不会被重复加 www。
-- 执行：在数据库中整段运行即可（幂等，可重复执行）。
-- ============================================================

-- 分类图标
UPDATE t_category   SET icon        = REPLACE(icon,        'https://baibaiyeye.com.cn', 'https://www.baibaiyeye.com.cn') WHERE icon        LIKE 'https://baibaiyeye.com.cn%';

-- 品牌封面
UPDATE t_brand      SET cover_image = REPLACE(cover_image, 'https://baibaiyeye.com.cn', 'https://www.baibaiyeye.com.cn') WHERE cover_image LIKE 'https://baibaiyeye.com.cn%';

-- 商品主图 / 轮播图
UPDATE t_product    SET image       = REPLACE(image,       'https://baibaiyeye.com.cn', 'https://www.baibaiyeye.com.cn') WHERE image       LIKE '%https://baibaiyeye.com.cn%';
UPDATE t_product    SET images      = REPLACE(images,      'https://baibaiyeye.com.cn', 'https://www.baibaiyeye.com.cn') WHERE images      LIKE '%https://baibaiyeye.com.cn%';

-- 订单项里冗余存的商品图
UPDATE t_order_item SET product_image = REPLACE(product_image, 'https://baibaiyeye.com.cn', 'https://www.baibaiyeye.com.cn') WHERE product_image LIKE 'https://baibaiyeye.com.cn%';

-- 用户/管理员头像（如有存到本站域名的）
UPDATE t_user       SET avatar      = REPLACE(avatar,      'https://baibaiyeye.com.cn', 'https://www.baibaiyeye.com.cn') WHERE avatar      LIKE 'https://baibaiyeye.com.cn%';
UPDATE t_admin      SET avatar      = REPLACE(avatar,      'https://baibaiyeye.com.cn', 'https://www.baibaiyeye.com.cn') WHERE avatar      LIKE 'https://baibaiyeye.com.cn%';

-- 验证（执行后可单独查看是否还有不带 www 的残留，结果应为空）
-- SELECT id, icon FROM t_category WHERE icon LIKE 'https://baibaiyeye.com.cn%';
-- SELECT id, image FROM t_product WHERE image LIKE '%https://baibaiyeye.com.cn%';
