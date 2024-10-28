import React, { useEffect, useState } from 'react';
import UserSignupLayout from '../UserSignupLayout/UserSignupLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

function UserSignupAddress({ order, setOrder, userSignupFormData, setUserSignupFormData, fieldErrorMessages }) {
    const [ addressDefault, setAddressDefault ] = useState("");
    const [ zipcode, setZipcode ] = useState("");

    // 다음 주소 검색 api
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

    const handleSearchAddress = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // 주소 검색 결과를 처리하는 로직
                let fullAddress = data.address;
                
                setZipcode(data.zonecode);
                setAddressDefault(fullAddress);
                setUserSignupFormData((prevData) => ({
                    ...prevData,
                    zipcode: data.zonecode,
                    addressDefault: fullAddress,
                }));
            },
        }).open();
    };

    const handleUserSignupAddressDataChange = (e) => {
        setUserSignupFormData(userSignupFormData => ({
            ...userSignupFormData,
            [e.target.name]: e.target.value
        }))
    };
    
    const handlePreOnClick = () =>{
        setOrder(order => order - 1);
    };

    const handleNextOnClick = () => {
        setOrder(order => order + 1);
    };

    return (
        <UserSignupLayout title="배송지정보">
            <div css={s.inputBox}>
                <p>주소 {fieldErrorMessages.address}</p>
                <div>
                    <input 
                        type="text"
                        name="zipcode"
                        value={userSignupFormData.zipcode} 
                        placeholder="우편번호"
                        readOnly
                    />
                    <button type="button" onClick={handleSearchAddress}>주소검색</button>
                </div>
                <input 
                    type="text"
                    name="addressDefault"
                    value={userSignupFormData.addressDefault} 
                    placeholder="기본주소"
                    readOnly
                />
                <input 
                    type="text"
                    name="addressDetail"
                    onChange={handleUserSignupAddressDataChange}
                    value={userSignupFormData.addressDetail} 
                    placeholder="상세주소"
                />
            </div>
            <div css={s.locationBox}>
                <p onClick={handlePreOnClick}><MdArrowBackIos />이전</p>
                <p onClick={handleNextOnClick}>다음<MdArrowForwardIos /></p>
            </div>
        </UserSignupLayout>
    );
}

export default UserSignupAddress;