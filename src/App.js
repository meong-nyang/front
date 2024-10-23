import './App.css';
import { Global } from '@emotion/react';
import { reset } from './styles/common';
import DashboardPage from './pages/admin/DashboardPage/DashboardPage';
import ProductListPage from './pages/admin/ProductManagement/ProductListPage/ProductListPage';
import ProductRegisterPage from './pages/admin/ProductManagement/ProductRegisterPage/ProductRegisterPage';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import MainLayout from './components/admin/MainLayout/MainLayout';
import ProductModifyPage from './pages/admin/ProductManagement/ProductModifyPage/ProductModifyPage';
import AdminSigninPage from './pages/admin/AdminSigninPage/AdminSigninPage';
import UserMainPage from './pages/user/UserMainPage/UserMainPage';
import UserSignupPage from './pages/user/UserSignupPage/UserSignupPage';


function App() {

    return (
        <>
            <Global styles={reset} />
            <Routes>
                <Route path='/' element={<UserMainPage />} />
                <Route path='/user/signup' element={<UserSignupPage />} />

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