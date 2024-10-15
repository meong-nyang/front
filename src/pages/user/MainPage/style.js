import { css } from "@emotion/react";

export const layout = css`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const mainContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80%;
    overflow: hidden;
`;

export const mainPage = css`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 70%;
    height: 100%;
`;

export const compartment = (curSlide) => css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0; 
    width: 800px;
    height: 600px;
    transform: translateX(-${1920 * curSlide}px);
    transition: all 0.4s ease-in-out;
    & > img {
        width: 100%;
    }
`;

export const prevButton = css`
    position: absolute;
    left: 320px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 30px;
    z-index: 10;
    cursor: pointer;
`;

export const nextButton = css`
    position: absolute;
    right: 320px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 30px;
    z-index: 10;
    cursor: pointer;
`;