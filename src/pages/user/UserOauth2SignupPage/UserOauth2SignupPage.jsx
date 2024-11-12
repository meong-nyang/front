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

    const [ fieldErrorMessages, setFieldErrorMessages ] = useState({
        name: <></>,
        phone: <></>,
    });

    const signupMutation = useMutation(
        async () => await instance.post("/auth/oauth2/signup", signupData),
        {
            onSuccess: response => {
                alert("가입완료");
                window.location.replace("/user/signin");
            },
            onError: error => {
                showFieldErrorMessage(error.response.data);

            }
        }
    );

    const addHyphenToPhoneNumber = (phoneNumber) => {
        const numbers = phoneNumber.replace(/[^0-9]/g, "").slice(0,11)
            .replace(/^(\d{3})(\d{3,4})(\d{4})$/, `010-$2-$3`);
        return numbers;
    };

    const handleInpuOnChange = (e) => {
        const formattedValue = e.target.name === "phone"
        ? addHyphenToPhoneNumber(e.target.value)
        : e.target.value

        setSignupData(data => ({
            ...data,
            [e.target.name]: formattedValue
        }))
    };

    const handleSignupButtonOnClick = () => {
        signupMutation.mutateAsync().catch(() => {});
    };

    const showFieldErrorMessage = (fieldErrors) => {
        let emptyFieldErrors = {
            name: <></>,
            phone: <></>,
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
                <div css={s.titleLayout}>
                    <p>회원가입</p>
                    <p>SNS 가입을 위한 추가정보를 입력해주세요</p>
                </div>
                <div css={s.signuplayout}>
                    <p>회원가입</p>
                    <div css={s.inputBox}>
                        <div css={s.userInfoTag}>
                            <p>이름</p > 
                            <p>{fieldErrorMessages.name}</p> 
                        </div>
                        <input name='name' type="text" placeholder="아이디를 입력하세요"
                            onChange={handleInpuOnChange} 
                            value={signupData.name}/>
                    </div>
                    <div css={s.inputBox}>
                        <div css={s.userInfoTag}>
                            <p>전화번호</p > 
                            <p>{fieldErrorMessages.phone}</p> 
                        </div>
                        <input name='phone' type="text" placeholder="하이픈( ' - ' ) 없이 전화번호를 입력하세요"
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