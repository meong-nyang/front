import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #BDCCFF;
    height: 100%;

    & > h1 {
        margin: 0px;
    }
`;

export const userJoinContainer = css`
    display: flex;
    width: 70%;
    height: 100%;
`;

export const userJoinNavBox = css`
    display: flex;
    margin: 20px;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    width: 200px;
    height: 250px;
    padding: 10px;
    background-color: white;
`;

export const joinBox = css`
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid white;
    padding: 10px 50px;
    width: 600px;
    height: 700px;
    border-radius: 15px;
    background-color: #ffffff;
    box-shadow: 2px 2px 1px;

    & > button {
        margin-top: 30px;
        width: 370px;
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

    & div, td {
        display: flex;
        justify-content: space-between;

        & > td > input {
            width: 90px;
            margin-left: 15px;
        }
    }

    & label {
        display: flex;
        align-items: center;
    }

    & input {
        border-radius: 5px;
        margin: 10px 0px;
        width: 70%;
        height: 35px;
        padding: 0px 10px;
        border: none;
        outline: none;
        background-color: #eceaea;
    }
`;

export const phoneNumber = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    & input {
        flex: 1;
        height: 35px;
        border-radius: 5px;
        padding: 0px 10px;
        border: none;
        outline: none;
        background-color: #eceaea;
    }

    & input:last-of-type {
        margin-right: 0px;
    }
`;

export const addressBox = css`
    display: flex;
    flex-direction: column;

`;

export const typeBox = css`
    display: flex;
    align-items: center;
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
        display: flex;
        width: 100px;
    }
`;