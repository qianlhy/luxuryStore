package com.flowerstore.controller;

import com.flowerstore.common.Result;
import com.flowerstore.service.FootprintService;
import com.flowerstore.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/footprint")
public class FootprintController {

    @Autowired
    private FootprintService footprintService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/list")
    public Result<List<Map<String, Object>>> getList(@RequestHeader("Authorization") String token) {
        try {
            Long userId = jwtUtils.getUserIdFromToken(token);
            return Result.success(footprintService.getList(userId));
        } catch (com.flowerstore.common.UnauthorizedException ue) {
            throw ue;
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PostMapping
    public Result<String> add(
            @RequestHeader("Authorization") String token,
            @RequestBody Map<String, Object> params) {
        try {
            Long userId = jwtUtils.getUserIdFromToken(token);
            Long productId = Long.valueOf(params.get("productId").toString());
            footprintService.add(userId, productId);
            return Result.success("记录成功");
        } catch (com.flowerstore.common.UnauthorizedException ue) {
            throw ue;
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @DeleteMapping
    public Result<String> remove(
            @RequestHeader("Authorization") String token,
            @RequestParam Long productId) {
        try {
            Long userId = jwtUtils.getUserIdFromToken(token);
            footprintService.remove(userId, productId);
            return Result.success("删除成功");
        } catch (com.flowerstore.common.UnauthorizedException ue) {
            throw ue;
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}
