import { css } from "@emotion/react";

export const header = css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    width: 100%;
    height: 30px;

    & > span {
        display: inline-block;
        font-size: 16px;
        font-weight: 600;
    }

    & button:nth-last-of-type(1) {
        margin-left: 5px;
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
        width: 2%;
    }

    & tr *:nth-of-type(2) {
        width: 15%;
    }

    & tr *:nth-of-type(3) {
        width: 23%;
    }

    & tr *:nth-of-type(4) {
        width: 15%;
    }

    & tr *:nth-of-type(5) {
        width: 15%;
    }

    & tr *:nth-of-type(6) {
        width: 15%;
    }

    & tr *:nth-of-type(7) {
        width: 15%;
    }
`;