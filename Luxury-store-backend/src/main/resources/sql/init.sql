-- ============================================================
-- 名品汇奢侈品商城 - 数据库初始化脚本
-- Database: luxury_store
-- ============================================================

CREATE DATABASE IF NOT EXISTS `luxury_store` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `luxury_store`;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- 收货地址表
-- ----------------------------
DROP TABLE IF EXISTS `t_address`;
CREATE TABLE `t_address` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `name` varchar(50) NOT NULL COMMENT '收货人姓名',
  `phone` varchar(20) NOT NULL COMMENT '收货人手机号',
  `province` varchar(50) NOT NULL COMMENT '省',
  `city` varchar(50) NOT NULL COMMENT '市',
  `district` varchar(50) NOT NULL COMMENT '区',
  `address` varchar(255) NOT NULL COMMENT '详细地址',
  `is_default` tinyint(1) DEFAULT 0 COMMENT '是否默认地址：0-否，1-是',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint(1) DEFAULT 0 COMMENT '逻辑删除',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='收货地址表';

-- ----------------------------
-- 管理员表
-- ----------------------------
DROP TABLE IF EXISTS `t_admin`;
CREATE TABLE `t_admin` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `nickname` varchar(50) DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `role` tinyint(1) DEFAULT 2 COMMENT '角色：1-超级管理员，2-普通管理员',
  `status` tinyint(1) DEFAULT 1 COMMENT '状态：0-禁用，1-正常',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint(1) DEFAULT 0 COMMENT '逻辑删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='管理员表';

-- ----------------------------
-- 品牌资源库
-- ----------------------------
DROP TABLE IF EXISTS `t_brand`;
CREATE TABLE `t_brand` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(100) NOT NULL COMMENT '品牌名称',
  `cover_image` varchar(500) DEFAULT NULL COMMENT '品牌封面图',
  `description` varchar(500) DEFAULT NULL COMMENT '品牌描述',
  `sort` int DEFAULT 0 COMMENT '排序',
  `status` tinyint DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` tinyint DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='品牌资源库';

-- ----------------------------
-- 购物车表
-- ----------------------------
DROP TABLE IF EXISTS `t_cart`;
CREATE TABLE `t_cart` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `product_id` bigint NOT NULL COMMENT '商品ID',
  `count` int NOT NULL DEFAULT 1 COMMENT '数量',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_product` (`user_id`,`product_id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='购物车表';

-- ----------------------------
-- 商品分类表
-- ----------------------------
DROP TABLE IF EXISTS `t_category`;
CREATE TABLE `t_category` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(50) NOT NULL COMMENT '分类名称',
  `icon` varchar(255) DEFAULT NULL COMMENT '分类图标',
  `sort` int DEFAULT 0 COMMENT '排序',
  `status` tinyint(1) DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint(1) DEFAULT 0 COMMENT '逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品分类表';

-- ----------------------------
-- 子分类表
-- ----------------------------
DROP TABLE IF EXISTS `t_sub_category`;
CREATE TABLE `t_sub_category` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `category_id` bigint NOT NULL COMMENT '主分类ID',
  `name` varchar(50) NOT NULL COMMENT '子分类名称',
  `sort` int DEFAULT 0 COMMENT '排序',
  `status` tinyint DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` tinyint DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_category_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='子分类表';

-- ----------------------------
-- 收藏表
-- ----------------------------
DROP TABLE IF EXISTS `t_favorite`;
CREATE TABLE `t_favorite` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `product_id` bigint NOT NULL COMMENT '商品ID',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint(1) DEFAULT 0 COMMENT '逻辑删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_product` (`user_id`,`product_id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='收藏表';

-- ----------------------------
-- 浏览足迹表
-- ----------------------------
DROP TABLE IF EXISTS `t_footprint`;
CREATE TABLE `t_footprint` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `product_id` bigint NOT NULL COMMENT '商品ID',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_product` (`user_id`,`product_id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='浏览足迹表';

-- ----------------------------
-- 订单表
-- ----------------------------
DROP TABLE IF EXISTS `t_order`;
CREATE TABLE `t_order` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `order_no` varchar(50) NOT NULL COMMENT '订单号',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `receiver_name` varchar(50) NOT NULL COMMENT '收货人姓名',
  `receiver_phone` varchar(20) NOT NULL COMMENT '收货人手机号',
  `province` varchar(50) DEFAULT NULL COMMENT '收货地址-省',
  `city` varchar(50) DEFAULT NULL COMMENT '收货地址-市',
  `district` varchar(50) DEFAULT NULL COMMENT '收货地址-区',
  `address` varchar(255) NOT NULL COMMENT '详细地址',
  `total_price` decimal(10,2) NOT NULL COMMENT '商品总价',
  `freight` decimal(10,2) DEFAULT 0.00 COMMENT '运费',
  `actual_payment` decimal(10,2) NOT NULL COMMENT '实付金额',
  `payment_method` varchar(20) DEFAULT 'online' COMMENT '支付方式：online-在线支付，delivery-货到付款',
  `remark` varchar(500) DEFAULT NULL COMMENT '订单备注',
  `status` tinyint(1) DEFAULT 1 COMMENT '订单状态：1-待付款，2-待发货，3-已发货，4-已完成，5-已取消',
  `pay_time` datetime DEFAULT NULL COMMENT '支付时间',
  `delivery_time` datetime DEFAULT NULL COMMENT '发货时间',
  `finish_time` datetime DEFAULT NULL COMMENT '完成时间',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint(1) DEFAULT 0 COMMENT '逻辑删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_order_no` (`order_no`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单表';

-- ----------------------------
-- 订单明细表
-- ----------------------------
DROP TABLE IF EXISTS `t_order_item`;
CREATE TABLE `t_order_item` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `order_id` bigint NOT NULL COMMENT '订单ID',
  `product_id` bigint NOT NULL COMMENT '商品ID',
  `product_name` varchar(100) NOT NULL COMMENT '商品名称',
  `product_image` varchar(255) DEFAULT NULL COMMENT '商品图片',
  `price` decimal(10,2) NOT NULL COMMENT '商品价格',
  `count` int NOT NULL COMMENT '购买数量',
  `subtotal` decimal(10,2) NOT NULL COMMENT '小计',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单明细表';

-- ----------------------------
-- 积分流水表
-- ----------------------------
DROP TABLE IF EXISTS `t_points_log`;
CREATE TABLE `t_points_log` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `points` int NOT NULL COMMENT '变动积分（正数增加，负数减少）',
  `balance` int NOT NULL COMMENT '变动后余额',
  `type` tinyint NOT NULL COMMENT '类型：1-下单获赠，2-兑换消费，3-管理员调整',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `operator_id` bigint DEFAULT NULL COMMENT '操作人ID',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='积分流水表';

-- ----------------------------
-- 商品表
-- ----------------------------
DROP TABLE IF EXISTS `t_product`;
CREATE TABLE `t_product` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(100) NOT NULL COMMENT '商品名称',
  `category_id` bigint NOT NULL COMMENT '分类ID',
  `brand_id` bigint DEFAULT NULL COMMENT '品牌ID',
  `sub_category_id` bigint DEFAULT NULL COMMENT '子分类ID',
  `price` decimal(10,2) NOT NULL COMMENT '商品价格',
  `original_price` decimal(10,2) DEFAULT NULL COMMENT '原价',
  `inventory` int DEFAULT 0 COMMENT '库存',
  `sales` int DEFAULT 0 COMMENT '销量',
  `browse_count` int DEFAULT 0 COMMENT '浏览次数',
  `collect_count` int DEFAULT 0 COMMENT '收藏次数',
  `rating` decimal(2,1) DEFAULT 5.0 COMMENT '评分',
  `image` varchar(4096) DEFAULT NULL COMMENT '主图',
  `images` text COMMENT '轮播图（多张，逗号分隔）',
  `description` varchar(500) DEFAULT NULL COMMENT '商品描述',
  `detail` text COMMENT '商品详情',
  `parameters` text COMMENT '商品参数JSON',
  `status` tinyint(1) DEFAULT 1 COMMENT '状态：0-下架，1-上架',
  `invalid_type` tinyint DEFAULT 0 COMMENT '失效类型：0-正常，1-下架，2-售罄，3-过期',
  `is_hot` tinyint(1) DEFAULT 0 COMMENT '超值爆款：0-否，1-是',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint(1) DEFAULT 0 COMMENT '逻辑删除',
  PRIMARY KEY (`id`),
  KEY `idx_category_id` (`category_id`),
  KEY `idx_brand_id` (`brand_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品表';

-- ----------------------------
-- 商品浏览记录
-- ----------------------------
DROP TABLE IF EXISTS `t_product_browse`;
CREATE TABLE `t_product_browse` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `product_id` bigint NOT NULL COMMENT '商品ID',
  `user_id` bigint DEFAULT NULL COMMENT '用户ID',
  `visitor_id` varchar(64) DEFAULT NULL COMMENT '访客标识',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_product_id` (`product_id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品浏览记录';

-- ----------------------------
-- 销售人员表
-- ----------------------------
DROP TABLE IF EXISTS `t_sales_staff`;
CREATE TABLE `t_sales_staff` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(50) NOT NULL COMMENT '销售姓名',
  `phone` varchar(20) NOT NULL COMMENT '手机号',
  `wechat` varchar(50) DEFAULT NULL COMMENT '微信号',
  `user_id` bigint DEFAULT NULL COMMENT '绑定的用户ID',
  `status` tinyint DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` tinyint DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='销售人员表';

-- ----------------------------
-- 分享记录表
-- ----------------------------
DROP TABLE IF EXISTS `t_share_record`;
CREATE TABLE `t_share_record` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint NOT NULL COMMENT '分享用户ID',
  `share_type` tinyint NOT NULL COMMENT '分享类型：1-分享给销售，2-分享给好友',
  `share_code` varchar(32) NOT NULL COMMENT '分享码',
  `product_ids` varchar(500) NOT NULL COMMENT '商品ID列表',
  `product_names` varchar(1000) DEFAULT NULL COMMENT '商品名称列表',
  `total_price` decimal(12,2) DEFAULT 0 COMMENT '分享总价',
  `sales_id` bigint DEFAULT NULL COMMENT '关联销售ID',
  `view_count` int DEFAULT 0 COMMENT '查看次数',
  `status` tinyint DEFAULT 1 COMMENT '状态：1-有效，0-失效',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_share_code` (`share_code`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_sales_id` (`sales_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='分享记录表';

-- ----------------------------
-- 系统配置表
-- ----------------------------
DROP TABLE IF EXISTS `t_system_config`;
CREATE TABLE `t_system_config` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `config_key` varchar(50) NOT NULL COMMENT '配置键',
  `config_value` text COMMENT '配置值',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_config_key` (`config_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统配置表';

-- ----------------------------
-- 用户表
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `openid` varchar(100) DEFAULT NULL COMMENT '微信OpenID',
  `nickname` varchar(50) DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `password` varchar(100) DEFAULT NULL COMMENT '密码（MD5加密）',
  `gender` tinyint(1) DEFAULT 0 COMMENT '性别：0-未知，1-男，2-女',
  `user_type` tinyint(1) DEFAULT 1 COMMENT '用户类型：1-普通用户，2-管理员',
  `status` tinyint(1) DEFAULT 1 COMMENT '状态：0-禁用，1-正常',
  `points` int DEFAULT 0 COMMENT '积分余额',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` tinyint(1) DEFAULT 0 COMMENT '逻辑删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_openid` (`openid`),
  KEY `idx_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- 初始化数据
-- ============================================================

-- 管理员（密码：123456）
INSERT INTO `t_admin` (`id`, `username`, `password`, `nickname`, `role`, `status`) VALUES
(1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', '超级管理员', 1, 1);

-- 商品分类
INSERT INTO `t_category` (`id`, `name`, `icon`, `sort`, `status`) VALUES
(1, '箱包', 'http://localhost:8080/api/uploads/seed/tile1.jpg', 1, 1),
(2, '首饰', 'http://localhost:8080/api/uploads/seed/tile2.jpg', 2, 1),
(3, '钟表', 'http://localhost:8080/api/uploads/seed/tile3.jpg', 3, 1),
(4, '配饰', 'http://localhost:8080/api/uploads/seed/product5.jpg', 4, 1);

-- 子分类
INSERT INTO `t_sub_category` (`category_id`, `name`, `sort`, `status`) VALUES
(1, '全部', 0, 1), (1, '手提包', 1, 1), (1, '单肩包', 2, 1), (1, '双肩包', 3, 1),
(2, '全部', 0, 1), (2, '项链', 1, 1), (2, '戒指', 2, 1), (2, '手镯', 3, 1),
(3, '全部', 0, 1), (3, '机械表', 1, 1), (3, '石英表', 2, 1),
(4, '全部', 0, 1), (4, '丝巾', 1, 1), (4, '腰带', 2, 1);

-- 品牌
INSERT INTO `t_brand` (`id`, `name`, `cover_image`, `description`, `sort`, `status`) VALUES
(1, 'Louis Vuitton', 'http://localhost:8080/api/uploads/seed/brand1.jpg', '法国奢侈品牌，以皮具和箱包闻名', 1, 1),
(2, 'Chanel', 'http://localhost:8080/api/uploads/seed/brand2.jpg', '法国时尚品牌，经典菱格纹设计', 2, 1),
(3, 'Hermès', 'http://localhost:8080/api/uploads/seed/brand3.jpg', '法国顶级奢侈品牌，以手工皮具著称', 3, 1),
(4, 'Cartier', 'http://localhost:8080/api/uploads/seed/brand4.jpg', '法国珠宝品牌，皇室御用珠宝商', 4, 1),
(5, 'Van Cleef & Arpels', 'http://localhost:8080/api/uploads/seed/brand5.jpg', '法国高级珠宝品牌，四叶草经典系列', 5, 1),
(6, 'Rolex', 'http://localhost:8080/api/uploads/seed/brand6.jpg', '瑞士顶级腕表品牌', 6, 1);

-- 商品
INSERT INTO `t_product` (`name`, `category_id`, `brand_id`, `sub_category_id`, `price`, `original_price`, `inventory`, `sales`, `browse_count`, `collect_count`, `rating`, `image`, `images`, `description`, `detail`, `parameters`, `status`) VALUES
('LV Neverfull 中号手提包', 1, 1, 2, 12800.00, 15800.00, 15, 86, 520, 45, 4.9, 'http://localhost:8080/api/uploads/seed/product1.jpg', 'http://localhost:8080/api/uploads/seed/product1.jpg', 'Louis Vuitton经典Neverfull中号手提包', 'Monogram帆布材质，经典老花图案，容量大实用', '{"材质":"Monogram帆布","尺寸":"32x29x17cm","颜色":"棕色"}', 1),
('Chanel 经典菱格链条包', 1, 2, 3, 35800.00, 42000.00, 8, 42, 380, 68, 5.0, 'http://localhost:8080/api/uploads/seed/product2.jpg', 'http://localhost:8080/api/uploads/seed/product2.jpg', 'Chanel经典2.55菱格纹链条包', '小羊皮材质，金色链条，经典黑色', '{"材质":"小羊皮","尺寸":"25x16x7cm","颜色":"黑色"}', 1),
('Hermès Birkin 30 手提包', 1, 3, 2, 158000.00, 180000.00, 3, 12, 890, 120, 5.0, 'http://localhost:8080/api/uploads/seed/product3.jpg', 'http://localhost:8080/api/uploads/seed/product3.jpg', 'Hermès Birkin 30 Togo皮手提包', '手工缝制，Togo牛皮，金扣', '{"材质":"Togo牛皮","尺寸":"30cm","颜色":"金棕色"}', 1),
('VCA 四叶草五花手链', 2, 5, 8, 28500.00, 32000.00, 20, 156, 680, 95, 4.9, 'http://localhost:8080/api/uploads/seed/product4.jpg', 'http://localhost:8080/api/uploads/seed/product4.jpg', 'Van Cleef & Arpels Alhambra五花手链', '18K黄金，珍珠母贝镶嵌', '{"材质":"18K黄金","款式":"五花手链","宝石":"珍珠母贝"}', 1),
('Cartier Love 戒指', 2, 4, 7, 14500.00, 16800.00, 25, 203, 450, 78, 4.8, 'http://localhost:8080/api/uploads/seed/product5.jpg', 'http://localhost:8080/api/uploads/seed/product5.jpg', 'Cartier Love系列18K玫瑰金戒指', '经典螺丝设计，象征永恒之爱', '{"材质":"18K玫瑰金","尺寸":"53号","系列":"Love"}', 1),
('Rolex Submariner 潜航者', 3, 6, 10, 89500.00, 98000.00, 5, 28, 720, 56, 5.0, 'http://localhost:8080/api/uploads/seed/product6.jpg', 'http://localhost:8080/api/uploads/seed/product6.jpg', 'Rolex潜航者系列机械腕表', '蚝式钢表壳，Cerachrom陶质字圈', '{"机芯":"自动机械","表径":"41mm","防水":"300米"}', 1),
('LV 经典老花Speedy 25', 1, 1, 2, 9800.00, 11800.00, 30, 245, 890, 112, 4.8, 'http://localhost:8080/api/uploads/seed/product7.jpg', 'http://localhost:8080/api/uploads/seed/product7.jpg', 'LV Speedy 25 经典老花手提包', 'Monogram帆布，轻便实用', '{"材质":"Monogram帆布","尺寸":"25x19x15cm"}', 1),
('Chanel 珍珠项链', 2, 2, 6, 22800.00, 26800.00, 12, 67, 340, 42, 4.9, 'http://localhost:8080/api/uploads/seed/product8.jpg', 'http://localhost:8080/api/uploads/seed/product8.jpg', 'Chanel经典珍珠项链', '人造珍珠，金色CC标志', '{"材质":"人造珍珠","长度":"42cm"}', 1);

-- 销售人员
INSERT INTO `t_sales_staff` (`name`, `phone`, `wechat`, `status`) VALUES
('张销售', '13800138001', 'zhang_sales', 1),
('李销售', '13800138002', 'li_sales', 1);

-- 系统配置
INSERT INTO `t_system_config` (`config_key`, `config_value`, `remark`) VALUES
('store_address', '上海市静安区南京西路1266号恒隆广场', '门店地址'),
('service_phone', '400-888-9999', '客服电话'),
('recycle_qrcode', '', '回收管家二维码'),
('points_rule', '下单满1000元获赠100积分', '积分规则说明'),
('hot_keywords', 'LV 经典老花,香奈儿 链条包,劳力士 腕表,爱马仕 丝巾', '首页热搜词（逗号分隔）'),
('bargain_text', '每周六中午14点上新', '首页捡漏专区文案'),
('home_hot_image', '', '首页爆款推荐入口图'),
('home_store_image', '', '首页门店地址入口图'),
('recycle_config', '{"banner":"","tickers":[{"text":"张** 卖出了 LV 手提包，收入 ￥***","date":"06-03"},{"text":"李** 寄售了 香奈儿 链条包，成交 ￥***","date":"06-05"},{"text":"王** 回收了 劳力士 腕表，到账 ￥***","date":"06-08"}],"team":[{"icon":"🧑‍🔬","title":"资深鉴定师","desc":"一对一服务，在线快速了解您的产品价值"},{"icon":"💼","title":"省心省力","desc":"售前0服务费，全程托管0费心，坐等收钱"},{"icon":"⚡","title":"快速见真伪","desc":"线上出价格交易成功，24小时极速到账"}],"guardian":{"title":"扫码加管家 回收价更高","desc":"长按图片识别二维码"},"recycleSteps":["咨询预约","快递邮寄","审核打款","极速到账"],"consignSteps":["咨询预约","上架寄售","成交结算","货款到账"],"guaranteeText":"在白白叶叶抖音、微信、门店购买的订单，一年内85折兜底回收。例：售价8000元的包包，购买一年内联系回收，8000×0.85=6800元；当前市场行情价低于6800将启动85折兜底，高于6800则按实际市场价回收。","faqs":[{"q":"回收/寄售完成后货款打到哪里？","a":"货款会打到您的钱包内，可随时申请提现，24小时内到账，请确保登记账号信息准确。"},{"q":"估价完成后一定会交易成功吗？","a":"收到货品后会进行实物质检并提供最终报价，实际交易以您的最终确认为准。"},{"q":"你们收到货后多久给结果？","a":"快递签收后两个工作日内客服会告知质检结果，若低于预估价可退回，运费由我司承担。"},{"q":"为什么全新正品回收价这么低？","a":"回收价依据当下二手市场行情给出，也可选择寄售，寄售价格相对更高。"}],"reviews":[{"name":"Sie***","region":"北京","content":"整个回收过程非常顺利，估价合理，打款迅速。"},{"name":"Lin***","region":"上海","content":"鉴定师很专业，沟通耐心，会推荐给朋友。"}]}', '回收页配置JSON');
