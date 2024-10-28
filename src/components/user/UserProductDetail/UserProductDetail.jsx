import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

function UserProductDetail(props) {
    return (
        <div css={s.layout}>
            <div css={s.imgLayout}>
                <img src="" alt="" />
            </div>
            <div css={s.contentLayout}>
                <p>상품명길어진다다다다다다ㅏ다다다다다다다다닫다다ㅏ닫다다</p>
                <p>상품설명</p>
                <p>45,000원</p>
            </div>
            <button>Add to Cart</button>
        </div>
    );
}

export default UserProductDetail;