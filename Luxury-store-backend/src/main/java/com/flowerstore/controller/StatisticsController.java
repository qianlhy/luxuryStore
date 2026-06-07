package com.flowerstore.controller;

import com.flowerstore.common.Result;
import com.flowerstore.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @GetMapping("/browse")
    public Result<List<Map<String, Object>>> getBrowseStatistics() {
        return Result.success(statisticsService.getBrowseStatistics());
    }

    @GetMapping("/collect")
    public Result<List<Map<String, Object>>> getCollectStatistics() {
        return Result.success(statisticsService.getCollectStatistics());
    }

    @PostMapping("/browse/{productId}")
    public Result<String> recordBrowse(
            @PathVariable Long productId,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String visitorId) {
        statisticsService.recordBrowse(productId, userId, visitorId);
        return Result.success("记录成功");
    }
}
