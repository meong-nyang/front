import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    width: 500px;
    height: 100%;
`;

export const main = css`
    /* transform: scale(130%); */
    box-sizing: border-box;
    margin-top: 100px;
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
    background-color: #D2E0FB;
    cursor: pointer;

    &:hover {
        background-color: #b1d4ff;
    }

    &:active {
        background-color: #489bff;
    }
`;