import { css } from "@emotion/react";

export const layout = css`
    width: 100%;
    height: 100%;

    & td {
        padding: 0px 1px;
    }

    & td > input {
        padding: 0 10px;
        box-sizing: border-box;
        border: none;
        outline: none;
        width: 100%;
        height: 90%;
        font-size: 16px;

        &:focus {
            outline: 2px solid black;
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