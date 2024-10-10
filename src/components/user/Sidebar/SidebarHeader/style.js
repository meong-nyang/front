import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    height: 4.5%;
`;

export const menuToggleButton = css`
    display: flex;
    margin: 8px;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    padding: 10px;
    background-color: white;
    cursor: pointer;
    
    &:hover {
        background-color: #fafafa;
    }

    &:active {
        background-color: #eeeeee;
    }
`;