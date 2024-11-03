import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { MdArrowForwardIos } from "react-icons/md";
import UserSignupLayout from '../UserSignupLayout/UserSignupLayout';

function UserSignupInfo({ order, setOrder, userSignupFormData, setUserSignupFormData, fieldErrorMessages }) {

    // 핸드폰 번호 입력 시 하이픈 자동 생성
    const addHyphenToPhoneNumber = (phoneNumber) => {
        const numbers = phoneNumber.replace(/[^0-9]/g, "").slice(0,11)
            .replace(/^(\d{3})(\d{3,4})(\d{4})$/, `010-$2-$3`);
        return numbers;
    };

    const handleUserSignupDataChange = (e) => {
        const formattedValue = e.target.name === "phone"
            ? addHyphenToPhoneNumber(e.target.value)
            : e.target.value

            setUserSignupFormData(userSignupFormData => ({
            ...userSignupFormData,
            [e.target.name]: formattedValue
        }));
    };

    const handleNextOnClick = () => {
        setOrder(order => order + 1);
    };

    console.log(order);

    return (
        <UserSignupLayout title="회원정보">
            <div css={s.inputBox}>
                <div css={s.userInfoTag}>
                    <p>아이디</p > 
                    <p>{fieldErrorMessages.username}</p> 
                </div>
                <input type="text" 
                    name="username"
                    onChange={handleUserSignupDataChange}
                    value={userSignupFormData.username}
                    placeholder="아이디를 입력하세요"
                />
            </div>
            <div css={s.inputBox}>
                <div css={s.userInfoTag}>
                    <p>비밀번호</p > 
                    <p>{fieldErrorMessages.password}</p> 
                </div>
                <input type="password" 
                    name="password"
                    onChange={handleUserSignupDataChange}
                    value={userSignupFormData.password}
                    placeholder="비밀번호를 입력하세요"
                />
            </div>
            <div css={s.inputBox}>
                <div css={s.userInfoTag}>
                    <p>비밀번호 확인</p > 
                    <p>{fieldErrorMessages.checkPassword}</p> 
                </div>
                <input type="password" 
                    name="checkPassword"
                    onChange={handleUserSignupDataChange}
                    value={userSignupFormData.checkPassword}
                    placeholder="비밀번호를 확인해주세요"
                />
            </div>
            <div css={s.inputBox}>
                <div css={s.userInfoTag}>
                    <p>이름</p > 
                    <p>{fieldErrorMessages.name}</p> 
                </div>
                <input type="text" 
                    name="name"
                    onChange={handleUserSignupDataChange}
                    value={userSignupFormData.name}
                    placeholder="이름을 입력하세요"
                />
            </div>
            <div css={s.inputBox}>
                <div css={s.userInfoTag}>
                    <p>전화번호</p > 
                    <p>{fieldErrorMessages.phone}</p> 
                </div>
                <input type="text" 
                    name="phone"
                    onChange={handleUserSignupDataChange}
                    value={userSignupFormData.phone}
                    placeholder="하이픈( ' - ' ) 없이 전화번호를 입력하세요"
                />
               
            </div>
            <div css={s.locationBox}>
                <p onClick={handleNextOnClick}>다음<MdArrowForwardIos /></p>
            </div>
            
        </UserSignupLayout>
      
    );
}

export default UserSignupInfo;