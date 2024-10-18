import { css } from "@emotion/react";

export const layout = css`
    margin-top: 20px;
    width: 100%;

    // input type이 number인 경우 오른쪽에 생기는 화살표 제거
    & input::-webkit-outer-spin-button,
    & input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    & td {
        padding: 0px;
    }

    & td > input {
        box-sizing: border-box;
        border: none;
        padding: 0px 10px;
        width: 100%;
        height: 28px;
        outline: none;
        font-size: 16px;

        &:focus {
            outline: 2px solid black;
        }

        &:disabled {
            background-color: white;
            color: black;
        }
    }
`;

export const mustData = css`
    width: 100%;

    & > span {
        display: inline-block;
        margin-bottom: 5px;
    }

    table > tr:nth-of-type(2) > td:nth-of-type(1) {
        width: 40%;
    }
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

export const optionalData = css`
    margin-top: 20px;

    & > span {
        display: inline-block;
        margin-bottom: 5px;
    }
`;

export const stockManagement = css`
    margin-top: 20px;

    & > span {
        display: inline-block;
        margin-bottom: 5px;
    }
`;

export const productDetail = css`
    margin-top: 20px;
    height: 300px;

    & > span {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        cursor: pointer;
        width: 160px;

        & > svg {
            margin-left: 5px;
        }
    }

    & > div {
        border: 1px solid black;
        width: 100%;
        height: 100%;
    }
`;