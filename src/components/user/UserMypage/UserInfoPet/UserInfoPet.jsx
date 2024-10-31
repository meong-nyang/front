import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserInfoLayout from '../UserInfoLayout/UserInfoLayout';

function UserInfoPet(props) {
    const [ editMode, setEditMode ] = useState(true);
    const age = "";

    return (
        <UserInfoLayout title="반려동물 정보" editMode={editMode} setEditMode={setEditMode}>
            <div css={s.inputBox}>
                <p>반려동물 이름</p>
                <input type="text" value="사랑이" disabled={editMode}/>        
            </div>
            <div css={s.inputBox}>
                <p>반려동물 나이</p>
                <input type="number" value={age} placeholder='나이를 입력하세요' disabled={editMode}/>
            </div>
            <div css={s.typeInputBox}>
                <p>반려동물 종류</p>
                {
                    editMode
                    ?
                        <input css={s.typeSelectBox} value="강아지" disabled={editMode}/>
                    :
                        <div css={s.typeBox}>
                            <input type='radio' id='dog' name='type'/>
                            <label htmlFor='dog'>강아지</label>
                            <input type='radio' id='cat' name='type'/>
                            <label htmlFor='cat'>고양이</label>
                        </div>
                }
            </div>
        </UserInfoLayout>
    );
}

export default UserInfoPet;