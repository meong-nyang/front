import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useMutation } from 'react-query';
import { instance } from '../../../../apis/util/instance';
import axios from 'axios';

function UserOrderProduct(props) {
    
    return (
        <div css={s.contentLayout}>
                <div css={s.productLayout}>
                    <img src="" />
                    <div>
                        <p>상품이름</p>
                        <p>[옵션]</p>
                    </div>
                </div>
                <div>
                    <p>1개</p>
                </div>
                <div>
                    <p>7,500원</p>
                </div>
                <div css={s.deliveryLayout}>
                    <p>결제완료</p>
                    <button>결제취소</button>
                </div>
            </div>
    );
}

export default UserOrderProduct;