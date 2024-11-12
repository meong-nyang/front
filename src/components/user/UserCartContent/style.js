import { css } from "@emotion/react";

export const contentLayout = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    align-items: center;
    padding: 20px 0px;
    border-bottom: 1px solid #e0e0e0;
    & > div {
        width: 10%;
        &:nth-of-type(1), :nth-last-of-type(1) {
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 5%;
        }
        &:nth-of-type(2) {
            width: 70%;
        }
    }
    & > p {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10%;
    }
    & svg {
        /* width: 5%; */
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
        background-color: #9d6c4c;
        content:"✔";
        color: #FFF5D6;
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
    width: 100%;
    flex-direction: row !important;
    justify-content: flex-start !important;

    & > img {
        margin: 0px 20px;
        width: 50px;
        height: 50px;
    }
    & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        & > p {
            font-weight: 600;
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
        color: #777777;
        background-color: #fafafa;
        text-align: center;
    }
    & > svg {
        font-size: 20px;
        color: #9d6c4c;
    }
`;