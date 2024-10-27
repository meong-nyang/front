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
    padding: 20px;
    & > p {
        font-size: 25px;
        font-weight: 600;
        color: #777777;
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

export const titleLayout = css`
    box-sizing: border-box;
    display: flex;
    margin-top: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
    & > p {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        &:nth-of-type(1) {
            width: 90px;
        }
        &:nth-of-type(2) {
            width: 478px;
        }
        &:nth-last-of-type(1) {
            width: 90px;
        }
    }
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
                font-size: 14px;
                color: #777777;
            }
            &:nth-last-of-type(1) {
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
        width: 280px;
        height: 40px;
        padding: 10px;
        border: none;
        color: #777777;
        font-weight: 600;
        &:nth-of-type(1) {
            color: #777777;
            background-color: #E7E7E7;
            margin-right: 30px;
        }

        &:nth-last-of-type(1) {
            color: #ffffff;
            background-color: #FFB69C;
            
        }
    }

`;

