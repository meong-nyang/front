import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import logoImg from "../../../assets/images/logo.png";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { Link, NavLink } from 'react-router-dom';

function UserHeaderLayout() {
    const activeStyle = {
        color: "#5588A3",
    }

    return (
        <div css={s.layout}>
            <div>
                <NavLink to={'/'}><img src={logoImg} /></NavLink>
            </div>
            <div>
                <NavLink to={'/'} style={({isActive}) => (isActive ? activeStyle : {})}>전체</NavLink>
                <NavLink to={'/category/dog'} style={({isActive}) => (isActive ? activeStyle : {})}>강아지</NavLink>
                <NavLink to={'/category/cat'} style={({isActive}) => (isActive ? activeStyle : {})}>고양이</NavLink>
                <NavLink to={'/category/re'} style={({isActive}) => (isActive ? activeStyle : {})}>추천상품</NavLink>
            </div>
            <div>
                <Link to={'/'}>로그인</Link>
                <Link to={'/user/signup'}>회원가입</Link>
                <Link to={'/'}><CiSearch /></Link>
                <Link to={'/'}><CiShoppingCart /></Link>
            </div>
        </div>
    );
}

export default UserHeaderLayout;