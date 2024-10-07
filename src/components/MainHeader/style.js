import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100px;
    background-color: #D2E0FB;
`;

export const frame = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid white;
    height: 50%;
`;



export const account = css`
    display: flex;

    & > a {
        margin-right: 10px;
    }
`;

export const category = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    & > a {
        margin-right: 35px;
    }
`;