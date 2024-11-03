import React, { useState } from 'react';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserOrderContent from '../../../components/user/UserOrderContent/UserOrderContent';
import { useRecoilState } from 'recoil';
import { orderProuctListAtom } from '../../../atoms/orderAtom';
import { useQuery } from 'react-query';
import { instance } from '../../../apis/util/instance';
import { useNavigate } from 'react-router-dom';

function UserOrderPage(props) {
    const navigate = useNavigate();
    const [ orderProductList, setOrderProductList ] = useRecoilState(orderProuctListAtom);
    const [ orderList, setOrderList ] = useState({
        products: [{
            id: 0,
            count: 0
        }],
        orderName: "",
        orderPhone: "",
        orderZipcode: "",
        orderAddressDefault: "",
        orderAddressDetail: "",
        request: "",
        paymentId: 0
    });

    const checkProductList = useQuery(
        ["checkProductListQuery"],
        async () => {
            const arr = Array.from(orderProductList.map(order => order.productId));
            console.log(arr);
            let str = "productIds=";
            for (let i of arr) {
                str += i + ","
            }
            str = str.slice(0, str.length - 1);
            return await instance.get(`/user/check/product?${str}`)
        },
        {
            onSuccess: response => console.log(response),
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
        setOrderList(order => ({
            ...order,
            [e.target.name]: e.target.value
        }));
    };

    const addHyphenToPhoneNumber = (phoneNumber) => {
        const numbers = phoneNumber.replace(/[^0-9]/g, "").slice(0,11)
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        return numbers;
    };

    const handleOrderOnClick = () => {
        navigate("/order")
    }

    return (
        <UserBackgoundLayout>
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
                            <UserOrderContent productInfo={product}/>
                        )
                    }
                </div>

                <div css={s.infoLayout}>
                    <p>배송정보</p>
                    <div css={s.inputBox}>
                        <p>받는사람</p>
                        <input type="text" name="orderName" onChange={handleInputOnChange} value={orderList.orderName} />
                    </div>
                    <div css={s.inputBox}>
                        <p>전화번호</p>
                        <input type="text" name="orderPhone" onChange={handleInputOnChange} value={addHyphenToPhoneNumber(orderList.orderPhone)} />
                    </div>
                    <div css={s.addressInputBox}>
                        <p>주소</p>
                        <div>
                            <input type="text" name="orderZipcode" placeholder='우편번호'onChange={handleInputOnChange} value={orderList.orderZipcode} />
                            <button>주소검색</button>
                        </div>
                        <input type="text" name="orderAddressDefault" placeholder='기본주소' onChange={handleInputOnChange} value={orderList.orderAddressDefault} />
                        <input type="text" name="orderAddressDetail" placeholder='상세주소' onChange={handleInputOnChange} value={orderList.orderAddressDetail} />
                    </div>
                    <div css={s.inputBox}>
                        <p>요청사항</p>
                        <input type="text" name='request' onChange={handleInputOnChange}  value={orderList.request} />
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
                    <p css={s.paymentMethod}>결제수단</p>
                    <div css={s.paymentLayout}>
                        {
                            paymentList?.data?.data.map(payment => 
                                <>
                                    <input type="radio" id={payment.id} name="payment" onChange={handleInputOnChange} value={payment.id}/>
                                    <label htmlFor={payment.id} >{payment.paymentName}</label>
                                </>
                            )
                        }
                    </div>
                </div>
                <button css={s.orderButton} onClick={handleOrderOnClick}>13,000원 결제하기</button>
            </div>
        </UserBackgoundLayout>
    );
}

export default UserOrderPage;