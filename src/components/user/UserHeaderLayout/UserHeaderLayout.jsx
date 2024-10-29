    import React, { useState } from 'react';
    /** @jsxImportSource @emotion/react */
    import * as s from "./style";
    import logoImg from "../../../assets/images/logo.png";
    import { CiSearch, CiShoppingCart } from "react-icons/ci";
    import { Link, NavLink, useNavigate } from 'react-router-dom';
    import { useQueryClient } from 'react-query';

    function UserHeaderLayout({ setCategoryData }) {
        const queryClient = useQueryClient();
        const navigate = useNavigate();
        
        const activeStyle = {
            color: "#9d6c4c",
        }
        
        const categoryQuery = queryClient.getQueryData("categoryListQuery");
        const accessTokenValidationQuery = queryClient.getQueryData("accessTokenValidationQuery");
        const accessTokenValidationQueryState = queryClient.getQueryState("accessTokenValidationQuery");
        
        // const [ loginStatus, setLoginStatus ] = useState(accessTokenValidationQueryState?.status === "success" ? accessTokenValidationQuery?.data : false);

        const handleLogoutClick = () => {
            localStorage.removeItem("accessToken");
            window.location.replace("/");
            //navigate("/", {replace: true});
            // setLoginStatus(false);
        };

        const handleCategoryOnCilck = (petGroupId) => {
            // setCategoryData(category => ({
            //     ...category,
            //     petGroupId
            // }));
            navigate("/product/list");
        };

        return (
            <div css={s.layout}>
                <div>
                    <NavLink to={'/'}><img src={logoImg} /></NavLink>
                </div>
                <div>
                    <button onClick={() => handleCategoryOnCilck(0)}>전체</button>
                    {
                        categoryQuery?.data?.petGroupList.map(petGroup => 
                            <>
                                <button key={petGroup.id} onClick={() => handleCategoryOnCilck(petGroup.id)}>{petGroup.categoryGroupName}</button>
                            </>
                        )
                    }
                    <button onClick={() => handleCategoryOnCilck(3)}>추천상품</button>
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