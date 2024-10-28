import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

function UserOrderContent(props) {
    return (
        <div css={s.layout}>
            <div css={s.productLayout}>
                <img src="" />
                <div>
                    <p>상품이름</p>
                    <p>[옵션]</p>
                </div>
            </div>
            <p>1</p>
            <p>7500</p>
        </div>
    );
}

export default UserOrderContent;