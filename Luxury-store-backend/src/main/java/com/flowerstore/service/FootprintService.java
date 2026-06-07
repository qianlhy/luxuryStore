package com.flowerstore.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.flowerstore.entity.Footprint;
import com.flowerstore.entity.Product;
import com.flowerstore.mapper.FootprintMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FootprintService {

    @Autowired
    private FootprintMapper footprintMapper;

    @Autowired
    private ProductService productService;

    public void add(Long userId, Long productId) {
        LambdaQueryWrapper<Footprint> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Footprint::getUserId, userId);
        wrapper.eq(Footprint::getProductId, productId);
        Footprint existing = footprintMapper.selectOne(wrapper);
        if (existing != null) {
            footprintMapper.updateById(existing);
        } else {
            Footprint footprint = new Footprint();
            footprint.setUserId(userId);
            footprint.setProductId(productId);
            footprintMapper.insert(footprint);
        }
    }

    public List<Map<String, Object>> getList(Long userId) {
        LambdaQueryWrapper<Footprint> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Footprint::getUserId, userId);
        wrapper.orderByDesc(Footprint::getUpdateTime);
        List<Footprint> footprints = footprintMapper.selectList(wrapper);
        List<Map<String, Object>> result = new ArrayList<>();
        for (Footprint fp : footprints) {
            Product product = productService.getById(fp.getProductId());
            if (product != null && product.getStatus() == 1) {
                Map<String, Object> item = new HashMap<>();
                item.put("id", fp.getId());
                item.put("productId", product.getId());
                item.put("name", product.getName());
                item.put("image", product.getImage());
                item.put("price", product.getPrice());
                item.put("browseTime", fp.getUpdateTime());
                result.add(item);
            }
        }
        return result;
    }

    public void remove(Long userId, Long productId) {
        LambdaQueryWrapper<Footprint> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Footprint::getUserId, userId);
        wrapper.eq(Footprint::getProductId, productId);
        footprintMapper.delete(wrapper);
    }
}
