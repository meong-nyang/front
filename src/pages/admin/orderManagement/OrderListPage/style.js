import { css } from "@emotion/react";
import { COLORS } from "../../../../constants/colors";

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

    & th, td {
        text-align: center;
    }

    & tr *:nth-of-type(1) {
        width: 10%;
    }

    & tr *:nth-of-type(2) {
        width: 10%;
    }

    & tr *:nth-of-type(3) {
        width: 10%;
    }

    & tr *:nth-of-type(4) {
        width: 30%;
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

export const trHover = css`
    & td {
        cursor: pointer;
    }

    &:hover {
        background-color: ${COLORS.mainColor};
    }
`;

export const tableBody = css`
    & tr {
        cursor: pointer;
    }
`;

export const productCell = css`
    & > td {
        width: 10% !important;
    }
`;