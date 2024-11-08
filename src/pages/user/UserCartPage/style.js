import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    position: relative;
    display: flex;
    width: 1000px;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 20px;
    & > p {
        font-size: 25px;
        font-weight: 600;
        color: #9d6c4c;
        margin-bottom: 20px;
    }
`;

export const selectLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 100%;

    & > div {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        & > label, input {
            cursor: pointer;
        }
    }
    & > button {
        box-sizing: border-box;
        width: 80px;
        border: none;
        border-radius: 5px;
        padding: 7px 10px;

    }
`;

export const checkboxStyle = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #777777;
    & svg {
        position: absolute;
        font-size: 14px;
        color: #e0e0e0;
    }
    & > input {
        display: none;
    }

    & > label {
        font-size: 16px;
        font-weight: 600;
    }

    & > input + label {
        box-sizing: border-box;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 18px;
        height: 18px;
        margin-right: 10px;
        border: 1.5px solid #e0e0e0;
        border-radius: 50%;
        color: #e0e0e0;
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
        color: #fff5d6;
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

export const titleLayout = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    margin-top: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
    & > p {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10%;
        &:nth-of-type(1) {
            width: 5%;
        }
        &:nth-of-type(2) {
            width: 70%;
        }
        &:nth-last-of-type(1) {
            width: 5%;
        }
    }
`;
export const blankText = css`
    padding-top: 80px;
`;

export const paymentLayout = css`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 60px 0px;
    
    & > p {
        box-sizing: border-box;
        padding-bottom: 10px;
        border-bottom: 1px solid #e0e0e0;
        font-size: 18px;
        font-weight: 600;
    }

`;

export const priceLayout = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    padding: 30px 100px;

    & > div {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & > p {
            &:nth-of-type(1) {
                margin-bottom: 30px;
                font-size: 16px;
                color: #777777;
            }
            &:nth-last-of-type(1) {
                font-size: 18px;
                font-weight: 600;
            }
        }

    }
`;

export const orderButtonLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    & > button {
        box-sizing: border-box;
        padding: 10px 100px;
        border: none;
        border-radius: 5px;
        color: #777777;
        font-size: 18px;
        &:nth-of-type(1) {
            color: #777777;
            background-color: #E7E7E7;
            margin-right: 30px;
        }

        &:nth-last-of-type(1) {
            color: #ffffff;
            background-color: #9d6c4c;
            font-weight: 600;
            
        }
    }

`;

