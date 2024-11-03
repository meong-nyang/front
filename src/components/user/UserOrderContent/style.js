import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    padding: 20px 0px;
    border-bottom: 1px solid #e0e0e0;
    & > p {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 205px;
        &:nth-last-of-type(1) {
            font-weight: 600;
        }
    }
`;

export const productLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: row !important;
    justify-content: flex-start !important;
    width: 550px;

    & > img {
        margin: 0px 20px;
        width: 50px;
        height: 50px;
        background-color: red;
    }
    & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        & > p:nth-of-type(1) {
            color: #777777;
            font-size: 14px;
        }
    }
`;