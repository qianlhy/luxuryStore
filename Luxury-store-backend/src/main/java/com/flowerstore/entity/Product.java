package com.flowerstore.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 商品实体
 */
@Data
@TableName("t_product")
public class Product implements Serializable {

    @TableId(type = IdType.AUTO)
    private Long id;
    
    /** 商品名称 */
    private String name;
    
    /** 分类ID */
    private Long categoryId;

    /** 品牌ID */
    private Long brandId;

    /** 子分类ID */
    private Long subCategoryId;
    
    /** 商品价格 */
    private BigDecimal price;
    
    /** 原价 */
    private BigDecimal originalPrice;
    
    /** 库存 */
    private Integer inventory;
    
    /** 销量 */
    private Integer sales;

    /** 浏览次数 */
    private Integer browseCount;

    /** 收藏次数 */
    private Integer collectCount;
    
    /** 评分 */
    private BigDecimal rating;
    
    /** 主图 */
    private String image;
    
    /** 轮播图（多张，逗号分隔） */
    private String images;
    
    /** 商品描述 */
    private String description;
    
    /** 商品详情 */
    private String detail;

    /** 商品参数JSON */
    private String parameters;
    
    /** 状态：0-下架，1-上架 */
    private Integer status;

    /** 失效类型：0-正常，1-下架，2-售罄，3-过期 */
    private Integer invalidType;

    /** 品牌名称（非数据库字段） */
    @TableField(exist = false)
    private String brandName;
    
    /** 创建时间 */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    
    /** 更新时间 */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
    
    /** 逻辑删除 */
    @TableLogic
    private Integer deleted;

    /**
     * 轮播图数组（由 images 逗号串拆分而来，前端无需重复 split）
     */
    @JsonProperty("imageList")
    public List<String> getImageList() {
        List<String> list = new ArrayList<>();
        if (images != null && !images.trim().isEmpty()) {
            for (String url : images.split(",")) {
                if (url != null && !url.trim().isEmpty()) {
                    list.add(url.trim());
                }
            }
        }
        // 兜底：无轮播图时使用主图
        if (list.isEmpty() && image != null && !image.trim().isEmpty()) {
            list.add(image.trim());
        }
        return list;
    }
}

