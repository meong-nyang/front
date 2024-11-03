import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-top: 80px;
    padding: 20px 0px;
`;

export const footerLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 500px;
    background-color: #FFF5D6;
    & > div {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        width: 950px;
    }
    &  img {
        width: 350px;
        height: 350px;
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