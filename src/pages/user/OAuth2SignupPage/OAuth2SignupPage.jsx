import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import MainHeader from '../../../components/user/MainHeader/MainHeader';
import { useMutation } from 'react-query';
import axios from 'axios';

function OAuth2SignupPage(props) {
    const [ inputUser, setInputUser ] = useState({
        username: "",
        name: "",
        phone: "",
        provider: ""
    });

    const handleAddInfoInputOnChange = (e) => {
        setInputUser(inputUser => ({
            ...inputUser,
            [e.target.name]: e.target.value
        }))
    };

    const addInfoOAuthSignup = useMutation(
        async (inputUser) => {
            const response = await axios.post("/auth/signup", inputUser);
            return {
                inSuccess: true,
                ok: response.data,
            };
        },
        {
            inSuccess: (data) => {
                if (data.isSuccess) {
                    console.log("회원가입 완료", data.ok.message);
                }
            },
            onError: (error) => {
                const response = error.response;
                // const fieldErrors = response?.data?.map(fieldError => ({
                //     field: fieldError.field,
                //     defaultMessage: fieldError.defaultMessage
                // })) || [];

                console.log("입력한 정보를 다시 확인해 주세요");
            }
        }
    );

    const handleAddInfoSubmitOnClick = () => {
        addInfoOAuthSignup.mutateAsync();
    };

    return (
        <>
            <body css={s.layout}>
                <MainHeader />
                <h1>추가 정보 입력</h1>
                <p>로그인을 위해 정보를 입력해 주세요</p>
                <div css={s.signupContainer}>
                    <div css={s.signupInputBox}>
                        <div css={s.signupInput}>
                            <div>
                                <label htmlFor="">이름</label>
                                <input type="text" name='name' onChange={handleAddInfoInputOnChange} value={inputUser.name} />
                            </div>
                            <div>
                                <label>전화번호</label>
                                <input type="text" name='phone' onChange={handleAddInfoInputOnChange} value={inputUser.phone} />
                            </div>
                            <button onClick={handleAddInfoSubmitOnClick}>확인</button>
                        </div>
                    </div>
                </div>
            </body>

        </>
    );
}

export default OAuth2SignupPage;