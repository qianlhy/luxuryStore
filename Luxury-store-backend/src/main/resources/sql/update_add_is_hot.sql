-- ============================================================
-- 新增「超值爆款」字段：t_product.is_hot
-- 作用：后台可手动把商品标记为首页“超值爆款”。
--       未标记任何爆款时，首页“超值爆款”自动回退按销量展示。
-- 执行：可在已部署数据库重复执行，字段已存在时自动跳过（不再报 1060）。
-- ============================================================

SET @col_exists = (
    SELECT COUNT(*) FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 't_product'
      AND COLUMN_NAME = 'is_hot'
);

SET @ddl = IF(
    @col_exists = 0,
    'ALTER TABLE `t_product` ADD COLUMN `is_hot` tinyint(1) NOT NULL DEFAULT 0 COMMENT ''超值爆款：0-否，1-是'' AFTER `invalid_type`',
    'SELECT ''column is_hot already exists, skip'' AS msg'
);

PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 可选：把现有销量最高的前 4 个上架商品先设为爆款，方便立即看到效果
-- UPDATE t_product SET is_hot = 1
--   WHERE status = 1
--   ORDER BY sales DESC
--   LIMIT 4;
