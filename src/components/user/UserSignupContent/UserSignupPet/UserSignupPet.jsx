import React from 'react';
import UserSignupLayout from '../UserSignupLayout/UserSignupLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { MdArrowBackIos } from "react-icons/md";

function UserSignupPet(props) {
    return (
        <UserSignupLayout title="반려동물 정보"> 
            <div css={s.inputBox}>
                <p>반려동물 이름</p>
                <input type="text" placeholder='아이디를 입력하세요'/>
            </div>
            <div css={s.inputBox}>
                <p>반려동물 나이</p>
                <input type="text" placeholder='아이디를 입력하세요'/>
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
                <p><MdArrowBackIos />이전</p>
            </div>
        
        </UserSignupLayout>
    );
}

export default UserSignupPet;