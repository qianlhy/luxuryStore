package com.flowerstore.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.flowerstore.entity.*;
import com.flowerstore.mapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class StatisticsService {

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private ProductBrowseMapper productBrowseMapper;

    @Autowired
    private FavoriteMapper favoriteMapper;

    @Autowired
    private UserMapper userMapper;

    public List<Map<String, Object>> getBrowseStatistics() {
        List<Product> products = productMapper.selectList(
                new LambdaQueryWrapper<Product>().eq(Product::getStatus, 1)
                        .orderByDesc(Product::getBrowseCount));
        return products.stream().map(p -> {
            Map<String, Object> map = new HashMap<>();
            map.put("productId", p.getId());
            map.put("productName", p.getName());
            map.put("productImage", p.getImage());
            map.put("browseCount", p.getBrowseCount() != null ? p.getBrowseCount() : 0);
            LambdaQueryWrapper<ProductBrowse> wrapper = new LambdaQueryWrapper<>();
            wrapper.eq(ProductBrowse::getProductId, p.getId());
            long uniqueVisitors = productBrowseMapper.selectList(wrapper).stream()
                    .map(b -> b.getUserId() != null ? "u" + b.getUserId() : b.getVisitorId())
                    .distinct().count();
            map.put("uniqueVisitors", uniqueVisitors);
            return map;
        }).collect(Collectors.toList());
    }

    public List<Map<String, Object>> getCollectStatistics() {
        List<Product> products = productMapper.selectList(
                new LambdaQueryWrapper<Product>().eq(Product::getStatus, 1)
                        .orderByDesc(Product::getCollectCount));
        return products.stream().map(p -> {
            Map<String, Object> map = new HashMap<>();
            map.put("productId", p.getId());
            map.put("productName", p.getName());
            map.put("productImage", p.getImage());
            map.put("collectCount", p.getCollectCount() != null ? p.getCollectCount() : 0);
            LambdaQueryWrapper<Favorite> wrapper = new LambdaQueryWrapper<>();
            wrapper.eq(Favorite::getProductId, p.getId());
            List<Favorite> favorites = favoriteMapper.selectList(wrapper);
            List<Map<String, Object>> users = favorites.stream().map(f -> {
                Map<String, Object> userMap = new HashMap<>();
                User user = userMapper.selectById(f.getUserId());
                if (user != null) {
                    userMap.put("userId", user.getId());
                    userMap.put("nickname", user.getNickname());
                    userMap.put("avatar", user.getAvatar());
                    userMap.put("collectTime", f.getCreateTime());
                }
                return userMap;
            }).filter(m -> m.containsKey("userId")).collect(Collectors.toList());
            map.put("users", users);
            return map;
        }).collect(Collectors.toList());
    }

    public void recordBrowse(Long productId, Long userId, String visitorId) {
        Product product = productMapper.selectById(productId);
        if (product == null) return;
        int count = product.getBrowseCount() != null ? product.getBrowseCount() : 0;
        product.setBrowseCount(count + 1);
        productMapper.updateById(product);

        ProductBrowse browse = new ProductBrowse();
        browse.setProductId(productId);
        browse.setUserId(userId);
        browse.setVisitorId(visitorId);
        productBrowseMapper.insert(browse);
    }
}
