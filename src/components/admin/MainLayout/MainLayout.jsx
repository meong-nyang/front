/** @jsxImportSource @emotion/react */
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as s from "./style";
import { MENU_DATAS } from "../../../constants/menuList";

function MainLayout({ location, children }) {
    return (
        <div css={s.layout}>
            <div css={s.menuList}>
                <div>로고</div>
                {
                    MENU_DATAS.map(menu => (
                        <NavLink to={menu.address}
                            key={menu.menuId}
                            style={({isActive}) => (isActive ? {fontWeight: "600"} : {})}
                        >{menu.name}</NavLink>
                    ))
                }
            </div>
            <div css={s.mainContainer}>
                <header>
                    {location}
                </header>
                <body>
                    { children }
                </body>
            </div>
        </div>
    );
}

export default MainLayout;