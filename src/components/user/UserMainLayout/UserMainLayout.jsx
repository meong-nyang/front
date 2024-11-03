import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import UserHeaderLayout from '../UserHeaderLayout/UserHeaderLayout';

function UserMainLayout({children}) {
    return (
        <div css={s.layout}>
            <UserHeaderLayout />
            {children}
        </div>
    );
}

export default UserMainLayout;