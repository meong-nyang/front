import { css } from "@emotion/react";

export const buttonLayout = css`
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    padding-bottom: 10px;
    & > p {
        margin-left: 10px;
        font-size: 14px;
        color: #777777;
        cursor: pointer;
    }
`;

export const inputBox = css`
    box-sizing: border-box;
    color: #777777;
    & > p {
        margin: 10px 0px 7px;
        font-size: 14px;
        font-weight: 600;
    }

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

export const addressBox = css`
    & > input {
        margin-bottom: 10px; 
    }
`;

export const searchAddressBox = css`
    box-sizing: border-box;
    display: flex;
    
    & > input {
        flex-grow: 1;
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        padding: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        border: 1px solid #E0E0E0;
        border-radius: 5px;
        outline: none;
    }

    & > button {
        box-sizing: border-box;
        width: 80px;
        height: 40px;
        border: none;
        border-radius: 5px;
        background-color: #E0E0E0;
        color: #777777;
        cursor: pointer;
    }
`;