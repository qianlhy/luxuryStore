package com.flowerstore.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常处理：统一返回 Result，隐藏堆栈，给出友好的中文提示
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 未授权（token 缺失/失效）
     */
    @ExceptionHandler(UnauthorizedException.class)
    public Result<Void> handleUnauthorized(UnauthorizedException e) {
        return Result.error(401, e.getMessage());
    }

    /**
     * 缺少请求头（通常是未携带 Authorization，视为未登录）
     */
    @ExceptionHandler(MissingRequestHeaderException.class)
    public Result<Void> handleMissingHeader(MissingRequestHeaderException e) {
        if ("Authorization".equalsIgnoreCase(e.getHeaderName())) {
            return Result.error(401, "请先登录");
        }
        return Result.error(400, "缺少必要参数：" + e.getHeaderName());
    }

    /**
     * 缺少请求参数
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public Result<Void> handleMissingParam(MissingServletRequestParameterException e) {
        return Result.error(400, "缺少必要参数：" + e.getParameterName());
    }

    /**
     * 参数校验失败（@Valid，@RequestBody）
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result<Void> handleValidation(MethodArgumentNotValidException e) {
        return Result.error(400, firstErrorMessage(e.getBindingResult().getFieldError()));
    }

    /**
     * 参数绑定失败（表单参数）
     */
    @ExceptionHandler(BindException.class)
    public Result<Void> handleBind(BindException e) {
        return Result.error(400, firstErrorMessage(e.getBindingResult().getFieldError()));
    }

    /**
     * 非法参数
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public Result<Void> handleIllegalArgument(IllegalArgumentException e) {
        return Result.error(400, e.getMessage() != null ? e.getMessage() : "请求参数有误");
    }

    /**
     * 业务运行时异常
     */
    @ExceptionHandler(RuntimeException.class)
    public Result<Void> handleRuntime(RuntimeException e) {
        log.error("业务异常", e);
        String message = e.getMessage();
        return Result.error(message != null && !message.isEmpty() ? message : "系统繁忙，请稍后重试");
    }

    /**
     * 兜底异常
     */
    @ExceptionHandler(Exception.class)
    public Result<Void> handleException(Exception e) {
        log.error("系统异常", e);
        return Result.error("系统繁忙，请稍后重试");
    }

    private String firstErrorMessage(FieldError fieldError) {
        if (fieldError != null && fieldError.getDefaultMessage() != null) {
            return fieldError.getDefaultMessage();
        }
        return "参数校验失败";
    }
}
