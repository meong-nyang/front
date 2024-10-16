import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import MainHeader from '../../../components/user/MainHeader/MainHeader';

function OAuth2SignupPage(props) {
    const [ inputUser, setInputUser ] = useState({
        username: "",
        name: "",
        phone: "",
        provider: ""
    })

    const handleAddInfoInputOnChange = (e) => {
        setInputUser(inputUser => ({
            ...inputUser,
            [e.target.name]: e.target.value
        }))
    }

    const handleAddInfoSubmitOnClick = () => {
        
    }

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