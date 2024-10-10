import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import MainHeader from '../../../components/user/MainHeader/MainHeader';

function UserMyPage(props) {
    return (
        <>
            <div css={s.layout}>
                <MainHeader />
                <h1>회원정보</h1>
                <div css={s.userPassword}>
                    <div css={s.formInput}>
                        <h4>비밀번호 확인</h4>
                        <div>
                            <label htmlFor="">비밀번호</label>
                            <input type="password" />
                        </div>
                        <div>
                            <label htmlFor="">비밀번호 확인</label>
                            <input type="password" />
                        </div>
                    </div>
                    <button>수정</button>
                </div>
                <div css={s.userInformation}>
                    <div css={s.formInput}>
                        <h4>내정보</h4>
                        <div>
                            <label htmlFor="">아이디</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="">이름</label>
                            <input type="password" />
                        </div>
                        <div>
                            <label htmlFor="">전화번호</label>
                            <input type="password" />
                        </div>
                        <div>
                            <label htmlFor="">주소</label>
                            <input type="text" />
                        </div>
                    </div>
                    <button>수정</button>
                </div>    
            </div>
        </>
    );
}

export default UserMyPage;