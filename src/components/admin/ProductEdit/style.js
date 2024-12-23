import { css } from "@emotion/react";
import { NO_INPUT_DATE_DEFAULT_VALUE, NO_INPUT_NUMBER_SPINNER } from "../../../constants/style/inputStyleProperties";

export const layout = css`
    margin-top: 20px;
    width: 100%;

    ${NO_INPUT_NUMBER_SPINNER}

    & td {
        padding: 0px;
    }

    & th {
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }

    & td > input {
        box-sizing: border-box;
        border: none;
        padding: 0px 10px;
        margin-left: 1px;
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        outline: none;
        font-size: 16px;

        &:focus {
            outline: 1px solid black;
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

export const mustCategory = css`
    & > td:nth-of-type(1) {
        width: 40%;
    }
`;

export const modal = css`
    position: relative;
    width: 650px;
    height: 300px;
    z-index: 10px;
    cursor: pointer;
`;

export const categorySelect = css`
    display: flex;
    align-items: center;

    & > button {
        box-sizing: border-box;
        padding: 0px 10px;
        width: 100%;
        height: 100%;
        background-color: transparent;
        text-align: left;
        font-size: 16px;

        &:hover, &:active {
            background-color: transparent;
        }
    }

    & > svg {
        position: absolute;
        right: 0;
        z-index: -10;
        width: 25px;
        height: 25px;
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

export const dateInput = (isNone) => css`
    ${isNone && NO_INPUT_DATE_DEFAULT_VALUE}
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
    }
`;