import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import MainHeader from '../../../components/user/MainHeader/MainHeader';
import Sidebar from '../../../components/user/Sidebar/Sidebar';
import { TbArrowBadgeLeftFilled, TbArrowBadgeRightFilled } from "react-icons/tb";
import { trainCompartment } from '../../../constants/mainRecommendedProduct';
import { useNavigate } from 'react-router-dom';


function MainPage(props) {
    const [ curSlide, setCurSlide ] = useState(0);
    const navigate = useNavigate();
    const [ intervalId, setIntervalId ] = useState(null);
    const FIRST_SLIDE_INDEX = 0;
    const LAST_SLIDE_INDEX = trainCompartment.length - 1;
    const MOVE_SLIDE_INDEX = 1;
    
    const autoMoveSlide = () => {
        if (intervalId !== null) {
          clearInterval(intervalId);
        }
        setIntervalId(
            setInterval(() => {
                setCurSlide((prevState) =>
                    prevState < LAST_SLIDE_INDEX
                    ? prevState + MOVE_SLIDE_INDEX
                    : FIRST_SLIDE_INDEX
                );
            }, 3000)
        );  
    };

    useEffect(() => {
    autoMoveSlide();

    return () => clearInterval(intervalId);
    }, []);

    const moveToSlide = (value) => {
        if (value === 'next') {
            setCurSlide((prevState) =>
                prevState < LAST_SLIDE_INDEX
                ? prevState + MOVE_SLIDE_INDEX
                : FIRST_SLIDE_INDEX
            );
        }
        if (value === 'prev') {
            setCurSlide((prevState) =>
              prevState > FIRST_SLIDE_INDEX
                ? prevState - MOVE_SLIDE_INDEX
                : LAST_SLIDE_INDEX
            );
          }
    };
    
    return (
        <>
            <div css={s.layout}>
                <MainHeader />
                <Sidebar />
                <div css={s.mainContainer}>
                    <div css={s.mainPage}>
                        <TbArrowBadgeLeftFilled css={s.prevButton} onClick={moveToSlide}/>
                        
                        {
                            trainCompartment.map((item, index) => (
                            <div
                                css={() => s.compartment(curSlide)}
                                key={index}
                            >
                                <img onClick={() => navigate(item.path)} src={item.img} alt="productImg" />
                            </div>
                            ))
                        }

                        <TbArrowBadgeRightFilled css={s.nextButton} onClick={moveToSlide}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPage;