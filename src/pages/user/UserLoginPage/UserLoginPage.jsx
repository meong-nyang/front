import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import MainHeader from '../../../components/MainHeader/MainHeader';

function UserLoginPage(props) {
    return (
        <>
            <MainHeader />
            <body css={s.layout}>
                <h1>로그인</h1>
                <p>멍멍냥냥에 오신 것을 환영합니다.</p>
                <div css={s.loginBox}>
                    <div css={s.logoBox}>
                        로고
                    </div>
                    <input type="text" />
                    <input type="password" />
                    <a href='/user/find'>비밀번호를 잊으셨나요?</a>
                    <button>로그인</button>
                    <p>SNS로 시작하기</p>
                    <div>
                        구글 / 카카오 / 네이버
                    </div>
                    <a href='/user/join'>아직 계정이 없으신가요?</a>
                </div>
            </body>
        </>
    );
}

export default UserLoginPage;