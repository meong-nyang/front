import PortOne from '@portone/browser-sdk/v2';
import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import Swal from "sweetalert2";
import { productLayout } from '../UserOrderPage/style';

function PortOneOrderPage({portEtcData}) {
    console.log(portEtcData);
    const [ orderData, setOrderData ] = useState({
        userId: 0,
        totalPrice: 10000,
        orderItemCount: 0,
        // orderStatus: "",
        orderName: "",
        zipcode: "",
        addressDefault: "",
        addressDetail: "",
        phone: "",
        request: "",
        paymentId: "", //포트원에서 받아온 아이디
        paymentMethodId: 0
    });

    const portoneData = {
        storeId: "store-a497dea2-bbec-4135-8fb2-c2283879a5b9", 
        customer: {},           // 줘야해
        orderType: 0,           // 줘야해
        paymentId: "payment",          // 줘야해 
        orderName: "mn", 
        totalAmount: 1000,         // 줘야해
        currency: 'CURRENCY_KRW',
        locale: 'KO_KR',
        channelKey: portEtcData.paymentChannelKey,
        payMethod: 'MOBILE',
        products: [],             // 줘야해
    };

    const isEmpty = () => {
        console.log(portEtcData);
        if(!portEtcData.orderName | !portEtcData.orderPhone 
            | !portEtcData.orderZipcode | !portEtcData.orderAddressDefault 
            | !portEtcData.orderEmail) {
                Swal.fire({
                    icon:"error",
                    text: "주문정보를 확인하세요",
                    confirmButtonColor: "#9d6c4c",
                    confirmButtonText: "확인",
                });
                return true;
        }
        if (!portEtcData.paymentMethod | !portEtcData.paymentChannelKey) {
            Swal.fire({
                icon:"error",
                text: "결제방법을 선택하세요",
                confirmButtonColor: "#9d6c4c",
                confirmButtonText: "확인",
            });
            return true;
        }
        return false;
    }

    const handlePaymentButtonOnClick = () => {
        if (isEmpty()) {
            return; // 빈 값이 있으면 함수 종료
        }
        const requestData = {
            ...portoneData,
            paymentId: crypto.randomUUID(),
            channelKey: portEtcData.paymentChannelKey,
            payMethod: portEtcData.paymentMethod,
            customer: {
                userId: 2,
                fullName: portEtcData.orderName,
                phoneNumber: portEtcData.orderPhone,
                email: portEtcData.orderEmail,
            },
            products: portEtcData?.products?.map(product => ({
                id: product.id,
                name: product.name,
                amount: product.amount,
                quantity: product.count
            })),
            productType: "PRODUCT_TYPE_REAL",
        }
        console.log("!!!!", requestData);
        PortOne.requestPayment(requestData).then(response =>
            setOrderData(order => ({
                ...order,
                paymentId: response.paymentId
            }))
        );
    };

    return (
            <button css={s.orderButton} onClick={handlePaymentButtonOnClick}>결제</button>    

    );
}

export default PortOneOrderPage;