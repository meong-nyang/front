import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    width: 100%;
    height: 100%;
`;

export const menuList = css`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 200px;
    height: 100%;

    & > div {
        box-sizing: border-box;
        border: 1px solid #dbdbdb;
        width: 100%;
        height: 80px;
    }

    & > a {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border: 1px solid #dbdbdb;
        border-top: none;
        width: 100%;
        height: 80px;
        font-size: 18px;
        text-decoration: none;
        color: #000000;
    }

    & > a:hover {
        background-color: #efefef;
    }
`;

export const mainContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    & > header {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding-left: 20px;
        width: 100%;
        height: 50px;
        font-size: 14px;
    }

    & > body {
        flex-grow: 1;
        box-sizing: border-box;
        padding: 20px;
    }
`;