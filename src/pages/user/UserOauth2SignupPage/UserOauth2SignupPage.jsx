import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { instance } from '../../../apis/util/instance';

function UserOauth2SignupPage(props) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const [ signupData, setSignupData ] = useState({
        username: searchParams.get("oAuth2Name"),
        name: "",
        phone: "",
        provider: searchParams.get("provider")
    });

    const signupMutation = useMutation(
        async () => await instance.post("/auth/oauth2/signup", signupData),
        {
            onSuccess: response => {
                alert("가입완료");
                navigate("/user/signin");
            },
            onError: error => console.log(error)
        }
    );

    console.log(signupData);
    const handleInpuOnChange = (e) => {
        setSignupData(data => ({
            ...data,
            [e.target.name]: e.target.value
        }))
    };

    const handleSignupButtonOnClick = () => {
        signupMutation.mutateAsync();
    };

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
                        <input name='name' type="text" placeholder='아이디를 입력하세요'
                            onChange={handleInpuOnChange} 
                            value={signupData.name}/>
                    </div>

                    <div css={s.inputBox}>
                        <p>전화번호</p>
                        <input name='phone' type="text" placeholder='비밀번호를 입력하세요'
                            onChange={handleInpuOnChange} 
                            value={signupData.phone}/>
                    </div>
                    <button onClick={handleSignupButtonOnClick}>가입하기</button>
                </div>
            </div>
        </UserBackgoundLayout>
    );
}

export default UserOauth2SignupPage;