import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import MainHeader from '../../../components/user/MainHeader/MainHeader';
import { useMutation } from 'react-query';

function UserLoginPage(props) {
    const [ authState, setAuthState ] = useState(1);

    const [ username, usernameChange ] = useState();
    const [ password, passwordChange ] = useState();

    const [ inputUser, setInputUser ] = useState({
        username: "",
        password: ""
    })

    const authSigninMutation = useMutation({
        mutationKey: "authLoginMutation",
        onSuccess: response => {
            const accessToken = response.data;
            localStorage.setItem("AccessToken", accessToken);
            alert("..")
            window.location.replace("/");
        },
        onError: error => {
            alert(error.response.data);
        }
    });

    const handleUserLoginSubmitOnClick = () => {
        authSigninMutation.mutate({
            username,
            password
        })
    };

    const handleUserLoginSubmitKeyDown = (e) => {
        if (e.keyDown === 13) {
            handleUserLoginSubmitOnClick();
        }
    };

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
                    <div css={s.loginInputBox}>
                        <div css={s.inputWrapper}>
                            <input type="text" name={username} value={username} onChange={username} placeholder=' '/>
                            <label htmlFor="">아이디</label>
                        </div>
                        <div css={s.inputWrapper}>
                            <input type="password" name={password} value={password} placeholder=' '/>
                            <label>비밀번호</label>
                        </div>
                        <a href='/user/find/pw'>비밀번호를 잊으셨나요?</a>
                        <button onKeyDown={handleUserLoginSubmitKeyDown} onClick={handleUserLoginSubmitOnClick}>로그인</button>
                    </div>
                    <div css={s.OAuthButtonBox}>
                        <button><FcGoogle /></button>
                        <button><RiKakaoTalkFill /></button>
                        <button><SiNaver /></button>
                    </div>
                    <a href='/user/join'>아직 계정이 없으신가요?</a>
                </div>
            </body>
        </>
    );
}

export default UserLoginPage;