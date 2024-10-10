import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import MainHeader from '../../../components/user/MainHeader/MainHeader';

function UserLoginPage(props) {
    return (
        <>
            <body css={s.layout}>
                <MainHeader />
                <h1>로그인</h1>
                <p>멍멍냥냥에 오신 것을 환영합니다.</p>
                <div css={s.loginBox}>
                    <div css={s.logoBox}>
                        로고
                    </div>
                    <input type="text" />
                    <input type="password" />
                    <a href='/user/find/pw'>비밀번호를 잊으셨나요?</a>
                    <button>로그인</button>
                    <p>SNS로 시작하기</p>
                    <div css={s.OAuthButtonBox}>
                        <a>
                            <button><FcGoogle /></button>
                            <button><RiKakaoTalkFill /></button>
                            <button><SiNaver /></button>
                        </a>
                    </div>
                    <a href='/user/join'>아직 계정이 없으신가요?</a>
                </div>
            </body>
        </>
    );
}

export default UserLoginPage;