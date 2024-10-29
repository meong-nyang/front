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

export const productTable = css`
    display: flex;

    & img {
        width: 90px;
        height: 90px;
    }
`;