import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-grow: 1;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    & > p {
        font-size: 25px;
        font-weight: 600;
        color: #777777;
        margin-bottom: 20px;
    }
`;