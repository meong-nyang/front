import React from 'react';
import MainContainer from '../../MainContainer/MainContainer';
import { TbShoppingCart, TbSearch, TbMenu2  } from "react-icons/tb";

function SidebarHeader(props) {
    return (
        <div>
            <MainContainer />
            <div>
                <h1><TbMenu2 /></h1>
            </div>
        </div>
    );
}

export default SidebarHeader;