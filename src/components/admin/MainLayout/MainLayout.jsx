/** @jsxImportSource @emotion/react */
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as s from "./style";
import { LOCATION_DATAS, MENU_DATAS } from "../../../constants/options";
import { useQueryClient } from "react-query";
import { IMAGE_ADDRESS } from "../../../apis/util/instance";

function MainLayout({ children }) {
    const addressLocation = useLocation();
    const navigate = useNavigate();

    let result = LOCATION_DATAS.filter(data => addressLocation.pathname.startsWith(data.address))[0];

    if (result === undefined) {
        result = {
            menuId: 0,
            name: "잘못된 경로"
        }
    }
    
    const queryClient = useQueryClient();
    const userInfo = queryClient.getQueryData("userInfoQuery");
    const siteLogo = queryClient.getQueryData("siteLogoQuery");

     const handleLogoutOnClick = () => {
        localStorage.removeItem("accessToken");
        navigate("/admin/signin", {replace: true});
     }

    return (
        <div css={s.layout}>
            <div css={s.menuList(result.menuId)}>
                <div css={s.logo}>
                    <img src={IMAGE_ADDRESS + siteLogo?.data} />
                </div>
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
                    {
                        userInfo?.data &&
                        <div css={s.logout}>
                            <div>{userInfo?.data.name}</div>
                            <button onClick={handleLogoutOnClick}>로그아웃</button>
                            <Link to="/">홈페이지로 이동</Link>
                        </div>
                    }
                </header>
                <main>
                    { children }
                </main>
            </div>
        </div>
    );
}

export default MainLayout;