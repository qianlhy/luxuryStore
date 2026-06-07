package com.flowerstore.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@TableName("t_product_browse")
public class ProductBrowse implements Serializable {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long productId;
    private Long userId;
    private String visitorId;
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
}
