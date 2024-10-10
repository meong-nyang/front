import './App.css';
import { Global } from '@emotion/react';
import { reset } from './styles/common';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import MainPage from './pages/user/MainPage/MainPage';
import UserLoginPage from './pages/user/UserLoginPage/UserLoginPage';
import UserJoinPage from './pages/user/UserJoinPage/UserJoinPage';
import UserMyPage from './pages/user/UserMyPage/UserMyPage';

function App() {
  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/user/login' element={<UserLoginPage/>}/>
        <Route path='/user/join' element={<UserJoinPage/>}/>
        <Route path='/user/mypage' element={<UserMyPage/>}/>

        <Route path='*' element={ <NotFound />}/>
      </Routes>

    </>
  );
}

export default App;
