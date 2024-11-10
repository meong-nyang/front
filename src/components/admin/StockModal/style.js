import { css } from "@emotion/react";

export const background = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 20;
    border: none !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    
`;

export const layout = css`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    box-shadow: 2px 2px 5px #00000055;
    padding: 20px;
    width: 1200px;
    height: 800px;
    background-color: white;
`;

export const headerInput = css`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 60px;

    & > input {
        box-sizing: border-box;
        margin: 0;
        padding: 0 10px;
        height: 30px;
    }

    & > span {
        box-sizing: border-box;
        display: inline-block;
        margin-right: 10px;
    }

    & > input:nth-of-type(1) {
        margin-right: 10px;
    }

    & > input:nth-of-type(2) {
        width: auto;
        margin-right: 10px;
    }
`;

export const mainContainer = css`
    width: 100%;
    height: 100%;
    padding-top: 20px;
`;