/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import * as s from "./style";
import UserOrderContent from '../../../components/user/UserOrderContent/UserOrderContent';
import { useRecoilState } from 'recoil';
import { orderProuctListAtom } from '../../../atoms/orderAtom';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../../apis/util/instance';
import { useNavigate } from 'react-router-dom';
import PortOneOrderPage from '../PortOneOrderPage/PortOneOrderPage';
import UserMainLayout from '../../../components/user/UserMainLayout/UserMainLayout';

function UserOrderPage(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const userInfo = queryClient.getQueryData("userInfoQuery");
    console.log(userInfo?.data?.id);
    //장바구니나 상세페이지에서 넘어온 상품 리스트
    const [ orderProductList, setOrderProductList ] = useRecoilState(orderProuctListAtom);
    console.log(orderProductList);
    //주문페이지로 전달할 상품리스트 + 주문정보
    const [ orderData, setOrderData ] = useState({
        userId: userInfo?.data?.id,
        products: [],
        orderName: "",
        orderPhone: "",
        orderEmail: "",
        orderZipcode: "",
        orderAddressDefault: "",
        orderAddressDetail: "",
        request: "",
        paymentMethod: "",
        paymentChannelKey: ""
    });
    console.log(orderData);

    useEffect(() => {
        // 다음 주소 검색 API 스크립트를 동적으로 로드
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
        
        return () => {
            // 컴포넌트가 언마운트될 때 스크립트 제거
            document.body.removeChild(script);
        };
    }, []);

    const checkProductList = useQuery(
        ["checkProductListQuery"],
        async () => {
            const arr = Array.from(orderProductList.map(order => order.productId));
            let str = "productIds=";
            for (let i of arr) {
                str += i + ","
            }
            str = str.slice(0, str.length - 1);
            return await instance.get(`/user/check/product?${str}`)
        },
        {
            onSuccess: response => {
                console.log(response);
                setOrderData(order => ({
                    ...order,
                    products: response?.data?.checkProducts.map(product => ({
                        id: product.productId,
                        name: product.productName,
                        count: orderProductList
                        .filter(orderProduct => product.productId === parseInt(orderProduct.productId))[0].productCount,
                        amount: orderProductList
                        .filter(orderProduct => product.productId === parseInt(orderProduct.productId))[0].productTotal
                    }))
                }))
            },
            onError: error => console.log(error)
        }
    );

    const paymentList = useQuery(
        ["paymentListQuery"],
        async () => await instance.get("/order/payment"),
        {
            onSuccess: response => console.log(response),
            onError: error => console.log(error)
        }
    );

    const handleInputOnChange = (e) => {
        setOrderData(order => ({
            ...order,
            [e.target.name]: e.target.value
        }));
    };

    const handlePaymentOnChange = (method, channelKey) => {
        setOrderData(order => ({
            ...order,
            paymentMethod: method,
            paymentChannelKey: channelKey
        }));
    };

    const addHyphenToPhoneNumber = (phoneNumber) => {
        const numbers = phoneNumber.replace(/[^0-9]/g, "").slice(0,11)
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        return numbers;
    };

    const handleSearchAddress = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                let fullAddress = data.address;
                setOrderData(orderData => ({
                    ...orderData,
                    orderZipcode: data.zonecode,
                    orderAddressDefault: data.address,
                }));
            },
        }).open();
    };

    return (
        <UserMainLayout>
            <div css={s.layout}>
                <p>주문하기</p>    
                <div css={s.productLayout}>
                    <div css={s.titleLayout}>
                        <p>주문상품</p>
                        <p>총 {checkProductList?.data?.data?.productsCount} 개</p>
                    </div>
                    <div css={s.categoryLayout}>
                        <p>상품명/옵션</p>
                        <p>수량</p>
                        <p>결제금액</p>
                    </div>
                    {
                        checkProductList?.data?.data?.checkProducts.map(product => 
                            <UserOrderContent productInfo={product} count={orderProductList
                                .filter(orderProduct => product.productId === parseInt(orderProduct.productId))[0].productCount}/>
                        )
                    }
                </div>

                <div css={s.infoLayout}>
                    <div>
                        <p>주문정보</p>
                        <p>(*은 필수정보입니다.)</p>
                    </div>
                    <div css={s.inputBox}>
                        <div>
                            <p>받는사람</p>
                            <p>*</p>
                        </div>
                        <input type="text" name="orderName" onChange={handleInputOnChange} value={orderData.orderName} />
                    </div>
                    <div css={s.inputBox}>
                        <div>
                            <p>전화번호</p>
                            <p>*</p>
                        </div>
                        <input type="text" name="orderPhone" onChange={handleInputOnChange} value={addHyphenToPhoneNumber(orderData.orderPhone)} />
                    </div>
                    <div css={s.inputBox}>
                        <div>
                            <p>이메일</p>
                            <p>*</p>
                        </div>
                        <input type="text" name="orderEmail" onChange={handleInputOnChange} value={orderData.orderEmail} />
                    </div>
                    <div css={s.addressInputBox}>
                        <div>
                            <p>주소</p>
                            <p>*</p>
                        </div>
                        <div>
                            <input type="text" name="orderZipcode" placeholder='우편번호'onChange={handleInputOnChange} value={orderData.orderZipcode} disabled='true'/>
                            <button onClick={handleSearchAddress}>주소검색</button>
                        </div>
                        <input type="text" name="orderAddressDefault" placeholder='기본주소' onChange={handleInputOnChange} value={orderData.orderAddressDefault} disabled='true'/>
                        <input type="text" name="orderAddressDetail" placeholder='상세주소' onChange={handleInputOnChange} value={orderData.orderAddressDetail} />
                    </div>
                    <div css={s.inputBox}>
                        <div>
                            <p>요청사항</p>
                            <p></p>
                        </div>
                        <input type="text" name='request' onChange={handleInputOnChange}  value={orderData.request} />
                    </div>
                </div>
                <div css={s.infoLayout}>
                    <p>결제정보</p>
                    <div css={s.priceLayout}>
                        <div>
                            <p>총 주문금액</p>
                            <p>10,000원</p>
                        </div>
                        <div>
                            <p>배송비</p>
                            <p>3,000원</p>
                        </div>
                    </div>
                    <div css={s.totalPriceLayout}>
                        <p>결제예정금액</p>
                        <p>13,000원</p>
                    </div>
                    <div css={s.paymentMethodLayout}>
                        <p>결제수단</p>
                        <p>(결제수단은 필수옵션입니다.)</p>
                    </div>
                    <div css={s.paymentLayout}>
                        {
                            paymentList?.data?.data.map(payment => 
                                <>
                                    <input type="radio" id={payment.id} name="payment" onChange={() => handlePaymentOnChange(payment.paymentMethod ,payment.paymentChannelKey)} value={payment.paymentMethod}/>
                                    <label htmlFor={payment.id} >{payment.paymentName}</label>
                                </>
                            )
                        }
                    </div>
                </div>
                <PortOneOrderPage portEtcData={orderData}/>
            </div>
        </UserMainLayout>
    );
}

export default UserOrderPage;