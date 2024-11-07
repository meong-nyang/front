import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    flex-grow: 1;
`;

export const signupTitle = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #9d6c4c;

    & p {
        cursor: default;
    }
    & > p {
        margin-bottom: 20px;
        font-size: 25px;
        font-weight: 600;
    }
`;

export const signupOrder = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    font-size: 14px;
    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    
        &:nth-of-type(2) {
            padding: 0px 40px;
        }
        & > svg {
            font-size: 25px;
            margin-bottom: 10px;

        }
    }
`;

export const signupContent = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
`;

export const signupBtn = css`
    display: flex;
    justify-content: center;
    margin: 20px 0px;
    & > button {
        box-sizing: border-box;
        width: 400px;
        height: 40px;
        border: none;
        border-radius: 5px;
        background-color: #FFF5D6;
        color: #777777;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
    }
`;

