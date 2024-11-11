import './App.css';
import { Global } from '@emotion/react';
import { reset } from './styles/common';
import DashboardPage from './pages/admin/DashboardPage/DashboardPage';
import ProductListPage from './pages/admin/ProductManagement/ProductListPage/ProductListPage';
import ProductRegisterPage from './pages/admin/ProductManagement/ProductRegisterPage/ProductRegisterPage';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import MainLayout from './components/admin/MainLayout/MainLayout';
import AdminSigninPage from './pages/admin/AdminSigninPage/AdminSigninPage';
import UserMainPage from './pages/user/UserMainPage/UserMainPage';
import UserSignupPage from './pages/user/UserSignupPage/UserSignupPage';

import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { instance } from './apis/util/instance';
import ProductModifyPage from './pages/admin/ProductManagement/ProductModifyPage/ProductModifyPage';
import ProductDetailPage from './pages/admin/ProductManagement/ProductDetailPage/ProductDetailPage';

import UserSigninPage from './pages/user/UserSigninPage/UserSigninPage';

import AdminCustomerDetailPage from './pages/admin/AdminCustomerManagement/AdminCustomerDetailPage/AdminCustomerDetailPage';
import UserOauth2SignupPage from './pages/user/UserOauth2SignupPage/UserOauth2SignupPage';
import UserMypage from './pages/user/UserMypage/UserMypage';
import UserCartPage from './pages/user/UserCartPage/UserCartPage';
import UserOrderPage from './pages/user/UserOrderPage/UserOrderPage';
import UserProductDetailPage from './pages/user/UserProductDetailPage/UserProductDetailPage';
import AdminStatisticsPage from './pages/admin/AdminStatisticsPage/AdminStatisticsPage';
import AdminSiteSettingPage from './pages/admin/AdminSiteSettingPage/AdminSiteSettingPage';
import UserProductListPage from './pages/user/UserProductListPage/UserProductListPage';
import OrderDetailPage from './pages/admin/orderManagement/OrderDetailPage/OrderDetailPage';
import OrderListPage from './pages/admin/orderManagement/OrderListPage/OrderListPage';
import UserOauth2SigninPage from './pages/user/UserOauth2SigninPage/UserOauth2SigninPage';
import PortOneOrderPage from './pages/user/PortOneOrderPage/PortOneOrderPage';
import AdminCustomerListPage from './pages/admin/AdminCustomerManagement/AdminCustomerListPage/AdminCustomerListPage';
import UserOrderSuccessPage from './pages/user/UserOrderSuccessPage/UserOrderSuccessPage';
import UserSearchProductPage from './pages/user/UserSearchProductPage/UserSearchProductPage';
import StockListPage from './pages/admin/adminStockManagement/StockListPage/StockListPage';
import StockDetailPage from './pages/admin/adminStockManagement/StockDetailPage/StockDetailPage';


function App() {

    const location = useLocation();
    const navigate = useNavigate();

    const [ authRefresh, setAuthRefresh ] = useState(true);
    const [ isAdmin, setAdmin ] = useState(false);

    useEffect(() => {
        if (!authRefresh) {
            setAuthRefresh(true);
        }
    }, [location.pathname]);

    const accessTokenValidation = useQuery(
        ["accessTokenValidationQuery"],
        async () => {
            setAuthRefresh(false);
            return await instance.get("/auth/access", {
                params: {
                    accessToken: localStorage.getItem("accessToken")
                }
            });
        },
        {
            enabled: authRefresh,
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: () => {
                const deniedPaths = ["/admin/signin", "/user/signin", "/user/signup"];
                for(let deniedPath of deniedPaths) {
                    if (location.pathname === deniedPath) {
                        alert("잘못된 접근입니다.");
                        navigate("/");
                    }
                }
            },
            onError: error => {
                console.log("에러");
                console.log(error.response);
                const authPaths = ["/user/mypage", "/user/cart", "/user/order"];
                const adminAuthPaths = ["/admin"];
                if (location.pathname === "/admin/signin") {
                    console.log("여기");
                    return;
                }
                for (let authPath of authPaths) {
                    if (location.pathname.startsWith(authPath)) {
                        alert("로그인이 필요한 페이지입니다. \n로그인페이지로 이동합니다.");
                        navigate("/user/signin");
                        break;
                    }
                }
                for (let adminAuthPath of adminAuthPaths) {
                    if (location.pathname.startsWith(adminAuthPath)) {
                        alert("잘못된 접근입니다.");
                        navigate("/");
                    }
                }
            }
        }
    );

    const userInfo = useQuery(
        ["userInfoQuery"],
        async () => {
            return await instance.get("/user/me");
        },
        {
            // accessTokenValid가 성공했을 때 유효한 토큰을 가지고 있기 때문에 무조건 걸어줘야함
            // accessTokenValid.data의 값이 undefind이거나 null일 경우 뒤에 값을 참조하지 않음
            enabled: accessTokenValidation.isSuccess && accessTokenValidation.data?.data,
            refetchOnWindowFocus: false,
            onSuccess: success => {
                const roles = success.data.userRoles;
                if (!roles.includes("ROLE_ADMIN")) {
                    const deniedPaths = ["/admin"];
                    for (let deniedPath of deniedPaths) {
                        if(location.pathname.startsWith(deniedPath)) {
                            alert("잘못된 접근입니다.");
                            navigate("/");
                        }
                    }
                }

                if (roles.includes("ROLE_ADMIN")) {
                    setAdmin(true);
                } else {
                    setAdmin(false);
                }
            }
        }
    );
    
    const categoryList = useQuery(
        ["categoryListQuery"],
        async () => await instance.get("/product/categorys"),
        {
            retry: 0,
            refetchOnWindowFocus: false
        }
    );

    const siteLogo = useQuery(
        ["siteLogoQuery"],
        async () => await instance.get("/logo"),
        {
            retry: 0,
            refetchOnWindowFocus: false
        }
    );

    return (
        <>
            <Global styles={reset} />
            <Routes>
                <Route path='/' element={<UserMainPage />} />
                <Route path='/user/signup' element={<UserSignupPage />} />
                <Route path='/user/signin' element={<UserSigninPage />} />
                <Route path='/user/signup/oauth2' element={<UserOauth2SignupPage />} />
                <Route path='/user/signin/oauth2' element={<UserOauth2SigninPage />} />
                <Route path='/user/:controllerName' element={<UserMypage />} />
                <Route path='/user/cart' element={<UserCartPage />} />
                <Route path='/user/order' element={<UserOrderPage />} />
                <Route path='/product/detail/:productId' element={<UserProductDetailPage />} />
                <Route path='/product/list/:groupName' element={<UserProductListPage />} />
                <Route path='/order' element={<PortOneOrderPage />} />
                <Route path='/order/success' element={<UserOrderSuccessPage />} />
                <Route path='/search' element={<UserSearchProductPage />} />

                <Route path='/admin/signin' element={!localStorage.getItem("accessToken") ? <AdminSigninPage /> : <></> } />

                <Route path='/admin/*' element={
                    isAdmin ?
                    <MainLayout>
                        <Routes>
                            <Route path='/' element={<DashboardPage />} />
                            <Route path='/product/list' element={<ProductListPage />} />
                            <Route path='/product/register' element={<ProductRegisterPage />} />
                            <Route path='/product/modify/:id' element={<ProductModifyPage />} />
                            <Route path='/product/detail/:id' element={<ProductDetailPage />} />
                            <Route path='/stock/detail/:id' element={<StockDetailPage />} />
                            <Route path='/stock' element={<StockListPage />} />
                            <Route path='/order' element={<OrderListPage />} />
                            <Route path='/order/detail/:id' element={<OrderDetailPage />} />
                            <Route path='/customer/detail/:id' element={<AdminCustomerDetailPage />} />
                            <Route path='/customer' element={<AdminCustomerListPage />} />
                            <Route path='/statistics' element={<AdminStatisticsPage />} />
                            <Route path='/setting' element={<AdminSiteSettingPage />} />
                            <Route path='/*' element={<NotFound />} />
                        </Routes>
                    </MainLayout>
                    :
                    <div></div>
                } />

                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;