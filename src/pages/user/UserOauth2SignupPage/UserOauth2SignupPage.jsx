import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';

function UserOauth2SignupPage(props) {
    return (
        <UserBackgoundLayout>
            <UserHeaderLayout />
            <div css={s.layout}>
                <div css={s.titleLayout}>
                    <p>회원가입</p>
                    <p>SNS 가입을 위한 추가정보를 입력해주세요</p>
                </div>
                <div css={s.signuplayout}>
                    <p>회원가입</p>
                    <div css={s.inputBox}>
                        <p>이름</p>
                        <input type="text" placeholder='아이디를 입력하세요'/>
                    </div>

                    <div css={s.inputBox}>
                        <p>전화번호</p>
                        <input type="text" placeholder='비밀번호를 입력하세요'/>
                    </div>
                    <button>가입하기</button>
                </div>
            </div>
        </UserBackgoundLayout>
    );
}

export default UserOauth2SignupPage;