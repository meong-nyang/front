import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserInfoLayout from '../UserInfoLayout/UserInfoLayout';
import axios from 'axios';
import { useMutation } from 'react-query';
import { instance } from '../../../../apis/util/instance';

function UserInfoPassword(props) {
    const [ editMode, setEditMode ] = useState(false);

    const [ editPassword, setEditPassword ] = useState({
        oldPassword: "",
        newPassword: "",
        newCheckPassword: "",
    });

    const passwordChangeMutation = useMutation(
        async () => await instance.put("/edit/password", editPassword),
        {
            retry: 0,
            onSuccess: response => {
                setEditMode(false);
            },
            onError: error => {
                alert("비밀번호를 확인해주세요");
            }
        }
    );

    return (
        <UserInfoLayout title="비밀번호" editMode={editMode} setEditMode={setEditMode}>
            
                {
                    editMode ? 
                        <div css={s.inputBox}>
                            <p>비밀번호</p>
                            <input 
                                type="text" 
                                disabled={true}
                            />
                        </div>
                    : 
                    <>
                        <div css={s.inputBox}>
                            <p>기존 비밀번호</p>
                            <input 
                                type="text" 
                                name="oldPassword"
                            />
                        </div> 
                        <div css={s.inputBox}>
                            <p>새로운 비밀번호</p>
                            <input 
                                type="text" 
                                name="newPassword"
                            />
                        </div> 
                        <div css={s.inputBox}>
                            <p>새로운 비밀번호 확인</p>
                            <input 
                                type="text" 
                                name="newCheckPassword"
                            />
                        </div> 
                    </>
                    
                    
                    
                }
        </UserInfoLayout>
    );
}

export default UserInfoPassword;