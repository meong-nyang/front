import { css } from "@emotion/react";

export const background = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    border: none !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
`;

export const layout = css`
    border: 1px solid #fafafa;
    box-shadow: 2px 2px 5px #00000055;
    z-index: 10;
    width: 1400px;
    height: 800px;
    background-color: white;
`;