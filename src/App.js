import './App.css';
import { Global } from '@emotion/react';
import { reset } from './styles/common';
import DashboardPage from './pages/admin/DashboardPage/DashboardPage';
import ProductListPage from './pages/admin/ProductManagement/ProductListPage/ProductListPage';
import ProductRegisterPage from './pages/admin/ProductManagement/ProductRegisterPage/ProductRegisterPage';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import MainPage from './pages/user/MainPage/MainPage';
import UserLoginPage from './pages/user/UserLoginPage/UserLoginPage';
import UserJoinPage from './pages/user/UserJoinPage/UserJoinPage';
import UserMyPage from './pages/user/UserMyPage/UserMyPage';
import MainLayout from './components/admin/MainLayout/MainLayout';
import ProductModifyPage from './pages/admin/ProductManagement/ProductModifyPage/ProductModifyPage';
import AdminSigninPage from './pages/admin/AdminSigninPage/AdminSigninPage';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { instance } from './apis/util/instance';

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
                <Route path='/' element={<MainPage />} />
                <Route path='/user/login' element={<UserLoginPage />} />
                <Route path='/user/join' element={<UserJoinPage />} />
                <Route path='/user/mypage' element={<UserMyPage />} />

                <Route path='/admin/signin' element={<AdminSigninPage />} />
                <Route path='/admin/*' element={
                    <MainLayout>
                        <Routes>
                            <Route path='/' element={<DashboardPage />} />
                            <Route path='/product/list' element={<ProductListPage />} />
                            <Route path='/product/register' element={<ProductRegisterPage />} />
                            <Route path='/product/modify/:id' element={<ProductModifyPage />} />
                            <Route path='/stock' element={<></>} />
                            <Route path='/order' element={<></>} />
                            <Route path='/customer' element={<></>} />
                            <Route path='/statistics' element={<></>} />
                            <Route path='/setting' element={<></>} />
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