import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

import { TbCircleNumber1Filled, TbCircleNumber1, TbCircleNumber2Filled, TbCircleNumber2, TbCircleNumber3Filled, TbCircleNumber3 } from "react-icons/tb";
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
import UserSignupInfo from '../../../components/user/UserSignupContent/UserSignupInfo/UserSignupInfo';
import UserSignupAddress from '../../../components/user/UserSignupContent/UserSignupAddress/UserSignupAddress';
import UserSignupPet from '../../../components/user/UserSignupContent/UserSignupPet/UserSignupPet';
function UserSignupPage(props) {
    return (
        <UserBackgoundLayout>
            <UserHeaderLayout />
            <div css={s.layout}>
                <div css={s.signupTitle}>
                    <p>회원가입</p>
                    <div css={s.signupOrder}>
                        <div>
                            <TbCircleNumber1Filled />
                            <p>회원정보</p>
                            <p>입력</p>
                        </div>
                        <div>
                            <TbCircleNumber2 />
                            <p>배송지정보</p>
                            <p>입력</p>
                        </div>
                        <div>
                            <TbCircleNumber3 />
                            <p>반려동물</p>
                            <p>정보입력</p>
                        </div>    
                    </div>
                </div>
                <div css={s.signupContent}>
                    {true && <UserSignupInfo />}
                    {true && <UserSignupAddress />}
                    {true && <UserSignupPet />}
                </div>
            </div>
        </UserBackgoundLayout>
    );
}

export default UserSignupPage;