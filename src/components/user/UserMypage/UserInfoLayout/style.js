import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 650px;
    height: auto;
    padding: 15px 30px;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    margin-bottom: 30px;
    /* border-radius: 15px;
    box-shadow: 5px 5px 20px #00000028; */

    & > div:nth-of-type(1) {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #E0E0E0;
        & > p {
            font-size: 18px;
            font-weight: 900;
            padding-bottom: 10px;
            cursor: default;
        }
    }
`;

export const buttonLayout = css`
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    padding-bottom: 10px;
    & > p {
        margin-left: 10px;
        font-weight: 600;
        font-size: 14px;
        color: #777777;
        cursor: pointer;
    }
`;
