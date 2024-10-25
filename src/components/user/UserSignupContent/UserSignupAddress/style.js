import { css } from "@emotion/react";

export const inputBox = css`
    box-sizing: border-box;
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

export const locationBox = css`
    box-sizing: border-box;
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    color: #777777;
    font-weight: 600;
    & > p{
        display: flex;
        align-items: center;
        cursor: pointer;
    }
`;

export const container = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;

`;