import './App.css';
import { Global } from '@emotion/react';
import { reset } from './styles/common';
import { Route, Routes, useLocation } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import MainPage from './pages/user/MainPage/MainPage';
import UserLoginPage from './pages/user/UserLoginPage/UserLoginPage';
import UserJoinPage from './pages/user/UserJoinPage/UserJoinPage';
import UserMyPage from './pages/user/UserMyPage/UserMyPage';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import ProductManagement from './pages/admin/ProductManagement/ProductManagement';

function App() {

  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/user/login' element={<UserLoginPage/>}/>
        <Route path='/user/join' element={<UserJoinPage/>}/>
        <Route path='/user/mypage' element={<UserMyPage/>}/>

        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/product' element={<ProductManagement />} />
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