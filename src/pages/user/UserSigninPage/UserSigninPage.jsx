import React, { useState } from 'react';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
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
    const [ fieldErrorMessages, setFieldErrorMessages ] = useState({
        username: <></>,
        password: <></>
    });
    const [ signinData, setSigninData ] = useState({
        username: "",
        password: ""
    });


    const loginMutation = useMutation(
        async () => await instance.post("/auth/signin", signinData),
        {
            onSuccess: response => {
                localStorage.setItem("accessToken", "Bearer " + response.data.accessToken);
                instance.interceptors.request.use(config => {
                    config.headers["Authorization"] = localStorage.getItem("accessToken");
                    return config;
                });    
                navigate("/"); 
            },
            onError: error => {
                console.log(error.response.data);
                showFieldErrorMessage(error.response.data);
                alert("아이디와 비밀번호를 정확히 입력해 주세요");
            }
        }
    );

    const handleInputOnChaange = (e) => {
        setSigninData(data => ({
            ...data,
            [e.target.name]: e.target.value
        }))
    };

    const handleSigninButtonOnClick = () => {
        loginMutation.mutateAsync().catch(() => {});
    };

    const handleSignupButtonOnClick = () => {
        navigate("/user/signup");
    };

    const showFieldErrorMessage = (fieldErrors) => {
        let emptyFieldErrors = {
            username: <></>,
            password: <></>,
        };

        for (let fieldError of fieldErrors) {
            emptyFieldErrors = {
                ...emptyFieldErrors,
                [fieldError.field]: <>{fieldError.defaultMessage}</>
            }
        }
        setFieldErrorMessages(emptyFieldErrors);
    };

    return (
        <UserBackgoundLayout>
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
                                <div css={s.userInfoTag}>
                                    <p>아이디</p > 
                                    <p>{fieldErrorMessages.username}</p> 
                                </div>
                                <input name='username' type="text" placeholder='아이디를 입력하세요' 
                                    value={signinData.username}
                                    onChange={handleInputOnChaange}/>
                                <div css={s.userInfoTag}>
                                    <p>비밀번호</p > 
                                    <p>{fieldErrorMessages.password}</p> 
                                </div>
                                <input name='password' type="password" placeholder='비밀번호를 입력하세요' 
                                    value={signinData.password}
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