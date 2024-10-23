import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #BDCCFF;
    height: 100%;

    & > h1 {
        margin-top: 50px;
    }
`;

export const signupContainer = css`
    display: flex;
    justify-content: center;
    width: 50%;
    height: 35%;
`;

export const signupInputBox = css`
    display: flex;
    margin-top: 20px;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid white;
    padding: 20px;
    width: 70%;
    height: 100%;
    border-radius: 15px;
    background-color: #ffffff;
    box-shadow: 2px 2px 1px;
`;

export const logoBox = css`
    display: flex;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    width: 50%;
    height: 100%;
`;

export const signupInput = css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;

    & div {
        display: flex;
        justify-content: space-between;
        width: 80%;
        
        &:nth-of-type(1) {
            margin-top: 10px;
        }
    }

    & label {
        display: flex;
        align-items: center;

        
    }

    & input {
        border-radius: 5px;
        width: 350px;
        height: 45px;
        border: none;
        outline: none;
        padding: 0px 10px;
        background-color: #eceaea;
    }

    & > button {
        width: 370px;
        height: 35px;
        border-radius: 10px;
        border: none;
        background-color: #BDCCFF;
        cursor: pointer;

        &:hover {
            background-color: #97abeb;
        }

        &:active {
            background-color: #7b95eb;
        }   
    }
`;

