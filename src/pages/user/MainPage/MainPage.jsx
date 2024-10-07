import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { Link } from 'react-router-dom';
import MainHeader from '../../../components/MainHeader/MainHeader';
import MainContainer from '../../../components/MainContainer/MainContainer';

function MainPage(props) {
    return (
        <>
            <MainHeader />
            <body>
                <MainContainer />
            </body>
        </>
    );
}

export default MainPage;