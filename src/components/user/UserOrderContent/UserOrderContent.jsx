import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

function UserOrderContent({productInfo}) {

    const priceFormet = (price) => {
        if (price == null || isNaN(price)) {
            return '0';
        }
        return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    };
    
    return (
        <div css={s.layout}>
            <div css={s.productLayout}>
                <img src="" />
                <div>
                    <p>{productInfo.groupName}{'>'} {productInfo.categoryName}</p>
                    <p>{productInfo.productName}</p>
                </div>
            </div>
            <p>1</p>
            <p>{priceFormet(productInfo.productPrice)}원</p>
        </div>
    );
}

export default UserOrderContent;