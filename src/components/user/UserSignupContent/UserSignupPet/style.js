import { css } from "@emotion/react";

export const inputBox = css`
    box-sizing: border-box;
    color: #777777;

    & input::-webkit-outer-spin-button,
    & input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    & > p {
        margin: 15px 0px 7px;
        font-size: 14px;
        font-weight: 600;
        cursor: default;
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

export const typeBox = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    justify-content: space-between;

    & > label{
        cursor: pointer;
    }
    & > label:nth-of-type(1) {
        margin-right: 10px;
    }

    & > input {
        display: none;
        appearance: none;

        & + label {
            box-sizing: border-box;
            width: 49%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            border: 1px solid #E0E0E0;
            border-radius: 5px;
            font-size: 14px;
        }
    }

    & > input:checked + label{
        box-sizing: border-box;
        background-color: #FFF5D6;
        border: none;
    }
`;

export const locationBox = css`
    box-sizing: border-box;
    flex-grow: 1;
    display: flex;
    justify-content: start;
    align-items: end;
    color: #777777;
    font-weight: 600;
    & > p{
        display: flex;
        align-items: center;
        cursor: pointer;
    }
`;

export const inputAge = css`
    margin-top: 10px;
`;