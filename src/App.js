import './App.css';
import { Global } from '@emotion/react';
import { reset } from './styles/common';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import ProductManagement from './pages/admin/ProductManagement/ProductManagement';

function App() {
  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/product' element={<ProductManagement />} />
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