package com.flowerstore.common;

/**
 * 未授权异常：token 缺失、无效或已过期时抛出，由全局异常处理器统一返回 401
 */
public class UnauthorizedException extends RuntimeException {

    public UnauthorizedException() {
        super("登录已过期，请重新登录");
    }

    public UnauthorizedException(String message) {
        super(message);
    }
}
