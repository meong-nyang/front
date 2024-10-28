import React from 'react';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserProductDetail from '../../../components/user/UserProductDetail/UserProductDetail';

function UserProductListPage(props) {
    return (
        <UserBackgoundLayout>
            <UserHeaderLayout />
            <div css={s.layout}>
                <UserProductDetail />
                <UserProductDetail />
                <UserProductDetail />
            </div>
        </UserBackgoundLayout>

    );
}

export default UserProductListPage;