import React, { useEffect, useState } from 'react';
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

import { useQuery, useQueryClient } from 'react-query';
import { instance } from '../../../apis/util/instance';
import { useParams } from 'react-router-dom';

function UserMypage() {
    const param = useParams();
    const [ selectOption, setSelectOption ] = useState(param.controllerName);
    const queryClient = useQueryClient();
    const userInfoData = queryClient.getQueryData("userInfoQuery");
    const [ userInfo, setUserInfo ] = useState({
        id: "",
        username: "",
        name: "",
        phone: "",
        zipcode: "",
        addressDefault: "",
        addressDetail: "",
        petId: "",
        petName: "",
        petAge: "",
        petType: "",
    });

    const myPageDataQuery = useQuery(
        ["myPageDataQuery"],
        async () => {
            return await instance.get(`/user/${userInfoData?.data.id}`);
        },
        {
            enabled: !!userInfoData?.data,
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => { 
                setUserInfo(response.data); 
            },
            onError: error => {
                console.log("error: ", error)
            }
        }
    );
    return (
        <UserBackgoundLayout>
            <div css={s.layout}>
                <UserMypageController selectOption={selectOption} setSelectOption={setSelectOption}/>
                {
                    MYPAGE_OPTION_LIST.map((option,index) => (
                        selectOption === option.address &&
                        <p>{option.title}</p>
                    ))
                }
                {
                    param.controllerName === "info" &&
                        <UserInfoDetail userInfo={userInfo} setUserInfo={setUserInfo}/>
                }
                {
                    param.controllerName === "pw" &&
                        <UserInfoPassword/>
                }
                {
                    param.controllerName === "pet" &&
                        <UserInfoPet userInfo={userInfo} setUserInfo={setUserInfo}/>
                }
                {
                    param.controllerName === "orderlist" &&
                        <UserOrderDetail />
                }
            </div>
        </UserBackgoundLayout>
    );
}

export default UserMypage;