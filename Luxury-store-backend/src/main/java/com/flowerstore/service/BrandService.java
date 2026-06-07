package com.flowerstore.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.flowerstore.entity.Brand;
import com.flowerstore.mapper.BrandMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandService {

    @Autowired
    private BrandMapper brandMapper;

    public Page<Brand> getPage(Integer current, Integer size, String name) {
        Page<Brand> page = new Page<>(current, size);
        LambdaQueryWrapper<Brand> wrapper = new LambdaQueryWrapper<>();
        if (name != null && !name.isEmpty()) {
            wrapper.like(Brand::getName, name);
        }
        wrapper.orderByAsc(Brand::getSort);
        return brandMapper.selectPage(page, wrapper);
    }

    public List<Brand> getList() {
        LambdaQueryWrapper<Brand> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Brand::getStatus, 1);
        wrapper.orderByAsc(Brand::getSort);
        return brandMapper.selectList(wrapper);
    }

    public Brand getById(Long id) {
        return brandMapper.selectById(id);
    }

    public void add(Brand brand) {
        brandMapper.insert(brand);
    }

    public void update(Brand brand) {
        brandMapper.updateById(brand);
    }

    public void delete(Long id) {
        brandMapper.deleteById(id);
    }
}
