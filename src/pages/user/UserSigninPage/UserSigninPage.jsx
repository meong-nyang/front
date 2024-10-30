import React, { useState } from 'react';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import logoImg from "../../../assets/images/logo.png";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { GrGoogle } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { instance } from '../../../apis/util/instance';

function UserSigninPage(props) {
    const navigate = useNavigate();

    const [ loginData, setLoginData ] = useState({
        username: "",
        password: ""
    });

    const loginMutation = useMutation(
        async () => await instance.post("/auth/signin", loginData),
        {
            onSuccess: response => {
                localStorage.setItem("accessToken", "Bearer " + response.data.accessToken);
                instance.interceptors.request.use(config => {
                    config.headers["Authorization"] = localStorage.getItem("accessToken");
                    return config;
                });    
                navigate("/"); 
            },
            onError: error => console.error(error)
        }
    );

    const handleInputOnChaange = (e) => {
        setLoginData(data => ({
            ...data,
            [e.target.name]: e.target.value
        }))
    };

    const handleSigninButtonOnClick = () => {
        loginMutation.mutateAsync();
    };

    const handleSignupButtonOnClick = () => {
        navigate("/user/signup");
    };

    return (
        <UserBackgoundLayout>
            <UserHeaderLayout />
            <div css={s.layout}>
                <div css={s.signinContainer}>
                    <div>
                        <img src={logoImg} />
                        <div css={s.linkBox}>
                            <a href="http://localhost:8080/oauth2/authorization/google"><GrGoogle /></a>
                            <a href="http://localhost:8080/oauth2/authorization/kakao"><RiKakaoTalkFill /></a>
                            <a href="http://localhost:8080/oauth2/authorization/naver"><SiNaver /></a>
                        </div>
                    </div>
                    <div css={s.back}>
                        <div css={s.signinBox}>
                        <p>로그인</p>
                            <div css={s.inputBox}>
                                <p>아이디</p>
                                <input name='username' type="text" placeholder='아이디를 입력하세요' 
                                    value={loginData.username}
                                    onChange={handleInputOnChaange}/>
                                <p>비밀번호</p>
                                <input name='password' type="password" placeholder='비밀번호를 입력하세요' 
                                    value={loginData.password}
                                    onChange={handleInputOnChaange}/>
                                <div>
                                    <p>비밀번호를 잊었나요?</p>
                                </div>
                                <button onClick={handleSigninButtonOnClick}>로그인</button>
                                <button onClick={handleSignupButtonOnClick}>회원가입</button>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
        </UserBackgoundLayout>
    );
}

export default UserSigninPage;