package com.flowerstore.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.flowerstore.entity.PointsLog;
import com.flowerstore.entity.User;
import com.flowerstore.mapper.PointsLogMapper;
import com.flowerstore.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PointsService {

    @Autowired
    private PointsLogMapper pointsLogMapper;

    @Autowired
    private UserMapper userMapper;

    public Integer getBalance(Long userId) {
        User user = userMapper.selectById(userId);
        return user != null && user.getPoints() != null ? user.getPoints() : 0;
    }

    public List<PointsLog> getUserLogs(Long userId) {
        LambdaQueryWrapper<PointsLog> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PointsLog::getUserId, userId);
        wrapper.orderByDesc(PointsLog::getCreateTime);
        return pointsLogMapper.selectList(wrapper);
    }

    public Page<Map<String, Object>> getPage(Integer current, Integer size, Long userId) {
        Page<PointsLog> page = new Page<>(current, size);
        LambdaQueryWrapper<PointsLog> wrapper = new LambdaQueryWrapper<>();
        if (userId != null) {
            wrapper.eq(PointsLog::getUserId, userId);
        }
        wrapper.orderByDesc(PointsLog::getCreateTime);
        Page<PointsLog> result = pointsLogMapper.selectPage(page, wrapper);
        Page<Map<String, Object>> mapPage = new Page<>(result.getCurrent(), result.getSize(), result.getTotal());
        mapPage.setRecords(result.getRecords().stream().map(log -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", log.getId());
            map.put("userId", log.getUserId());
            map.put("points", log.getPoints());
            map.put("balance", log.getBalance());
            map.put("type", log.getType());
            map.put("typeName", getTypeName(log.getType()));
            map.put("remark", log.getRemark());
            map.put("createTime", log.getCreateTime());
            User user = userMapper.selectById(log.getUserId());
            if (user != null) {
                map.put("userName", user.getNickname());
                map.put("userPhone", user.getPhone());
            }
            return map;
        }).collect(Collectors.toList()));
        return mapPage;
    }

    @Transactional
    public void adjustPoints(Long userId, Integer points, String remark, Long operatorId) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new RuntimeException("用户不存在");
        }
        int currentPoints = user.getPoints() != null ? user.getPoints() : 0;
        int newBalance = currentPoints + points;
        if (newBalance < 0) {
            throw new RuntimeException("积分不足");
        }
        user.setPoints(newBalance);
        userMapper.updateById(user);

        PointsLog log = new PointsLog();
        log.setUserId(userId);
        log.setPoints(points);
        log.setBalance(newBalance);
        log.setType(3);
        log.setRemark(remark);
        log.setOperatorId(operatorId);
        pointsLogMapper.insert(log);
    }

    @Transactional
    public void earnPoints(Long userId, Integer points, String remark) {
        if (points <= 0) return;
        User user = userMapper.selectById(userId);
        if (user == null) return;
        int currentPoints = user.getPoints() != null ? user.getPoints() : 0;
        int newBalance = currentPoints + points;
        user.setPoints(newBalance);
        userMapper.updateById(user);

        PointsLog log = new PointsLog();
        log.setUserId(userId);
        log.setPoints(points);
        log.setBalance(newBalance);
        log.setType(1);
        log.setRemark(remark);
        pointsLogMapper.insert(log);
    }

    private String getTypeName(Integer type) {
        if (type == null) return "未知";
        switch (type) {
            case 1: return "下单获赠";
            case 2: return "兑换消费";
            case 3: return "管理员调整";
            default: return "其他";
        }
    }
}
