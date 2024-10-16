import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #D2E0FB;
    height: 100%;

    & > h1 {
        margin-bottom: 0px;
    }
`;

export const loginBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    width: 450px;
    height: 70%;
    border-radius: 15px;
    background-color: #ffffff;
    box-shadow: 2px 2px 1px;

    & input {
        width: 375px;
        height: 45px;
        border-radius: 10px;
        padding: 0px 10px;
        font-size: 16px;
        outline: none;
    }

    & a {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        text-decoration: none;

        /* &:nth-of-type(1) {
            margin: 0px 0px 0px 210px;
        } */
    }

    & p {
        display: flex;
        margin: 10px 0px;
        font-size: 12px;
    }
`;

export const logoBox = css`
    display: flex;
    margin: 15px 0px 35px;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 60%;
    height: 180px;
`;

export const loginInputBox = css`
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;

    & > button {
        margin: 20px 0px;
        width: 370px;
        height: 40px;
        border-radius: 7px;
        background-color: #BDCCFF;
        border: none;
        outline: none;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;

        &:hover {
            background-color: #97abeb;
        }

        &:active {
            background-color: #7b95eb;
        }
    }
`;

export const inputWrapper = css`
    position: relative;
    margin-bottom: 15px;
    width: 88%;

    & > input {
        width: 100%;
        margin: 10px 0;
        border-radius: 5px;
        border: 1px solid #dbdbdb;
        outline: none;
        font-size: 16px;
        box-sizing: border-box;
    }

    & > label {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        transition: all 0.2s ease;
        pointer-events: none;
        padding: 0 5px;

    }

    & > input:focus + label,
    & > input:not(:placeholder-shown) + label {
        top: -5px;
        left: 0px;
        font-size: 12px;
    }
`;

export const findPassword = css`
    display: flex;
    justify-content: end;
    align-items: center;

    
`;

export const OAuthBox = css`
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    box-sizing: border-box;
    width: 85%;
    height: 50px;

    & > :nth-of-type(1) {
        display: flex;
        align-items: center;
        width: 50px;
        height: 50px;
        background-color: transparent;
        border: 1px solid #dbdbdb;
        border-radius: 5px;
        box-shadow: 2px 2px 2px #000000;
        cursor: pointer;

        & > svg {
            font-size: 40px;
        }

        &:hover {
            background-color: #eeeeee;
        }
    }

    & > :nth-of-type(2) {
        width: 50px;
        height: 50px;
        color: #3C1E1E;
        background-color: #FAE100;
        border: none;
        border-radius: 5px;
        box-shadow: 2px 2px 2px #000000;
        cursor: pointer;

        & > svg {
            font-size: 39px;
        }
    }

    & > :nth-of-type(3) {
        width: 50px;
        height: 50px;
        color: white;
        background-color: #03C75A;
        border: none;
        border-radius: 5px;
        box-shadow: 2px 2px 2px #000000;
        cursor: pointer;

        & > svg {
            font-size: 25px;
        }
    }
`;
