import React from 'react';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { CiSearch } from "react-icons/ci";
function UserSearchProductPage(props) {
    return (
        <UserBackgoundLayout>
            <div css={s.layout}>
                <div css={s.searchLayout}>
                    <input type="text" placeholder='검색어를 입력해주세요'/>
                    <CiSearch />
                </div>
            </div>
        </UserBackgoundLayout>            
    );
}

export default UserSearchProductPage;