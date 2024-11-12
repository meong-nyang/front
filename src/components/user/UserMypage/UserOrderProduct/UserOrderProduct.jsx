import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import axios from 'axios';
import { convertToCommaValue } from '../../../../utils/changeStringFormat';
import { IMAGE_ADDRESS } from '../../../../apis/util/instance';

function UserOrderProduct({orderDetailData}) {
   console.log(orderDetailData);
    return (
        <div css={s.contentLayout}>
                <div css={s.productLayout}>
                    <img src={IMAGE_ADDRESS + orderDetailData.imgName} />
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
                <div css={s.deliveryLayout}>
                    <p>결제완료</p>
                    <button>결제취소</button>
                </div>
            </div>
    );
}

export default UserOrderProduct;