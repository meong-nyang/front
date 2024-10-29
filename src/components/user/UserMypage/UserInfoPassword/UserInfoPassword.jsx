import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserInfoLayout from '../UserInfoLayout/UserInfoLayout';

function UserInfoPassword(props) {
    const [ editMode, setEditMode ] = useState(true);

    return (
        <UserInfoLayout title="비밀번호" editMode={editMode} setEditMode={setEditMode}>
            <div css={s.inputBox}>
                <p>{editMode ? "비밀번호" : "기존 비밀번호"}</p>
                <input type="password"  disabled={editMode}/>
            </div>
                {
                    !editMode && 
                    <>
                        <div css={s.inputBox}>
                            <p>새로운 비밀번호</p>
                            <input type="password" value="" disabled={editMode}/>
                        </div> 
                        <div css={s.inputBox}>
                            <p>새로운 비밀번호 확인</p>
                            <input type="password" value="" disabled={editMode}/>
                        </div> 
                    </>
                    
                }
        </UserInfoLayout>
    );
}

export default UserInfoPassword;