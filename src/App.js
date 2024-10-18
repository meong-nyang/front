import './App.css';
import { Global } from '@emotion/react';
import { reset } from './styles/common';
import DashboardPage from './pages/admin/DashboardPage/DashboardPage';
import ProductListPage from './pages/admin/ProductManagement/ProductListPage/ProductListPage';
import ProductRegisterPage from './pages/admin/ProductManagement/ProductRegisterPage/ProductRegisterPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import MainPage from './pages/user/MainPage/MainPage';
import UserMyPage from './pages/user/UserMyPage/UserMyPage';
import OAuth2SigninPage from './pages/user/OAuth2SigninPage/OAuth2SigninPage';
import OAuth2SignupPage from './pages/user/OAuth2SignupPage/OAuth2SignupPage';
import UserSignupPage from './pages/user/UserSignupPage/UserSignupPage';
import UserSigninPage from './pages/user/UserSigninPage/UserSigninPage';

function App() {

  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/auth/signin' element={<UserSigninPage/>}/>
        <Route path='/auth/oauth2/signin' element={<OAuth2SigninPage />}/>
        <Route path='/auth/signup' element={<UserSignupPage />}/>
        <Route path='/auth/oauth2/signup' element={<OAuth2SignupPage />}/>
        <Route path='/user/mypage' element={<UserMyPage />}/>

        <Route path='/admin/dashboard' element={<DashboardPage />} />
        <Route path='/admin/product/list' element={<ProductListPage />} />
        <Route path='/admin/product/register' element={<ProductRegisterPage />} />
        <Route path='/admin/stock' element={<></>} />
        <Route path='/admin/order' element={<></>} />
        <Route path='/admin/customer' element={<></>} />
        <Route path='/admin/statistics' element={<></>} />
        <Route path='/admin/setting' element={<></>} />
                                            
        <Route path='*' element={ <NotFound />}/>
      </Routes>
    </>
  );
}

export default App;