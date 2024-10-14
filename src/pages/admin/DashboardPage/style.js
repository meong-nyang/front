import { css } from "@emotion/react";
import { ADMIN_PAGE_COLORS } from "../../../constants/colors";
import { TABLE_SIZE } from "../../../constants/testDatas/tableSettings";

export const total = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;

    & > div:nth-of-type(1) {
        font-weight: 600;
        margin-bottom: 5px;
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    th, td {
        box-sizing: border-box;
        border: 1px solid #000000;
        height: ${TABLE_SIZE.cellHeight};
        text-align: center;
    }

    th {
        background-color: ${ADMIN_PAGE_COLORS.tableTitleBg};
        width: ${TABLE_SIZE.thWidth};
        font-weight: 500;
    }

    td {
        width: ${TABLE_SIZE.tdWidth};
    }
`;

export const information = css`
    display: flex;
    width: 100%;
`;

export const leftInfo = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 50%;
    height: 100%;

    & > div:nth-of-type(1) {
        margin-bottom: 20px;
    }
`;

export const rightInfo = css`
    display: flex;
    justify-content: end;
    width: 50%;
    height: 100%;

    & > div {
        height: 660px;
    }
`;

export const card = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 10px 20px;
    width: 805px;
    height: 320px;

    & > header {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
    }

    & > footer {
        display: flex;
        justify-content: end;
        align-items: center;
        font-weight: 600;

        &:hover {
            text-decoration: underline;
        }

        & > a {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: black;

            & > svg {
                margin-right: 5px;
            }
        }
    }

    table {
        margin-top: 10px;
        border-collapse: collapse;
        width: 100%;
    }

    th, td {
        box-sizing: border-box;
        text-align: center;
        width: 150px;
    }

    th {
        border-top: 1px solid #c9c9c9;
        border-bottom: 1px solid #c9c9c9;
        padding: 5px 0px;
        font-weight: 500;
    }

    td {
        padding: 5px 0px;
        font-size: 15px;
    }
`;

export const graph = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
`;