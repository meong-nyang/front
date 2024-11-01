import { css } from "@emotion/react";

export const layout = css`
    width: 100%;
    height: 100%;

    & > span {
        display: inline-block;
        margin-bottom: 5px;
    }

    & > span:not(:nth-of-type(1)) {
        margin-top: 20px;
    }
`;

export const buttons = css`
    display: flex;
    justify-content: end;
`;

export const productList = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    & > div {
        box-sizing: border-box;
        padding-bottom: 20px;
        width: 48%;
        
    }

    & > div:nth-of-type(even) {
        margin-left: 4%;
    }
`;

export const productTable = css`
    display: flex;

    & table {
        /* table-layout: fixed; */
        width: 100%;

        & th {
            width: 15%;
        }

        % td {
            width: 35%;
        }
    }

    & img {
        width: 90px;
        height: 90px;
    }
`;