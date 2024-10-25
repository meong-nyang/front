import { css } from "@emotion/react";

export const layout = css`
    width: 100%;
    height: 100%;

    & > span {
        display: inline-block;
        margin-bottom: 5px;
        margin-top: 20px;
    }
`;

export const buttons = css`
    display: flex;
    justify-content: end;
`;

export const basicInfo = css`

`;

export const petInfo = css`
    display: flex;
    width: 100%;
    height: 100px;

    & > img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    & table {
        border-collapse: collapse;
        width: 500px;

    }
`;

export const productTable = css`
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
        width: 40%;
    }

    & tr > *:nth-of-type(4) {
        width: 10%;
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