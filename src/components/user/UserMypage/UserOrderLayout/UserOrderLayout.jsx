import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserOrderProduct from '../UserOrderProduct/UserOrderProduct';
import axios from 'axios';
import { useMutation } from 'react-query';

function UserOrderLayout(props) {
    const portonePaymentCancelMutation = useMutation(
        async () => await axios.post("https://api.portone.io/payments/paymentId/cancel")
    );
    const handlePaymentCancelOnClick = () => {

    };
    return (
        <div css={s.layout}>
            <div css={s.headerLayout}>
                <div>
                    <p>주문일자</p>
                    <p>2024-12-10</p>
                </div>
                <p>총 3건</p>
            </div>

            <div css={s.titleLayout}>
                <p>상품명/옵션</p>
                <p>수량</p>
                <p>결제금액</p>
                <p>결제상태</p>
            </div>
            <UserOrderProduct />
            <UserOrderProduct />
            <UserOrderProduct />

            <button onClick={handlePaymentCancelOnClick}>주문취소</button>
        </div>
    );
}

export default UserOrderLayout;