/** @jsxImportSource @emotion/react */
import { Link, useLocation } from "react-router-dom";
import * as s from "./style";
import { MENU_DATAS } from "../../../constants/options";

function MainLayout({ children }) {
    const addressLocation = useLocation();
    // const result = MENU_DATAS.filter(data => data.address.startsWith(addressLocation.pathname))[0];

    return (
        <div css={s.layout}>
            <div css={s.menuList(1)}>
                <div>로고</div>
                {
                    MENU_DATAS.map(menu => (
                        <Link to={menu.address} key={menu.menuId}>{menu.name}</Link>
                    ))
                }
            </div>
            <div css={s.mainContainer}>
                <header css={s.head}>
                    <div>
                        현재위치
                    </div>
                    <div>
                        관리자 이름
                    </div>
                </header>
                <main>
                    { children }
                </main>
            </div>
        </div>
    );
}

export default MainLayout;