import React from 'react';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import logoImg from "../../../assets/images/logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaGoogle } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { GrGoogle } from "react-icons/gr";

function UserSigninPage(props) {
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
                                <input type="text" placeholder='아이디를 입력하세요'/>
                                <p>비밀번호</p>
                                <input type="password" placeholder='비밀번호를 입력하세요'/>
                                <div>
                                    <p>비밀번호를 잊었나요?</p>
                                </div>
                                <button>로그인</button>
                                <button>회원가입</button>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
        </UserBackgoundLayout>
    );
}

export default UserSigninPage;