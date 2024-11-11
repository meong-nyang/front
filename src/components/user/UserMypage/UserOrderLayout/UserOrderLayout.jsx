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

    //주문상세보기여부
    const [ isorderDetailShow, setOrderDetailShow ] = useState(false);
    //주문취소가능여부
    const [ isPaymentCancel, setPaymentCancel ] = useState(true);
    //구매확정가능 여부
    const [ isPaymentConfirmation, setPaymentConfirmation ] = useState(true);
    const [ paymentCancelData, setPaymentCancelData] = useState({
        id: orderData?.orderId,
        userId: userInfo?.data?.id,
        orderStatus: ""
    });

    useEffect(() => {
        let orderDate = new Date(orderData.orderDate);

        let today = new Date();
        let sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        if (orderDate <= sevenDaysAgo) {
            setPaymentCancel(false);
        }

        let threeDaysAgo = new Date(today);
        threeDaysAgo.setDate(today.getDate() - 3);
        if (orderDate <= sevenDaysAgo) {
            setPaymentConfirmation(false);
        }

    }, [orderData]);

    console.log(orderData.orderId);
    console.log(isPaymentCancel);

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
            onSuccess: () => {
                const orderStatusData = {
                    ...paymentCancelData,
                    orderStatus: "환불완료"
                }
                modifyOrderStatus.mutateAsync(orderStatusData);
                Swal.fire({
                    text: "결제가 취소되었습니다.",
                    icon: "success",
                    timer: 1500,
                    confirmButtonColor: "#9d6c4c",
                    confirmButtonText: "닫기",
                })
            },
            onError: error => console.log(error)
        }
    );

    const modifyOrderStatus = useMutation(
        async (orderStatusData) => await instance.put("/order/status", orderStatusData),
        {
            onSuccess: () => queryClient.invalidateQueries("userOrderListQuery")
        }
    );

    const priceFormet = (price) => {
        if (price == null || isNaN(price)) {
            return '0';
        }
        return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleOrderDetailShowOnClick = () => {
        setOrderDetailShow(isShow => !isShow);
    };

    const handlePaymentCancelOnClick = () => {
        Swal.fire({
            text: "결제를 취소하시겠습니까?",
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

    const handleConfirmationOnClick = () => {
        Swal.fire({
            text: "구매를 확정하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            cancelButtonColor: "#777777",
            cancelButtonText: "닫기",
            confirmButtonColor: "#9d6c4c",
            confirmButtonText: "구매확정",
        }).then((result) => {
            if (result.isConfirmed) {
                const orderStatusData = {
                    ...paymentCancelData,
                    orderStatus: "구매확정"
                }
                modifyOrderStatus.mutateAsync(orderStatusData);
            }
        });
    }

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
                        <p>주문금액 {priceFormet(orderData.totalPrice)}원</p>
                        <p>{orderData.paymentTypeName}</p>
                    </div>
                </>
                

            }
            <div css={s.paymentSelectLayout}>
            {
                
                (orderData?.orderStatus === "결제완료" && isPaymentCancel) && (
                    <>
                        <button onClick={handlePaymentCancelOnClick}>주문취소</button>
                    </>
                )
            }
            {
                (orderData?.orderStatus === "결제완료" && isPaymentConfirmation) && (
                <>
                    <button onClick={handleConfirmationOnClick}>구매확정</button>
                </>
                )
            }
            </div>
        </div>
    );
}

export default UserOrderLayout;