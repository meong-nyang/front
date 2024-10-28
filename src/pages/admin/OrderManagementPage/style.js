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

export const tableLayout = css`
    width: 100%;
    height: 100%;
`;

export const mainTable = css`
    border-collapse: collapse;
    width: 300px;

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
        width: 10%;
    }

    & tr *:nth-of-type(3) {
        width: 10%;
    }

    & tr *:nth-of-type(4) {
        width: 10%;
    }

    & tr *:nth-of-type(5) {
        width: 28%;
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

    & tr *:nth-of-type(9) {
        width: 10%;
    }
`;