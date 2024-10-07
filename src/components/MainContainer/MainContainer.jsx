import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";

function MainContainer(props) {
    return (
        <div css={s.layout}>
            <div css={s.recommand}>
                <h1>추천페이지 1</h1>
                <h1>추천페이지 2</h1>
            </div>
        </div>
    );
}

export default MainContainer;