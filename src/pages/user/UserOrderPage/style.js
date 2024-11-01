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
        color: #777777;
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
        width: 100%;
        padding: 30px 0px 10px;
        border-bottom: 1px solid #e0e0e0;
        font-size: 18px;
        font-weight: 600;
    }
`;

export const inputBox = css`
    box-sizing: border-box;
    width: 700px;
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

export const addressInputBox = css`
    box-sizing: border-box;
    width: 700px;
    color: #777777;
    & > p {
        margin: 15px 0px 7px;
        font-size: 14px;
        font-weight: 600;
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
    width: 100%;
    border-bottom: 1px solid #e0e0e0;
    & > p {
        padding: 30px 0px 10px;
        font-size: 18px;
        font-weight: 600;
    }
`;

export const paymentMethod = css`
    border-bottom: none !important;
`;

export const paymentLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-start;

    & button {
        box-sizing: border-box;
        width: 306px;
        height: 40px;
        margin: 7px;
        border: 1px solid #e0e0e0;
        background-color: #ffffff;
        font-weight: 600;
        color: #777777;
    }
`;

export const orderButton = css`
    box-sizing: border-box;
    width: 400px;
    height: 40px;
    margin-top: 50px;
    border: none;
    background-color: #93B19F;
    color: #ffffff;
    font-weight: 600;
`;
