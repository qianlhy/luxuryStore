package com.flowerstore.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.flowerstore.entity.SubCategory;
import com.flowerstore.mapper.SubCategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubCategoryService {

    @Autowired
    private SubCategoryMapper subCategoryMapper;

    public List<SubCategory> getByCategoryId(Long categoryId) {
        LambdaQueryWrapper<SubCategory> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(SubCategory::getCategoryId, categoryId);
        wrapper.eq(SubCategory::getStatus, 1);
        wrapper.orderByAsc(SubCategory::getSort);
        return subCategoryMapper.selectList(wrapper);
    }

    public void add(SubCategory subCategory) {
        subCategoryMapper.insert(subCategory);
    }

    public void update(SubCategory subCategory) {
        subCategoryMapper.updateById(subCategory);
    }

    public void delete(Long id) {
        subCategoryMapper.deleteById(id);
    }
}
