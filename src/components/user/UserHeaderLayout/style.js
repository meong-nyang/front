import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    width: 100%;
    height: 80px;
    z-index: 100;
    background-color: #FFF5D6;
    color: #777777;

    & > div:nth-of-type(1) {
        width: 206px;
        &  img {
            width: 45px;
            height: 45px;
        }
    }
    & > div:nth-of-type(2) {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        /* margin-left: 160px; */

        & > a, button {
            margin-right: 50px;
            color: #777777;
            text-decoration: none;
            font-size: 18px;
            &:nth-last-of-type(1) {
                margin: 0px;
            }
        }

        & > button {
            border: none;
            background-color: transparent;
            font-size: 18px;
            font-weight: 600;
        }
    }

    & > div:nth-last-of-type(1) {
        display: flex;
        align-items: center;
        font-size: 16px;
        width: auto;
        & > a, button {
            margin-right: 20px;
            color: #777777;
            font-size: 14px;
            text-decoration: none;
            &:nth-last-of-type(1) {
                margin: 0;
            }
        }

        & > button {
            margin-right: 20px !important;
            border: none;
            background-color: transparent;
        }

        & svg {
            font-size: 23px;
        }
    }
`;