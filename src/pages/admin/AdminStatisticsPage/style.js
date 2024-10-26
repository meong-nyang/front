import { css } from "@emotion/react";

export const layout = css`
    width: 100%;
    height: 100%;
`;

export const selectTime = css`
    margin-bottom: 5px;

    & > span:nth-of-type(1) {
        display: inline-block;
        margin-right: 10px;
    }

    & > span:nth-of-type(2) {
        display: inline-block;
        margin: 0px 10px;
    }

    & > input[type="date"] {
        /* border: 1px solid #dbdbdb; */
        border: none;
        border-radius: 5px;
        outline: none;
        padding-left: 5px;
        width: 115px;
        height: 20px;
        font-size: 16px;
        font-weight: 500;
    }

    & > input[type="date"]:-webkit-calendar-picker-indicator {
        background-color: #FFB69C;
        color: #FFB69C;
    }
`;

export const mainTable = css`
    border-collapse: collapse;
    width: 100%;

    & input[type="checkbox"] {
        width: 15px !important;
        height: 15px !important;
        cursor: pointer;
    }

    & th, td {
        text-align: center;
    }

    & tr *:nth-of-type(1) {
        width: 20%;
    }

    & tr *:nth-of-type(2) {
        width: 10%;
    }

    & tr *:nth-of-type(3) {
        width: 10%;
    }

    & tr *:nth-of-type(4) {
        width: 10%;
    }

    & tr *:nth-of-type(5) {
        width: 10%;
    }

    & tr *:nth-of-type(6) {
        width: 10%;
    }

    & tr *:nth-of-type(7) {
        width: 10%;
    }

    & tr *:nth-of-type(8) {
        width: 10%;
    }
`;

export const graph = css`
    margin: 20px 0px;
    width: 100%;
    height: 450px;
`;