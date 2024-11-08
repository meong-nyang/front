import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    padding-top: 100px;
    width: 500px;
    height: 100%;
`;

export const back = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border: none;
    background-color: white;
    width: max-content;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    & > svg {
        margin-right: 5px;
    }
`;

export const main = css`
    /* transform: scale(130%); */
    box-sizing: border-box;
    border: 1px solid #00000022;
    border-radius: 20px;
    box-shadow: 2px 2px 5px #00000022;
    padding: 20px;
    height: 400px;

    & > div:nth-of-type(1) {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 70px;
        font-size: 30px;
        cursor: default;
    }
`;

export const inputBox = css`
    position: relative;
    box-sizing: border-box;
    height: 50px;
    margin-top: 40px;

    & > p {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -10px;
        left: 10px;
        margin: 0;
        width: 55px;
        height: 20px;
        background-color: white;
        font-size: 12px;
    }

    & > input {
        box-sizing: border-box;
        outline: none;
        border: 1px solid #595959;
        border-radius: 10px;
        padding: 0px 15px;
        width: 100%;
        height: 100%;
        font-size: 18px;
    }
`;

export const findPassword = css`
    display: flex;
    justify-content: end;
    margin-top: 10px;
    font-size: 14px;

    & > div:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

export const button = css`
    margin-top: 40px;
    border: none;
    border-radius: 10px;
    width: 100%;
    height: 40px;
    background-color: #FFF5D6;
    cursor: pointer;

    &:hover {
        background-color: #F5E1B5;
    }

    &:active {
        background-color: #E6C994;
    }
`;