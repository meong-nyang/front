import { css } from "@emotion/react";

export const layout = css`
    width: 100%;
    height: 100%;
`;

export const header = css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    width: 100%;
    height: 30px;

    & > span {
        display: flex;
        align-items: center;
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
    width: 100%;

    & input[type="checkbox"] {
        width: 15px !important;
        height: 15px !important;
        cursor: pointer;
    }

    & > tbody tr {
        cursor: pointer;
    }

    & th, td {
        border: 1px solid black;
        text-align: center;
    }

    & tr > *:nth-of-type(1) {
        padding: 0;
        width: 2%;
        cursor: default;
    }

    & tr > *:nth-of-type(2) {
        width: 15%;
    }

    & tr > *:nth-of-type(3) {
        width: 20%;
    }

    & tr > *:nth-of-type(4) {
        width: 30%;
    }

    & tr > *:nth-of-type(5) {
        width: 10%;
    }

    & tr > *:nth-of-type(6) {
        width: 10%;
    }

    & tr > *:nth-of-type(7) {
        width: 13%;
    }
`;