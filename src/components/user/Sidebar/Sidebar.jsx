import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useRecoilState } from 'recoil';
import SidebarBody from './SidebarBody/SidebarBody';
import { sidebarShowAtom } from '../../../atoms/sidebarShowAtom';
import SidebarHeader from './SidebarHeader/SidebarHeader';

function Sidebar(props) {
    const [ sidebarShow ] = useRecoilState(sidebarShowAtom);

    return (
        <div css={s.layout(sidebarShow)}>
            <SidebarHeader />
            <SidebarBody />
        </div>
    );
}

export default Sidebar;