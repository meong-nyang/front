import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { TbShoppingCart, TbSearch, TbMenu2  } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Sidebar from '../Sidebar/Sidebar';
import { sidebarShowAtom } from '../../../atoms/sidebarShowAtom';

function MainHeader(props) {
    const [ sidebarShow, setSidebarShow ] = useRecoilState(sidebarShowAtom);

    const handleMenuToggleClick = () => {
        setSidebarShow(true);
    }

    return (
        <>
            <div css={s.layout}>
                <Sidebar />
                <div css={s.frame}>
                    <button 
                        css={s.menuToggleButton}
                        onClick={handleMenuToggleClick}
                    >
                        <TbMenu2 />
                    </button>
                    <Link to='/'>멍멍냥냥</Link>
                    <div css={s.accountBox}>
                        <div css={s.accountIcons}>
                                <div>
                                    <button><TbSearch /></button>
                                </div>
                                <div>
                                    <button><TbShoppingCart /></button>
                                    
                            </div>
                        </div>
                        <a href='/auth/signin'>로그인</a>
                        <a href='/auth/signup'>회원가입</a>
                        <a href='/user/mypage'>마이페이지</a>
                    </div>
                </div>
                <div css={s.category}> 
                    <a href='/category/best'>초보 반려인을 위한 추천 상품</a>
                    <a href='/category/total'>전체</a>
                    <a href='/category/dog'>강아지 용품</a>
                    <a href='/category/cat'>고양이 용품</a>
                </div>
            </div>
        </>
    );
}

export default MainHeader;