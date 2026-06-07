-- 将图片地址改为后端本地托管（微信小程序无法加载 unsplash 外链）
USE luxury_store;

UPDATE t_brand SET cover_image = 'http://localhost:8080/api/uploads/seed/brand1.jpg' WHERE id = 1;
UPDATE t_brand SET cover_image = 'http://localhost:8080/api/uploads/seed/brand2.jpg' WHERE id = 2;
UPDATE t_brand SET cover_image = 'http://localhost:8080/api/uploads/seed/brand3.jpg' WHERE id = 3;
UPDATE t_brand SET cover_image = 'http://localhost:8080/api/uploads/seed/brand4.jpg' WHERE id = 4;
UPDATE t_brand SET cover_image = 'http://localhost:8080/api/uploads/seed/brand5.jpg' WHERE id = 5;
UPDATE t_brand SET cover_image = 'http://localhost:8080/api/uploads/seed/brand6.jpg' WHERE id = 6;

UPDATE t_product SET image = 'http://localhost:8080/api/uploads/seed/product1.jpg' WHERE id = 1;
UPDATE t_product SET image = 'http://localhost:8080/api/uploads/seed/product2.jpg' WHERE id = 2;
UPDATE t_product SET image = 'http://localhost:8080/api/uploads/seed/product3.jpg' WHERE id = 3;
UPDATE t_product SET image = 'http://localhost:8080/api/uploads/seed/product4.jpg' WHERE id = 4;
UPDATE t_product SET image = 'http://localhost:8080/api/uploads/seed/product5.jpg' WHERE id = 5;
UPDATE t_product SET image = 'http://localhost:8080/api/uploads/seed/product6.jpg' WHERE id = 6;
UPDATE t_product SET image = 'http://localhost:8080/api/uploads/seed/product7.jpg' WHERE id = 7;
UPDATE t_product SET image = 'http://localhost:8080/api/uploads/seed/product8.jpg' WHERE id = 8;
