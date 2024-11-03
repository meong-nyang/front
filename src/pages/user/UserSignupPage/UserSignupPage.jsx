import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

import { TbCircleNumber1Filled, TbCircleNumber1, TbCircleNumber2Filled, TbCircleNumber2, TbCircleNumber3Filled, TbCircleNumber3 } from "react-icons/tb";
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
import UserSignupInfo from '../../../components/user/UserSignupContent/UserSignupInfo/UserSignupInfo';
import UserSignupAddress from '../../../components/user/UserSignupContent/UserSignupAddress/UserSignupAddress';
import UserSignupPet from '../../../components/user/UserSignupContent/UserSignupPet/UserSignupPet';
import { useMutation } from 'react-query';
import { instance } from '../../../apis/util/instance';
import { useNavigate } from 'react-router-dom';
function UserSignupPage(props) {
    const [ order, setOrder ] = useState(1);
    const navigate = useNavigate();

    const [ userSignupFormData, setUserSignupFormData ] = useState({
        username: "",
        password: "",
        checkPassword: "",
        name: "",
        phone: "",
        zipcode: "",
        addressDefault: "",
        addressDetail: "",
        request: "",
        petName: "",
        petAge: "",
        petType: "",
    }); 

    const [ fieldErrorMessages, setFieldErrorMessages ] = useState({
        username:<></>,
        password:<></>,
        checkPassword:<></>,
        name:<></>,
        address:<></>,
    });

    const showFieldErrorMessage = (fieldErrors) => {
        let emptyFieldErrors = {
            username:<></>,
            password:<></>,
            checkPassword:<></>,
            name:<></>,
            address:<></>,
        };

        // const errors = Array.isArray(fieldErrors) ? fieldErrors : [];

        for (let fieldError of fieldErrors) {
            emptyFieldErrors = {
                ...emptyFieldErrors,
                [fieldError.field]: <p>{fieldError.defaultMessage}</p>
            }
        }
        setFieldErrorMessages(emptyFieldErrors);
    };

    const userSignup = useMutation(
        async () => await instance.post("/auth/signup", userSignupFormData),
        {
            onSuccess: () => {
                alert("회원가입이 완료되었습니다.");
                navigate("/user/signin");
            },
            onError: error => {
                console.log(error.response.data);
                showFieldErrorMessage(error.response.data);
                alert("입력한 정보를 다시 확인해 주세요." + error.resposen?.data.message || error.message);
                setOrder(order => order -2);
            }
        }
    );

    const handleUserSignupSubmitClick = () => { 
        userSignup.mutateAsync().catch(() => {});
    };
    
    return (
        <UserBackgoundLayout>
            <div css={s.layout}>
                <div css={s.signupTitle}>
                    <p>회원가입</p>
                    <div css={s.signupOrder}>
                        <div>
                            {
                                console.log(fieldErrorMessages)
                            }
                            {
                                order === 1 ? <TbCircleNumber1Filled /> : <TbCircleNumber1 />
                            }
                            <p>회원정보</p>
                            <p>입력</p>
                        </div>
                        <div>
                            {
                                order === 2 ? <TbCircleNumber2Filled /> : <TbCircleNumber2 />
                            }
                            <p>배송지정보</p>
                            <p>입력</p>
                        </div>
                        <div>
                            {
                                order === 3 ? <TbCircleNumber3Filled /> : <TbCircleNumber3 />
                            }
                            <p>반려동물</p>
                            <p>정보입력</p>
                        </div>    
                    </div>
                </div>
                <div css={s.signupContent}>
                    {order === 1  && <UserSignupInfo 
                        order={order} 
                        setOrder={setOrder} 
                        userSignupFormData={userSignupFormData} 
                        setUserSignupFormData={setUserSignupFormData}
                        fieldErrorMessages={fieldErrorMessages}
                    />}
                    {order === 2  && <UserSignupAddress 
                        order={order} 
                        setOrder={setOrder} 
                        userSignupFormData={userSignupFormData} 
                        setUserSignupFormData={setUserSignupFormData}
                        fieldErrorMessages={fieldErrorMessages}
                    />}
                    {order === 3  && <UserSignupPet 
                        order={order} 
                        setOrder={setOrder} 
                        userSignupFormData={userSignupFormData} 
                        setUserSignupFormData={setUserSignupFormData}
                        fieldErrorMessages={fieldErrorMessages}
                    />}
                </div>
                {
                    order === 3 &&
                    <div css={s.signupBtn}>
                        <button onClick={handleUserSignupSubmitClick} >회원가입</button>
                    </div>
                }
            </div>
        </UserBackgoundLayout>
    );
}

export default UserSignupPage;