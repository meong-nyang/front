import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { DELIVERY_STATUS_LIST } from '../../../../constants/SelectOption';
import UserOrderLayout from '../UserOrderLayout/UserOrderLayout';

function UserOrderDetail(props) {
    const [selected, setSelected] = useState("주문상태");
    const handleSelect = (e) => {
        setSelected(e.target.value);
      };
    return (
        <div css={s.layout}>
            <div css={s.optionLayout}>
                <select css={s.selectBoxStyle} value={selected} onChange={handleSelect}>
                {
                    DELIVERY_STATUS_LIST.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                    ))}
                </select>
                <div css={s.dateSelectLayout}>
                    <input type="date" />
                    <p>~</p>
                    <input type="date" />
                    <button>조회</button>
                </div>
            </div>
            <UserOrderLayout />
            <UserOrderLayout />
        </div>
    );
}

export default UserOrderDetail;