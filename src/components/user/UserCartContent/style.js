import { css } from "@emotion/react";

export const contentLayout = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 20px 0px;
    border-bottom: 1px solid #e0e0e0;
    & > div {
        &:nth-of-type(1), :nth-last-of-type(1) {
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 90px;
        }
        &:nth-of-type(2) {
            width: 478px;
        }
    }
    & > p {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
    }
    & svg {
        cursor: pointer;
    }
    
`;

export const checkboxStyle = css`
    box-sizing: border-box;
    & svg {
        position: absolute;
        font-size: 14px;
        color: #e0e0e0;
    }
    & > input {
        display: none;
    }

    & > input + label {
        box-sizing: border-box;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 18px;
        height: 18px;
        border: 1.5px solid #e0e0e0;
        border-radius: 50%;
        color: #e0e0e0;
        font-size: 12px;
        cursor: pointer;
    }

    & > input:checked + label::after {
        box-sizing: border-box;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: #FFB69C;
        content:"✔";
        color: #ffffff;
        font-size: 12px;
        width: 18px;
        height: 18px;
        left: -10;
        top:-1;
        & > svg {
            color: #ffffff;
            z-index: 100;
        }
    }
`;

export const productLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: row !important;
    justify-content: flex-start !important;
    width: 478px !important;

    & > img {
        margin: 0px 20px;
        width: 50px;
        height: 50px;
        background-color: red;
    }
    & > div {
        display: flex;
        flex-direction: column;
        & > p {
            
            &:nth-of-type(2) {
                color: #777777;
                font-size: 14px;
            }
        }
    }
`;

export const countLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    & > input {
        box-sizing: border-box;
        display: flex;
        width: 25px;
        justify-content: center;
        align-items: center;
        border: none;
        outline: none;
        font-size: 18px;
        font-weight: 600;
        color: #777777;
    }
    & > svg {
        font-size: 20px;
        color: #FFB69C;
    }
`;