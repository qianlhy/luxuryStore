package com.flowerstore.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.flowerstore.common.PageResult;
import com.flowerstore.common.Result;
import com.flowerstore.entity.SalesStaff;
import com.flowerstore.service.SalesStaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sales")
public class SalesStaffController {

    @Autowired
    private SalesStaffService salesStaffService;

    @GetMapping("/page")
    public Result<PageResult<SalesStaff>> getPage(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer size) {
        Page<SalesStaff> page = salesStaffService.getPage(current, size);
        return Result.success(PageResult.of(page));
    }

    @GetMapping("/list")
    public Result<List<SalesStaff>> getList() {
        return Result.success(salesStaffService.getList());
    }

    @PostMapping
    public Result<String> add(@RequestBody SalesStaff staff) {
        salesStaffService.add(staff);
        return Result.success("添加成功");
    }

    @PutMapping
    public Result<String> update(@RequestBody SalesStaff staff) {
        salesStaffService.update(staff);
        return Result.success("更新成功");
    }

    @DeleteMapping("/{id}")
    public Result<String> delete(@PathVariable Long id) {
        salesStaffService.delete(id);
        return Result.success("删除成功");
    }
}
