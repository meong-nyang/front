import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserInfoLayout from '../UserInfoLayout/UserInfoLayout';
import DaumPostcode from 'react-daum-postcode';

function UserInfoDetail({ userInfo, setUserInfo }) {
    const [ editMode, setEditMode ] = useState(true);
    const [ addressDefault, setAddressDefault ] = useState("");
    const [ zipcode, setZipcode ] = useState("");

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

    const handleInputOnChange = (e) => {
        setUserInfo(userInfo => ({
            ...userInfo,
            [e.target.name]: e.target.value
        }));
    };

    return (
       <UserInfoLayout title="회원정보" editMode={editMode} setEditMode={setEditMode}>
            <div css={s.inputBox}>
                <p>아이디</p>
                <input 
                    name='username' 
                    type="text" 
                    value={userInfo.username} 
                    disabled='true'
                />
            </div>
            <div css={s.inputBox}>
                <p>이름</p>
                <input 
                    name='name' 
                    type="text" 
                    value={userInfo.name} 
                    disabled={editMode}
                    onChange={handleInputOnChange} 
                />
            </div>
            <div css={s.inputBox}>
                <p>전화번호</p>
                <input 
                    name='phone' 
                    type="text" 
                    value={userInfo.phone} 
                    disabled={editMode}
                    onChange={handleInputOnChange} 
                />
            </div>
            <div css={[s.addressBox, s.inputBox]}>
                <p>주소</p>
                {
                    editMode
                    ?
                        <input name='zipcode' type="text" value={userInfo.zipcode} disabled='true' />
                    :
                        <div css={s.searchAddressBox}>
                            <input name='zipcode' type="text" value={userInfo.zipcode} disabled='true'/>
                            <button onClick={handleAddressSearchComplet}>주소검색</button>
                        </div>
                }
                <input 
                    name='addressDefault' 
                    type="text" 
                    value={userInfo.addressDefault} 
                    disabled='true'
                />
                <input 
                    name='addressDetail' 
                    type="text" 
                    value={userInfo.addressDetail} 
                    disabled={editMode}
                    onChange={handleInputOnChange} 
                />
            </div>
        </UserInfoLayout>
    );
}

export default UserInfoDetail;