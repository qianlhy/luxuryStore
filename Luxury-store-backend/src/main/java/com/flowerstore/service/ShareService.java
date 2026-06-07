package com.flowerstore.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.flowerstore.entity.Product;
import com.flowerstore.entity.ShareRecord;
import com.flowerstore.entity.User;
import com.flowerstore.mapper.ShareRecordMapper;
import com.flowerstore.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ShareService {

    @Autowired
    private ShareRecordMapper shareRecordMapper;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserMapper userMapper;

    public ShareRecord createShare(Long userId, Integer shareType, List<Long> productIds, Long salesId) {
        List<Product> products = productIds.stream()
                .map(productService::getById)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        BigDecimal totalPrice = products.stream()
                .map(Product::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        String productIdStr = productIds.stream().map(String::valueOf).collect(Collectors.joining(","));
        String productNameStr = products.stream().map(Product::getName).collect(Collectors.joining(","));

        ShareRecord record = new ShareRecord();
        record.setUserId(userId);
        record.setShareType(shareType);
        record.setShareCode(UUID.randomUUID().toString().replace("-", "").substring(0, 16));
        record.setProductIds(productIdStr);
        record.setProductNames(productNameStr);
        record.setTotalPrice(totalPrice);
        record.setSalesId(salesId);
        record.setViewCount(0);
        record.setStatus(1);
        shareRecordMapper.insert(record);
        return record;
    }

    public ShareRecord getByShareCode(String shareCode) {
        LambdaQueryWrapper<ShareRecord> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ShareRecord::getShareCode, shareCode);
        ShareRecord record = shareRecordMapper.selectOne(wrapper);
        if (record != null) {
            record.setViewCount(record.getViewCount() + 1);
            shareRecordMapper.updateById(record);
        }
        return record;
    }

    public List<Map<String, Object>> getUserShareList(Long userId) {
        LambdaQueryWrapper<ShareRecord> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ShareRecord::getUserId, userId);
        wrapper.orderByDesc(ShareRecord::getCreateTime);
        List<ShareRecord> records = shareRecordMapper.selectList(wrapper);
        return records.stream().map(this::toMap).collect(Collectors.toList());
    }

    public Page<Map<String, Object>> getPage(Integer current, Integer size, Integer shareType) {
        Page<ShareRecord> page = new Page<>(current, size);
        LambdaQueryWrapper<ShareRecord> wrapper = new LambdaQueryWrapper<>();
        if (shareType != null) {
            wrapper.eq(ShareRecord::getShareType, shareType);
        }
        wrapper.orderByDesc(ShareRecord::getCreateTime);
        Page<ShareRecord> result = shareRecordMapper.selectPage(page, wrapper);
        Page<Map<String, Object>> mapPage = new Page<>(result.getCurrent(), result.getSize(), result.getTotal());
        mapPage.setRecords(result.getRecords().stream().map(this::toMap).collect(Collectors.toList()));
        return mapPage;
    }

    private Map<String, Object> toMap(ShareRecord record) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", record.getId());
        map.put("userId", record.getUserId());
        map.put("shareType", record.getShareType());
        map.put("shareTypeName", record.getShareType() == 1 ? "分享给销售" : "分享给好友");
        map.put("shareCode", record.getShareCode());
        map.put("productIds", record.getProductIds());
        map.put("productNames", record.getProductNames());
        map.put("totalPrice", record.getTotalPrice());
        map.put("salesId", record.getSalesId());
        map.put("viewCount", record.getViewCount());
        map.put("status", record.getStatus());
        map.put("createTime", record.getCreateTime());
        User user = userMapper.selectById(record.getUserId());
        if (user != null) {
            map.put("userName", user.getNickname());
        }
        return map;
    }
}
