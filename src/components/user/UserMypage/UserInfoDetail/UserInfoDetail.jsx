import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserInfoLayout from '../UserInfoLayout/UserInfoLayout';

function UserInfoDetail(props) {
    const [ editMode, setEditMode ] = useState(true);

    return (
       <UserInfoLayout title="회원정보" editMode={editMode} setEditMode={setEditMode}>
            <div css={s.inputBox}>
                <p>아이디</p>
                <input type="text" value="" disabled={editMode}/>
            </div>
            <div css={s.inputBox}>
                <p>이름</p>
                <input type="text" value="" disabled={editMode}/>
            </div>
            <div css={s.inputBox}>
                <p>전화번호</p>
                <input type="text" value="" disabled={editMode}/>
            </div>
            <div css={[s.addressBox, s.inputBox]}>
                <p>주소</p>
                {
                    editMode
                    ?
                        <input type="text" value="" disabled={editMode}/>
                    :
                        <div css={s.searchAddressBox}>
                            <input type="text" value=""/>
                            <button>주소검색</button>
                        </div>
                }
                <input type="text" value="" disabled={editMode}/>
                <input type="text" value="" disabled={editMode}/>
            </div>
        </UserInfoLayout>
    );
}

export default UserInfoDetail;