import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: white;
`;

export const container = css`
    box-sizing: border-box;
    padding: 20px;
    width: 50%;
    height: 100%;
`;

export const stockHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const infoTable = css`
    margin-top: 5px;
    margin-bottom: 20px;
    width: 100%;
    border-collapse: collapse;
`;

export const inputAlert = css`
    & td {
        padding: 0;
    }

    & input[type="checkbox"] {
        box-sizing: border-box;
        margin-left: 10px;
        width: 15px;
        height: 15px;
    }

    & input[type="text"] {
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
    }
`;

export const radioBox = css`
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

export const headerInput = css`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 60px;

    & > input {
        box-sizing: border-box;
        outline: none;
        margin: 0;
        padding: 0 10px;
        height: 30px;
    }

    & > span {
        box-sizing: border-box;
        display: inline-block;
        margin-right: 10px;
    }

    & > input:nth-of-type(1) {
        margin-right: 30px;
    }

    & > input:nth-of-type(2) {
        width: auto;
        margin-right: 10px;
    }
`;

export const mainContainer = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-top: 20px;
`;

export const inbound = css`
    margin-bottom: 20px;
    width: 100%;
    height: calc(50% - 15px);
`;

export const inoutHistory = css`
    width: 100%;
    height: calc(50% - 15px);

    & > span {
        display: inline-block;
        margin: 5px 0;
    }

    & td {
        text-align: center;
    }
`;

export const searchContainer = css`
    display: flex;
    justify-content: space-between;
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

    & > button {
        margin-left: 20px;
        width: 50px;
    }
`;

export const table = css`
    margin-top: 5px;

    & button {
        width: 50px;
        height: 25px;

        &:nth-of-type(1) {
            margin-right: 5px;
        }
    }
    
    th, td {
        border: none;
        text-align: center;
        width: 150px;
    }

    th {
        border-top: 1px solid #c9c9c9;
        border-bottom: 1px solid #c9c9c9;
        background-color: white;
    }

    td {
        padding: 0;
        font-size: 14px;
    }
`;