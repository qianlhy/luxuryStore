package com.flowerstore.controller;

import com.flowerstore.common.Result;
import com.flowerstore.service.SystemConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/config")
public class SystemConfigController {

    @Autowired
    private SystemConfigService systemConfigService;

    @GetMapping
    public Result<Map<String, String>> getAll() {
        return Result.success(systemConfigService.getAll());
    }

    @GetMapping("/{key}")
    public Result<String> getValue(@PathVariable String key) {
        return Result.success(systemConfigService.getValue(key));
    }

    @PostMapping
    public Result<String> setValue(@RequestBody Map<String, String> params) {
        String key = params.get("key");
        String value = params.get("value");
        String remark = params.get("remark");
        systemConfigService.setValue(key, value, remark);
        return Result.success("保存成功");
    }
}
