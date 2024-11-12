import React from 'react';
import UserHeaderLayout from '../../../components/user/UserHeaderLayout/UserHeaderLayout';
import UserBackgoundLayout from '../../../components/user/UserBackgoundLayout/UserBackgoundLayout';
/** @jsxImportSource @emotion/react */
import * as s from "./style";
import logoImg from "../../../assets/images/logo.png";
import { RiNotionFill } from "react-icons/ri";
import { BiLogoGithub } from "react-icons/bi";
import Slider from "react-slick";

import frame from "../../../assets/images/Frame 114.png";
import frame1 from "../../../assets/images/img1.png";
import img from "../../../assets/images/Frame 117.png";

import { SlArrowLeft, SlArrowRight  } from "react-icons/sl";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import UserMainLayout from '../../../components/user/UserMainLayout/UserMainLayout';
import UserScrollLayout from '../../../components/user/UserScrollLayout/UserScrollLayout';
import { useQuery } from 'react-query';
import { instance } from '../../../apis/util/instance';
import UserProductDetailPage from '../UserProductDetailPage/UserProductDetailPage';
import UserProductDetail from '../../../components/user/UserProductDetail/UserProductDetail';

function UserMainPage(props) {
  const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) =>(
	  <span {...props}>{children}</span>
	);

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
        arrows: true,
        autoplay: true,
        nextArrow: (			//오른쪽 화살표
          <SlickButtonFix>
            <SlArrowRight />
          </SlickButtonFix>
        ),
        prevArrow: (			//왼쪽 화살표
          <SlickButtonFix>
            <SlArrowLeft />
          </SlickButtonFix>
        ),
      };

      const productList = useQuery(
        ["userProductListQuery"],
        async () => await instance.get("/products", {
            params: {
                page: 1,
                limit: 8,
                groupName: "recommend",
                categoryId: 0
            }
        }),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => console.log(response),
            onError: error => console.log(error)
        }
    );


    return (
        <UserMainLayout>
          <UserScrollLayout>
            <div css={s.layout}>
                <header>
                  <div css={s.BodyContainer}>
                    <div css={s.sliderContainer}>
                      <Slider {...settings}>
                      {list.map((value, index) => (
                        <div>	
                          <div css={s.sliderContent} key={index}>
                            <img src={img} />
                          </div>
                        </div>
                      ))}
                      </Slider>
                    </div>
                  </div>
                </header>
                <main css={s.mainLayout}>
                    <h1>추천상품</h1>
                    <div css={s.recommedLayout}>
                    {
                        productList?.data?.data?.productList.map(product => 
                            <UserProductDetail key={product.productId} productInfo={product} />
                        )
                    }
                    </div>
                </main>
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
            </UserScrollLayout>
        </UserMainLayout>
    );
}

export default UserMainPage;