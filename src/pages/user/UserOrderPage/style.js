import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    position: relative;
    display: flex;
    width: 1000px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 80px;
    padding: 20px;
    & > p {
        font-size: 25px;
        font-weight: 600;
        color: #9d6c4c;
        margin-bottom: 20px;
    }
`;

export const productLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const titleLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px 0px;
    border-bottom: 1px solid #e0e0e0;
    & > p {
        font-size: 18px;
        font-weight: 600;
    }
`;

export const categoryLayout = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    padding: 10px 0px;
    border-bottom: 1px solid #e0e0e0;
    & > p {
        box-sizing: border-box;
        display: flex;
        width: 205px;
        justify-content: center;
        align-items: center;
        &:nth-of-type(1) {
            width: 550px !important;
        }
    }
`;

export const infoLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 30px;
    & > p {
        padding: 30px 10px 10px;
        width: 100%;
        font-size: 18px;
        font-weight: 600;
        border-bottom: 1px solid #e0e0e0;
    }
`;

export const orderInfoLayout = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    /* border-bottom: 1px solid #e0e0e0; */
    & > div {
        box-sizing: border-box;
        display: flex;
        & > p {
        padding: 30px 10px 10px;
        font-size: 18px;
        font-weight: 600;
        }
        & > p:nth-last-of-type(1) {
            padding: 30px 0px 10px;
            font-size: 14px;
            color: #777777;
            font-weight: 400;
        }
    }
`;

export const checkBoxLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0px 10px;
    font-size: 14px;
    color: #777777;
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
        margin-right: 10px;
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
        background-color: #FFF5D6;
        content:"✔";
        color: #9d6c4c;
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

export const inputBox = css`
    box-sizing: border-box;
    width: 700px;
    color: #777777;
    & > div {
        box-sizing: border-box;
        display: flex;
        & > p {
            margin: 10px 10px 7px 0px;
            font-size: 14px;
            font-weight: 600;
        }
        & > p:nth-last-of-type(1) {
            color: red;
        }
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

export const addressInputBox = css`
    box-sizing: border-box;
    width: 700px;
    color: #777777;
    & > div:nth-of-type(1) {
        box-sizing: border-box;
        display: flex;
        & > p {
            margin: 10px 10px 7px 0px;
            font-size: 14px;
            font-weight: 600;
        }
        & > p:nth-last-of-type(1) {
            color: red;
        }
    }

    & > div {
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
    }

    & > input {
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #E0E0E0;
        border-radius: 5px;
        outline: none;
    }
`;

export const priceLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 10px;
    & > div {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 20px;
        & > p:nth-of-type(1) {
            font-size: 14px;
            color: #777777;
        }
        & > p:nth-of-type(2) {
            font-size: 16px;
            font-weight: 600;
        }
    }
`;

export const totalPriceLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
    & > p {
        padding: 10px 0px 10px;
        font-size: 16px;
        font-weight: 600;
    }
`;

export const paymentMethodLayout = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    & > p {
        padding: 30px 10px 10px 0px;
        font-size: 18px;
        font-weight: 600;
    }

    & > p:nth-last-of-type(1) {
        font-size: 14px;
        font-weight: 400;
        color: #777777;
    }
`;

export const paymentLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-start;

    & > input {
        display: none;
    }

    & > label {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 306px;
        height: 40px;
        margin: 7px;
        border: 1px solid #e0e0e0;
        background-color: #ffffff;
        color: #777777;
    }

    & > input:checked + label {
        background-color: #FFF5D6;
        border: none;
    }

`;


