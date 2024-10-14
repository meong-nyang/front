import { css } from "@emotion/react";
import { ADMIN_PAGE_COLORS } from "../../../../constants/colors";
import { TABLE_SIZE } from "../../../../constants/testDatas/tableSettings";

export const layout = css`
    width: 100%;
    height: 100%;

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        box-sizing: border-box;
        border: 1px solid black;
        padding: 0px 20px;
        font-size: 16px;
        height: ${TABLE_SIZE.cellHeight};
    }

    th {
        width: ${TABLE_SIZE.thWidth};
        font-weight: 500;
        background-color: ${ADMIN_PAGE_COLORS.tableTitleBg};
    }

    td {
        width: ${TABLE_SIZE.tdWidth};
    }
`;

export const images = css`
    width: 100%;
    height: 100px;

    & > img {
        width: 100px;
        height: 100px;
        margin-right: 10px;
    }  
`;

export const buttons = css`
    display: flex;
    justify-content: end;
    margin: 10px 0px 5px;
    width: 100%;
    height: 30px;

    & > span {
        flex-grow: 1;
        display: flex;
        align-items: end;
        font-weight: 600;
    }

    & > button {
        margin-left: 5px;
    }
`;

export const mustData = css`
    width: 100%;

    table > tr:nth-of-type(2) > td:nth-of-type(1) {
        width: 35%;
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

`;