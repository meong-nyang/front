import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #D2E0FB;

    & > h1 {
        margin-bottom: 0px;
    }
`;

export const loginBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid white;
    padding: 10px;
    width: 450px;
    height: 55%;
    border-radius: 15px;
    background-color: #ffffff;
    box-shadow: 2px 2px 1px;

    & input {
        margin: 15px 0px 3px;
        width: 350px;
        height: 45px;
        border-radius: 10px;
        padding: 0px 10px;
        font-size: 16px;
    }

    & a {
        display: flex;
        justify-content: end;
        align-items: center;
        font-size: 14px;
    }

    & p {
        display: flex;
        margin: 10px 0px;
        font-size: 12px;
    }

    & button {
        width: 370px;
        height: 35px;
        border-radius: 10px;
        background-color: #BDCCFF;
        outline: none;
        cursor: pointer;

        &:hover {
            background-color: #97abeb;
        }

        &:active {
            background-color: #7b95eb;
        }
    }
`;

export const logoBox = css`
    display: flex;
    margin: 10px 0px;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 60%;
    height: 150px;
`;

export const findPassword = css`
    display: flex;
    justify-content: end;
    align-items: center;
`;
