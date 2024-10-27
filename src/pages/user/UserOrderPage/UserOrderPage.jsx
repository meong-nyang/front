import React from 'react';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserOrderContent from '../../../components/user/UserOrderContent/UserOrderContent';

function UserOrderPage(props) {
    return (
        <UserBackgoundLayout>
            <UserHeaderLayout />
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
                    <UserOrderContent />
                    <UserOrderContent />
                    <UserOrderContent />
                </div>

                <div css={s.infoLayout}>
                    <p>배송정보</p>
                    <div css={s.inputBox}>
                        <p>받는사람</p>
                        <input type="text" />
                    </div>
                    <div css={s.inputBox}>
                        <p>전화번호</p>
                        <input type="text" />
                    </div>
                    <div css={s.addressInputBox}>
                        <p>주소</p>
                        <div>
                            <input type="text" placeholder='우편번호'/>
                            <button>주소검색</button>
                        </div>
                        <input type="text" placeholder='기본주소'/>
                        <input type="text" placeholder='상세주소'/>
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
                        <div>
                            <button>카드결제</button>
                            <button>실시간 계좌이체</button>
                            <button>휴대폰 결제</button>
                        </div>
                        <div>
                            <button>무통장입금</button>
                            <button>카카오페이(간편결제)</button>
                        </div>
                    </div>
                </div>
                <button css={s.orderButton}>13,000원 결제하기</button>
            </div>
        </UserBackgoundLayout>
    );
}

export default UserOrderPage;