import { css } from "@emotion/react";

export const header = css`
    display: flex;
    justify-content: end;
    margin-bottom: 5px;
    width: 100%;
    height: 30px;
`;

export const searchBox = css`
    position: relative;
    display: flex;
    border: 1px solid black;
    margin-bottom: 10px;

    & > div:nth-of-type(1) {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
    
        & > button {
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1;
            /* border-right: 1px solid #dbdbdb; */
            width: 150px;
            height: 30px;
            background-color: transparent;
            font-size: 16px;
            cursor: pointer;
        }

        & > svg {
            position: absolute;
            right: 0;
            width: 25px;
            height: 25px;
        }

        &::after {
            content: "";
            position: absolute;
            right: 0;
            border-right: 1px solid #787878;
            height: 60%;
        }
    }

    & > span {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
    }

    & > input {
        display: flex;
        flex-grow: 1;
        border: none;
        outline: none;
        padding: 0 10px;
        font-size: 16px;
    }
`;

export const searchOptionModal = css`
    position: absolute;
    top: 30px;
    width: 150px;
    background-color: white;
    box-shadow: 2px 2px 5px #00000044;

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
        width: 10%;
    }

    & tr *:nth-of-type(2) {
        width: 22%;
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
        width: 8%;
    }

    & tr *:nth-of-type(9) {
        width: 10%;
    }
`;