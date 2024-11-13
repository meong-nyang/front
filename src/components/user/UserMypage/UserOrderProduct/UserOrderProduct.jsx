import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { convertToCommaValue } from '../../../../utils/changeStringFormat';
import { IMAGE_ADDRESS } from '../../../../apis/util/instance';
import { useQueryClient } from 'react-query';

function UserOrderProduct({orderDetailData}) {
    const queryClient = useQueryClient();
    const siteLogo = queryClient.getQueryData("siteLogoQuery");
    console.log(orderDetailData);
    return (
        <div css={s.contentLayout}>
                <div css={s.productLayout}>
                    <img src={orderDetailData.imgName === "" ? IMAGE_ADDRESS + siteLogo?.data : IMAGE_ADDRESS + orderDetailData.imgName} />
                    <div>
                        <p>{orderDetailData.productName}</p>
                    </div>
                </div>
                <div>
                    <p>{orderDetailData.productCount}개</p>
                </div>
                <div>
                    <p>{convertToCommaValue(orderDetailData.productPrice * orderDetailData.productCount)}원</p>
                </div>
            </div>
    );
}

export default UserOrderProduct;