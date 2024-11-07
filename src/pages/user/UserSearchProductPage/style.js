import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 80px;
   
`;

export const searchLayout = css`
    box-sizing: border-box;
    position: relative;
    width: 500px;
    height: 50px;
    margin-top: 200px;
    & > input {
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
        padding: 0px 10px;
        background-color: transparent;
        border-bottom: 2px solid #9d6c4c;
    }
    & > svg {
        position: absolute;
        top: 12px;
        right: 0;
        font-size: 25px;
    }
`;