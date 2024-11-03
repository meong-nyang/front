import React from 'react';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import logoImg from "../../../assets/images/logo.png";
import { RiNotionFill } from "react-icons/ri";
import { BiLogoGithub } from "react-icons/bi";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {
    SliderContainer,
    BodyContainer,
    SliderContent,
  } from './style'
function UserMainPage(props) {

    const list = [
        {
          content: 1,
          color: '#FF5757',
        },
        {
          content: 2,
          color: '#FFBC57',
        },
        {
          content: 3,
          color: '#FFEE57',
        },
        {
          content: 4,
          color: '#57FF86',
        },
        {
          content: 5,
          color: '#5786FF',
        },
        {
          content: 6,
          color: '#8013D7',
        },
      ]

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    return (
        <UserBackgoundLayout>
            <div css={s.layout}>
                <header>
                    <Slider {...settings}>
                        <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>2</h3>
                        </div>
                        <div>
                            <h3>3</h3>
                        </div>
                    </Slider>
                </header>
                <footer css={s.footerLayout}>
                    <div>
                        <div css={s.infoLayout}>
                            <p>멍멍냥냥</p>
                            <div>                               
                                <a href='https://github.com/meong-nyang' target="_blank"><BiLogoGithub /></a>
                                <a href='https://www.notion.so/112f4b993fe380a089d9e56ee5207491' target="_blank"><RiNotionFill /></a>
                            </div>
                        </div>
                        <img src={logoImg} alt="" />
                    </div>
                </footer>
            </div>

        </UserBackgoundLayout>
    );
}

export default UserMainPage;