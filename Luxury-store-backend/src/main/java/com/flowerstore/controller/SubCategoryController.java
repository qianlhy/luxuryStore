package com.flowerstore.controller;

import com.flowerstore.common.Result;
import com.flowerstore.entity.SubCategory;
import com.flowerstore.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sub-category")
public class SubCategoryController {

    @Autowired
    private SubCategoryService subCategoryService;

    @GetMapping("/list/{categoryId}")
    public Result<List<SubCategory>> getByCategoryId(@PathVariable Long categoryId) {
        return Result.success(subCategoryService.getByCategoryId(categoryId));
    }

    @PostMapping
    public Result<String> add(@RequestBody SubCategory subCategory) {
        subCategoryService.add(subCategory);
        return Result.success("添加成功");
    }

    @PutMapping
    public Result<String> update(@RequestBody SubCategory subCategory) {
        subCategoryService.update(subCategory);
        return Result.success("更新成功");
    }

    @DeleteMapping("/{id}")
    public Result<String> delete(@PathVariable Long id) {
        subCategoryService.delete(id);
        return Result.success("删除成功");
    }
}
