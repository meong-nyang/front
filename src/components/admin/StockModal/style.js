import { css } from "@emotion/react";

export const background = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 20;
    border: none !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    
`;

export const layout = css`
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    box-shadow: 2px 2px 5px #00000055;
    padding: 20px;
    width: 800px;
    height: 800px;
    background-color: white;

    & > svg {
        position: absolute;
        right: 5px;
        top: 5px;
        width: 30px;
        height: 30px;
    
        &:hover {
            cursor: pointer;
        }
    }
`;

export const headerInput = css`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 60px;

    & > input {
        box-sizing: border-box;
        outline: none;
        margin: 0;
        padding: 0 10px;
        height: 30px;
    }

    & > span {
        box-sizing: border-box;
        display: inline-block;
        margin-right: 10px;
    }

    & > input:nth-of-type(1) {
        margin-right: 30px;
    }

    & > input:nth-of-type(2) {
        width: auto;
        margin-right: 10px;
    }
`;

export const mainContainer = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-top: 20px;
`;

export const inbound = css`
    margin-bottom: 20px;
    width: 100%;
    height: calc(50% - 15px);
`;

export const inoutHistory = css`
    width: 100%;
    height: calc(50% - 15px);
`;

export const table = css`
    margin-top: 5px;
    
    th, td {
        border: none;
        text-align: center;
        width: 150px;
    }

    th {
        border-top: 1px solid #c9c9c9;
        border-bottom: 1px solid #c9c9c9;
        background-color: white;
    }

    td {
        padding: 0;
        font-size: 14px;
    }
`;