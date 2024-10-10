import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 150px;
    background-color: #D2E0FB;
`;

export const frame = css`
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    border-bottom: 2px solid white;
    height: 50%;
`;

export const menuToggleButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    margin-right: 15px;
    background-color: white;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #eeeeee;
    }
`;

export const account = css`
    display: flex;
    & > a {
        margin-right: 10px;
    }
`;

export const accountIcons = css`
    display: flex;
    & > svg {
        font-size: 16px;
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