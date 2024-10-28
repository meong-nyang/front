import React, { useState } from 'react';
import UserSignupLayout from '../UserSignupLayout/UserSignupLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { MdArrowBackIos } from "react-icons/md";

function UserSignupPet({ order, setOrder }) {
    const [ selectOption, setSelectOption] = useState(null);
    const handlePreOnClick = () =>{
        setOrder(order => order - 1);
    }
    
    const handleSelectChange = (option) => {
        setSelectOption(option); // 선택한 값을 상태에 저장
    };
        
    return (
        <UserSignupLayout title="반려동물 정보"> 
            <div css={s.inputBox}>
                <p>반려동물 이름</p>
                <input type="text" placeholder='반려동물의 이름을 입력하세요'/>
            </div>
            <div css={s.inputBox}>
                <p>반려동물 나이</p>
                <input type="number" placeholder='나이를 입력하세요'/>
            </div>
            <div css={s.inputBox}>
                <p>반려동물 종류</p>
                <div css={s.typeBox}>
                    <input type='radio' id='dog' name='type'/>
                    <label htmlFor='dog'>강아지</label>
                    <input type='radio' id='cat' name='type'/>
                    <label htmlFor='cat'>고양이</label>
                </div>
            </div>
            <div css={s.locationBox}>
                <p onClick={handlePreOnClick}><MdArrowBackIos />이전</p>
            </div>
        
        </UserSignupLayout>
    );
}

export default UserSignupPet;