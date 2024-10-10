import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import MainHeader from '../../../components/user/MainHeader/MainHeader';

function MainPage(props) {

    
    return (
        <div css={s.layout}>
            <MainHeader />
            <div css={s.mainContainer}>
                <div>추천상품</div>
                <div>추천상품</div>
                <div>추천상품</div>
            </div>
        </div>
    );
}

export default MainPage;