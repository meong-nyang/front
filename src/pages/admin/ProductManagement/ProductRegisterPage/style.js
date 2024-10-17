import { css } from "@emotion/react";

export const layout = css`
    width: 100%;
    height: 100%;
`;

export const buttons = css`
    display: flex;
    justify-content: end;
    margin: 10px 0px 5px;
    width: 100%;
    height: 30px;

    & > button {
        margin-left: 5px;
    }
`;