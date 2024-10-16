/** @jsxImportSource @emotion/react */
import { Link, useLocation } from "react-router-dom";
import * as s from "./style";
import { MENU_DATAS } from "../../../constants/options";
import { useRecoilState } from "recoil";
import { currentLocationAtom } from "../../../atoms/currentLocationAtom";

function MainLayout({ children }) {
    const [ currentLocation ] = useRecoilState(currentLocationAtom);

    return (
        <div css={s.layout}>
            <div css={s.menuList(currentLocation.selectedMenuId)}>
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
                        { currentLocation.currentLocation }
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