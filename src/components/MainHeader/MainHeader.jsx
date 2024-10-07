import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { TbShoppingCart, TbSearch  } from "react-icons/tb";

function MainHeader(props) {
    return (
        <>
            <div css={s.layout}>
                <div css={s.frame}>
                    <div>menuBar</div>
                    <h1>logo</h1>
                    <div css={s.account}>
                        <TbSearch /><TbShoppingCart />
                        <a href='/user/login'>로그인</a>
                        <a href='/user/join'>회원가입</a>
                    </div>
                </div>
                <div css={s.category}> 
                    <a href='/products/total'>전체</a>
                    <a href='/products/dog'>강아지 용품</a>
                    <a href='/products/cat'>고양이 용품</a>
                    <a href='/products/best'>추천 상품</a>
                </div>
            </div>
        </>
    );
}

export default MainHeader;