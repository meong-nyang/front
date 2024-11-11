import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserInfoLayout from '../UserInfoLayout/UserInfoLayout';
import Swal from "sweetalert2";
import { useMutation } from 'react-query';
import { instance } from '../../../../apis/util/instance';

function UserInfoDetail({ userInfo, setUserInfo }) {
    const [ editMode, setEditMode ] = useState(false);
    const [ addressDefault, setAddressDefault ] = useState("");
    const [ zipcode, setZipcode ] = useState("");
    const [ editUserInfoData, setEditUserInfoData ] = useState({
        id: 0,
        name: "",
        phone: "",
        zipcode: "",
        addressDefault: "",
        addressDetail: "",
    });

    const [ fieldErrorMessages, setFieldErrorMessages ] = useState({
        name: <></>,
        phone: <></>,
    });

    useEffect(() => {
        // 다음 주소 검색 API 스크립트를 동적으로 로드
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
        
        return () => {
            // 컴포넌트가 언마운트될 때 스크립트 제거
            document.body.removeChild(script);
        };
    }, []);

    const handleAddressSearchComplet = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // 주소 검색 결과를 처리하는 로직
                let fullAddress = data.address;
                
                setZipcode(data.zonecode);
                setAddressDefault(fullAddress);
                setUserInfo((prevData) => ({
                    ...prevData,
                    zipcode: data.zonecode,
                    addressDefault: fullAddress,
                }));
            },
        }).open();
    };

    const addHyphenToPhoneNumber = (phoneNumber) => {
        const numbers = phoneNumber.replace(/[^0-9]/g, "").slice(0,11)
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        return numbers;
    };

    const handleInputOnChange = (e) => {
        const formattedValue = e.target.name === "phone"
            ? addHyphenToPhoneNumber(e.target.value)
            : e.target.value

        setUserInfo(userInfo => ({
            ...userInfo,
            [e.target.name]: formattedValue
        }));
    };

    const editUserInfoMutation = useMutation(
        async () => await instance.put(`/user/${userInfo.id}`, userInfo),
        {
            onSuccess: () => {
                setEditUserInfoData({
                    ...userInfo,
                    userInfo: editUserInfoData
                });
                Swal.fire({
                    text: `정보가 수정되었습니다.`,
                    icon: "success",
                    timer: 1500,
                    confirmButtonColor: "#9d6c4c",
                    confirmButtonText: "확인",
                })
                console.log("수정 후 userInfo", userInfo)
            },
            onError: error => {
                console.log(error);
                showFieldErrorMessages(error.resposne.data);
            }
        }
    );

    const handleConfirmButtonClick = () => {
        editUserInfoMutation.mutateAsync();
        setEditMode(mode => false);
    };

    const showFieldErrorMessages = (fieldErrors) => {
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
    }

    return (
        <UserInfoLayout 
            title="회원정보" 
            editMode={editMode} 
            setEditMode={setEditMode} 
            userInfo={userInfo} 
            setUserInfo={setUserInfo}
            handleConfirmButtonClick={handleConfirmButtonClick}
            >
            <div css={s.inputBox}>
                <p>아이디</p>
                <input 
                    name="username" 
                    type="text" 
                    value={userInfo.username} 
                    disabled="true"
                />
            </div>
            <div css={s.inputBox}>
                <div css={s.userInfoTag}>
                    <p>이름</p>
                    <p>{fieldErrorMessages.name}</p>
                </div>
                <input 
                    name="name" 
                    type="text" 
                    value={userInfo.name} 
                    disabled={!editMode}
                    onChange={handleInputOnChange} 
                />
            </div>
            <div css={s.inputBox}>
                <div css={s.userInfoTag}>
                    <p>전화번호</p>
                    <p>{fieldErrorMessages.phone}</p>
                </div>
                <input 
                    name="phone" 
                    type="text" 
                    value={userInfo.phone} 
                    disabled={!editMode}
                    onChange={handleInputOnChange} 
                />
            </div>
            <div css={[s.addressBox, s.inputBox]}>
                <p>주소</p>
                {
                    editMode
                    ?
                        <div css={s.searchAddressBox}>
                            <input 
                                name="zipcode" 
                                type="text" 
                                value={userInfo.zipcode} 
                                disabled="true"
                            />
                            <button onClick={handleAddressSearchComplet}>주소검색</button>
                        </div>
                        
                    :
                        <input 
                            name="zipcode" 
                            type="text" 
                            value={userInfo.zipcode} 
                            disabled="true" 
                    />
                }
                <input 
                    name="addressDefault"
                    type="text" 
                    value={userInfo.addressDefault} 
                    disabled="true"
                />
                <input 
                    name="addressDetail" 
                    type="text" 
                    value={userInfo.addressDetail} 
                    disabled={!editMode}
                    onChange={handleInputOnChange} 
                />
            </div>
        </UserInfoLayout>
    );
}

export default UserInfoDetail;