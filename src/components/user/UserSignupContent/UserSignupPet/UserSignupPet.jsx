import React, { useState } from 'react';
import UserSignupLayout from '../UserSignupLayout/UserSignupLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { MdArrowBackIos } from "react-icons/md";

function UserSignupPet({ order, setOrder, userSignupFormData, setUserSignupFormData, fieldErrorMessages }) {
    const [ selectOption, setSelectOption] = useState(null);

    const handleUserSignupDataChange = (e) => {
        setUserSignupFormData(userSignupFormData => ({
            ...userSignupFormData,
            [e.target.name]: e.target.value
        }))
    };

    const handlePreOnClick = () =>{
        setOrder(order => order - 1);
    };
    
    const handleSelectChange = (option) => {
        setSelectOption(option); // 선택한 값을 상태에 저장
    };

    const handleRadioOnChange = (e) => {
        setUserSignupFormData(data => ({
            ...data,
            petType: e.target.value
        }))
        console.log(userSignupFormData)
    };
        
    return (
        <UserSignupLayout title="반려동물 정보"> 
            <div css={s.inputBox}>
                <p>반려동물 이름</p>
                <input 
                    type="text" 
                    name="petName"
                    onChange={handleUserSignupDataChange}
                    value={userSignupFormData.petName}
                    placeholder="반려동물의 이름을 입력하세요"
                />
            </div>
            <div css={s.inputBox}>
                <p>반려동물 나이</p>
                <input 
                    type="number" 
                    name="petAge"
                    onChange={handleUserSignupDataChange}
                    value={userSignupFormData.petAge}
                    placeholder="나이를 입력하세요"
                />
            </div>
            <div css={s.inputBox}>
                <p>반려동물 종류</p>
                <div css={s.typeBox}>
                    <input type='radio' id='dog' name='type' onChange={handleRadioOnChange} value="강아지"/>
                    <label htmlFor='dog'>강아지</label>
                    <input type='radio' id='cat' name='type' onChange={handleRadioOnChange} value="고양이"/>
                    <label htmlFor='cat'>고양이</label>
                </div>
            </div>
            {/* <div css={s.buttonLayout}>
                <button >회원가입</button>
            </div> */}
            <div css={s.locationBox}>
                <p onClick={handlePreOnClick}><MdArrowBackIos />이전</p>
            </div>
        
        </UserSignupLayout>
    );
}

export default UserSignupPet;