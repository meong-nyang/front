import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserInfoLayout from '../UserInfoLayout/UserInfoLayout';
import axios from 'axios';
import { useMutation } from 'react-query';
import { instance } from '../../../../apis/util/instance';
import { replace, useNavigate } from 'react-router-dom';

function UserInfoPassword(props) {
    const navigate = useNavigate();
    const [ editMode, setEditMode ] = useState(false);
    const [ fieldErrorMessages, setFieldErrorMessages ] = useState({
        oldPassword:<></>,
        newPassword:<></>,
        newCheckPassword:<></>,
    });

    const [ editPassword, setEditPassword ] = useState({
        oldPassword: "",
        newPassword: "",
        newCheckPassword: "",
    });

    const showFieldErrorMessage = (fieldErrors) => {
        let emptyFieldErrors = {
            oldPassword:<></>,
            newPassword:<></>,
            newCheckPassword:<></>,
        };

        for (let fieldError of fieldErrors) {
            emptyFieldErrors = {
                ...emptyFieldErrors,
                [fieldError.field]: <p>{fieldError.defaultMessage}</p>
            }
        }
        setFieldErrorMessages(emptyFieldErrors);
    };

    const editPasswordInfoMutation = useMutation(
        async () => await instance.put("/edit/password", editPassword),
        {
            retry: 0,
            onSuccess: editPassword => {
                localStorage.removeItem("accessToken");
                setEditPassword();
                console.log(editPassword)
                setEditMode(false);
                window.location.replace("/user/signin");
            },
            onError: error => {
                // 잘못된 요청시에 회원가입시와 동일한 에러 메세지 필요
                console.log(error);
                showFieldErrorMessage(error.response.data);
                // alert("입력한 정보를 다시 확인해 주세요" + error.resposen?.data?.message || error.message);
                alert("입력한 정보를 다시 확인해 주세요");
            }
        }
    );

    const handleEditPasswordChange = (e) => {
        setEditPassword(editPassword => ({
            ...editPassword,
            [e.target.name]: e.target.value
        }))
    };

    const handleConfirmButtonClick = () => {
        console.log(editPassword)
        editPasswordInfoMutation.mutateAsync().catch(() => {});
        console.log("after mutate : ", editPassword)
        setEditMode(mode => false);
    };

    return (
        <UserInfoLayout 
            title="비밀번호" 
            editMode={editMode} 
            setEditMode={setEditMode}
            editPassword={editPassword} 
            setEditPassword={setEditPassword}
            handleConfirmButtonClick={handleConfirmButtonClick}>
                {
                    editMode 
                    ? 
                        <>
                            <div css={s.inputBox}>
                                <div css={s.userInfoTag}>
                                    <p>기존 비밀번호</p>
                                    <p>{fieldErrorMessages.oldPassword}</p>
                                </div>
                                <input 
                                    type="password" 
                                    name="oldPassword"
                                    onChange={handleEditPasswordChange}
                                />
                            </div> 
                            <div css={s.inputBox}>
                                <div css={s.userInfoTag}>
                                    <p>새로운 비밀번호</p>
                                    <p>{fieldErrorMessages.newPassword}</p>
                                </div>
                                <input 
                                    type="password" 
                                    name="newPassword"
                                    onChange={handleEditPasswordChange}
                                />
                            </div> 
                            <div css={s.inputBox}>
                                <div css={s.userInfoTag}>
                                    <p>새로운 비밀번호 확인</p>
                                    <p>{fieldErrorMessages.newCheckPassword}</p>
                                </div>
                                <input 
                                    type="password" 
                                    name="newCheckPassword"
                                    onChange={handleEditPasswordChange}
                                />
                            </div> 
                        </>
                    : 
                    
                        <div css={s.inputBox}>
                            <p>비밀번호</p>
                            <input 
                                type="text" 
                                placeholder="******"
                                disabled={true}
                            />
                        </div>
                    
                    
                }
        </UserInfoLayout>
    );
}

export default UserInfoPassword;