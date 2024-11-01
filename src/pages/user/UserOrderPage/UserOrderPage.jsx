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

function UserOrderPage(props) {
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
            const arr = Array.from(orderProductList);
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

    const handleInputOnChange = (e) => {
        setOrderList(order => ({
            ...order,
            [e.target.name]: e.target.value
        }));
    }
    
    const handlePaymentOnClick = (paymentId) => {
        setOrderList(order => ({
            ...order,
            paymentId
        }));
    }

    return (
        <UserBackgoundLayout>
            <div css={s.layout}>
                <p>주문하기</p>    
                <div css={s.productLayout}>
                    <div css={s.titleLayout}>
                        <p>주문상품</p>
                        <p>3건</p>
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
                        <input type="text" name="orderName" onChange={handleInputOnChange}/>
                    </div>
                    <div css={s.inputBox}>
                        <p>전화번호</p>
                        <input type="text" name="orderPhone" onChange={handleInputOnChange}/>
                    </div>
                    <div css={s.addressInputBox}>
                        <p>주소</p>
                        <div>
                            <input type="text" name="orderZipcode" placeholder='우편번호'onChange={handleInputOnChange}/>
                            <button>주소검색</button>
                        </div>
                        <input type="text" name="orderAddressDefault" placeholder='기본주소' onChange={handleInputOnChange}/>
                        <input type="text" name="orderAddressDetail" placeholder='상세주소' onChange={handleInputOnChange}/>
                    </div>
                    <div css={s.inputBox}>
                        <p>요청사항</p>
                        <input type="text" name='request' onChange={handleInputOnChange}/>
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
                        <input type="radio" id="1" name="payment" value="카드결제"/>
                        <button checked={orderList.paymentId} onClick={handlePaymentOnClick}>카드결제</button>
                        <button>실시간 계좌이체</button>
                        <button>휴대폰 결제</button>
                        <button>무통장입금</button>
                        <button>카카오페이(간편결제)</button>
                    </div>
                </div>
                <button css={s.orderButton}>13,000원 결제하기</button>
            </div>
        </UserBackgoundLayout>
    );
}

export default UserOrderPage;