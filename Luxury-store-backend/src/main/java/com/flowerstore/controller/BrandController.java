package com.flowerstore.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.flowerstore.common.PageResult;
import com.flowerstore.common.Result;
import com.flowerstore.entity.Brand;
import com.flowerstore.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/brand")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping("/page")
    public Result<PageResult<Brand>> getPage(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(required = false) String name) {
        Page<Brand> page = brandService.getPage(current, size, name);
        return Result.success(PageResult.of(page));
    }

    @GetMapping("/list")
    public Result<List<Brand>> getList() {
        return Result.success(brandService.getList());
    }

    @GetMapping("/{id}")
    public Result<Brand> getById(@PathVariable Long id) {
        return Result.success(brandService.getById(id));
    }

    @PostMapping
    public Result<String> add(@RequestBody Brand brand) {
        brandService.add(brand);
        return Result.success("添加成功");
    }

    @PutMapping
    public Result<String> update(@RequestBody Brand brand) {
        brandService.update(brand);
        return Result.success("更新成功");
    }

    @DeleteMapping("/{id}")
    public Result<String> delete(@PathVariable Long id) {
        brandService.delete(id);
        return Result.success("删除成功");
    }
}
