import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    & > p:nth-of-type(1) {
        font-size: 18px;
        font-weight: 900;
        padding-bottom: 10px;
        border-bottom: 1px solid #E0E0E0;
        cursor: default;
    }
`;

export const optionLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 100%;
    
`;

export const selectBoxStyle = css`
    box-sizing: border-box;
    padding: 10px;
    width: 110px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    outline: none;
`;

export const dateSelectLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    & > input {
        box-sizing: border-box;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        width: 130px;
        height: 40px;
        padding: 0px 10px;
        margin: 0px 10px;
 
    }
    & > button {
        box-sizing: border-box;
        width: 60px;
        height: 40px;
        border: none;
        border-radius: 5px;
    }
`;


