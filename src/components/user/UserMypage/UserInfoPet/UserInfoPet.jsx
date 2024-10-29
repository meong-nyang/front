import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserInfoLayout from '../UserInfoLayout/UserInfoLayout';

function UserInfoPet({ userInfo, setUserInfo }) {
    const [ editMode, setEditMode ] = useState(true);

    const handleUserInfoModifyChange = (e) => {
        setUserInfo(userInfo => ({
            ...userInfo,
            [e.target.name]: e.target.value
        }))
    };

    const handleRadioChange = (e) => {
        setUserInfo(userInfo => ({
            ...userInfo,
            petType: e.target.value
        }))
        console.log(userInfo)
    };
 
    return (
        <UserInfoLayout title="반려동물 정보" editMode={editMode} setEditMode={setEditMode}>
            <div css={s.inputBox}>
                <p>반려동물 이름</p>
                <input 
                    name="petName" 
                    type="text" 
                    onChange={handleUserInfoModifyChange}
                    value={userInfo.petName} 
                    disabled={editMode}/>        
            </div>
            <div css={s.inputBox}>
                <p>반려동물 나이</p>
                <input 
                    name="petAge" 
                    type="number" 
                    onChange={handleUserInfoModifyChange}
                    value={userInfo.petAge} 
                    placeholder='나이를 입력하세요' 
                    disabled={editMode}/>
            </div>
            <div css={s.typeInputBox}>
                <p>반려동물 종류</p>
                {
                    editMode
                    ?
                        <input css={s.typeSelectBox} name="type" value={userInfo.petType} disabled={editMode}/>
                    :
                        <div css={s.typeBox}>
                            <input type='radio' id='dog' name='type' value="강아지"
                                checked={userInfo.petType === "강아지"}
                                onChange={handleRadioChange}
                            />
                            <label htmlFor='dog'>강아지</label>
                            <input type='radio' id='cat' name='type' value="고양이"
                                checked={userInfo.petType === "고양이"}
                                onChange={handleRadioChange}
                            />
                            <label htmlFor='cat'>고양이</label>
                        </div>
                }
            </div>
        </UserInfoLayout>
    );
}

export default UserInfoPet;