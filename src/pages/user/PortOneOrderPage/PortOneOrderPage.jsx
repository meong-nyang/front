import PortOne from '@portone/browser-sdk/v2';
import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import Swal from "sweetalert2";
import { productLayout } from '../UserOrderPage/style';
import { useMutation } from 'react-query';
import { instance } from '../../../apis/util/instance';
import { useNavigate } from 'react-router-dom';

function PortOneOrderPage({portEtcData}) {
    const navigate = useNavigate();
    console.log(portEtcData);
    //order_tb에 저장할 데이터
    const [ orderData, setOrderData ] = useState({
        userId: 0,
        products: [],
        totalPrice: 0,
        orderItemCount: 0,
        // orderStatus: "",
        orderName: "",
        zipcode: "",
        addressDefault: "",
        addressDetail: "",
        phone: "",
        email: "",
        request: "",
        paymentId: "", //포트원에서 받아온 아이디
        paymentMethod: ""
    });

console.log(orderData);
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
        payMethod: "",
        products: [],             // 줘야해
    };

    useEffect(() => {
        if (portEtcData) {
            setOrderData({
                userId: 0,
                products: portEtcData.products.map(product => ({
                    productId: product.id,
                    productCount: product.count
                })),
                totalPrice: portEtcData.products.reduce((sum, { amount }) => sum + amount, 0),
                orderItemCount: portEtcData.products.length,
                orderName: portEtcData.orderName,
                zipcode: portEtcData.orderZipcode,
                addressDefault: portEtcData.orderAddressDefault,
                addressDetail: portEtcData.orderAddressDetail,
                phone: portEtcData.orderPhone,
                email: portEtcData.orderEmail,
                request: portEtcData.request,
                paymentId: "", // 포트원에서 받아온 아이디
                paymentMethod: portEtcData.paymentMethod
            });
        }
    }, [portEtcData]);

    const registerOrderMutaion = useMutation(
        async (registerOrderData) => await instance.post("/order", registerOrderData), 
        {
            onSuccess: response => console.log(response), //결제완료창 띄우기
            onError: error => console.log(error)
        }
    );

    const isEmpty = () => {
        console.log(portEtcData);
        if(!portEtcData.orderName || !portEtcData.orderPhone 
            || !portEtcData.orderZipcode || !portEtcData.orderAddressDefault 
            || !portEtcData.orderEmail) {
                Swal.fire({
                    icon:"error",
                    text: "주문정보를 확인하세요",
                    timer: 1500,
                    confirmButtonColor: "#9d6c4c",
                    confirmButtonText: "확인",
                });
                return true;
        }
        if (!portEtcData.paymentMethod || !portEtcData.paymentChannelKey) {
            Swal.fire({
                icon:"error",
                text: "결제방법을 선택하세요",
                timer: 1500,
                confirmButtonColor: "#9d6c4c",
                confirmButtonText: "확인",
            });
            return true;
        }
        return false;
    }

    const handlePaymentButtonOnClick = () => {
        if (isEmpty()) {
            return; 
        }
        const requestData = {
            ...portoneData,
            paymentId: crypto.randomUUID(),
            channelKey: portEtcData.paymentChannelKey,
            payMethod: portEtcData.paymentMethod,
            // totalAmount: , 추가해야됨
            customer: {
                userId: 2,
                fullName: portEtcData.orderName,
                phoneNumber: portEtcData.orderPhone,
                email: portEtcData.orderEmail,
            },
            products: portEtcData?.products?.map(product => ({
                id: product.id.toString(),
                name: product.name,
                amount: product.amount,
                quantity: product.count
            })),
            productType: "PRODUCT_TYPE_REAL",
        }
        console.log("!!" + requestData);
        PortOne.requestPayment(requestData).then(response => {
            if(!response.code) { //성공했을 때
                //(추가)결제완료창 만들어서 넘기기
                setOrderData(order => ({
                    ...order,
                    paymentId: response.paymentId
                }));
                const registerOrderData = {
                    ...orderData,
                    paymentId: response.paymentId
                }
                // registerOrderMutaion.mutateAsync(registerOrderData);
                
                let timerInterval;
                Swal.fire({
                    title: "결제가 완료되었습니다!",
                    color: "#9d6c4c",
                    html: "<b>5</b>초 뒤 자동으로 홈화면으로 이동합니다!",
                    timer: 5000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    didOpen: () => {
                        const b = Swal.getHtmlContainer().querySelector('b');
                        timerInterval = setInterval(() => {
                            b.textContent = Math.ceil(Swal.getTimerLeft()/1000);
                        }, 1000)
                    },
                    willClose: () => {
                        clearInterval(timerInterval);  
                    }
                }).then(result => {
                    navigate("/");
                })
            }
        }
        ).catch(error => {
            Swal.fire({
                icon:"error",
                text: "결제에 실패했습니다.",
                timer: 1500,
                confirmButtonColor: "#9d6c4c",
                confirmButtonText: "확인"
            });
        });
    };

    return (
        <button css={s.orderButton} onClick={handlePaymentButtonOnClick}>결제</button>    
    );
}

export default PortOneOrderPage;