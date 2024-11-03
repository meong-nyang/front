import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    margin-top: 80px;
    padding-top: 20px;
    
`;

export const footerLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    background-color: #FFF5D6;
    & > div {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        width: 950px;
    }
    &  img {
        width: 200px;
        height: 200px;
    }
`;

export const infoLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    color: #9D6C4C;
    font-weight: 600;
    & > p:nth-of-type(1) {
        padding-bottom: 20px;
        font-size: 25px;
    }
    & > div {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        & svg {
            font-size: 24px;
        }
        & > a {
            padding-right: 15px;
            font-size: 16px;
            color: #9D6C4C;
            text-decoration: none;
        }
    }
`;

export const sliderContainer = css`
    margin-bottom: 50px;
    .slick-prev:before,
    .slick-next:before {
        display: none;	
    }
    .slick-list{ 
        width: 4000px;
    }   
    border: 1px solid #dbdbdb;
    border-top-left-radius: 130px;
    border-top-right-radius: 130px;
`;

export const sliderContent = css`
    height: 500px;
    color: white;
    font-size: 100px;
    line-height : 500px;
    text-align : center;
    width: 1000px;
    margin: auto;
`;

export const BodyContainer = css`
    box-sizing: border-box;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`;