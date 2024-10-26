import React, { useState } from 'react';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
import UserMypageController from '../../../components/user/UserMypage/UserMypageController/UserMypageController';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserInfoDetail from '../../../components/user/UserMypage/UserInfoDetail/UserInfoDetail';
import UserInfoPet from '../../../components/user/UserMypage/UserInfoPet/UserInfoPet';
import UserOrderDetail from '../../../components/user/UserMypage/UserOrderDetail/UserOrderDetail';
import UserInfoPassword from '../../../components/user/UserMypage/UserInfoPassword/UserInfoPassword';
import { MYPAGE_OPTION_LIST } from '../../../constants/SelectOption';

function UserMypage(props) {
    const [ selectOption, setSelectOption ] = useState(0);
    return (
        <UserBackgoundLayout>
            <UserHeaderLayout />
            <div css={s.layout}>
                <UserMypageController selectOption={selectOption} setSelectOption={setSelectOption}/>
                {
                    MYPAGE_OPTION_LIST.map((option,index) => (
                        selectOption === index &&
                        <p>{option.title}</p>
                    ))
                }
                {
                    selectOption === 0 &&
                    <>
                        <UserInfoDetail />
                        <UserInfoPassword />
                        <UserInfoPet />
                    </>
                }
                {
                    selectOption === 1 &&
                    <UserOrderDetail />
                }
            </div>
        </UserBackgoundLayout>
    );
}

export default UserMypage;