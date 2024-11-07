import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    width: 100%;
    min-height: 80px;
    background-color: #FFF5D6;

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
        /* margin-left: 160px; */

        & > a, button {
            margin-right: 50px;
            text-decoration: none;
            font-size: 18px;
            color: #777777;
            &:nth-last-of-type(1) {
                margin: 0px;
            }
        }
    }

    & > div:nth-last-of-type(1) {
        display: flex;
        align-items: center;
        font-size: 16px;
        width: auto;
        & > a, button {
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: 15px;
            font-size: 16px;
            color: #000000;
            text-decoration: none;
            &:nth-last-of-type(1) {
                margin: 0;
            }
        }

        & > button {
            padding: 0;
            padding-left: 15px;
            border: none;
            background-color: transparent;
        }

        & svg {
            font-size: 23px;
        }
    }
`;