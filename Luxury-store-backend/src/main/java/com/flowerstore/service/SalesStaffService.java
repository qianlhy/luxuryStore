package com.flowerstore.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.flowerstore.entity.SalesStaff;
import com.flowerstore.mapper.SalesStaffMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalesStaffService {

    @Autowired
    private SalesStaffMapper salesStaffMapper;

    public Page<SalesStaff> getPage(Integer current, Integer size) {
        Page<SalesStaff> page = new Page<>(current, size);
        LambdaQueryWrapper<SalesStaff> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByDesc(SalesStaff::getCreateTime);
        return salesStaffMapper.selectPage(page, wrapper);
    }

    public List<SalesStaff> getList() {
        LambdaQueryWrapper<SalesStaff> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(SalesStaff::getStatus, 1);
        return salesStaffMapper.selectList(wrapper);
    }

    public void add(SalesStaff staff) {
        salesStaffMapper.insert(staff);
    }

    public void update(SalesStaff staff) {
        salesStaffMapper.updateById(staff);
    }

    public void delete(Long id) {
        salesStaffMapper.deleteById(id);
    }
}
