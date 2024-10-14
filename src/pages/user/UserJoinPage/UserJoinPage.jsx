import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import MainHeader from '../../../components/user/MainHeader/MainHeader';

function UserJoinPage(props) {
    return (
        <>
            <body css={s.layout}>
                <MainHeader />
                
                <h1>회원가입</h1>
                <div css={s.userJoinContainer}>
                    <div css={s.userJoinNavBox}>
                        회원가입
                        
                    </div>
                    <div css={s.joinBox}>
                        <div css={s.formInput}>
                            <h3>회원정보 입력</h3>
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
                            {/* <div>
                                <label htmlFor="">요청사항</label>
                                <input type="text" />
                                </div> */}
                        </div>
                    <div>
                        <div>
                            <label htmlFor="">전화번호</label>
                            <div css={s.phoneNumber}>
                                <input type="text" /> 
                                <input type="text" />
                                <input type="text" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="">주소</label>
                            <div css={s.addressBox}>
                                <div>
                                    <input type="text" value="우편번호" disabled/>
                                </div>
                                <input type="text" value="기본주소" disabled/>
                                <input type="text" placeholder="상세주소 입력"/>
                            </div>
                        </div>
                    </div>    
                        {/* <div css={s.formInput}>
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
                                <div css={s.typeBox}>
                                    <label htmlFor="">종류</label>
                                    <div>
                                        <input type="radio" name='type'/>
                                        <label htmlFor="">강아지</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='type'/>
                                        <label htmlFor="">고양이</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='type'/>
                                        <label htmlFor="">그 외 아이들</label>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <button>다음</button>
                    </div>
                </div>
            </body>
        </>
    );
}

export default UserJoinPage;