import PortOne from '@portone/browser-sdk/v2';
import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

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

    const handleOnClick = () => {
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
            <button css={s.orderButton} onClick={handleOnClick}>결제</button>    

    );
}

export default PortOneOrderPage;