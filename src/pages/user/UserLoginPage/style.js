import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > h1 {
        margin-bottom: 0px;
    }
`;

export const loginBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    padding: 10px;
    width: 40%;
    height: 55%;
    border-radius: 15px;

    & > input {
        margin-top: 15px;
        width: 80%;
        height: 40px;
        border-radius: 10px;
        padding: 0px 10px;
        font-size: 16px;
    }

    & p {
        display: flex;
        margin-top: 5px;
        font-size: 12px;
    }

    & > button {
        width: 80%;
        height: 35px;
        border-radius: 10px;
        background-color: #BDCCFF;

        &:hover {
            background-color: #97abeb;
        }

        &:active {
            background-color: #7b95eb;
        }
    }
`;

export const userJoin = css`
    display: flex;
    align-items: center;

`;