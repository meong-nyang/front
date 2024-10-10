import React from 'react';
import { TbShoppingCart, TbSearch, TbMenu2  } from "react-icons/tb";
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useRecoilState } from 'recoil';
import { sidebarShowAtom } from '../../../../atoms/sidebarShowAtom';

function SidebarHeader(props) {
    const [ sidebarShow, setSidebarShow ] = useRecoilState(sidebarShowAtom);

    const handleMenuToggleClick = () => {
        setSidebarShow(false);
    }

    return (
        <div css={s.layout}>
            <button 
                css={s.menuToggleButton} 
                onClick={handleMenuToggleClick}
            >
                <TbMenu2 />
            </button>
        </div>
    );
}

export default SidebarHeader;