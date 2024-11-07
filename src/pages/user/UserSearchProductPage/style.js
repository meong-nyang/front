import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: auto;
    ::-webkit-scrollbar {
        display: none;
    }
`;

export const searchLayout = css`
    box-sizing: border-box;
    position: relative;
    margin: 0 auto;
    width: 500px;
    margin: 30px;
    & > input {
        box-sizing: border-box;
        width: 100%;
        padding: 10px 40px 10px 20px;
        outline: none;
        background-color: transparent;
        border: 2px solid #9d6c4c;
        border-radius: 30px;
        
    }
    & > svg {
        position: absolute;
        top: 7px;
        right: 12px;
        color: #9d6c4c;
        font-size: 25px;
    }
`;

export const resultLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    /* flex-wrap: wrap; */
    width: 1200px;
    & > p {
        padding-left: 20px;
    }
`;

export const listLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
`;