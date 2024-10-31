    import React, { useState } from 'react';
    /** @jsxImportSource @emotion/react */
    import * as s from "./style";
    import logoImg from "../../../assets/images/logo.png";
    import { CiSearch, CiShoppingCart } from "react-icons/ci";
    import { Link, NavLink } from 'react-router-dom';
    import { useQueryClient } from 'react-query';

    function UserHeaderLayout() {
        const queryClient = useQueryClient();
        
        const activeStyle = {
            color: "#9d6c4c",
            fontWeight: "bold"
        }
        
        const categoryQuery = queryClient.getQueryData("categoryListQuery");
        const accessTokenValidationQuery = queryClient.getQueryData("accessTokenValidationQuery");
        const accessTokenValidationQueryState = queryClient.getQueryState("accessTokenValidationQuery");
        
        const [ loginStatus, setLoginStatus ] = useState(accessTokenValidationQueryState?.status === "success" ? accessTokenValidationQuery?.data : false);

        const handleLogoutClick = () => {
            localStorage.removeItem("accessToken");
            window.location.replace("/");
            // navigate("/", {replace: true});
            setLoginStatus(false);
        };

        return (
            <div css={s.layout}>
                <div>
                    <NavLink to={'/'}><img src={logoImg} /></NavLink>
                </div>
                <div>
                    <NavLink to={'/product/list/all?page=1'} style={({isActive}) => (isActive ? activeStyle : {})}>전체</NavLink>
                    {
                        categoryQuery?.data?.petGroupList.map(petGroup => 
                            <>
                                <NavLink to={`/product/list/${petGroup.id == 1 ? "dog" : "cat"}?page=1`} 
                                    style={({isActive}) => (isActive ? activeStyle : {})}
                                    key={petGroup.id}>{petGroup.categoryGroupName}</NavLink>
                            </>
                        )
                    }
                    <NavLink to={'/product/list/recommend?page=1'} style={({isActive}) => (isActive ? activeStyle : {})}>추천상품</NavLink>
                </div>
                <div>
                    {
                        accessTokenValidationQuery?.data
                        ?
                        <>
                            <Link to={'/user'}>마이페이지</Link>
                            <button onClick={handleLogoutClick} >로그아웃</button>
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