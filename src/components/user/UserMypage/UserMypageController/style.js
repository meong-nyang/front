import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    position: absolute;
    top: 20px;
    left: 20px;
    width: 250px;
    height: 300px;
    padding: 20px;

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
    background-color: #ffb69c25;
    color: #FFB69C;
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