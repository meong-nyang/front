import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

function UserSignupLayout({ children, title, }) {
    return (
        <div css={s.layout}>
            <p>{ title }</p>
            {children}
        </div>
    );
}

export default UserSignupLayout;