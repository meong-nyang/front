import './App.css';
import { Global } from '@emotion/react';
import { reset } from './styles/common';
import DashboardPage from './pages/admin/DashboardPage/DashboardPage';
import ProductListPage from './pages/admin/ProductManagement/ProductListPage/ProductListPage';
import ProductRegisterPage from './pages/admin/ProductManagement/ProductRegisterPage/ProductRegisterPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import MainPage from './pages/user/MainPage/MainPage';
import UserLoginPage from './pages/user/UserLoginPage/UserLoginPage';
import UserJoinPage from './pages/user/UserJoinPage/UserJoinPage';
import UserMyPage from './pages/user/UserMyPage/UserMyPage';
import MainLayout from './components/admin/MainLayout/MainLayout';
import ProductModifyPage from './pages/admin/ProductManagement/ProductModifyPage/ProductModifyPage';
import AdminSigninPage from './pages/admin/AdminSigninPage/AdminSigninPage';

function App() {

  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/user/login' element={<UserLoginPage/>}/>
        <Route path='/user/join' element={<UserJoinPage/>}/>
        <Route path='/user/mypage' element={<UserMyPage/>}/>

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

        <Route path='*' element={ <NotFound />}/>
      </Routes>
    </>
  );
}

export default App;