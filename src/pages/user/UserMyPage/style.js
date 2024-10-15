import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #D2E0FB;
    height: 100%;

    & > h1 {
        margin: 0px;
    }
`;

export const userInformation = css`
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid white;
    padding: 10px 50px;
    width: 600px;
    height: 42%;
    border-radius: 15px;
    background-color: #ffffff;
    box-shadow: 2px 2px 1px;

    & > button {
        position: relative;
        margin-top: 30px;
        width: 70px;
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

export const userPassword = css`
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid white;
    padding: 10px 50px;
    width: 600px;
    height: 30%;
    border-radius: 15px;
    background-color: #ffffff;
    box-shadow: 2px 2px 1px;

    & > button {
        position: relative;
        margin-top: 30px;
        width: 70px;
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

export const formInput = css`
    display: flex;
    flex-direction: column;
    width: 100%;

    & div {
        display: flex;
        justify-content: space-between;
    }

    & label {
        display: flex;
        align-items: center;
    }

    & input {
        border-radius: 5px;
        margin: 10px 0px;
        width: 350px;
        height: 35px;
        padding: 0px 10px;
        border: none;
        outline: none;
        background-color: #eceaea;
    }
`;


