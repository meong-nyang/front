import React from 'react';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserCartContent from '../../../components/user/UserCartContent/UserCartContent';

function UserCartPage(props) {
    return (
        <UserBackgoundLayout>
            <UserHeaderLayout />
            <div css={s.layout}>
                <p>장바구니</p>
                <div css={s.selectLayout}>
                    <div>
                        <input type="checkbox" id='allSelect'/>
                        <label htmlFor="allSelect">전체선택</label>
                    </div>
                    <button>선택삭제</button>
                </div>
                <div css={s.titleLayout}>
                    <p>선택</p>
                    <p>상품명/옵션</p>
                    <p>수량</p>
                    <p>결제금액</p>
                    <p></p>
                </div>
                <UserCartContent />

                <div css={s.paymentLayout}>
                    <p>결제정보</p>
                    <div css={s.priceLayout}>
                        <div>
                            <p>총주문금액</p>
                            <p>7,500원</p>
                        </div>
                        <p>+</p>
                        <div>
                            <p>배송비</p>
                            <p>2,500원</p>
                        </div>
                        <p>=</p>
                        <div>
                            <p>결제 예정 금액</p>
                            <p>10,000원</p>
                        </div>
                    </div>
                </div>

                <div css={s.orderButtonLayout}>
                    <button>선택상품주문</button>
                    <button>전체상품주문</button>
                </div>

            </div>
        </UserBackgoundLayout>
    );
}

export default UserCartPage;