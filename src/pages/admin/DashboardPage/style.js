import { css } from "@emotion/react";

export const total = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;

    & > div:nth-of-type(1) {
        margin-bottom: 5px;
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

        & > a {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: black;

            & > svg {
                margin-right: 5px;
            }

            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }

    table {
        margin-top: 10px;
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

export const statisticsLayout = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const graph = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
`;