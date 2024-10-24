import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { MdArrowForwardIos } from "react-icons/md";
import UserSignupLayout from '../UserSignupLayout/UserSignupLayout';

function UserSignupInfo() {
    return (
        <UserSignupLayout title="회원정보">
            <div css={s.inputBox}>
                <p>아이디</p>
                <input type="text" placeholder='아이디를 입력하세요'/>
            </div>
            <div css={s.inputBox}>
                <p>비밀번호</p>
                <input type="text" placeholder='비밀번호를 입력하세요'/>
            </div>
            <div css={s.inputBox}>
                <p>비밀번호 확인</p>
                <input type="text" placeholder='비밀번호를 확인해주세요'/>
            </div>
            <div css={s.inputBox}>
                <p>이름</p>
                <input type="text" placeholder='이름을 입력하세요'/>
            </div>
            <div css={s.inputBox}>
                <p>전화번호</p>
                <input type="text" placeholder='전화번호를 입력하세요'/>
            </div>
            <div css={s.locationBox}>
                <p>다음<MdArrowForwardIos /></p>
            </div>
            
        </UserSignupLayout>
      
    );
}

export default UserSignupInfo;