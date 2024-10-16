/** @jsxImportSource @emotion/react */
import { NavLink } from "react-router-dom";
import * as s from "./style";
import { MENU_DATAS } from "../../../constants/options";
import { useRecoilState } from "recoil";
import { currentLocationAtom } from "../../../atoms/currentLocationAtom";

function MainLayout({ children }) {

    const [ currentLocation ] = useRecoilState(currentLocationAtom);

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
                <header css={s.head}>
                    <div>
                        { currentLocation.locationName }
                    </div>
                    <div>
                        관리자 이름
                    </div>
                </header>
                <body>
                    { children }
                </body>
            </div>
        </div>
    );
}

export default MainLayout;