import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 650px;
    height: auto;
    margin: 70px 0px 70px 30px;
    padding: 20px 30px 30px;
    background-color: #ffffff;
    border-radius: 10px;

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
    & > button {
        border: none;
        background-color: transparent;
        margin-left: 5px;
        font-weight: 600;
        font-size: 16px;
        color: #777777;
        cursor: pointer;

        &:hover {
            color: #9d6c4c;
        }
    }
`;
