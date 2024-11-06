import { css } from "@emotion/react";

export const layout = css`
    width: 100%;
    height: 100%;

    & > span {
        display: inline-block;
        margin-top: 20px;
        margin-bottom: 5px;
    }
`;

export const head = css`
    display: flex;
    justify-content: space-between;

    & > span {
        display: flex;
        justify-content: start;
        align-items: center;
        width: 200px;
    }
`;


export const buttons = css`
    display: flex;
    justify-content: end;
    margin-bottom: 5px;

    & > button {
        margin-left: 5px;
    }
`;

export const detail = css`
    box-sizing: border-box;
    border: 1px solid black;
    width: 100%;
    height: 300px;
`;

export const recommendBox = css`
    display: flex;
    justify-content: space-around;

    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
    }

    & input {
        display: none;

        &:checked + label::before {
            content: "";
            border-radius: 50%;
            width: 80%;
            height: 80%;
            background-color: black;
        }
    }

    & label:nth-of-type(1) {
        display: flex;
        justify-content: center;
        align-items: center;
        outline: none;
        border: 1px solid black;
        border-radius: 50%;
        width: 11px;
        height: 11px;
        cursor: pointer;
    }

    & label:nth-of-type(2) {
        margin-left: 5px;
        cursor: pointer;
    }

    span {
        margin-left: 5px;
    }
`;

export const productDetail = css`
    margin-top: 20px;
    height: 300px;

    & > span {
        display: inline-block;
        margin-bottom: 5px;
    }

    & > textarea {
        box-sizing: border-box;
        border: 1px solid black;
        outline: none;
        margin-bottom: 20px;
        padding: 10px;
        font-size: 16px;
        width: 100%;
        height: 100px;
        resize: none;
        background-color: white;
    }
`;

export const detailImages = css`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100px;

    & > img {
        width: 100px;
        height: 100px;
    }
`;