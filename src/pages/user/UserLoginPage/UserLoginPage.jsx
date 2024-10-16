import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import MainHeader from '../../../components/user/MainHeader/MainHeader';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../../apis/util/instance';

function UserLoginPage(props) {
    const navigate = useNavigate();
    const [ authState, setAuthState ] = useState(1);

    const [ username, usernameChange ] = useState();
    const [ password, passwordChange ] = useState();

    const [ inputUser, setInputUser ] = useState({
        username: "",
        password: ""
    })

    const [ userOAuthData, setUserOAuthData ] = useState({
        username: "",
        name: "",
        phone: "",
        provider: "",
    });

    const [ fieldErrorMessages, setFieldErrorMessages ] = useState({
        username: <></>,
        password: <></>,
    });

    const showFieldErrorMessage = (fieldErrors) => {
        let emptyFieldErrors = {
            username: <></>,
            password: <></>,
        }

        for (let fieldError of fieldErrors) {
            emptyFieldErrors = {
                ...emptyFieldErrors,
                [fieldError.field]: <p>{fieldError.defaultMessage}</p>
            }
        }
    }

    const signin = useMutation(
        async () => await instance.post("/login", inputUser),

        {
            onSuccess: (data) => {
                const { accessToken } = data;
                if (accessToken) {
                    localStorage.setItem("accessToken", accessToken);
                    alert("로그인 성공");
                } else {
                    alert("사용자 정보를 확인해 주세요.");
                }
            },
            onError: (error) => {
                console.error('로그인 실패', error);
                alert("로그인에 실패했습니다");
            }
        },
        

    );

    const handleLoginInputOnChange = (e) => {
        setInputUser(inputUser => ({
            ...inputUser,
            [e.target.name]: e.target.value
        }));
    };

    const handleUserLoginSubmitOnClick = () => {
        signin.mutateAsync();
    };

    const handleUserLoginSubmitKeyDown = (e) => {
        if (e.keyCode === 13) {
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
                            <input type="text" name='username' onChange={handleLoginInputOnChange} value={inputUser.username}  placeholder=' '/>
                            <label htmlFor="">아이디</label>
                        </div>
                        <div css={s.inputWrapper}>
                            <input type="password" name='password' onChange={handleLoginInputOnChange} onKeyDown={handleUserLoginSubmitKeyDown} value={inputUser.password} placeholder=' '/>
                            <label>비밀번호</label>
                        </div>
                        <a href='/user/find/pw'>비밀번호를 잊으셨나요?</a>
                        <button  onClick={handleUserLoginSubmitOnClick}>로그인</button>
                    </div>
                    <div css={s.OAuthBox}>
                        <a href='http://localhost:8080/oauth2/authorization/google'><FcGoogle /></a>
                        <a href='http://localhost:8080/oauth2/authorization/kakao'><RiKakaoTalkFill /></a>
                        <a href='http://localhost:8080/oauth2/authorization/naver'><SiNaver /></a>
                    </div>
                    <a href='/user/join'>아직 계정이 없으신가요?</a>
                </div>
            </body>
        </>
    );
}

export default UserLoginPage;