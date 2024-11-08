import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

function UserScrollLayout({children}) {
    return (
        <div css={s.layout}>
            {children}
        </div>
    );
}

export default UserScrollLayout;