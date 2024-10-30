import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserInfoLayout from '../UserInfoLayout/UserInfoLayout';
import axios from 'axios';
import { useMutation } from 'react-query';
import { instance } from '../../../../apis/util/instance';
import { useNavigate } from 'react-router-dom';

function UserInfoPassword(props) {
    const navigate = useNavigate();
    const [ editMode, setEditMode ] = useState(false);
    const [ fieldErrorMessages, setFieldErrorMessages ] = useState({
        username:<></>,
        password:<></>,
        checkPassword:<></>,
        name:<></>,
        address:<></>,
    })

    const [ editPassword, setEditPassword ] = useState({
        oldPassword: "",
        newPassword: "",
        newCheckPassword: "",
    });

    const showFieldErrorMessage = (fieldErrors) => {
        let emptyFieldErrors = {
            username:<></>,
            password:<></>,
            checkPassword:<></>,
            name:<></>,
            address:<></>,
        };

        // const errors = Array.isArray(fieldErrors) ? fieldErrors : [];

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
                setEditPassword();
                console.log(editPassword)
                setEditMode(false);
                navigate("/user/signin");
            },
            onError: error => {
                console.log(error.response.data);
                showFieldErrorMessage(error.response.data);
                alert("입력한 정보를 다시 확인해 주세요." + error.resposen?.data.message || error.message);
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
        editPasswordInfoMutation.mutateAsync();
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
                                <p>기존 비밀번호</p>
                                <input 
                                    type="text" 
                                    name="oldPassword"
                                    onChange={handleEditPasswordChange}
                                />
                            </div> 
                            <div css={s.inputBox}>
                                <p>새로운 비밀번호</p>
                                <input 
                                    type="text" 
                                    name="newPassword"
                                    onChange={handleEditPasswordChange}
                                />
                            </div> 
                            <div css={s.inputBox}>
                                <p>새로운 비밀번호 확인</p>
                                <input 
                                    type="text" 
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