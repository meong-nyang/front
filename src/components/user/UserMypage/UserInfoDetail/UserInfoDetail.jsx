import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserInfoLayout from '../UserInfoLayout/UserInfoLayout';
import DaumPostcode from 'react-daum-postcode';

function UserInfoDetail(props) {
    const [ editMode, setEditMode ] = useState(true);
    const [ addressSearchOpen, setAddressSearchOpen ] = useState(false);

    const [ userInfoData, setUserInfoData ] = useState({
        username: "",
        name: "",
        phone: "",
        zipcode: "",
        addressDefault: "",
        addressDetail: "",
    });

    const handleInputOnChange = (e) => {
        setUserInfoData(userInfo => ({
            ...userInfo,
            [e.target.name]: e.target.value
        }));
    };

    const handleAddressSearchOpen = () => {
        setAddressSearchOpen(isOpen=> !isOpen);
    };

    const handleAddressSearchComplet = (data) => {
        const { address, zonecode } = data;
        setUserInfoData(userInfo => ({
            ...userInfo,
            zipcode: zonecode,
            addressDefault: address
        }));
        setAddressSearchOpen(false);
    };

    const handleAddressSearchClose = (state) => {
        if (state === 'FORCE_CLOSE') {
            setAddressSearchOpen(false);
        } else if (state === 'COMPLETE_CLOSE') {
            setAddressSearchOpen(false);
        }
    };

    return (
       <UserInfoLayout title="회원정보" editMode={editMode} setEditMode={setEditMode}>
            <div css={s.inputBox}>
                <p>아이디</p>
                <input name='username' type="text" 
                    value={userInfoData.username} 
                    disabled='true'/>
            </div>
            <div css={s.inputBox}>
                <p>이름</p>
                <input name='name' type="text" 
                    value={userInfoData.name} 
                    disabled={editMode}
                    onChange={handleInputOnChange} />
            </div>
            <div css={s.inputBox}>
                <p>전화번호</p>
                <input name='phone' type="text" 
                    value={userInfoData.phone} 
                        disabled={editMode}
                        onChange={handleInputOnChange} />
            </div>
            <div css={[s.addressBox, s.inputBox]}>
                <p>주소</p>
                {
                    editMode
                    ?
                        <input name='zipcode' type="text" value={userInfoData.zipcode} disabled='true' />
                    :
                        <div css={s.searchAddressBox}>
                            <input name='zipcode' type="text" value={userInfoData.zipcode} disabled='true'/>
                            <button onClick={handleAddressSearchOpen}>주소검색</button>
                            {
                                addressSearchOpen &&
                                <div css={s.addressApiLayout}>
                                    <DaumPostcode 
                                        onComplete={handleAddressSearchComplet}
                                        onClose={handleAddressSearchClose} />
                                </div>
                            }
                        </div>
                }
                <input name='addressDefault' type="text" 
                    value={userInfoData.addressDefault} 
                    disabled='true'/>
                <input name='addressDetail' type="text" 
                    value={userInfoData.addressDetail} 
                    disabled={editMode}
                    onChange={handleInputOnChange} />
            </div>
        </UserInfoLayout>
    );
}

export default UserInfoDetail;