package com.flowerstore.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.flowerstore.common.PageResult;
import com.flowerstore.common.Result;
import com.flowerstore.entity.ShareRecord;
import com.flowerstore.service.ShareService;
import com.flowerstore.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/share")
public class ShareController {

    @Autowired
    private ShareService shareService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping
    public Result<ShareRecord> create(
            @RequestHeader("Authorization") String token,
            @RequestBody Map<String, Object> params) {
        try {
            Long userId = jwtUtils.getUserIdFromToken(token);
            Integer shareType = Integer.valueOf(params.get("shareType").toString());
            @SuppressWarnings("unchecked")
            List<Integer> ids = (List<Integer>) params.get("productIds");
            List<Long> productIds = ids.stream().map(Long::valueOf).collect(java.util.stream.Collectors.toList());
            Long salesId = params.get("salesId") != null ? Long.valueOf(params.get("salesId").toString()) : null;
            ShareRecord record = shareService.createShare(userId, shareType, productIds, salesId);
            return Result.success(record);
        } catch (com.flowerstore.common.UnauthorizedException ue) {
            throw ue;
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("/code/{shareCode}")
    public Result<ShareRecord> getByCode(@PathVariable String shareCode) {
        return Result.success(shareService.getByShareCode(shareCode));
    }

    @GetMapping("/my")
    public Result<List<Map<String, Object>>> getMyShares(@RequestHeader("Authorization") String token) {
        try {
            Long userId = jwtUtils.getUserIdFromToken(token);
            return Result.success(shareService.getUserShareList(userId));
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
            @RequestParam(required = false) Integer shareType) {
        Page<Map<String, Object>> page = shareService.getPage(current, size, shareType);
        return Result.success(PageResult.of(page));
    }
}
