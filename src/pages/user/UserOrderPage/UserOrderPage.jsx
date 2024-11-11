/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import * as s from "./style";
import Swal from "sweetalert2";
import UserOrderContent from '../../../components/user/UserOrderContent/UserOrderContent';
import { useRecoilState } from 'recoil';
import { orderProuctListAtom } from '../../../atoms/orderAtom';
import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../../apis/util/instance';
import PortOneOrderPage from '../PortOneOrderPage/PortOneOrderPage';
import UserMainLayout from '../../../components/user/UserMainLayout/UserMainLayout';
import { IoIosArrowDown } from "react-icons/io";
import UserScrollLayout from '../../../components/user/UserScrollLayout/UserScrollLayout';
import { useNavigate } from 'react-router-dom';

function UserOrderPage(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const userInfo = queryClient.getQueryData("userInfoQuery");
    //장바구니나 상세페이지에서 넘어온 상품 리스트
    const [ orderProductList, setOrderProductList ] = useRecoilState(orderProuctListAtom);
    console.log(orderProductList);
    //기존 정보 사용하겠다(true) / 새로운 정보쓰겠다(false)
    const [ selectedOldInfo, setSelectedOldInfo ] = useState(false);
    const [ isProductShow, setProductShow ] = useState(true);
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

    useEffect(() => {
        if(userInfo === undefined) {
            Swal.fire({
                icon: "error",
                text: "접근권한이 없습니다.",
                timer: 1500,
                showConfirmButton: false
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/user/signin")
                }
            });
            navigate("/")
            return;
        }
    }, []);

    useEffect(() => {
        if(selectedOldInfo) {
            setOrderData(orderData => ({
                ...orderData,
                orderName: userInfoData?.data?.data?.name,
                orderPhone: userInfoData?.data?.data?.phone,
                orderZipcode: userInfoData?.data?.data?.zipcode,
                orderAddressDefault: userInfoData?.data?.data?.addressDefault,
                orderAddressDetail: userInfoData?.data?.data?.addressDetail
            }));
        } else {
            setOrderData(orderData => ({
                ...orderData,
                orderName: "",
                orderPhone: "",
                orderZipcode: "",
                orderAddressDefault: "",
                orderAddressDetail: ""
            }));
        }
    }, [selectedOldInfo]);
    
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
    
    const userInfoData = useQuery(
        ["orderUserInfoDataQuery"],
        async () => await instance.get(`/user/${userInfo?.data?.id}`),
        {
            enabled: !!userInfo?.data?.id,
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => console.log(response),
            onError: error => console.log(error)
        }
    );

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

    const handleSelectInfoOptionOnChange = () => {
        setSelectedOldInfo(select => !select);
    }

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
            <UserScrollLayout>
            <div css={s.layout}>
                <p>주문하기</p>    
                <div css={s.productLayout}>
                    <div css={s.titleLayout}>
                        <div>
                            <p>주문상품</p>
                            <p>총 {checkProductList?.data?.data?.productsCount} 개</p>
                        </div>
                        <p onClick={() => setProductShow(isShow => !isShow)}>{isProductShow ? "상품접기" : "상품보기"}<IoIosArrowDown /></p>
                    </div>
                    <div css={s.categoryLayout}>
                        <p>상품명/옵션</p>
                        <p>수량</p>
                        <p>결제금액</p>
                    </div>
                    {
                        isProductShow && 
                        checkProductList?.data?.data?.checkProducts.map(product =>   
                            <UserOrderContent productInfo={product} count={
                                orderProductList?.filter(orderProduct => product.productId === parseInt(orderProduct.productId))[0]?.productCount
                            }/>
                        )
                    }
                </div>
                <div css={s.inputLayout}>
                    <div css={s.infoLayout}>
                        <div css={s.orderInfoLayout}>
                            <div>
                                <p>주문정보</p>
                                <p>(*은 필수정보입니다.)</p>
                            </div>
                            <div css={s.checkBoxLayout}>
                                <input type="checkbox" id='oldInfo' checked={selectedOldInfo} onChange={handleSelectInfoOptionOnChange}/>
                                <label htmlFor="oldInfo" >✔</label>
                                <label htmlFor="oldInfo">회원정보와 동일</label>
                            </div>
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
                            <input type="text" name="orderEmail" placeholder='이메일형식으로 작성해주세요' onChange={handleInputOnChange} value={orderData.orderEmail} />
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
                            <input type="text" name='request' placeholder="요청사항을 작성해주세요" onChange={handleInputOnChange}  value={orderData.request} />
                        </div>
                    </div>
                    <div css={s.infoLayout2}>
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
                        <PortOneOrderPage portEtcData={orderData}/>
                    </div>
                </div>
            </div>
            </UserScrollLayout>
        </UserMainLayout>
    );
}

export default UserOrderPage;