import React from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import MainHeader from '../../../components/user/MainHeader/MainHeader';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function MainPage(props) {
    // const autoMoveSlide = () => {
    //     if (intervalId !== null) {
    //       clearInterval(intervalId);
    //     }
    //     setIntervalId(
    //         setInterval(() => {
    //             setCurSlide((prevState) =>
    //                 prevState < LAST_SLIDE_INDEX
    //                 ? prevState + MOVE_SLIDE_INDEX
    //                 : FIRST_SLIDE_INDEX
    //             );
    //         }, 3000)
    //     );  
    // };
    
    return (
        <>
            <div css={s.layout}>
            <MainHeader />
                <div css={s.mainContainer}>
                    <div css={s.mainPage}>
                        <div>추천</div>
                        <div>추천</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPage;