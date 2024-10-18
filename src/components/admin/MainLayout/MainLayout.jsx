/** @jsxImportSource @emotion/react */
import { Link, useLocation } from "react-router-dom";
import * as s from "./style";
import { LOCATION_DATAS, MENU_DATAS } from "../../../constants/options";

function MainLayout({ children }) {
    const addressLocation = useLocation();
    let result = LOCATION_DATAS.filter(data => data.address === (addressLocation.pathname))[0];

    if (result === undefined) {
        result = {
            menuId: 0,
            name: "잘못된 경로"
        }
    }

    return (
        <div css={s.layout}>
            <div css={s.menuList(result.menuId)}>
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
                        {result.name}
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