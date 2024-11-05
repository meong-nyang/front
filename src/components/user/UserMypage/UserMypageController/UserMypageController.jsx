import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { MYPAGE_OPTION_LIST } from '../../../../constants/SelectOption';
import { useNavigate } from 'react-router-dom';

function UserMypageController({ selectOption, setSelectOption }) {
    const navigate = useNavigate();
    const handleOptionClick = (address) => {
        navigate(`/user/${address}`);
        setSelectOption(address);
    }

    return (
        <div css={s.layout}>
           {
                MYPAGE_OPTION_LIST.map((option,index) => (
                    <div key={index} 
                        css={selectOption === option.address ? s.listSelectLayout : s.listLayout} 
                        onClick={() =>handleOptionClick(option.address)}>
                        {option.icon}
                        <p>{option.title}</p>
                    </div>
                ))
           }
        </div>
    );
}

export default UserMypageController;