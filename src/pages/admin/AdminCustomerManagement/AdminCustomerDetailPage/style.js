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

export const membershipCell = css`
    position: relative;
    cursor: pointer;

    & > svg {
        position: absolute;
        right: 10px;
    }
`;

export const backClick = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
`;

export const modal = css`
    position: absolute;
    box-sizing: border-box;
    top: 28px;
    left: 0px;
    border: 1px solid #dbdbdb;
    box-shadow: 2px 2px 5px #00000055;
    width: 100%;
    background-color: white;
    cursor: pointer;

    & > button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 30px;
        background-color: white;
        cursor: pointer;

        &:hover {
            background-color: #dbdbdb;
        }
    }
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
        width: 400px;
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

    & th, td {
        border: 1px solid black;
        text-align: center;
    }

    & tr > *:nth-of-type(1) {
        width: 15%;
    }

    & tr > *:nth-of-type(2) {
        width: 40%;
    }

    & tr > *:nth-of-type(3) {
        width: 10%;
    }

    & tr > *:nth-of-type(4) {
        width: 10%;
    }

    & tr > *:nth-of-type(5) {
        width: 10%;
    }

    & tr > *:nth-of-type(6) {
        width: 15%;
    }
`;