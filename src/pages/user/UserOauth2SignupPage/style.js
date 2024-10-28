import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
`;

export const titleLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    & > p {
        margin:15px;
        color: #777777;
        
        &:nth-of-type(1) {
            font-size: 20px;
            font-weight: 600;
        }
        &:nth-of-type() {
            font-size: 14px;
        }
    }
`;

export const signuplayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 650px;
    height: 350px;
    padding: 15px 30px;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 5px 5px 20px #00000028;

    & > p:nth-of-type(1) {
        font-size: 18px;
        font-weight: 900;
        padding-bottom: 10px;
        border-bottom: 1px solid #E0E0E0;
        cursor: default;
    }

    & > button {
        box-sizing: border-box;
        border: none;
        border-radius: 5px;
        width: 300px;
        height: 40px;
        margin: 50px auto 0px;
        background-color: #FFF5D6;
        color: #777777;
        font-weight: 600;
    }
`;


export const inputBox = css`
    box-sizing: border-box;
    color: #777777;
    & > p {
        margin: 10px 0px 7px;
        font-size: 14px;
        font-weight: 600;
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
