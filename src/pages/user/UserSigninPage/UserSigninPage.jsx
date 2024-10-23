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

function UserSigninPage(props) {
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
    };

    const signin = useMutation(
        async () => await instance.post("/auth/signin", inputUser),

        {
            onSuccess: (e) => {
                const accessToken = e.data.token;
                console.log(accessToken);
                
                localStorage.setItem("accessToken", accessToken);
                alert("로그인 성공");
            },
            // 응답받을 부분의 에러 부분은 백엔드에서 보내주는 형식이랑 맞춰줘야 함
            onError: (error) => {       
                console.error(error);
                
                showFieldErrorMessage(error.response.data)
                console.log("Error: " + error.response.data);
                
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
                        <img src="" alt="" />
                    </div>
                    <div css={s.loginInputBox}>
                        <div css={s.inputWrapper}>
                            <input type="text" 
                                name='username' 
                                onChange={handleLoginInputOnChange} 
                                value={inputUser.username}  
                                placeholder=' '
                            />
                            <label htmlFor="">아이디</label>
                            {fieldErrorMessages.username}
                        </div>
                        <div css={s.inputWrapper}>
                            <input type="password" 
                                name='password' 
                                onChange={handleLoginInputOnChange} 
                                onKeyDown={handleUserLoginSubmitKeyDown} 
                                value={inputUser.password} 
                                placeholder=' '
                            />
                            <label>비밀번호</label>
                            {fieldErrorMessages.password}
                        </div>
                        <a href='/user/find/pw'>비밀번호를 잊으셨나요?</a>
                        <button  onClick={handleUserLoginSubmitOnClick}>로그인</button>
                    </div>
                    <div css={s.OAuthBox}>
                        <a href='http://localhost:8080/oauth2/authorization/google'><FcGoogle /></a>
                        <a href='http://localhost:8080/oauth2/authorization/kakao'><RiKakaoTalkFill /></a>
                        <a href='http://localhost:8080/oauth2/authorization/naver'><SiNaver /></a>
                    </div>
                    <a href='/auth/signup'>아직 계정이 없으신가요?</a>
                </div>
            </body>
        </>
    );
}

export default UserSigninPage;