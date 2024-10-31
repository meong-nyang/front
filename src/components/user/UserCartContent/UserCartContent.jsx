import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";
function UserCartContent(props) {
    return (
        <div css={s.contentLayout}>
                    <div css={s.checkboxStyle}>
                        <input type="checkbox" id='productSelect'/>
                        <label htmlFor="productSelect">✔</label>
                    </div>
                    <div css={s.productLayout}>
                        <img src="" />
                        <div>
                            <p>상품이름</p>
                            <p>[옵션]</p>
                        </div>
                    </div>
                    <p>1개</p>
                    <p>7,500원</p>
                    <div>
                        <RxCross2 />
                    </div>
                </div>
    );
}

export default UserCartContent;