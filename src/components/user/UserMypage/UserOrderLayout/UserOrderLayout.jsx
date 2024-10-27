import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

function UserOrderLayout(props) {
    return (
        <div css={s.layout}>
            <div css={s.headerLayout}>
                <div>
                    <p>주문일자</p>
                    <p>2024-12-10</p>
                </div>
                <p>총 3건</p>
            </div>

            <div css={s.titleLayout}>
                <p>상품명/옵션</p>
                <p>수량</p>
                <p>결제금액</p>
                <p>배송상태</p>
            </div>
            <div css={s.contentLayout}>
                <div css={s.productLayout}>
                    <img src="" />
                    <div>
                        <p>상품이름</p>
                        <p>옵션</p>
                    </div>
                </div>
                <div>
                    <p>상품이름</p>
                    <p>옵션</p>
                </div>
                <div>
                    <p></p>
                    <p></p>
                </div>
                <div>
                    <p></p>
                    <p></p>
                </div>
            </div>
        </div>
    );
}

export default UserOrderLayout;