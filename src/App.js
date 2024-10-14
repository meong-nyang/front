import './App.css';
import { Global } from '@emotion/react';
import { reset } from './styles/common';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/admin/DashboardPage/DashboardPage';
import ProductListPage from './pages/admin/ProductManagement/ProductListPage/ProductListPage';

function App() {
  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route path='/admin/dashboard' element={<DashboardPage />} />
        <Route path='/admin/product' element={<ProductListPage />} />
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