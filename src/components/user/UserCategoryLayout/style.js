import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 100%;
    height: 66px;
    background-color: #FFF5D6;

    & > button {
        border: none;
        background-color: transparent;
        font-size: 16px;
        margin-left: 50px;
        color: #9d6c4c;
        cursor: pointer;
        &:nth-of-type(1) {
            margin: 0;
        }
    }
`;