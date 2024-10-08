import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import MainHeader from '../../../components/MainHeader/MainHeader';

function UserJoinPage(props) {
    return (
        <>
            <MainHeader />
            <body css={s.layout}>
                <h1>회원가입</h1>
                <div css={s.joinBox}>
                    <div css={s.formInput}>
                        <h4>회원정보 입력</h4>
                        <div>
                            <label htmlFor="">아이디</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="">비밀번호</label>
                            <input type="password" />
                        </div>
                        <div>
                            <label htmlFor="">비밀번호 확인</label>
                            <input type="password" />
                        </div>
                        <div>
                            <label htmlFor="">이름</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="">전화번호</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="">주소</label>
                            <input type="text" />
                        </div>
                    </div>
                    
                    <div css={s.formInput}>
                        <h4>반려동물 정보 입력</h4>
                        <div>
                            <label htmlFor="">반려동물 이름</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="">나이</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="">종류</label>
                            <div>
                                <button >강아지</button>
                                <button >고양이</button>
                                <button >그 외 아이들</button>
                            </div>
                        </div>
                    </div>
                    <button>회원가입</button>
                </div>
            </body>
        </>
    );
}

export default UserJoinPage;