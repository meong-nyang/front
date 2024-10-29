import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

function UserProductDetail({ productInfo }) {
    
    return (
        <div css={s.layout}>
            <div css={s.imgLayout}>
                <img src={"http://localhost:8080/images/" + productInfo.imgNames[0]} alt="" />
            </div>
            <div css={s.contentLayout}>
                <p>{productInfo.productName}</p>
                <p>{productInfo.productDetail}</p>
                <p>{productInfo.productPrice}</p>
            </div>
            <button>Add to Cart</button>
        </div>
    );
}

export default UserProductDetail;