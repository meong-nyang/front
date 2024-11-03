import React from 'react';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import logoImg from "../../../assets/images/logo.png";
import { RiNotionFill } from "react-icons/ri";
import { BiLogoGithub } from "react-icons/bi";

function UserMainPage(props) {
    return (
        <UserBackgoundLayout>
            <div css={s.layout}>

                <footer css={s.footerLayout}>
                    <div>
                        <div css={s.infoLayout}>
                            <p>멍멍냥냥</p>
                            <div>                               
                                <a href='https://github.com/meong-nyang' target="_blank"><BiLogoGithub /></a>
                                <a href='https://www.notion.so/112f4b993fe380a089d9e56ee5207491' target="_blank"><RiNotionFill /></a>
                            </div>
                        </div>
                        <img src={logoImg} alt="" />
                    </div>
                </footer>
            </div>

        </UserBackgoundLayout>
    );
}

export default UserMainPage;