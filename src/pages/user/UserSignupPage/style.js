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

export const userSignupContainer = css`
    display: flex;
    justify-content: center;
    width: 70%;
    height: 100%;
`;

export const userSignupNavBox = css`
    position: absolute;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    left: 20%;
    margin-top: 20px;
    margin-right: 20px;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    width: 200px;
    height: 250px;
    padding: 10px;
    background-color: #fff9f9;
`;

export const userSignupNavBoxHeader = css`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-radius: 5px;
    width: 100%;
    height: 20%;
    padding: 10px;
`;

export const userSignupNavBoxBody = css`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-top: 1px solid;
    width: 100%;

    & li {
        margin: 10px 0px;
    }
`;

export const userSignupNavBoxFooter = css`
    
`;

export const signupBox = css`
    position: relative;
    box-sizing: border-box;
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
    border: 1px solid white;
    padding: 10px 50px;
    width: 600px;
    height: 700px;
    border-radius: 15px;
    background-color: #ffffff;
    box-shadow: 2px 2px 1px;

    & > button {
        box-sizing: border-box;
        border: 1px solid;
        margin-top: 30px;
        width: 250px;
        height: 35px;
        border-radius: 10px;
        font-size: 16px;
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
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;

    & > h3 {
        padding-bottom: 20px;
        border-bottom: 1px solid #dbdbdb;
    }

    & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        & > input {
            box-sizing: border-box;
            border-radius: 5px;
            margin: 10px 0px;
            padding: 0px 95px 0px 10px;
            width: 75%;
            height: 35px;
            border: none;
            outline: none;
            background-color: #eceaea;

            & + button {
                position: absolute;
                display: flex;
                right: 60px;
            }
        }
    }
`;

export const addressInput = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 75%;

    & input {
        box-sizing: border-box;
        border-radius: 5px;
        margin: 10px 0px;
        width: 100%;
        height: 35px;
        padding: 0px 10px;
        border: none;
        outline: none;
        background-color: #eceaea;
    }

    & > div:nth-of-type(1) {
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > input {
            width: 75%;
        }

        & > button {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            height: 35px;
        }
    }
`;

