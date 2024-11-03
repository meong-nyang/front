/** @jsxImportSource @emotion/react */
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as s from "./style";
import { LOCATION_DATAS, MENU_DATAS } from "../../../constants/options";
import logoImg from "../../../assets/images/logo.png";
import { useQueryClient } from "react-query";

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

     const handleLogoutOnClick = () => {
        localStorage.removeItem("accessToken");
        navigate("/admin/signin", {replace: true});
     }

    return (
        <div css={s.layout}>
            <div css={s.menuList(result.menuId)}>
                <div css={s.logo}>
                    <img src={logoImg} alt="" />
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