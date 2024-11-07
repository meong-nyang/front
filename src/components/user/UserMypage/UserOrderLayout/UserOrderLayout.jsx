import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserOrderProduct from '../UserOrderProduct/UserOrderProduct';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import Swal from "sweetalert2";
import { instance } from '../../../../apis/util/instance';

function UserOrderLayout({orderData}) {
    const queryClient = useQueryClient();
    const userInfo = queryClient.getQueryData("userInfoQuery");

    const [ isorderDetailShow, setOrderDetailShow ] = useState(false);
    const [ paymentCancelData, setPaymentCancelData] = useState({
        id: orderData?.orderId,
        userId: userInfo?.data?.id
    });

    const [ isPaymentCancel, setPaymentCancel ] = useState(true);
    useEffect(() => {
        let orderDate = new Date(orderData.orderDate);

        // 오늘 날짜를 가져옵니다.
        let today = new Date();

        // 오늘 날짜에서 7일을 더한 날짜 계산
        let sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);

        // 주문 날짜가 7일 이상 지났는지 확인
        if (orderDate <= sevenDaysAgo) {
            // 7일 이상 지난 경우 실행할 작업
            setPaymentCancel(false);
        }
    }, [orderData]);

    console.log(orderData);
    const accessTokenMutaion = useMutation(
        async () => await axios.post("https://api.portone.io/login/api-secret", {"apiSecret": "nJWzf34SiRfJy6wVT8ZfiS4vEU8vs7h9yy8F0tr79kp6Kv0cZz5skHaIMPD7Iw1mGyAYGBXobJlWz3MT"}),
        {
            onSuccess: response => console.log(response)
        }
    );

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
            onSuccess: () => modifyOrderStatus.mutateAsync(),
            onError: error => console.log(error)
        }
    );

    const modifyOrderStatus = useMutation(
        async () => await instance.put("/order/status", paymentCancelData),
        {
            onSuccess: () => queryClient.invalidateQueries("userOrderListQuery")
        }
    );

    const handleOrderDetailShowOnClick = () => {
        setOrderDetailShow(isShow => !isShow);
    };

    const handlePaymentCancelOnClick = () => {
        Swal.fire({
            text: "주문을 취소하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#777777",
            cancelButtonText: "닫기",
            confirmButtonColor: "#9d6c4c",
            confirmButtonText: "주문취소",
        }).then((result) => {
            if (result.isConfirmed) {
                accessTokenMutaion.mutateAsync().then(response =>
                    portonePaymentCancelMutation.mutateAsync(response?.data)
                );
            }
        });
        
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
            <button onClick={handleOrderDetailShowOnClick}>{isorderDetailShow ? "접기" : "주문상세보기"}</button>
            {
                isorderDetailShow &&
                
                <>
                    <div css={s.addressLayout}>
                        <p>배송지</p>
                        <p>{orderData.orderName + orderData.phone}</p>
                        <p>{"(" + orderData.zipcode + ") " + orderData.addressDefault + orderData.addressDetail}</p>
                        <p>결제정보</p>
                        <p>주문금액 {orderData.totalPrice}원</p>
                        <p>{orderData.paymentTypeName}</p>
                    </div>
                </>
                

            }
            {
                orderData?.orderStatus === "결제완료" &&  
                    <button onClick={handlePaymentCancelOnClick}>주문취소</button>
            }
        </div>
    );
}

export default UserOrderLayout;