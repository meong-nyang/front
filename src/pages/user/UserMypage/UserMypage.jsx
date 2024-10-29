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
import { m } from 'framer-motion';
import { useParams } from 'react-router-dom';

function UserMypage(props) {
    const [ selectOption, setSelectOption ] = useState(0);
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
        async () => await instance.get(`/user/${userInfoData.data.id}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => { 
                console.log(response)
                setUserInfo(response.data); 
            },
        }
    );

    // const userInfoQuery = useQuery(
    //     ["userInfoQuery"],
    //     async () => await instance.get(`/user/${userId}`),
    //     {
    //         retry: 0,
    //         refetchOnWindowFocus: false,
    //         onSuccess: response => {

    //         },
    //         onError: error => {

    //         }
    //     }
    // );
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
                        <UserInfoDetail userInfo={userInfo} setUserInfo={setUserInfo}/>
                        <UserInfoPassword userInfo={userInfo} setUserInfo={setUserInfo}/>
                        <UserInfoPet userInfo={userInfo} setUserInfo={setUserInfo}/>
                    </>
                }
                {
                    selectOption === 1 &&
                    <UserOrderDetail />
                }
                {
                    selectOption === 2 &&
                    <UserOrderDetail />
                }
            </div>
        </UserBackgoundLayout>
    );
}

export default UserMypage;