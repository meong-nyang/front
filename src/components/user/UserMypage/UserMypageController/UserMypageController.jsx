import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { MYPAGE_OPTION_LIST } from '../../../../constants/SelectOption';

function UserMypageController({ selectOption, setSelectOption }) {

    const handleOptionClick = (index) => {
        console.log(index);
        setSelectOption(index)
    }

    return (
        <div css={s.layout}>
           {
                MYPAGE_OPTION_LIST.map((option,index) => (
                    <div key={index} 
                        css={selectOption === index ? s.listSelectLayout : s.listLayout} 
                        onClick={() =>handleOptionClick(index)}>
                        {option.icon}
                        <p>{option.title}</p>
                    </div>
                ))
           }
        </div>
    );
}

export default UserMypageController;