import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import SidebarBody from './SidebarBody/SidebarBody';
import SidebarHeader from './SidebarHeader/SidebarHeader';
import { useRecoilState } from 'recoil';
import { mainSidebarShowAtom, sidebarShowAtom } from '../../atoms/sidebarShowAtom';

function SideBar(props) {
    const [ sidebarShow ] = useRecoilState(sidebarShowAtom);

    return (
        <div css={s.layout(sidebarShow)}>
            <SidebarBody />
            <SidebarHeader />
        </div>
    );
}

export default SideBar;