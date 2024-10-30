import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import logoImg from "../../../assets/images/logo.png";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

function UserHeaderLayout() {
    const navigate = useNavigate();

    const activeStyle = {
        color: "#5588A3",
    }

    const queryClient = useQueryClient();
    const accessTokenValidationQuery = queryClient.getQueryData("accessTokenValidationQuery");
    const accessTokenValidationQueryState = queryClient.getQueryState("accessTokenValidationQuery");
    
    const [ loginStatus, setLoginStatus ] = useState(accessTokenValidationQueryState?.status === "success" ? accessTokenValidationQuery?.data : false);

    const handleLogoutClick = () => {
        localStorage.removeItem("accessToken");
        window.location.replace("/");
        //navigate("/", {replace: true});
        setLoginStatus(false);
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
                {
                    accessTokenValidationQuery?.data
                    ?
                    <>
                        <Link to={'/user'}>마이페이지</Link>
                        <Link onClick={handleLogoutClick} >로그아웃</Link>
                    </>
                    :
                    <>
                        <Link to={'/user/signin'}>로그인</Link>
                        <Link to={'/user/signup'}>회원가입</Link>
                    </>
                    
                }
               
                <Link to={'/user/cart'}><CiShoppingCart /></Link>
                <Link to={'/'}><CiSearch /></Link>
            </div>
        </div>
    );
}

export default UserHeaderLayout;