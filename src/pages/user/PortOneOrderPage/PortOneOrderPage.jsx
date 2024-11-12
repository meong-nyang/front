import PortOne from '@portone/browser-sdk/v2';
import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { instance } from '../../../apis/util/instance';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { orderProuctListAtom } from '../../../atoms/orderAtom';

function PortOneOrderPage({portEtcData}) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const userInfo = queryClient.getQueryData("userInfoQuery");
    const [ orderProductList, setOrderProductList ] = useRecoilState(orderProuctListAtom);
    console.log(portEtcData);
    console.log(orderProductList);

    //order_tb에 저장할 데이터
    const [ orderData, setOrderData ] = useState({
        userId: userInfo?.data?.id,
        products: [],
        totalPrice: 0,
        orderItemCount: 0,
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

    //포트원 결제에 필요한 데이터
    const portoneData = {
        storeId: "store-a497dea2-bbec-4135-8fb2-c2283879a5b9", 
        customer: {},
        orderType: 0,  
        paymentId: "payment", 
        orderName: "mn", 
        totalAmount: 1000,         // orderProductList안에든 priceTotal더하기 
        currency: 'CURRENCY_KRW',
        locale: 'KO_KR',
        channelKey: portEtcData.paymentChannelKey,
        payMethod: "",
        products: [],
    };

    useEffect(() => {
        if (portEtcData) {
            setOrderData({
                userId: userInfo?.data?.id,
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

    const currentStockCheck = useQuery(
        ["currentStockCheckQuery"],
        async () => {
            const arr = Array.from(orderProductList?.map(product => product.productId));
            let str = "productIds=";
            for (let i of arr) {
                str += i + ","
            }
            str = str.slice(0, str.length - 1);
            return await instance.get(`/product/stock?${str}`)
        },
        {
            onSuccess: response => console.log(response)
        }
    );

    const registerOrderMutaion = useMutation(
        async (registerOrderData) => await instance.post("/order", registerOrderData), 
        {
            onSuccess: response => console.log(response), //결제완료창 띄우기
            onError: error => console.log(error)
        }
    );

    const cartItemDeleteMutation = useMutation(
        async (deleteIds) => {
            const arr = Array.from(deleteIds);
            let str = "cartIds=";
            for (let i of arr) {
                str += i + ","
            }
            str = str.slice(0, str.length - 1);
            return await instance.delete(`/user/cart?userId=${userInfo?.data?.id}&${str}`)
        },
        {
            onSuccess: response => console.log(response),
            onError: error => console.error(error)
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

    const buyCheck = () => {
         return orderProductList?.map(product => {
            const stock = currentStockCheck?.data?.data?.currentStocks.filter(stock => 
                stock.productId === parseInt(product.productId))[0];
            if(stock?.currentStock >= product.productCount) {
                return true;
            }
            return false;
        });
    }

    const handlePaymentButtonOnClick = () => {
        //재고 확인
        if(buyCheck().includes(false)) {
            Swal.fire({
                icon:"error",
                text: "주문할 수 없는 상품이 있습니다.",
                timer: 1500,
                confirmButtonColor: "#9d6c4c",
                confirmButtonText: "닫기",
            });
            return;
        }
        //주문 정보 확인
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
                userId: userInfo?.data?.id,
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
                console.log(registerOrderData);

                registerOrderMutaion.mutateAsync(registerOrderData).then(() => {
                    if(!!orderProductList[0].cartId) {
                        cartItemDeleteMutation.mutate(orderProductList?.map(orderProduct => orderProduct.cartId))           
                    }
                }
                );

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