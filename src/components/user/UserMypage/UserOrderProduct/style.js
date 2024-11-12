import { css } from "@emotion/react";

export const contentLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #e0e0e0;

    & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 160px;
        height: 100%;
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

export const deliveryLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > p {
        color: #04B500;
        margin-bottom: 5px;
    }
    & > button {
        box-sizing: border-box;
        padding: 7px 10px;
        border: none;
        color: #000000;
        font-size: 12px;
        background-color: #f0f0f0;
        border-radius: 5px;
    }
`;