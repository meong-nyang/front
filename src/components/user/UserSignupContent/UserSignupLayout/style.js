import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 650px;
    height: 500px;
    padding: 15px 30px;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 2px 2px 2px #00000044;

    & > p:nth-of-type(1) {
        font-size: 18px;
        font-weight: 900;
        padding-bottom: 10px;
        border-bottom: 1px solid #E0E0E0;
        cursor: default;
    }
`;

