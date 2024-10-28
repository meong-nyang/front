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
import StockManagementPage from './pages/admin/StockManagementPage/StockManagementPage';

import UserSigninPage from './pages/user/UserSigninPage/UserSigninPage';

import OrderManagementPage from './pages/admin/OrderManagementPage/OrderManagementPage';
import AdminCustomerManagementPage from './pages/admin/AdminCustomerManagement/AdminCustomerManagementPage/AdminCustomerManagementPage';
import AdminCustomerDetailPage from './pages/admin/AdminCustomerManagement/AdminCustomerDetailPage/AdminCustomerDetailPage';
import UserOauth2SignupPage from './pages/user/UserOauth2SignupPage/UserOauth2SignupPage';
import UserMypage from './pages/user/UserMypage/UserMypage';
import UserCartPage from './pages/user/UserCartPage/UserCartPage';
import UserOrderPage from './pages/user/UserOrderPage/UserOrderPage';
import UserProductDetailPage from './pages/user/UserProductDetailPage/UserProductDetailPage';
import AdminStatisticsPage from './pages/admin/AdminStatisticsPage/AdminStatisticsPage';
import AdminSiteSettingPage from './pages/admin/AdminSiteSettingPage/AdminSiteSettingPage';

function App() {

    const location = useLocation();
    const navigate = useNavigate();

    const [authRefresh, setAuthRefresh] = useState(true);

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
                const badPaths = ["/admin/signin"];
                for (let path of badPaths) {
                    if(location.pathname.startsWith(path)) {
                        alert("잘못된 접근입니다.");
                        navigate("/admin");
                        break;
                    }
                }
            },
            onError: error => {
                console.log("에러");
                console.log(error.response);
                const authPaths = ["/user/mypage"];
                for (let authPath of authPaths) {
                    if(location.pathname.startsWith(authPath)) {
                        alert("로그인이 필요한 페이지입니다. \n로그인페이지로 이동합니다.");
                        navigate("/user/login");
                        break;
                    }
                }
            }
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
                <Route path='/user' element={<UserMypage />} />
                <Route path='/user/cart' element={<UserCartPage />} />
                <Route path='/user/order' element={<UserOrderPage />} />
                <Route path='/product' element={<UserProductDetailPage />} />

                <Route path='/admin/signin' element={<AdminSigninPage />} />
                <Route path='/admin/*' element={
                    <MainLayout>
                        <Routes>
                            <Route path='/' element={<DashboardPage />} />
                            <Route path='/product/list' element={<ProductListPage />} />
                            <Route path='/product/register' element={<ProductRegisterPage />} />
                            <Route path='/product/modify/:id' element={<ProductModifyPage />} />
                            <Route path='/product/detail/:id' element={<ProductDetailPage />} />
                            <Route path='/stock' element={<StockManagementPage />} />
                            <Route path='/order' element={<OrderManagementPage />} />
                            <Route path='/customer' element={<AdminCustomerManagementPage />} />
                            <Route path='/customer/:id' element={<AdminCustomerDetailPage />} />
                            <Route path='/statistics' element={<AdminStatisticsPage />} />
                            <Route path='/setting' element={<AdminSiteSettingPage />} />
                            <Route path='/*' element={<NotFound />} />
                        </Routes>
                    </MainLayout>
                } />

                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;