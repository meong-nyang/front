import { css } from "@emotion/react";

export const inputBox = css`
    box-sizing: border-box;
    color: #777777;
    
    & > input {
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        padding: 10px;
        border: 1px solid #E0E0E0;
        border-radius: 5px;
        outline: none;
    }
`;

export const locationBox = css`
    box-sizing: border-box;
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    color: #777777;
    font-weight: 600;
    & > p {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
`;

export const userInfoTag = css`
    display: flex;
    box-sizing: border-box;
    color: #777777;

    & > p:nth-of-type(1) {
        margin: 10px 0px 7px ;
        font-size: 16px;
        font-weight: 600;
    }

    & > p:nth-last-of-type(1) {
        margin-top: 10px;
        margin-left: 12px;
        font-size: 14px;
        color: red;
    }
`;


