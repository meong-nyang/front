import { css } from "@emotion/react";

export const background = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: transparent;
    cursor: default;
`;

export const layout = css`
    display: flex;
    position: absolute;
    top: 30px;
    left: 0;
    z-index: 200;
    border: 1px solid #dbdbdb;
    box-shadow: 2px 2px 5px #00000022;
    width: 650px;
    height: 300px;
    background-color: white;
    cursor: default;

    & > div {
        width: 50%;
        height: 100%;
        overflow: hidden;

        & > span {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 40px;
            background-color: #b1d4ff88;
            font-weight: 600;
        }

        & > div {
            display: flex;
            justify-content: center;
            align-items: center;

            & > input {
            display: none;

            &:checked + label {
                background-color: #FFF5D6;
            }
        }

        & > label {
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 40px;
            cursor: pointer;

            &:hover {
                background-color: #FFF5D655;
            }
        }
        }
    }
`;