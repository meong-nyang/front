import { css } from "@emotion/react";

export const layout = css`
    width: 100%;
    height: 100%;

    & > span {
        display: inline-block;
        margin-top: 20px;
        margin-bottom: 5px;
    }
`;

export const buttons = css`
    display: flex;
    justify-content: end;
    margin-bottom: 5px;
`;

export const detail = css`
    box-sizing: border-box;
    border: 1px solid black;
    width: 100%;
    height: 300px;
`;