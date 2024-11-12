import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { convertToCommaValue } from '../../../utils/changeStringFormat';
import { IMAGE_ADDRESS } from '../../../apis/util/instance';
import { useQueryClient } from 'react-query';

function UserOrderContent({productInfo, count}) {
    const queryClient = useQueryClient();
    const siteLogo = queryClient.getQueryData("siteLogoQuery");
    console.log(productInfo);
    return (
        <div css={s.layout}>
            <div css={s.productLayout}>
                <img src={productInfo.imgName === "" ? IMAGE_ADDRESS + siteLogo?.data : IMAGE_ADDRESS + productInfo.imgName} />
                <div>
                    <p>{productInfo.groupName}{'>'} {productInfo.categoryName}</p>
                    <p>{productInfo.productName}</p>
                </div>
            </div>
            <p>{count}</p>
            <p>{convertToCommaValue((productInfo.productPrice - productInfo.productPriceDiscount) * count)}원</p>
        </div>
    );
}

export default UserOrderContent;