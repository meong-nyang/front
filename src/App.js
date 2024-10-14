import './App.css';
import { Global } from '@emotion/react';
import { reset } from './styles/common';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/admin/DashboardPage/DashboardPage';
import ProductListPage from './pages/admin/ProductManagement/ProductListPage/ProductListPage';
import ProductRegisterPage from './pages/admin/ProductManagement/ProductRegisterPage/ProductRegisterPage';

function App() {
  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route path='/admin/dashboard' element={<DashboardPage />} />
        <Route path='/admin/product/list' element={<ProductListPage />} />
        <Route path='/admin/product/register' element={<ProductRegisterPage />} />
        <Route path='/admin/stock' element={<></>} />
        <Route path='/admin/order' element={<></>} />
        <Route path='/admin/customer' element={<></>} />
        <Route path='/admin/statistics' element={<></>} />
        <Route path='/admin/setting' element={<></>} />
      </Routes>
    </>
  );
}

export default App;