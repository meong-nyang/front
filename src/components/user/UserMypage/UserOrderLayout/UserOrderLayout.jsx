import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserOrderProduct from '../UserOrderProduct/UserOrderProduct';
import axios from 'axios';
import { useMutation } from 'react-query';

function UserOrderLayout({orderData}) {
     
    const accessTokenMutaion = useMutation(
        async () => await axios.post("https://api.portone.io/login/api-secret", {"apiSecret": "nJWzf34SiRfJy6wVT8ZfiS4vEU8vs7h9yy8F0tr79kp6Kv0cZz5skHaIMPD7Iw1mGyAYGBXobJlWz3MT"}),
        {
            onSuccess: response => console.log(response)
        }
    
    );

    console.log(accessTokenMutaion?.data?.data);
    const portonePaymentCancelMutation = useMutation(
        async ({accessToken}) => {
            const options = {
                method: 'post',
                url: `https://api.portone.io/payments/${orderData.paymentId}/cancel`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                data: {reason: "취소요청"}
            };
            const {data} = await axios.request(options);
            return data;
        },
        {
            onSuccess: response => console.log(response),
            onError: error => console.log(error)
        }
    );
    
    const handleOrderDetailShowOnClick = () => {
        
    };

    const handlePaymentCancelOnClick = () => {
        accessTokenMutaion.mutateAsync().then(response =>
            portonePaymentCancelMutation.mutateAsync(response?.data)
        );
    };
    return (
        <div css={s.layout}>
            <div css={s.headerLayout}>
                <div>
                    <p>주문일자</p>
                    <p>{orderData.orderDate}</p>
                </div>
                <p>총 {orderData.orderItemCount}건</p>
            </div>
            <div>
                
            </div>

            <div css={s.titleLayout}>
                <p>상품명/옵션</p>
                <p>수량</p>
                <p>결제금액</p>
                <p>결제상태</p>
            </div>
            {
                orderData?.orderDetailList.map(orderDetail =>
                    <UserOrderProduct key={orderDetail.id} orderDetailData={orderDetail} />
                )
            }
            <button onClick={handleOrderDetailShowOnClick}>주문상세보기</button>
            <button onClick={handlePaymentCancelOnClick}>주문취소</button>
        </div>
    );
}

export default UserOrderLayout;