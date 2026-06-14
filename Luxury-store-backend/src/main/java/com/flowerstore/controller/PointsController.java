package com.flowerstore.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.flowerstore.common.PageResult;
import com.flowerstore.common.Result;
import com.flowerstore.entity.PointsLog;
import com.flowerstore.service.PointsService;
import com.flowerstore.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/points")
public class PointsController {

    @Autowired
    private PointsService pointsService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/balance")
    public Result<Integer> getBalance(@RequestHeader("Authorization") String token) {
        try {
            Long userId = jwtUtils.getUserIdFromToken(token);
            return Result.success(pointsService.getBalance(userId));
        } catch (com.flowerstore.common.UnauthorizedException ue) {
            throw ue;
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("/logs")
    public Result<List<PointsLog>> getLogs(@RequestHeader("Authorization") String token) {
        try {
            Long userId = jwtUtils.getUserIdFromToken(token);
            return Result.success(pointsService.getUserLogs(userId));
        } catch (com.flowerstore.common.UnauthorizedException ue) {
            throw ue;
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("/page")
    public Result<PageResult<Map<String, Object>>> getPage(
            @RequestParam(defaultValue = "1") Integer current,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(required = false) Long userId) {
        Page<Map<String, Object>> page = pointsService.getPage(current, size, userId);
        return Result.success(PageResult.of(page));
    }

    @PostMapping("/adjust")
    public Result<String> adjust(@RequestBody Map<String, Object> params) {
        try {
            Long userId = Long.valueOf(params.get("userId").toString());
            Integer points = Integer.valueOf(params.get("points").toString());
            String remark = params.get("remark") != null ? params.get("remark").toString() : "管理员调整";
            Long operatorId = params.get("operatorId") != null ? Long.valueOf(params.get("operatorId").toString()) : null;
            pointsService.adjustPoints(userId, points, remark, operatorId);
            return Result.success("调整成功");
        } catch (com.flowerstore.common.UnauthorizedException ue) {
            throw ue;
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}
