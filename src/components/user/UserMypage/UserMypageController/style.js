import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    min-width: 250px;
    height: 650px;
    margin-top: 70px;
    padding: 20px;
    background-color: white;
    border-radius: 10px;

    & svg {
        &:nth-of-type(2) {
            font-size: 50px;
        }
    }
`;

export const listSelectLayout = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    background-color: #9d6c4c25;
    color: #9d6c4c;
    font-weight: 600;
    cursor: pointer;
    & > svg {
        margin-right: 10px;
        cursor: pointer;
    }
    & > p {
        cursor: pointer;
    }
`;

export const listLayout = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    color: #777777;
    & > svg {
        margin-right: 10px;
        cursor: pointer;
    }
    & > p {
        cursor: pointer;
    }
`;