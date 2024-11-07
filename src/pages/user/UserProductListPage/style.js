import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    width: 1200px;
    height: 100%;
    overflow: auto;
    ::-webkit-scrollbar {
        display: none;
    }
`;


export const hearderLayout = css`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    min-height: 50px;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    & > p {
        font-size: 16px;
        color: #777777;
    }
`;

export const navigateLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
    & > p {
        font-size: 18px;
        font-weight: 600;
        color: #777777;
        &:nth-of-type(2) {
            margin: 0px 10px;
        }
        &:nth-last-of-type(1) {
            color: #9d6c4c;
        }
    }
`;

export const listLayout = css`
    box-sizing: border-box;
    display: flex;
    flex-grow: 1;
    width: 100%;
    flex-wrap: wrap;
`;